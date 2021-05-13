import React from 'react'

import './index.less'
import {
  NavBar, WingBlank,
  InputItem, Toast
} from 'antd-mobile' 

//redux
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'

// import Logo from '../../components/logo/logo'
import MyToast from '../../components/toast/toast'
// import BackGround from '../../components/background/background'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.tologin = this.tologin.bind(this);
    this.state = {
      username: '',
      password: '',
      validationCode:'',
      everyValidaCode:'',
      NoshowAnimation: false
    }
  }
  timer: null
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        NoshowAnimation: true
      })
    }, 4000)
    let chen = Math.random().toString(36).substring(2,6)
    this.setState({everyValidaCode:chen})
  }
  //点击登录 获取表单里的信息
  tologin = () => {
    console.log(this.state)
    const { username, password,validationCode } = this.state;
    if (username.trim() === '' || password.trim() === '') {
      Toast.info('用户名或密码不能为空');
      return
    }
    if(validationCode === '') {
      Toast.info('验证码为空')
      return
    }else if(validationCode !== this.state.everyValidaCode){
      Toast.fail('验证码错误',1)
      return
    }
    this.props.login(this.state);
    
  }
  //点击对应的输入框，将输入框里的值保存到state里
  handleChange = (name, val) => {
    this.setState({
      [name]: val
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
  //修改验证码
  ImgArr = ['one','two','three','four','five','six','seven','eight','nine']

  resetVerificationCode = () => {
    const theCode = Math.random().toString(36).substring(2,6)
    this.setState({
      everyValidaCode:theCode
    })
    const ele = document.getElementById('verificationCode')
    let randomIndex = ~~(Math.random()*10)
    let imgURL = require(`./verificationImg/${this.ImgArr[randomIndex]}.png`)
    ele.style.background = `url(${imgURL})`
    ele.style.backgroundRepeat = 'no-repeat'
    ele.innerHTML = theCode
  }

  render() {
    const { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        {
          (this.state.NoshowAnimation) ?
            <div className='login-wrap'>
              <NavBar id='navbar'>Login</NavBar>
              <WingBlank>
                <div className='login-dialog'>
                  <div className='login-dialog-header'>
                    Login
                  </div>
                  <div className='username'>
                    <InputItem className='resetInput'
                      placeholder='姓名'
                      onChange={(val) => this.handleChange('username', val)}
                    ></InputItem>
                  </div>
                  <div className='passward'>
                    <InputItem type='password'
                      className='resetInput'
                      placeholder='密码'
                      onChange={(val) => this.handleChange('password', val)}
                    ></InputItem>
                  </div>
                  <div className='verification-code'>
                    <InputItem
                      className='code-input'
                      placeholder='请输入验证码'
                      onChange={(val) => this.handleChange('validationCode', val)}
                    ></InputItem>
                    <div className='code-wrap'
                      id='verificationCode'
                      onClick={()=>this.resetVerificationCode()}
                    >{this.state.everyValidaCode}
                    </div>
                  </div>
                    <button className="btn-login effect"
                      onClick={this.tologin}
                    >登录</button>
                    <button className="btn-toregister effect" onClick={() => this.toregister()}>还没有账号,去注册</button>
                </div>
              </WingBlank>
              {msg ? <MyToast toastData={msg} showTime={1200} /> : null}
            </div>
            : (<div id='zairu'>
              <div className="circleProgress-wrapper"
                onClick={() => {
                  console.log('click')
                  this.setState({
                    NoshowAnimation: true
                  })
                  this.timer && clearTimeout(this.timer)
                }}
              >
                <div className="wrapper right">
                  <div className="circle circle-right"></div>
                </div>
                <div className="wrapper left">
                  <div className="circle circle-left"></div>
                </div>
                <span className="text-area">跳过</span>
              </div>

              <div className="font">
                <span>Mini直聘</span>
              </div>
              <div className="container">
                <div className="loader">
                  <div className="ball"></div>
                </div>
              </div>
              <div className="loading">
                <span>Loading……</span>
              </div>
            </div>)
        }


      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)