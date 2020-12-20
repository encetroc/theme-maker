import React from 'react'
import { render } from '@testing-library/react'
import ThemeOverview from './ThemeOverview'
import initialThemeObject from './../initialThemeObject'


it('Renders correctly', () => {
    const { queryByTestId } = render(<ThemeOverview themeState={initialThemeObject} />)
    expect(queryByTestId('overview')).toBeTruthy()
})