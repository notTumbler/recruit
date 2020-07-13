import React from 'react'
import logo from '../logo.svg'

import { Button } from 'antd'

class App extends React.Component{

  
  render(){
  return(<div>
    <Button type='ghost'>texttwo</Button>
   <img className="logo" src={logo} alt="logo" />
   <p className="chen">多帅哦</p>
  </div>)
  }
}

export default App;

