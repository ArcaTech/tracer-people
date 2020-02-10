import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setOrder, setPage, fetchUsers } from '../actions'
import { getVisibleUsers, getTotalUsers, getOrder, getPage } from '../selectors'
import { PAGE_SIZE } from '../constants'
import UserRow from './user-row'

const UserTable = () => {
    const users = useSelector(getVisibleUsers)
    const totalUsers = useSelector(getTotalUsers)
    const order = useSelector(getOrder)
    const page = useSelector(getPage)
    const dispatch = useDispatch()

    const isFirstPage = page === 0
    const isLastPage = totalUsers <= (page + 1) * PAGE_SIZE

    useEffect(() => {
        loadPage()
    }, [page, order])

    const loadPage = async () => {
        await dispatch(fetchUsers(order, page))
    }

    const handleOrder = async (newOrder) => {
        dispatch(setOrder(newOrder === order ? `-${newOrder}` : newOrder))
    }

    const handleUserUpdate = async user => {
        console.log(`updated user ${user.id}`)
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
                        {isFirstPage ? 'Prev' : <a onClick={() => dispatch(setPage(page - 1))}>Prev</a>}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        {isLastPage ? 'Next' : <a onClick={() => dispatch(setPage(page + 1))}>Next</a>}
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UserTable
