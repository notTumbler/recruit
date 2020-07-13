import React from 'react'
import { Button } from 'antd-mobile'

class Nofound extends React.Component {

  //  constructor(props){
  //    super(props)
  //  }
  render() {
    return (<div>
      <div>
        <h2>---页面失联了O_o---</h2>
        <Button type="primary"
          onClick={() => this.props.history.replace('/')}
        >回到首页</Button>
      </div>
    </div>)
  }
}

export default Nofound;