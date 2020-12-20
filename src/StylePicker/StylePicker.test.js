import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import StylePicker from './StylePicker'

const mockTheme = {
  colors: {
    primary: {
      styleValue: '#000000',
      styleValueResolved: '#000000',
      metadata: {
        description: 'Primary font color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    primaryBackground: {
      styleValue: '#ffffff',
      styleValueResolved: '#ffffff',
      metadata: {
        description: 'Primary background color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    }
  },
  sizes: {
    text: {
      styleValue: '1.1em',
      styleValueResolved: '1.1em',
      metadata: {
        description: 'Default text size (em)',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Text size can start with a decimal number", example: '1.1em' },
            { regex: /^em$/, message: "Text size can end with em unit" }
          ]
        ]
      }
    },
    borderWidth: {
      styleValue: '1px',
      styleValueResolved: '1px',
      metadata: {
        description: 'Default border width (px)',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Border width size can start with a decimal number", example: '1.1px' },
            { regex: /^px$/, message: "Border width size can end with px unit" }
          ]
        ]
      }
    }
  },
  textfield: {
    border: {
      styleValue: '1px solid #000000',
      styleValueResolved: '1px solid #000000',
      metadata: {
        description: 'Border',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Border can start with a decimal number", example: '1px solid #000000' },
            { regex: /^px/, message: "Border size can be in px" },
            { regex: /^\s+/, message: "Must have a space after px" },
            { regex: /^(solid|dashed)/, message: "Border style can be solid or dashed" },
            { regex: /^\s+/, message: "Must have a space after border style" },
            { regex: /^#/, message: "Border color can start with #" },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Border color can be in HEX" }
          ]
        ]
      }
    }
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

  it('Does have an initial resolved value', () => {
    const { queryByPlaceholderText } = render(<StylePicker sectionName='colors' styleName='primary' themeState={mockTheme} />)
    const styleInput = queryByPlaceholderText('Style')
    expect(styleInput.value).toBe('#000000')
  })
})

describe('Ok button', () => {
  let themeDispatchMock,
    renderedStylePicker,
    okButton,
    styleInput

  beforeEach(() => {
    themeDispatchMock = jest.fn()
    renderedStylePicker = render(<StylePicker
      sectionName='colors'
      styleName='primary'
      themeState={mockTheme}
      themeDispatch={themeDispatchMock} />)
    const { queryByTestId, queryByPlaceholderText } = renderedStylePicker
    okButton = queryByTestId('ok-btn')
    styleInput = queryByPlaceholderText('Style')
  })

  it('Does not trigger themeDispatch if input is empty', () => {
    fireEvent.change(styleInput, { target: { value: '' } })
    fireEvent.click(okButton)
    expect(themeDispatchMock).not.toHaveBeenCalled()
  })

  it('Does not trigger themeDispatch if input is invalid', () => {
    fireEvent.change(styleInput, { target: { value: '#z1z1z1' } })
    fireEvent.click(okButton)
    expect(themeDispatchMock).not.toHaveBeenCalled()
  })

  it('Does trigger themeDispatch if input is valid', () => {
    fireEvent.change(styleInput, { target: { value: '#111111' } })
    fireEvent.click(okButton)
    expect(themeDispatchMock).toHaveBeenCalled()
  })
})

describe('Resolve style', () => {
  let themeDispatchMock,
    renderedStylePicker,
    resolvedStyle,
    okButton,
    styleInput

  beforeEach(() => {
    themeDispatchMock = jest.fn()
    renderedStylePicker = render(<StylePicker
      sectionName='textfield'
      styleName='border'
      themeState={mockTheme}
      themeDispatch={themeDispatchMock} />)
    const { queryByTestId, queryByPlaceholderText } = renderedStylePicker
    okButton = queryByTestId('ok-btn')
    resolvedStyle = queryByTestId('resolved-style')
    styleInput = queryByPlaceholderText('Style')
  })

  it('Does have an initial resolved value', () => {
    expect(resolvedStyle).toHaveTextContent('1px solid #000000')
  })

  it('Does not trigger themeDispatch if input style cannot be resolved', () => {
    fireEvent.change(styleInput, { target: { value: '{sizes.borderWidt} solid {colors.secondary}' } })
    fireEvent.click(okButton)
    expect(themeDispatchMock).not.toHaveBeenCalled()
  })

  it('Does trigger themeDispatch if input style can be resolved', () => {
    fireEvent.change(styleInput, { target: { value: '{sizes.borderWidth} solid {colors.primary}' } })
    fireEvent.click(okButton)
    expect(themeDispatchMock).toHaveBeenCalled()
  })
})