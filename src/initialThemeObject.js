const initialThemeObject = {
  colors: {
    primary: {
      styleValue: '#000000',
      styleValueResolved: '#000000',
      metadata: {
        isEditorOpen: false,
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
        isEditorOpen: false,
        description: 'Primary background color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    secondary: {
      styleValue: '#ffffff',
      styleValueResolved: '#ffffff',
      metadata: {
        isEditorOpen: false,
        description: 'Secondary font color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    secondaryBackground: {
      styleValue: '#4a86e8',
      styleValueResolved: '#4a86e8',
      metadata: {
        isEditorOpen: false,
        description: 'Secondary background color',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    highlight1: {
      styleValue: '#4a86e8',
      styleValueResolved: '#4a86e8',
      metadata: {
        isEditorOpen: false,
        description: 'Highlight on primary background',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    highlight2: {
      styleValue: '#ffab40',
      styleValueResolved: '#ffab40',
      metadata: {
        isEditorOpen: false,
        description: 'Highlight on secondary background',
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
        isEditorOpen: false,
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
    h1: {
      styleValue: '1.4em',
      styleValueResolved: '1.4em',
      metadata: {
        isEditorOpen: false,
        description: 'Header1 text size (em)',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "h1 size can start with a decimal number", example: '1.1em' },
            { regex: /^em$/, message: "h1 size can end with em unit" }
          ]
        ]
      }
    },
    h2: {
      styleValue: '1.2em',
      styleValueResolved: '1.2em',
      metadata: {
        isEditorOpen: false,
        description: 'Header2 text size (em)',
        allowVariables: false,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "h2 size can start with a decimal number", example: '1.1em' },
            { regex: /^em$/, message: "h2 size can end with em unit" }
          ]
        ]
      }
    },
    borderWidth: {
      styleValue: '1px',
      styleValueResolved: '1px',
      metadata: {
        isEditorOpen: false,
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
    textSize: {
      styleValue: '1.1em',
      styleValueResolved: '1.1em',
      metadata: {
        isEditorOpen: false,
        description: 'Text size (em)',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Text size can start with a decimal number", example: '1.1em' },
            { regex: /^em$/, message: "Text size can end with em unit" }
          ],
          [
            { regex: /^calc\(/, message: "Text size can start with 'calc('", example: 'calc(1.1em*2)' },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\d*\.\d+|\d+)/, message: "Text size can have a decimal number after calc(" },
            { regex: /^em/, message: "Text size can have em as units" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\*|\/)/, message: "Text size can * or / operation after the size unit" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^(\d*\.\d+|\d+)/, message: "Text size can have a decimal number after * or / operation" },
            { regex: /^(\s+)?/, message: "" },
            { regex: /^\)$/, message: "Text size can end with ')'" }
          ]
        ]
      }
    },
    color: {
      styleValue: '#000000',
      styleValueResolved: '#000000',
      metadata: {
        isEditorOpen: false,
        description: 'Font color',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    border: {
      styleValue: '1px solid #000000',
      styleValueResolved: '1px solid #000000',
      metadata: {
        isEditorOpen: false,
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
    },
    background: {
      styleValue: '#ffffff',
      styleValueResolved: '#ffffff',
      metadata: {
        isEditorOpen: false,
        description: 'Background',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
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
        isEditorOpen: false,
        description: 'Font size',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^(\d*\.\d+|\d+)/, message: "Button font size can start with a decimal number", example: '1.2rem or 1.1px' },
            { regex: /^(em|px|rem)$/, message: "Button font size can end with em, px or rem units" }
          ],
          [
            { regex: /^calc\(/, message: "Button font size can start with 'calc('", example: 'calc(1.1rem*2)' },
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
    },
    color: {
      styleValue: '#000000',
      styleValueResolved: '#000000',
      metadata: {
        isEditorOpen: false,
        description: 'Font color',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    },
    background: {
      styleValue: '#4a86e8',
      styleValueResolved: '#4a86e8',
      metadata: {
        isEditorOpen: false,
        description: 'Background',
        allowVariables: true,
        validationRegex: [
          [
            { regex: /^#/, message: "Color can start with #", example: '#123aef' },
            { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
          ]
        ]
      }
    }
  }
}

export default initialThemeObject