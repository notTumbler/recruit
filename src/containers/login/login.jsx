import React from 'react'

import './login.less'
import {
  NavBar, WingBlank, List,
  InputItem, WhiteSpace, Button
} from 'antd-mobile'

//redux
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'

import Logo from '../../components/logo/logo'


class Login extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this);
    this.tologin = this.tologin.bind(this);
    this.state = {
      username:'',
      password:'',
    }
  }

  //点击登录 获取表单里的信息
  tologin = () => {
    const {username,password} = this.state;
    console.log(username,password);
    if(username.trim() === '' || password.trim() ==='' ){
      console.log('用户名密码不能为空');
      return;
    }else{
      // console.log(this.state);
      this.props.login(this.state);
    }
    
  }
  //点击对应的输入框，将输入框里的值保存到state里
  handleChange = (name,val) => {
    this.setState({
      [name]:val
    });    
  }
  //已有账号 跳转至登录页面
  toregister = () => {
    this.props.history.push('/register')
  }
/**
 * onChange={(val)=>this.handleChange('username',val)}
 * onChange={(val) => this.handleChange('password',val)}
 */

  render() {
    const { msg,redirectTo } = this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo} />
    }

    return (<div>
      <NavBar className='navbar'>招&nbsp;&nbsp;聘</NavBar>
      <Logo className='Logo'></Logo>
    {msg ? <div>{msg}</div>:null}
      <WingBlank>
        <List>
          <InputItem
          onChange={(val)=>this.handleChange('username',val)}
          >用户名:</InputItem>
          <WhiteSpace />
          <InputItem type='password'
           onChange={(val) => this.handleChange('password',val)}
          >密&nbsp;&nbsp;&nbsp;码:</InputItem>
          <WhiteSpace />
          <Button className="btn-login"
            onClick={this.tologin}
          >登录</Button>
          <Button className="btn-toregister" onClick={()=>this.toregister()}>还没有账号,去注册</Button>
        </List>
      </WingBlank>
    
    </div>)
  }
}

export default connect(
  state => ({user:state.user}),
  {login}
)(Login)