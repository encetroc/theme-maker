import React, { useState, useEffect } from 'react'
import './StylePicker.css';

const StylePicker = ({ description, styleValue = '', regex, sectionName, styleName, themeState, themeDispatch }) => {
  const [style, setStyle] = useState(styleValue)
  const [resolvedStyle, setResolvedStyle] = useState('')
  const [error, setError] = useState('')
  const [validationRegex, setValidationRegex] = useState(new RegExp(regex))
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      themeDispatch(
        {
          type: 'UPDATE_THEME',
          payload: { [sectionName]: { [styleName]: { value: style, description: description } } }
        }
      )
    }
  }
  const isValid = () => {
    setError('')
    setStyle(currentValue => currentValue && currentValue.trim())
    if (!style) {
      setError('a value is required')
      return false
    } else if (resolveStyle(style).includes('undefined')) {
      setError('one or more variables do no exist')
      return false
    } else if (!resolveStyle(style).match(validationRegex)) {
      setError(`invalid input for ${sectionName} ${styleName}`)
      return false
    }
    return true
  }
  const resolveStyle = (styleVar) => {
    if (styleVar && !styleVar.match(/\{(.*?)\}/g)) {
      return styleVar
    }
    const newResolvedStyle = styleVar && styleVar.replace(/\{(.*?)\}/g, (match) => {
      const propsArray = match.replace('{', '').replace('}', '').split('.')
      return themeState[propsArray[0]]
        && themeState[propsArray[0]][propsArray[1]]
        && themeState[propsArray[0]][propsArray[1]].value
    });
    return newResolvedStyle
  }
  useEffect(() => {
    setResolvedStyle(resolveStyle(style))
  }, [themeState])
  useEffect(() => {
    setTimeout(isValid, 500)
  }, [style])
  return (
    <div data-testid='style-picker' className="style-picker-container">
      <span>{description}: </span>
      <strong data-testid='resolved-style'>{resolvedStyle}</strong>
      <i>{sectionName}.{styleName}</i>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor='style'>Value : </label>
        <input
          required
          type='text'
          id='style'
          name='style'
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <p data-testid='error-message'>{error}</p>
        <button data-testid="ok-btn" type='submit'>OK</button>
      </form>
    </div>
  )
}

export default StylePicker
