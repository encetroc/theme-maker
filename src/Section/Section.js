import React, { useRef, useEffect, useState } from 'react'
import StylePicker from '../StylePicker/StylePicker'
import './Section.css';

const Section = ({ section, themeState, themeDispatch }) => {
  const sectionBodyRef = useRef()
  const [isOpen, setIsOpen] = useState(true)
  const [bodyHeight, setBodyHeight] = useState('0px')
  useEffect(() => {
    setBodyHeight(sectionBodyRef.current && sectionBodyRef.current.scrollHeight)
  }, [])
  const changeHeight = () => {
    setBodyHeight(prev => prev + 100)
  }
  return (
    <section data-testid='section' className="section-container">
      <h3 onClick={() => setIsOpen(prev => !prev)} data-testid='section-title' className="section-title">
        {section && section[0]}
      </h3>
      <section ref={sectionBodyRef} style={{ maxHeight: isOpen ? `${bodyHeight}px` : '0px' }} className='section-body section-body-open'>
        {section && Object.entries(section && section[1]).map((el) => {
          return <StylePicker
            key={el[0]}
            sectionName={section[0]}
            styleName={el[0]}
            themeState={themeState}
            themeDispatch={themeDispatch} />
        })}
      </section>
      <button onClick={changeHeight}>change height</button>
    </section>
  )
}

export default Section
