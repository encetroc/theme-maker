import React from 'react'
import { render } from '@testing-library/react'
import Section from './Section'

const mockSection = [
    'colors',
    {
        primary: { value: '#000000', description: 'Primary font color' },
        secondary: { value: '#ffffff', description: 'Secondary font color' }
    }
]

it('Renders correctly', () => {
    const { queryByTestId, queryAllByTestId } = render(<Section />)
    expect(queryByTestId('section-title')).toBeTruthy()
    expect(queryAllByTestId('style-picker')).toBeTruthy()
})

describe('Section content', () => {
    it('Has the correct title', () => {
        const { queryByTestId } = render(<Section section={mockSection} />)
        expect(queryByTestId('section-title')).toHaveTextContent('colors')
    })

    it('Has the correct number of style pickers', () => {
        const { queryAllByTestId } = render(<Section section={mockSection} />)
        expect(queryAllByTestId('style-picker')).toHaveLength(2)
    })
})