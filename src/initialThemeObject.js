const initialThemeObject = {
  colors: {
    primary: {
      styleValue: '#000000',
      styleValueResolved: '#000000',
      metadata: {
        description: 'Primary font color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #" },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    secondary: {
      styleValue: '#ffffff',
      styleValueResolved: '#ffffff',
      metadata: {
        description: 'Secondary font color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #" },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    }
  },
  sizes: {
    borderWidth: {
      styleValue: '1px',
      styleValueResolved: '1px',
      metadata: {
        description: 'Default border width',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Border size can start with a decimal number" },
            { regex: /^px$/, message: "Border size can end with px unit" }
          ]
        ]
      }
    },
    text: {
      styleValue: '1.1em',
      styleValueResolved: '1.1rem',
      metadata: {
        description: 'Default text size',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Text size can start with a decimal number" },
            { regex: /^em$/, message: "text size can end with em unit" }
          ]
        ]
      }
    }
  },
  buttons: {
    fontSize: {
      styleValue: 'calc(1.1rem*1.2)',
      styleValueResolved: 'calc(1.1rem*1.2)',
      metadata: {
        description: 'Font size',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Button font size can start with a decimal number" },
            { regex: /^(em|px|rem)$/, message: "Button font size can end with em, px or rem units" }
          ],
          [
            { regex: /^calc\(/, message: "Button font size can start with 'calc('" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\d*\.\d+|\d+)/, message: "Button font size can have a decimal number after calc(" },
            { regex: /^(em|px|rem)/, message: "Button font size can have em, px or rem as units" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\*|\/)/, message: "Button font size can * or / operation after the size unit" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\d*\.\d+|\d+)/, message: "Button font size can have a decimal number after * or / operation" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^\)$/, message: "Button font size can end with ')'" }
          ]
        ]
      }
    }
  },
  textfield: {
    border: {
      styleValue: '{sizes.borderWidth} solid {colors.secondary}',
      styleValueResolved: '1px solid #000000',
      metadata: {
        description: 'Border',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Border can start with a decimal number" },
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

export default initialThemeObject