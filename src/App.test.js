import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

it('Renders correctly', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('save-btn')).toBeTruthy()
})
