# Components
I created two components:
- ThemeEditor: which is the the theme editor itself, responsible for editing the theme
- ThemeOverview: which is a component for previewing the created theme

# State management
I user useReducer to manage the global state of the app, this global state is created and managed at the root Component `App`, is is also used to generate child components inside `ThemeEditor` component.
Initially you have to provide a theme object as an argument to useReducer hook, and it should follow this model:
```javascript
const initialThemeObject = {
  [sectionName1]: {
    [styleName1]: {
      styleValue: String,
      styleValueResolved: String,
      metadata: {
        description: String,
        allowVariables: Boolean,
        validationRegex: [
          [
            { regex: Regex, message: String, example: String },
            { regex: Regex, message: String }
          ]
        ]
      }
    },
    [styleName2]: {
        ....
    }
  },
  [sectionName2]: {
      ....
  }
```
You can find the whole object used for for this app inside `initialThemeObject.js`

# ThemeEditor component explained
`ThemeEditor` takes in a theme state object and a dispatch function, it is also responsible for saving the theme data to local storage and creating the sections.  
Each section is created using `Section` component, which is responsible for organizing our theme styles into expandable sections, and creating the style editors.  
Each Style editor is created using `StylePicker` component, which is responsible for showing all info about a style and editing the wanted style using an inplace editor. input is validated at the level of this component and an action is dispatched to update the state if every thing is correct.

# Input validation
The input goes through four steps before it is deemed correct:
1. Check if input is empty, displays a simple error if it, if not it goes to next step
2. Check if variables are allowed or not, if not allowed checks if there is any variables, if any variables are present it displays a simple error, if not it goes to next step
3. Check if variables are valid, if one or more variables are not valid, it displays an error with the name of the invalid variables, if all variables are valid, it goes to next step
4. Check if the resolved value respects the regular expressions provided, if an error is found it displays an error with custom text that has to be provided the the regular expressions, and pinpoints the exact string index  where the error is found, alongside an example of what the style should look like, and the resolved style, if no error found, it goes to next step
5. dispatch an update action to the state

# Advanced version
I tried implementing the advanced version to my best, for that I used a simple `useEffect` inside `StylePicker` component:
```javascript
const [inactiveTimer, seInactiveTimer] = useState(null)
useEffect(() => {
    if (inactiveTimer) seInactiveTimer(prev => clearTimeout(prev))
    seInactiveTimer(setTimeout(() => validateInput(style), 500))
}, [style])
```
Whenever the input changes the old timeout is cleared and a new one is created, if the user stops updating the input, the timeout eventually expires and the validation function is executed.  
I changed the inactivity timer to 500ms because 300ms was a bit too short for my taste.

# Testing
I provided basic unit testing, which means that not all use cases are tested. I used only react testing library, which comes preinstalled with a `create-react-app` environment.

# More about validation
Each style object inside the initialThemeObject comes with its own array of regular expressions to validate its input. Example for a HEX color:  
```javascript
validationRegex: [
    [
        { regex: /^#/, message: "Color can start with #", example: '#123aef' },
        { regex: /^(?:[0-9a-f]{3}){1,2}$/i, message: "Color can be in HEX" }
    ]
]
```
The above array containes one array with a couple of regular expressions, applying each of the expressions separatly is gonna give us the ability to know where exactly in the string do we have a mismatch. along side the regex we also have an example of what the input should look like and a custom message to display if we have a mismatch.  
Here is another example, for text size:
```javascript
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
```
In this case we have two arrays inside the validation array, and that is because a text size can either be explicite, something like `1.1em`, or using a css `calc()`, something like `calc(1.1em*2)`.  
We can definitively improve upon this system, for example using a tree instead of an array of arrays, and we can traverse the tree searching for a match using a DFS algorithm and if no full match is found we display an error. for the time being I just loop through all the arrays searching for a match.
# To go further
We can add the following features:
- A notification system, it can notify the user when his changes are valid at the level of `StylePicker`, and it can also be used to confirm the the theme has been saved to local storage
- More sections or more styles to existing sections, this should be quite easy as we just need to provide more objects inside `initialThemeObject.js`, if you do so don't forget to clear local storage as it is gonna prevent the new sections/styles from showing
- More actions for the in place editor, like clear to delete every thing inside the input or reset to return to initial value
- Same as before, we can add a reset button next to save button that is gonna make the theme go to the initial value