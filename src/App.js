import React, { useReducer } from 'react'
import ThemeEditor from './ThemeEditor/ThemeEditor'
import initialThemeObject from './initialThemeObject'
import './App.css';

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      const sectionName = Object.keys(action.payload)[0]
      const styleValue = action.payload[sectionName]
      const styleName = Object.keys(styleValue)[0]
      return {
        ...state,
        [sectionName]: {
          ...state[sectionName],
          [styleName]: {
            ...state[sectionName][styleName],
            ...styleValue[styleName]
          }
        }
      }
    default:
      return state
  }
}

function App() {
  const [themeState, themeDispatch] = useReducer(themeReducer, loadTheme())
  function loadTheme() {
    let loadedTheme = {}
    const savedTheme = JSON.parse(localStorage.getItem('theme'))
    if (!savedTheme) return initialThemeObject
    Object.entries(initialThemeObject).forEach(section => {
      Object.entries(section[1]).forEach(style => {
        loadedTheme = {
          ...loadedTheme,
          [section[0]]: {
            ...loadedTheme[section[0]],
            [style[0]]: {
              ...style[1],
              styleValue: savedTheme[section[0]][style[0]].styleValue,
              styleValueResolved: savedTheme[section[0]][style[0]].styleValueResolved
            }
          }
        }
      })
    })
    return loadedTheme
  }
  return <ThemeEditor themeState={themeState} themeDispatch={themeDispatch} />
}

export default App;
