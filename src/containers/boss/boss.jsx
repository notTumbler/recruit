import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Boss extends React.Component{

  componentDidMount(){
    let type = 'dashen'
    //获取userList
    this.props.getUserList(type);
  }

  render(){
    const {userList} = this.props;

  return(<div className='boss'>
    <UserList userList={userList} />
  </div>)
  }
}

export default connect(
  state => ({userList:state.userList}),
  { getUserList }
)(Boss)