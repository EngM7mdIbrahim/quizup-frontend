import React from 'react';
import './styles.css'

import Image, { TYPES } from '../Image'

export default function LoadingIndicator({ iconName="logo-square.png",style ={}, className=""}) {
  return (
    <div style={{...style}} className={`loading-cont ${className}`}>
        <Image style={style!=={} ? {...style} : {}} className='loading-animation' type={style!=={} ? TYPES.MED: TYPES.UNDEFINED} imageName={iconName}/>
    </div>
  )
}
