import React from 'react'
import StylePicker from '../StylePicker/StylePicker'

const Section = ({ section, dispatch }) => {
    return (
        <>
            <div>
                {section[0]}
            </div>
            {Object.entries(section[1]).map((value) => {
                return <StylePicker label={value[1].description} type={section[0]} name={value[0]} dispatch={dispatch} />
            })}
        </>
    )
}

export default Section
