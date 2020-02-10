import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import unionBy from 'lodash/unionBy'

const initialState = {
    users: [],
    totalUsers: 0,
    page: 0,
    order: 'name',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            }
        case 'MERGE_USERS':
            return {
                ...state,
                users: unionBy(action.payload, state.users, u => u.id),
            }
        case 'SET_TOTAL_USERS':
            return {
                ...state,
                totalUsers: action.payload,
            }
        case 'SET_ORDER':
            return {
                ...state,
                users: [],
                page: 0,
                order: action.payload,
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload,
            }
        default:
            return state
    }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?? compose
export default createStore(reducer, composeEnhancers(
    applyMiddleware(thunk, logger)
))
