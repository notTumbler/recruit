import React from 'react'

import './login.less'
import {
  NavBar, WingBlank, List,
  InputItem, WhiteSpace, Button,Toast
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
      NoshowAnimation: false,
    }
  }
  timer:null
  componentDidMount() {
     this.timer = setTimeout(() => {
      this.setState({
        NoshowAnimation: true
      })
    }, 4000)
  }
  //点击登录 获取表单里的信息
  tologin = () => {
    const { username, password } = this.state;
    // console.log(username, password);
    if (username.trim() === '' || password.trim() === '') {
      Toast.info('用户名或密码不能为空');
      return;
    } else {
      // console.log(this.state);
      this.props.login(this.state);
    }
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

  render() {
    const { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        {
          (this.state.NoshowAnimation) ?
            <div>
              <NavBar id='navbar'>Login</NavBar>
              {/* <Logo className='Logo'></Logo> */}
              <WingBlank>
                <List>
                  <InputItem
                    onChange={(val) => this.handleChange('username', val)}
                  >用户名:</InputItem>
                  <WhiteSpace />
                  <InputItem type='password'
                    onChange={(val) => this.handleChange('password', val)}
                  >密&nbsp;&nbsp;&nbsp;码:</InputItem>
                  <WhiteSpace />
                  <Button className="btn-login"
                    onClick={this.tologin}
                  >登录</Button>
                  <Button className="btn-toregister" onClick={() => this.toregister()}>还没有账号,去注册</Button>
                </List>
              </WingBlank>
              {msg ? <MyToast toastData={msg} showTime={1200} /> : null}
            </div>
            : (<div id='zairu'>
                <div className="circleProgress-wrapper"
                  onClick={()=>{
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