import React, { useState, useEffect } from 'react'

const StylePicker = ({ label, type, name }) => {
    const [style, setStyle] = useState(localStorage.getItem(`${type}.${name}`) || '')
    const [resolvedStyle, setResolvedStyle] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(`${type}.${name}`, style);
    }
    const resolveStyle = () => {
        const styleVariables = style.match(/\{(.*?)\}/g);
        if (!styleVariables) {
            setResolvedStyle(style)
            return
        }
        const newStyle = style.replace(/\{(.*?)\}/g, function (match) {
            return localStorage.getItem(match.replace('{', '').replace('}', ''))
        });
        setResolvedStyle(newStyle)
        return
    }
    useEffect(() => {
        resolveStyle()
    })
    return (
        <div>
            <span>{label}: </span>
            <strong>{resolvedStyle}</strong>
            <i>{type}.{name}</i>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor='style'>Value : </label>
                <input
                    type='text'
                    id='style'
                    name='style'
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                />
                <button type='submit'>OK</button>
            </form>
        </div>
    )
}

export default StylePicker
