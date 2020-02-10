const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const app = express()
const port = 9000

let db

const orderBy = name => {
    let direction = 'ASC'

    if (name.startsWith('-')) {
        direction = 'DESC'
        name = name.slice(1)
    }

    const all = ['id', 'name', 'title', 'color', 'fixer']
    return all.includes(name) ? `${name} ${direction}` : 'name ASC'
}

const truncate = (value = '') => {
    if (value.length > 20) return value.slice(0, 20)
    return value
}

app.use(bodyParser.json())

app.get('/api/users', async (req, res) => {
    const { order = 'name', pageSize = 5, page = 0 } = req.query

    try {
        const users = await db.all(`SELECT * FROM users ORDER BY ${orderBy(order)} LIMIT ? OFFSET ?`, pageSize, pageSize * page)
        const { total } = await db.get('SELECT count(*) as total FROM users')

        res.json({
            users,
            total,
        })
    } catch (err) {
        console.error(err)
        res.json({
            error: err.message,
        })
    }
})

app.put('/api/user/:id', async (req, res) => {
    const { name, title, color, fixer } = req.body
    const whereClauses = []

    if (name || name === '') whereClauses.push(`name = '${name}'`)
    if (title || title === '') whereClauses.push(`title = '${truncate(title)}'`)
    if (color || color === '') whereClauses.push(`color = '${color}'`)
    if (fixer !== undefined) whereClauses.push(`fixer = ${fixer ? '1' : '0'}`)

    try {
        await db.run(`UPDATE users SET ${whereClauses.join(', ')} WHERE id = ?`, req.params.id)
        const user = await db.get('SELECT * FROM users WHERE id = ?', req.params.id)

        res.json({
            user,
        })
    } catch (err) {
        console.error(err)
        res.json({
            error: err.message,
        })
    }
})

app.use(express.static('static'))

app.listen(port, async () => {
    console.log(`Server started on port ${port}`)

    try {
        db = await sqlite.open('./database.sqlite', {
            promise: Promise,
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})
