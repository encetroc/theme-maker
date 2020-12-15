import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

it('Renders correctly', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('save-btn')).toBeTruthy()
})

it('Saves theme data to local storage', () => {
  const { queryByTestId } = render(<App />)
  const saveButton = queryByTestId('save-btn')
  fireEvent.click(saveButton, { color: '#112233' })
  expect(localStorage.getItem('theme')).toBeTruthy()
})
