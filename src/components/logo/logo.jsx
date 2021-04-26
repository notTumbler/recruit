import  React from 'react'
import './logo.less'

import logo from './OIP.jpeg'

export default function Logo(){
  return (<div className="logo-container">
    <img src={logo} alt="logo" className='logo-img'/>
  </div>)
}