import React from 'react'
import Color from 'color'
import InlineEdit from './inline-edit'

const UserRow = ({ user, onUserUpdate }) => {
    const updateUser = async updates => {
        try {
            const response = await fetch(`/api/user/${user.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            })
    
            const data = await response.json()
            if (onUserUpdate) onUserUpdate(data.user)
        } catch (err) {
            console.log(err)
        }
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
        <tr style={getRowStyle(user)} className={user.fixer ? 'fixer' : ''}>
            <td>{user.id}</td>
            <td><span><InlineEdit value={user.name} onChange={e => updateUser({ name: e.target.value })} /></span></td>
            <td><InlineEdit value={user.title} onChange={e => updateUser({ title: e.target.value })} /></td>
            <td><InlineEdit value={user.color} onChange={e => updateUser({ color: e.target.value })} /></td>
            <td><input type="checkbox" checked={user.fixer} onChange={e => updateUser({ fixer: e.target.checked })} /></td>
        </tr>
    )
}

export default UserRow
