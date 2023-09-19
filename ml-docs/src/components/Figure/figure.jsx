import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({src, caption, figId = '', shouldShowCaption = '1'}) {
  return (
    <figure style={{textAlign: "center"}}>
        <div id={`fig${figId}`}>
        <img src={useBaseUrl(src)} alt={caption}/>
        </div>
        {
          shouldShowCaption == '1' && <figcaption>{`Hình ${figId}: ${caption}`}</figcaption>
        }
    </figure>
  )
}