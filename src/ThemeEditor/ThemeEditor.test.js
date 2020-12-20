import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ThemeEditor from './ThemeEditor'
import initialThemeObject from './../initialThemeObject'


it('Renders correctly', () => {
    const { queryByTestId } = render(<ThemeEditor themeState={initialThemeObject} />)
    expect(queryByTestId('editor')).toBeTruthy()
    expect(queryByTestId('save-btn')).toBeTruthy()
})

it('Saves theme data to local storage', () => {
    const { queryByTestId } = render(<ThemeEditor themeState={initialThemeObject} />)
    const saveButton = queryByTestId('save-btn')
    fireEvent.click(saveButton, { color: '#112233' })
    expect(localStorage.getItem('theme')).toBeTruthy()
})