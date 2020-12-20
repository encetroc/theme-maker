import React, { useState, useEffect, useRef } from 'react'
import './StylePicker.css';

const StylePicker = ({ sectionName, styleName, themeState, themeDispatch }) => {
  const styleData = themeState[sectionName][styleName]
  const [style, setStyle] = useState(themeState[sectionName][styleName].styleValue)
  const [resolvedStyle, setResolvedStyle] = useState(themeState[sectionName][styleName].styleValueResolved)
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState([])

  const validateRegex = (value, validationArray) => {
    let myValue = value.slice()
    let pos = 0
    for (let i = 0; i < validationArray.length; i++) {
      if (myValue.match(validationArray[i].regex)) {
        pos += myValue.match(validationArray[i].regex).length
        myValue = myValue.replace(validationArray[i].regex, "")
      } else {
        return [validationArray[i].message, pos]
      }
    }
    return ['NO_ERROR', -1]
  }

  const resolveStyle = (styleVar) => {
    let containsUndefined = false
    const metadata = []
    if (!styleData.metadata.allowVariables) {
      return [styleVar, metadata, containsUndefined]
    }
    if (styleVar && !styleVar.match(/\{(.*?)\}/g)) {
      return [styleVar, metadata, containsUndefined]
    }
    const newResolvedStyle = styleVar && styleVar.replace(/\{(.*?)\}/g, (match) => {
      const variable = match
      const propsArray = match.replace('{', '').replace('}', '').split('.')
      const style = themeState[propsArray[0]]
        && themeState[propsArray[0]][propsArray[1]]
        && themeState[propsArray[0]][propsArray[1]].styleValue

      if (style === undefined) {
        containsUndefined = true
      }

      metadata.push({ variable, style })
      return style
    });
    return [newResolvedStyle, metadata, containsUndefined]
  }

  const validateInput = (inputStyle) => {
    setErrors([])
    const resolvedStyleData = resolveStyle(style)
    if (inputStyle === '') {
      setErrors(['> Input cannot be empty'])
      return false
    }
    if (!styleData.metadata.allowVariables && (inputStyle.includes('{') || inputStyle.includes('}'))) {
      setErrors(['> Variables are not allowed for this style input'])
      return false
    }
    if (resolvedStyleData[2]) {
      const [resolvedStyle, metadata] = resolvedStyleData
      let errorMessage = '> The following variables do not exist: '
      metadata.forEach(el => {
        if (el.style === undefined) {
          errorMessage += ` ${el.variable}`
        }
      })
      setErrors([errorMessage])
      return false
    }
    if (styleData.metadata.validationRegex.length > 0) {
      const errorMessages = []
      styleData.metadata.validationRegex.forEach(el => {
        errorMessages.push(validateRegex(resolvedStyleData[0], el))
      })
      const noError = errorMessages.find(el => el[0] === 'NO_ERROR')
      if (!noError) {
        errorMessages.forEach(el => {
          setErrors(previousErrors => [...previousErrors, `> ${el[0]} at position ${el[1]}`])
        })
        return false
      }
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput(style)) return
    themeDispatch(
      {
        type: 'UPDATE_THEME',
        payload: { [sectionName]: { [styleName]: { styleValue: style, styleValueResolved: resolveStyle(style)[0] } } }
      }
    )
  }

  useEffect(() => {
    setResolvedStyle(resolveStyle(style)[0])
  }, [themeState])

  return (
    <div data-testid='style-picker' className={'style-editor-container' + (isOpen ? ' open' : '')}>
      {/* <button onClick={() => setIsOpen(false)} className='close-btn'>X</button> */}
      <section onClick={() => setIsOpen(prev => !prev)} className='style-recap-container'>
        <div className='style-recap'>
          <span>{styleData.metadata.description}: </span>
          <strong data-testid='resolved-style'>
            {resolvedStyle}
          </strong>
        </div>
        <i className='style-var'>{sectionName}.{styleName}</i>
      </section>
      <form className={'style-editor-form' + (isOpen ? ' open' : '')} onSubmit={handleSubmit}>
        <div className='label-input'>
          <label htmlFor='style'>Value: </label>
          <div className='input'>
            <input
              type='text'
              id='style'
              name='style'
              placeholder="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
            {
              !!errors.length &&
              <ul className='form-errors'>
                Please verify that you respect at least one of the following:
                  {errors.map(error => <li className='form-error' key={error}>{error}</li>)}
              </ul>
            }
          </div>
        </div>
        <div className='form-actions'>
          <button data-testid="ok-btn" type='submit'>OK</button>
        </div>
      </form>
    </div>
  )
}

export default StylePicker
