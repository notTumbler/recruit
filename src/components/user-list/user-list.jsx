import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import {
  WhiteSpace, Card
} from 'antd-mobile'
import './user-list.less'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header;
const Body = Card.Body;

class UserList extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    let { userList } = this.props;
    // console.log(userList)
    //用length来判断是否渲染
    // console.log(userList.length)
    return ( userList.length ? 
      <div className='userList'>
      <QueueAnim type='scale' delay={100} 
       duration={500}
       >
      {
        userList.map(listItem => (
          <div key={listItem._id}>
              <Card 
                style={{width:'100%'}}
              onClick={()=>this.props.history.push(`/chat/${listItem._id}`)}>
                <Header thumb={require(`../../assets/img/${listItem.header || undefined}.png`)}
                  extra={listItem.username}></Header>
                <WhiteSpace />
                <Body>
                  {listItem.type === 'dashen'?<div className='distance'>技术栈：{listItem.post}</div>:<div className='distance'>职位：{listItem.post}</div>}

                  {listItem.company?<div className='distance'>公司：{listItem.company}</div>:null}
                  {listItem.type==='dashen'?<div className='distance'>期望薪资：{listItem.salary||<b>该用户未填写</b>}</div>:<div className='distance'>月薪：{listItem.salary||<b>该用户未填写</b>}</div>}
                  <div className='miaoshu'>要求 ：
                    <textarea
                      defaultValue={listItem.info || '该用户还未填写'}
                      cols={32}
                    >
                    </textarea>
                  </div>
                </Body>
              </Card>
          </div>
        ))
      }
      </QueueAnim>
    </div>
    : <div className='user-list-404'>
      {/* eslint-disable-next-line */}
      <marquee scrollamount='12'>未找到相关内容,请重新输入关键字……</marquee>
       <img src={require('./zanwu.webp')} alt='图片也失联了'></img>
    </div>)
  }
}
export default withRouter(UserList)