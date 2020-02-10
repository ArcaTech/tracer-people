// 1
const userData = {
    frontend: [
        { first: 'Dwayne', last: 'Harris', email: 'dharris@tracer.tech', active: true },
        { first: 'Sarah', last: 'Walloga', email: 'swalloga@tracer.tech', active: true }
    ],
    backend: [
        { first: 'Zack', last: 'Yu', email: 'zyu@tracer.tech', active: false },
        { first: 'Gautham', last: 'Varadarajan', email: 'gvaradarajan@tracer.tech', active: true }
    ]
}

const userFilter = user => user.active

const userToString = (first, last, group) => `${first} ${last} (${group})`

const usersToEntries = users => Object.entries(users)

const entriesToNames = ([group, users]) => users.filter(userFilter).map(user => userToString(user.first, user.last, group))

const usersToFlatList1 = users => usersToEntries(users).flatMap(entriesToNames)

const usersToFlatList2 = users => {
    const groups = usersToEntries(users)
    const allUsers = groups.map(entriesToNames)
    return allUsers.flat()
}

console.log('usersToFlatList1', usersToFlatList1(userData))

// 2
const userData2 = [
    { first: 'Dwayne', last: 'Harris', email: 'dharris@tracer.tech', group: 'frontend', active: true },
    { first: 'Sarah', last: 'Walloga', email: 'swalloga@tracer.tech', group: 'frontend', active: true },
    { first: 'Zack', last: 'Yu', email: 'zyu@tracer.tech', group: 'backend', active: false },
    { first: 'Gautham', last: 'Varadarajan', email: 'gvaradarajan@tracer.tech', group: 'backend', active: true }
]

const users2ToFlatList = users => users.map(user => userToString(user.first, user.last, user.group))

console.log('users2ToFlatList', users2ToFlatList(userData2))

// 3
const activeUserMap = (users, mapFn) => users.filter(userFilter).map(mapFn)
const betterEntriesToNames = ([group, users]) => activeUserMap(users, user => userToString(user.first, user.last, group))

const betterUsersToFlatList = users => usersToEntries(users).flatMap(betterEntriesToNames)
const betterUsers2ToFlatList = users => activeUserMap(users, user => userToString(user.first, user.last, user.group))

console.log('betterUsersToFlatList', betterUsersToFlatList(userData))
console.log('betterUsers2ToFlatList', betterUsers2ToFlatList(userData2))

