import React from 'react'
import { connect } from 'react-redux'

import {
  List, InputItem, WhiteSpace, NavBar, Icon,
  Button,Toast
} from 'antd-mobile'
import './index.less'

// import debounce from '../../utils/debounce'
import md5 from 'blueimp-md5'
import { updatePassword } from '../../redux/actions'

class UpdatePsw extends React.Component{

  oldPsw:''
  newPsw:''
  confirmNewPsw:''

  updatePsw = (originPsw) => {
    console.log('originPsw'+originPsw)
    if(this.oldPsw==null || this.newPsw==null || this.confirmNewPsw==null){
      Toast.info('请将未填项补充完整',2)
      return
    }
    if(md5(this.oldPsw) !== originPsw) {
      Toast.info('原密码错误', 2);
      return
    }
    if(md5(this.newPsw) === originPsw){
      Toast.info('新密码不能与旧密码相同',2)
      return
    }
    if(this.newPsw !== this.confirmNewPsw){
      Toast.info('两次输入的新密码不一致',2)
      return
    }
    console.log('修改的新密码'+this.newPsw)
    this.props.updatePassword(this.newPsw)
    Toast.loading('修改成功，请重新登录',2,
      () => this.props.history.push('/login')
    )
  }

  render() {
    const { password } = this.props.user;
    console.log('~~~~'+password)

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
          onChange = {(val)=>{
            this.oldPsw = val
          }}
        >原密码：</InputItem>
      <WhiteSpace />
        <InputItem
          // {...getFieldProps('autofocus')}
          clear
          placeholder="请设置新的密码"
          ref={el => this.autoFocusInst = el}
          onChange = {(val)=>{
            this.newPsw = val
          }}
        >新密码：</InputItem>
      <WhiteSpace />
        <InputItem
          clear
          placeholder="请重新输入新的密码"
          ref={el => this.autoFocusInst = el}
          onChange = {(val)=>{
            this.confirmNewPsw = val
          }}
        >确认密码：</InputItem>
      </List>
      <WhiteSpace />
      <WhiteSpace />
      <Button type='warning'
        onClick={() => this.updatePsw(password)}
      >确认修改</Button>
    </div>)
  }
}
export default  connect(
  state => ({user:state.user}),
  { updatePassword }
)(UpdatePsw)