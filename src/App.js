import Section from './Section/Section'
import React, { useReducer } from 'react'
import './App.css';

const validationRegex = {
  color: /^#(?:[0-9a-f]{3}){1,2}$/i,
  simpleSize: /^([+-]?(?:\d+|\d*\.\d+))(px|em|rem)$/,
  sizeWithCalc: /^(([+]?(?:\d+|\d*\.\d+))(px|em|rem)|(calc\()((\s+)?)([+]?(?:\d+|\d*\.\d+))(px|em|rem)((\s+)?)(\+|\-)((\s+)?)([+]?(?:\d+|\d*\.\d+))(px|em|rem)((\s+)?)(\))|(calc\()((\s+)?)([+-]?(?:\d+|\d*\.\d+))(px|em|rem)((\s+)?)(\*|\/)((\s+)?)([+]?(?:\d+|\d*\.\d+))((\s+)?)(\)))$/,
  border: /^([+]?(?:\d+|\d*\.\d+))(px|em|rem)(\s+)(solid|dashed)(\s+)#(?:[0-9a-f]{3}){1,2}$/
}

const initialTheme = {
  colors: {
    primary: { value: '#000000', description: 'Primary font color', regex: validationRegex.color },
    secondary: { value: '#ffffff', description: 'Secondary font color', regex: validationRegex.color }
  },
  sizes: {
    borderWidth: { value: '1px', description: 'Default border width', regex: validationRegex.simpleSize },
    text: { value: '1.1em', description: 'Default text size', regex: validationRegex.simpleSize }
  },
  buttons: {
    fontSize: { value: 'calc(1.1rem*1.2)', description: 'Font size', regex: validationRegex.sizeWithCalc }
  },
  textfield: {
    border: { value: '{sizes.borderWidth} solid {colors.secondary}', description: 'Border', regex: validationRegex.border }
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
