import Section from './Section/Section'
import React, { useReducer } from 'react'
import './App.css';

const initialTheme = {
  colors: {
    primary: { value: '#000000', description: 'Primary font color' },
    secondary: { value: '#ffffff', description: 'Secondary font color' }
  },
  sizes: {
    borderWidth: { value: '1px', description: 'Default border width' },
    text: { value: '1.1em', description: 'Default text size' }
  },
  textfield: {
    border: { value: '{sizes.borderWidth} solid {colors.secondary}', description: 'Border' }
  }
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      const key = Object.keys(action.payload)[0]
      const value = action.payload[key]
      return {
        ...state,
        [key]: {
          ...state[key],
          ...value
        }
      }
    default:
      return state
  }
}

function App() {
  const [themeState, themeDispatch] = useReducer(themeReducer, JSON.parse(localStorage.getItem('theme')) || initialTheme)
  const saveTheme = () => {
    localStorage.setItem('theme', JSON.stringify(themeState))
  }
  return (
    <>
      <div>
        {Object.entries(themeState).map((el) => {
          return <Section
            key={el[0]}
            section={el}
            themeState={themeState}
            themeDispatch={themeDispatch} />
        })}
      </div>
      <button onClick={saveTheme}>Save</button>
    </>
  );
}

export default App;
