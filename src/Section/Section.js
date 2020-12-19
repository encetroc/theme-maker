import React from 'react'
import StylePicker from '../StylePicker/StylePicker'
import './Section.css';

const Section = ({ section, themeState, themeDispatch }) => {
  return (
    <section data-testid='section' className="section-container">
      <h3 data-testid='section-title' className="section-title">
        {section && section[0]}
      </h3>
      {section && Object.entries(section && section[1]).map((el) => {
        return <StylePicker
          key={el[0]}
          sectionName={section[0]}
          styleName={el[0]}
          themeState={themeState}
          themeDispatch={themeDispatch} />
      })}
    </section>
  )
}

export default Section
