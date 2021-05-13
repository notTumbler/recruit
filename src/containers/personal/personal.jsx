import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { Result, List, WhiteSpace, Button,Modal,Icon } from 'antd-mobile'
import './personal.less'

import { resetUser } from '../../redux/actions'

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends React.Component {
  logout = () => {
    // alert("-----")
    Modal.alert('退出','确认退出登录吗？',[
      {text:'取消'},
      {
        text:'确定',
        onPress: () => {
          //清除掉当前用户的cookie
          Cookies.remove('userId');
          //清除掉rudex里的user信息
          this.props.resetUser();
        }
      }
    ])

  }
  //修改信息
  resetInfo = () => {
    console.log(this.props)
    const { type } = this.props.user
    let path = type === 'laoban' ? 'bossinfo' : 'staffinfo'
    this.props.history.push(`/${path}`)
  }
  render() {
    let { username, type, header,
      company, post, salary, info,city
    } = this.props.user;
    // console.log(this.props.user)
    if(!header) header = undefined

    return (<>
    <div className="personal">
      <Result img={<img src={require(`../../assets/img/${header}.png`)} style={{ width: 50}} alt="header" />}
        title={username}
        message={company}
      />

      <List renderHeader={() => '相关信息'}>
        <Item multipleLine>
          <Brief>意向岗位:&nbsp;&nbsp;&nbsp;{post}</Brief>
          {type === 'laoban'?<Brief>职位薪资:&nbsp;&nbsp;&nbsp;{salary}</Brief>:<Brief>期望薪资:&nbsp;&nbsp;&nbsp;{salary}</Brief>}
          {type==='laoban'?<Brief>所在城市:&nbsp;&nbsp;&nbsp;{city}</Brief>:<Brief>意向城市:&nbsp;&nbsp;&nbsp;{city}</Brief>}
          {type==='laoban'?<Brief>职位要求:&nbsp;&nbsp;&nbsp;{info}</Brief>:<Brief>个人简介:&nbsp;&nbsp;&nbsp;{info}</Brief>}
        </Item>
      </List>
      <WhiteSpace />
      <List>
         {type==='dashen' ? 
          <Item multipleLine >
           <div className="item" onClick={
            () => this.props.history.push(`/resume`)
          }>
            我的简历
            <Icon type='right'size='md'/>
          </div> 
          </Item>: null
         
        }
        <Item multipleLine >
          <div className="item" onClick={
            () => this.props.history.push(`/updatePsw`)
          }>
            修改密码
            <Icon type='right'size='md'/>
          </div>
        </Item>
      </List>
      <Item multipleLine >
          <div className="item" onClick={
            () => this.resetInfo()
          }>
            修改信息
            <Icon type='right'size='md'/>
          </div>
        </Item>
      <WhiteSpace />
      <List>
        <Button type="primary"
          onClick={()=>this.logout()}
        >退出登录</Button>
      </List>
    </div>
    </>)

  }
}

export default connect(
  state => ({ user: state.user }),
  {resetUser}
)(Personal)