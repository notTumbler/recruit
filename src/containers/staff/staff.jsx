import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Staff extends React.Component{

  componentDidMount(){
    let type = 'laoban';
    this.props.getUserList(type);
  }

  render(){

    const { userList } = this.props;

  return(<div>
    <UserList userList = {userList} />
  </div>)
  }
}

export default connect(
  state => ({userList:state.userList}),
  { getUserList }
)(Staff)