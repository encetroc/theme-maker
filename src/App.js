import StylePicker from './StylePicker/StylePicker'
import Section from './Section/Section'
import React, { useReducer } from 'react'
import './App.css';

const initialTheme = {
  colors: {
    primary: { value: '#000000', description: 'Primary font color' },
    secondary: { value: '#ffffff', description: 'Secondary font color' }
  },
  sizes: {
    borderWidth: { value: '1px', description: 'Default border width' }
  },
  textfield: {
    border: { value: '{sizes.borderWidth} solid {colors.primary}', description: 'Border' }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
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
  const [state, dispatch] = useReducer(reducer, localStorage.getItem('theme') || initialTheme)
  const handleClick = () => {
    dispatch({ type: 'change', payload: { colors: { primary: { value: '#hello', description: 'Primary font color' } } } })
    console.log(state)
  }
  return (
    <div>
      {Object.entries(state).map((value) => {
        console.log(value)
        return <Section section={value} dispatch={dispatch} />
      })}
      {/*       <StylePicker label='Primary font color' type='colors' name='primary' />
      <StylePicker label='Default border width' type='sizes' name='borderWidth' />
      <StylePicker label='Border' type='textfield' name='border' />
      <button onClick={() => handleClick()}>click me</button> */}
    </div>
  );
}

export default App;
