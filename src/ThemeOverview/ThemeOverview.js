import React from 'react'
import './ThemeOverview.css'

const ThemeOverview = ({ themeState }) => {
    const sectionPrimary = {
        background: themeState.colors.primaryBackground.styleValueResolved,
        color: themeState.colors.primary.styleValueResolved
    }
    const sectionSecondary = {
        background: themeState.colors.secondaryBackground.styleValueResolved,
        color: themeState.colors.secondary.styleValueResolved
    }
    const primaryHighlight = {
        color: themeState.colors.highlight1.styleValueResolved
    }
    const secondaryHighlight = {
        color: themeState.colors.highlight2.styleValueResolved
    }
    const textFiled = {
        fontSize: themeState.textfield.textSize.styleValueResolved,
        color: themeState.textfield.color.styleValueResolved,
        border: themeState.textfield.border.styleValueResolved,
        background: themeState.textfield.background.styleValueResolved,
    }
    const button = {
        fontSize: themeState.buttons.fontSize.styleValueResolved,
        color: themeState.buttons.color.styleValueResolved,
        background: themeState.buttons.background.styleValueResolved
    }
    return (
        <div className='overview-container'>
            <section style={sectionPrimary} className='overview-primary'>
                <p>Simple text</p>
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <p style={primaryHighlight}>Simple text, highlighted</p>
                <h1 style={primaryHighlight}>Header 1, highlighted</h1>
                <h2 style={primaryHighlight}>Header 2, highlighted</h2>
                <textarea style={textFiled} type="text" placeholder='Text Field' />
                <button className='overview-btn' style={button}>Button</button>
            </section>
            <section style={sectionSecondary} className='overview-secondary'>
                <p>Simple text</p>
                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <p style={secondaryHighlight}>Simple text, highlighted</p>
                <h1 style={secondaryHighlight}>Header 1, highlighted</h1>
                <h2 style={secondaryHighlight}>Header 2, highlighted</h2>
                <textarea style={textFiled} type="text" placeholder='Text Field' />
                <button className='overview-btn' style={button}>Button</button>
            </section>
        </div>
    )
}

export default ThemeOverview
