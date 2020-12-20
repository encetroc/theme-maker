import Section from './../Section/Section'
import React from 'react'
import './ThemeEditor.css'

const ThemeEditor = ({ themeState, themeDispatch }) => {
  const saveTheme = () => {
    let savedTheme = {}
    Object.entries(themeState).forEach(section => {
      Object.entries(section[1]).forEach(style => {
        savedTheme = {
          ...savedTheme,
          [section[0]]: {
            ...savedTheme[section[0]],
            [style[0]]: {
              styleValue: style[1].styleValue,
              styleValueResolved: style[1].styleValueResolved
            }
          }
        }
      })
    })
    localStorage.setItem('theme', JSON.stringify(savedTheme))
  }
  return (
    <div className='editor-container' data-testid='editor'>
      {Object.entries(themeState).map((el) => {
        return <Section
          key={el[0]}
          section={el}
          themeState={themeState}
          themeDispatch={themeDispatch} />
      })}
      <button className='save-btn' data-testid='save-btn' onClick={saveTheme}>Save</button>
    </div>
  );
}

export default ThemeEditor
