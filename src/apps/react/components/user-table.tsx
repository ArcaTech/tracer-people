import React, { useState, useEffect } from 'react'
import UserRow from './user-row'

const UserTable = () => {
    const pageSize = 10
    const [users, setUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [page, setPage] = useState(0)
    const [order, setOrder] = useState('id')

    const isFirstPage = page === 0
    const isLastPage = totalUsers <= (page + 1) * pageSize

    useEffect(() => {
        loadPage()
    }, [page, order])

    const loadPage = async () => {
        const response = await fetch(`/api/users?order=${order}&pageSize=${pageSize}&page=${page}`)
        const { users, total } = await response.json()
        setUsers(users)
        setTotalUsers(total)
    }

    const handleOrder = async newOrder => {
        setUsers([])
        setOrder(newOrder === order ? `-${newOrder}` : newOrder)
        setPage(1)
    }

    const handleUserUpdate = async user => {
        setUsers(users.map(u => u.id === user.id ? user : u))
    }

    return (
        <table id="user-table">
            <thead>
                <tr>
                    <td onClick={() => handleOrder('id')}>ID</td>
                    <td onClick={() => handleOrder('name')}>Name</td>
                    <td onClick={() => handleOrder('title')}>Title</td>
                    <td onClick={() => handleOrder('color')}>Color</td>
                    <td onClick={() => handleOrder('fixer')}>🦟</td>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <UserRow key={user.id} user={user} onUserUpdate={handleUserUpdate} />
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        {isFirstPage ? 'Prev' : <a onClick={() => setPage(page - 1)}>Prev</a>}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        {isLastPage ? 'Next' : <a onClick={() => setPage(page + 1)}>Next</a>}
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UserTable
