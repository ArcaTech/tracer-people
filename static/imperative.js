// 1
let userData = {
    frontend: [
        { first: 'Dwayne', last: 'Harris', email: 'dharris@tracer.tech', active: true },
        { first: 'Sarah', last: 'Walloga', email: 'swalloga@tracer.tech', active: true }
    ],
    backend: [
        { first: 'Zack', last: 'Yu', email: 'zyu@tracer.tech', active: false },
        { first: 'Gautham', last: 'Varadarajan', email: 'gvaradarajan@tracer.tech', active: true }
    ]
}

function usersToFlatList1(users) {
    let names = []

    for (let group in users) {
        for (let user of users[group]) {
            if (user.active) names.push(`${user.first} ${user.last} (${group})`)
        }
    }

    return names
}

console.log('usersToFlatList1', usersToFlatList1(userData))

// 2
let userData2 = [
    { first: 'Dwayne', last: 'Harris', email: 'dharris@tracer.tech', group: 'frontend', active: true },
    { first: 'Sarah', last: 'Walloga', email: 'swalloga@tracer.tech', group: 'frontend', active: true },
    { first: 'Zack', last: 'Yu', email: 'zyu@tracer.tech', group: 'backend', active: false },
    { first: 'Gautham', last: 'Varadarajan', email: 'gvaradarajan@tracer.tech', group: 'backend', active: true }
]

function usersToFlatList2(users) {
    let names = []

    for (let user of users) {
        names.push(`${user.first} ${user.last} (${user.group})`)
    }

    return names
}

console.log('usersToFlatList2', usersToFlatList2(userData2))
