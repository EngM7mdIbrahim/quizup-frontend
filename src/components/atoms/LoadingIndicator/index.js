import React from 'react';
import './styles.css'

import Image, { TYPES } from '../Image'

export default function LoadingIndicator() {
  return (
    <div className="loading-cont">
        <Image className='loading-animation' type={TYPES.MED} imageName='logo-square.png'/>
    </div>
  )
}
