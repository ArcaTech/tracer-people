import { PAGE_SIZE } from './constants'

export const startFetch = () => {
    return {
        type: 'START_FETCH',
    }
}

export const finishFetch = () => {
    return {
        type: 'FINISH_FETCH',
    }
}

export const setUsers = users => {
    return {
        type: 'SET_USERS',
        payload: users,
    }
}

export const mergeUsers = users => {
    return {
        type: 'MERGE_USERS',
        payload: users,
    }
}

export const setTotalUsers = total => {
    return {
        type: 'SET_TOTAL_USERS',
        payload: total,
    }
}

export const setOrder = order => {
    return {
        type: 'SET_ORDER',
        payload: order,
    }
}

export const setPage = page => {
    return {
        type: 'SET_PAGE',
        payload: page,
    }
}

export const fetchUsers = (order, page) => async dispatch => {
    dispatch(startFetch())

    try {
        const response = await fetch(`/api/users?order=${order}&pageSize=${PAGE_SIZE}&page=${page}`)
        const { users, total } = await response.json()

        dispatch(mergeUsers(users))
        dispatch(setTotalUsers(total))
    } catch (err) {
        console.error(err)
    }

    dispatch(finishFetch())
}

export const updateUser = (id, updates) => async dispatch => {
    dispatch(startFetch())

    try {
        const response = await fetch(`/api/user/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        })

        const { user } = await response.json()
        dispatch(mergeUsers([user]))
        dispatch(finishFetch())
        return user
    } catch (err) {
        console.error(err)
        dispatch(finishFetch())
    }
}
