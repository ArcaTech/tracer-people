import React, { useState, useRef } from 'react'

const normalize = str => {
    if (str) return str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace('<br>', '')
}

const InlineEdit = ({ value, onChange }) => {
    const [active, setActive] = useState(false)
    const ref = useRef(null)

    const handleClick = () => {
        setActive(true)
        setTimeout(() => {
            ref.current.focus()
            ref.current.appendChild(document.createTextNode(''))
        }, 1)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            ref.current.blur()
        }
    }

    const handleBlur = () => {
        const value = normalize(ref.current.innerHTML)

        if (onChange) {
            onChange({
                target: {
                    value: value ?? '',
                }
            })
        }

        setActive(false)
        ref.current.scrollLeft = 0
    }

    const handleFocus = () => {
        setActive(true)
    }

    const showNoValueText = !value && !active

    return (
        <div
            ref={ref}
            style={{ color: showNoValueText ? '#ccc' : 'inherit' }}
            contentEditable={active}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onClick={handleClick}
            tabIndex={0}
            suppressContentEditableWarning={true}>
            {showNoValueText ? '[No value]' : value}
        </div>
    )
}

export default InlineEdit
