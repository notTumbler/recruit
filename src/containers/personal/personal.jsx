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

  render() {
    const { username, type, header,
      company, post, salary, info
    } = this.props.user;

    return (<>
    <div className="personal">
      <Result img={<img src={require(`../../assets/img/${header}.png`)} style={{ width: 50}} alt="header" />}
        title={username}
        message={company}
      />

      <List renderHeader={() => '相关要求'}>
        <Item multipleLine>
          <Brief>意向职位:&nbsp;&nbsp;&nbsp;{post}</Brief>
          {type==='laoban'?<Brief>职位要求:{info}</Brief>:<Brief>个人简介:&nbsp;&nbsp;&nbsp;{info}</Brief>}
          {salary?<Brief>薪资:{salary}</Brief>:null}
        </Item>
      </List>
      <WhiteSpace />
      <List>
        <Item multipleLine >
          <div className="item" onClick={
            () => this.props.history.push(`/resume`)
          }>
            我的简历
            <Icon type='right'size='md'/>
          </div>
        </Item>
        <Item multipleLine >
          <div className="item" onClick={
            () => this.props.history.push(`/updatePsw`)
          }>
            修改密码
            <Icon type='right'size='md'/>
          </div>
        </Item>
      </List>
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