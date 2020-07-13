import  React from 'react'
import './logo.less'

import logo from './006.jpg'

export default function Logo(){
  return (<div className="logo-container">
    <img src={logo} alt="logo" className='logo-img'/>
  </div>)
}