import React from 'react'
import { useDispatch } from 'react-redux'
import Color from 'color'
import { updateUser } from '../actions'
import InlineEdit from './inline-edit'

const UserRow = ({ user, onUserUpdate }) => {
    const dispatch = useDispatch()

    const handleChange = async updates => {
        const updatedUser = await dispatch(updateUser(user.id, updates))
        onUserUpdate(updatedUser)
    }

    const getRowStyle = user => {
        if (user && user.color) {
            try {
                const color = Color(user.color)

                return {
                    backgroundColor: user.color,
                    color: color.isLight() ? '#000' : '#fff',
                }
            } catch (err) {
                console.error(err)
            }
        }

        return {}
    }

    return (
        <tr style={getRowStyle(user)} className={user.fixer ? 'redux-fixer' : ''}>
            <td>{user.id}</td>
            <td><span><InlineEdit value={user.name} onChange={e => handleChange({ name: e.target.value })} /></span></td>
            <td><InlineEdit value={user.title} onChange={e => handleChange({ title: e.target.value })} /></td>
            <td><InlineEdit value={user.color} onChange={e => handleChange({ color: e.target.value })} /></td>
            <td><input type="checkbox" checked={user.fixer} onChange={e => handleChange({ fixer: e.target.checked })} /></td>
        </tr>
    )
}

export default UserRow
