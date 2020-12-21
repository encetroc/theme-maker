import React, { useReducer } from 'react'
import ThemeEditor from './ThemeEditor/ThemeEditor'
import initialThemeObject from './initialThemeObject'
import './App.css';
import ThemeOverview from './ThemeOverview/ThemeOverview';

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      let sectionName = Object.keys(action.payload)[0]
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
    case 'OPEN_EDITOR':
      let newState = { ...state }
      Object.values(newState).forEach(section => {
        Object.values(section).forEach(style => {
          style.metadata.isEditorOpen = false
        })
      })
      newState = {
        ...newState,
        [action.payload.sectionName]: {
          ...newState[action.payload.sectionName],
          [action.payload.styleName]: {
            ...newState[action.payload.sectionName][action.payload.styleName],
            metadata: {
              ...newState[action.payload.sectionName][action.payload.styleName].metadata,
              isEditorOpen: true
            }
          }
        }
      }
      return newState
    case 'CLOSE_EDITOR':
      return {
        ...state,
        [action.payload.sectionName]: {
          ...state[action.payload.sectionName],
          [action.payload.styleName]: {
            ...state[action.payload.sectionName][action.payload.styleName],
            metadata: {
              ...state[action.payload.sectionName][action.payload.styleName].metadata,
              isEditorOpen: false
            }
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
  return <div className='app-container' data-testid='app-container'>
    <ThemeEditor themeState={themeState} themeDispatch={themeDispatch} />
    <ThemeOverview themeState={themeState} />
  </div>

}

export default App;
