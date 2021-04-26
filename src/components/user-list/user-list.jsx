import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import {
  WingBlank, WhiteSpace, Card
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

    const { userList } = this.props;

    return (<div className='userList'>
      <QueueAnim type='scale' delay={100} 
       duration={700}
       >
      
      {
        userList.map(listItem => (
          <div key={listItem._id}>
            <WingBlank>
              <Card 
                style={{width:'100%'}}
              onClick={()=>this.props.history.push(`/chat/${listItem._id}`)}>
                <Header thumb={require(`../../assets/img/${listItem.header}.png`) || null}
                  extra={listItem.username}></Header>
                <WhiteSpace />
                <Body>
                  {/* {listItem._id} */}
                  <div>职位:{listItem.post}</div>
                  <WhiteSpace />
                  {listItem.company?<div>公司:{listItem.company}</div>:null}
                  <WhiteSpace />
                  {listItem.salary?<div>月薪:{listItem.salary}</div>:null}
                  <WhiteSpace />
                  <div>描述:{listItem.info}</div>
                  <WhiteSpace />
                </Body>
              </Card>
            </WingBlank>
          </div>
        ))
      }
      </QueueAnim>
     
    </div>)
  }
}

export default withRouter(UserList)