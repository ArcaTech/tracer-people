import { createSelector } from 'reselect'
import orderBy from 'lodash/orderBy'
import { PAGE_SIZE } from './constants'

export const getPage = state => state.page
export const getOrder = state => state.order
export const getTotalUsers = state => state.totalUsers
export const getUsers = state => state.users

export const getOrderedUsers = createSelector(
    [getOrder, getUsers],
    (order, users) => {
        if (order.startsWith('-')) {
            return orderBy(users, [order.slice(1)], ['desc'])
        }

        return orderBy(users, [order], ['asc'])
    }
)

export const getVisibleUsers = createSelector(
    [getPage, getOrderedUsers],
    (page, users) => {
        return users.slice((page * PAGE_SIZE), (page + 1) * PAGE_SIZE)
    }
)
