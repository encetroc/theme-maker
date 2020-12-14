import React from 'react'
import StylePicker from '../StylePicker/StylePicker'
import './Section.css';

const Section = ({ section, themeState, themeDispatch }) => {
  return (
    <section className="section-container">
      <h3 className="section-title">
        {section[0]}
      </h3>
      {Object.entries(section[1]).map((el) => {
        return <StylePicker
          key={el[0]}
          description={el[1].description}
          styleValue={el[1].value}
          sectionName={section[0]}
          styleName={el[0]}
          themeState={themeState}
          themeDispatch={themeDispatch} />
      })}
    </section>
  )
}

export default Section
