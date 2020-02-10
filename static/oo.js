let usersFromAPI = [
    { name: 'Dwayne Harris', email: 'dharris@tracer.tech', active: true },
]

class User {
    constructor(name, email, active) {
        this.name = name
        this.email = email
        this.active = active
    }

    get name() {
        return this.name.toUpperCase()
    }
}

class UserManager {
    constructor(apiResponse) {
        this.users = []
        this.addUsers(apiResponse)
    }

    addUsers(apiResponse) {
        for (let user of apiResponse) {
            this.users.unshift(new User(user.name, user.email, user.active))
        }
    }

    renderUsers() {
        let userList = document.getElementById('user-list')
        for (let user of this.users) {
            if (user.active) userList.append(user.name)
        }
    }
}

let manager = new UserManager(usersFromAPI)
manager.renderUsers()