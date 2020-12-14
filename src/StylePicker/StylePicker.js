import React, { useState, useEffect } from 'react'
import './StylePicker.css';

const color = /^#(?:[0-9a-f]{3}){1,2}$/i
const size = /^([+-]?(?:\d+|\d*\.\d+))(px|em|%)$/
const calc = /^(calc\()([+-]?(?:\d+|\d*\.\d+))(px|em|%)(\*|\+|\-|\/)([+-]?(?:\d+|\d*\.\d+))(px|em|%)(\))$/
const normalBorder = /^([+-]?(?:\d+|\d*\.\d+))(px|em|%)(\s+)(solid|dashed)(\s+)#(?:[0-9a-f]{3}){1,2}$/
const calcBorder = /^(([+-]?(?:\d+|\d*\.\d+))(px|em|%)|(calc\()([+-]?(?:\d+|\d*\.\d+))(px|em|%)(\*|\+|\-|\/)([+-]?(?:\d+|\d*\.\d+))(px|em|%)(\)))(\s+)(solid|dashed)(\s+)#(?:[0-9a-f]{3}){1,2}$/

const StylePicker = ({ description, styleValue, sectionName, styleName, themeState, themeDispatch }) => {
  const [style, setStyle] = useState(styleValue)
  const [resolvedStyle, setResolvedStyle] = useState('')
  const [errors, setErrors] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resolveStyle(style).match(calcBorder)) {
      setErrors('invalid input')
    } else {
      setErrors('')
      themeDispatch(
        {
          type: 'UPDATE_THEME',
          payload: { [sectionName]: { [styleName]: { value: style, description: description } } }
        }
      )
    }
  }
  const resolveStyle = (styleVar) => {
    if (!styleVar.match(/\{(.*?)\}/g)) {
      return styleVar
    }
    const newResolvedStyle = styleVar.replace(/\{(.*?)\}/g, (match) => {
      const propsArray = match.replace('{', '').replace('}', '').split('.')
      console.log(propsArray)
      return themeState[propsArray[0]]
        && themeState[propsArray[0]][propsArray[1]]
        && themeState[propsArray[0]][propsArray[1]].value
    });
    return newResolvedStyle
  }
  useEffect(() => {
    setResolvedStyle(resolveStyle(style))
  }, [themeState])
  return (
    <div className="style-picker-container">
      <span>{description}: </span>
      <strong>{resolvedStyle}</strong>
      <i>{sectionName}.{styleName}</i>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor='style'>Value : </label>
        <input
          required
          type='text'
          id='style'
          name='style'
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        {errors}
        <button type='submit'>OK</button>
      </form>
    </div>
  )
}

export default StylePicker
