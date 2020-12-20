import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

it('Renders correctly', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('app-container')).toBeTruthy()
})
