import React from 'react'

import {
  List, InputItem, WhiteSpace, NavBar, Icon,
  Button
} from 'antd-mobile'
import './index.less'

class UpdatePsw extends React.Component{

  updatePsw = () => {
    console.log('修改密码')
  }
  render() {
    return (<div>
      {/* //顶部 */}
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          rightContent={[
            // <Icon key="1" type="ellipsis" />,
          ]}
          onLeftClick={() => { this.props.history.push(`/personal`) }}
        >修改密码</NavBar>
      </div>
      <List>
        <InputItem
          clear
          placeholder="请输入旧密码"
          ref={el => this.inputRef = el}
        >密码：</InputItem>
      <WhiteSpace />
        <InputItem
          // {...getFieldProps('autofocus')}
          clear
          placeholder="请设置新的密码"
          ref={el => this.autoFocusInst = el}
        >新密码：</InputItem>
      <WhiteSpace />
        <InputItem
          clear
          placeholder="请重新输入新的密码"
          ref={el => this.autoFocusInst = el}
        >确认密码：</InputItem>
      </List>
      <WhiteSpace />
      <WhiteSpace />

      <Button type='warning'
        onClick={() => this.updatePsw()}
      >确认修改</Button>
    </div>)

  }
}

export default  UpdatePsw