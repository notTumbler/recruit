import React from 'react'
import './register.less'
import Logo from '../../components/logo/logo'
import Toast from '../../components/toast/toast'
import {
  NavBar, WingBlank, List,
  InputItem, WhiteSpace, Radio, Button
} from 'antd-mobile'
//rudux
import {connect} from 'react-redux'

import { register } from '../../redux/actions'

import { Redirect } from 'react-router-dom'

// import BackGround from '../../components/background/background'

const ListItem = List.Item;
class Register extends React.Component {
  state = {
    username:'',
    password:'',
    repassword:'',
    type:'dashen'   //用户类型名称
  }
  //点击注册 获取表单里的信息
  register = () => {
    const {username,password,repassword,type} = this.state;
    // console.log(this.state);
    if(username.trim()===''||password.trim()===''||repassword.trim()===''||type.trim()===''){
      return console.log('请将信息补全');
    }else if(password !== repassword){
      return console.log('两次输入的密码不一致');
    }else{
      this.props.register(this.state);
      // console.log(this.state);
    }
  }
  //点击对应的输入框，将输入框里的值保存到state里
  handleChange = (name , val) => {
    this.setState({
      [name]:val
    })    
  }
  //已有账号 跳转至登录页面
  toLogin = () => {
    this.props.history.push('/login')
  }


  render() {
    const {type} = this.state;
    const {msg, redirectTo} = this.props.user;
    if(redirectTo){
      return  <Redirect to={redirectTo} />
    }

    return (<div>
      <NavBar>注&nbsp;册&nbsp;页&nbsp;面</NavBar>
      <Logo className='Logo'></Logo>
      <WingBlank>
        <List>
          <InputItem onChange={(val)=>this.handleChange('username',val)}>用户名:</InputItem>
          <WhiteSpace />
          <InputItem type='password'
          onChange={(val) => this.handleChange('password',val)}
          >密&nbsp;&nbsp;&nbsp;码:</InputItem>
          <WhiteSpace />
          <InputItem type='password'
          onChange={(val) => this.handleChange('repassword',val)}
          >确认密码:</InputItem>
          <WhiteSpace />
          <ListItem>
            <div className='ListItem'> 
              <span>用户类型:</span>
              <div className='radio'>
                <Radio className='radio-item' checked={type==='dashen'}
                  onChange={()=>this.handleChange('type','dashen')}
                >求职者</Radio>
                <Radio className='radio-item' checked={type === 'laoban'}
                  onChange={()=>this.handleChange('type','laoban')}
                >招聘者</Radio>
              </div>
            </div>
          </ListItem>
          <WhiteSpace />
          <Button className="btn-register"
            onClick={()=>this.register()}
          >注册</Button>
          <Button className="btn-account" onClick={()=>this.toLogin()}>已有账号</Button>
        </List>
      </WingBlank>
      {msg?<Toast toastData={msg} showTime={1000} />:null}
    </div>)
  }
}
export default connect(
  state => ({user:state.user}),
  {register}
)(Register)
  
