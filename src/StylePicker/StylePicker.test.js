import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import StylePicker from './StylePicker'

const mockTheme = {
    colors: {
        primary: { value: '#000000' },
        secondary: { value: '#ffffff' }
    },
    sizes: {
        borderWidth: { value: '1px' },
        text: { value: '1.1em' }
    }
}

it('Renders correctly', () => {
    const { queryByTestId, queryByPlaceholderText } = render(<StylePicker />)
    expect(queryByTestId('ok-btn')).toBeTruthy()
    expect(queryByPlaceholderText('Style')).toBeTruthy()
})

describe('Style input', () => {
    it('Updates on change', () => {
        const { queryByPlaceholderText } = render(<StylePicker />)
        const styleInput = queryByPlaceholderText('Style')
        fireEvent.change(styleInput, { target: { value: '#ffffff' } })
        expect(styleInput.value).toBe('#ffffff')
    })

    it('Does have an initial value', () => {
        const { queryByPlaceholderText } = render(<StylePicker styleValue='#000000' />)
        const styleInput = queryByPlaceholderText('Style')
        expect(styleInput.value).toBe('#000000')
    })
})

describe('Ok button', () => {
    let themeDispatchMock,
        renderedStylePicker,
        okButton,
        styleInput,
        errorMessage

    beforeEach(() => {
        themeDispatchMock = jest.fn()
        renderedStylePicker = render(<StylePicker
            description='Primary font color'
            styleValue='#000000'
            regex={/^#(?:[0-9a-f]{3}){1,2}$/i}
            sectionName='colors'
            styleName='primary'
            themeState={mockTheme}
            themeDispatch={themeDispatchMock} />)
        const { queryByTestId, queryByPlaceholderText } = renderedStylePicker
        okButton = queryByTestId('ok-btn')
        styleInput = queryByPlaceholderText('Style')
        errorMessage = queryByTestId('error-message')
    })

    it('Does not trigger themeDispatch if input is empty', () => {
        fireEvent.change(styleInput, { target: { value: '' } })
        fireEvent.click(okButton)
        expect(themeDispatchMock).not.toHaveBeenCalled()
        expect(errorMessage).toHaveTextContent('a value is required')
    })

    it('Does not trigger themeDispatch if input is invalid', () => {
        fireEvent.change(styleInput, { target: { value: '#z1z1z1' } })
        fireEvent.click(okButton)
        expect(themeDispatchMock).not.toHaveBeenCalled()
        expect(errorMessage).toHaveTextContent('invalid input for colors primary')
    })

    it('Does trigger themeDispatch if input is valid', () => {
        fireEvent.change(styleInput, { target: { value: '#111111' } })
        fireEvent.click(okButton)
        expect(themeDispatchMock).toHaveBeenCalled()
        expect(errorMessage).toHaveTextContent('')
    })
})

describe('Resolve style', () => {
    let themeDispatchMock,
        renderedStylePicker,
        resolvedStyle,
        okButton,
        styleInput,
        errorMessage

    beforeEach(() => {
        themeDispatchMock = jest.fn()
        renderedStylePicker = render(<StylePicker
            description='Border'
            styleValue='{sizes.borderWidth} solid {colors.secondary}'
            regex={/^([+]?(?:\d+|\d*\.\d+))(px|em|rem)(\s+)(solid|dashed)(\s+)#(?:[0-9a-f]{3}){1,2}$/}
            sectionName='textfield'
            styleName='border'
            themeState={mockTheme}
            themeDispatch={themeDispatchMock} />)
        const { queryByTestId, queryByPlaceholderText } = renderedStylePicker
        okButton = queryByTestId('ok-btn')
        resolvedStyle = queryByTestId('resolved-style')
        styleInput = queryByPlaceholderText('Style')
        errorMessage = queryByTestId('error-message')
    })

    it('Does have an initial resolved value', () => {
        expect(resolvedStyle).toHaveTextContent('1px solid #ffffff')
    })

    it('Does not trigger themeDispatch if input style cannot be resolved', () => {
        fireEvent.change(styleInput, { target: { value: '{sizes.borderWidt} solid {colors.secondary}' } })
        fireEvent.click(okButton)
        expect(themeDispatchMock).not.toHaveBeenCalled()
        expect(errorMessage).toHaveTextContent('one or more variables do no exist')
    })

    it('Does trigger themeDispatch if input style can be resolved', () => {
        fireEvent.change(styleInput, { target: { value: '{sizes.borderWidth} solid {colors.secondary}' } })
        fireEvent.click(okButton)
        expect(themeDispatchMock).toHaveBeenCalled()
        expect(errorMessage).toHaveTextContent('')
    })
})