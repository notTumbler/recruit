import React from 'react'
import './index.less'
import MyToast from '../../components/toast/toast'
import {
  NavBar, List,InputItem,Radio,WhiteSpace,Toast
} from 'antd-mobile' 
//rudux
import { connect } from 'react-redux'

import { register } from '../../redux/actions'

import { Redirect } from 'react-router-dom'

// import BackGround from '../../components/background/background'

const ListItem = List.Item;
class Register extends React.Component {
  state = {
    username: '',
    password: '',
    type: 'dashen' ,  //用户类型名称,
    ToastMsg:''
  }
  //从注册转至登录页面时，登录页面也会显示“用户已经存在”---在willUnmount中将msg清空即可
  componentWillUnmount(){
    this.props.user.msg = ''
  }
  //点击注册 获取表单里的信息
  register = () => {
    const { username, password, repassword, type } = this.state;
    // console.log(this.state);
    if (username.trim() === '' || password.trim() === '' || repassword.trim() === '' || type.trim() === '') {
      Toast.info('请将信息补全')
      return
    } else if (password !== repassword) {
      Toast.info('两次输入的密码不一致')
      return
    } else {
      this.props.register(this.state);
      // console.log(this.state);
    }
  }
  //点击对应的输入框，将输入框里的值保存到state里
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  //已有账号 跳转至登录页面
  toLogin = () => {
    localStorage.setItem('firstEntry',false)
    this.props.history.push('/login')
  }
  render() {
  
    const { type } = this.state;
    const { msg,redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (<div className='register-wrap'>
      <NavBar>注&nbsp;册&nbsp;页&nbsp;面</NavBar>
        <div className='register-dialog'>
          <div className='register-dialog-header'>
            Enroll
            </div>
          <div className='username'>
            <InputItem className='resetInput' onChange={(val) => this.handleChange('username', val)} placeholder='用户名'></InputItem>
          </div>
          <div className='passward'>
            <InputItem className='resetInput' type='password'
              onChange={(val) => this.handleChange('password', val)}
              placeholder='密码'
            ></InputItem>
          </div>
          <div className='sure-password'>
            <InputItem type='password' className='resetInput'
              onChange={(val) => this.handleChange('repassword', val)}
              placeholder='确认密码'
            ></InputItem>
          </div>
          <div className='username'>
            <WhiteSpace />
            <ListItem className='chen'>
              <div className='ListItem'>
                <span>角色:</span>
                <div className='radio'>
                  <Radio className='radio-item' checked={type === 'dashen'}
                    onChange={() => this.handleChange('type', 'dashen')}
                  >求职者</Radio>
                  <Radio className='radio-item' checked={type === 'laoban'}
                    onChange={() => this.handleChange('type', 'laoban')}
                  >招聘者</Radio>
                </div>
              </div>
            </ListItem>
          </div>
         <button className="btn-register effect"
           onClick={() => this.register()}
         >注册</button>
         <button className="btn-account effect" onClick={() => this.toLogin()}>已有账号,去登录</button>
        </div>
      {msg ? <MyToast toastData={msg} showTime={1000} /> : null}
    </div>)
  }
}
export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)

