import React from 'react'
import katex from 'katex'

export default function Equation({equation, eqId = ''}) {
    let equationDisplay = "\\tag{".concat(`${eqId}`,"}",`${equation}`)
    return (
        <div 
        dangerouslySetInnerHTML={{__html: katex.renderToString(equationDisplay, {
            displayMode: true
        })}} 
        style={{textAlign: "center"}}
        id={`eq${eqId}`}
        >
        </div>
    )
    

  }