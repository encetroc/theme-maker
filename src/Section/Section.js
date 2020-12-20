import React, { useState } from 'react'
import StylePicker from '../StylePicker/StylePicker'
import './Section.css';

const Section = ({ section, themeState, themeDispatch }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <section data-testid='section' className='section-container'>
      <h3 onClick={() => setIsOpen(prev => !prev)} className={'section-title' + (isOpen ? ' open' : '')} data-testid='section-title'>
        {section && section[0]}
      </h3>
      <section className={'section-body' + (isOpen ? ' open' : '')}>
        {section && Object.entries(section && section[1]).map((el) => {
          return <StylePicker
            key={el[0]}
            sectionName={section[0]}
            styleName={el[0]}
            themeState={themeState}
            themeDispatch={themeDispatch} />
        })}
      </section>
    </section>
  )
}

export default Section
