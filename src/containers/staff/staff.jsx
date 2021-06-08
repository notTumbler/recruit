import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'
import { SearchBar } from 'antd-mobile'
import './staff.less'

class Staff extends React.Component{
  constructor(){
    super()
    this.state = {
      userList:null,
    }
  }
  componentDidMount(){
    let type = 'laoban';
    this.props.getUserList(type);
  }
  searchContent:''
  originUserList:null
  //提交
  onSubmit = () => {
    const serachValue = this.manualFocusInst.state.value
    // this.searchContent = serachValue
    console.log(`~~~~~~~~~~~~`)
    let newArr = this.props.userList.filter((item) => {
      return item.company === serachValue|| item.post === serachValue
    })
    // console.log(newArr)
    this.setState({userList:newArr})
  }
  // 取消
  onCancel = () => {
    let newArr = this.props.userList
    this.setState({userList:newArr})
  }
  render(){
    const { userList } = this.props;
    this.userList = this.state.userList || userList

  return(<div className='staff'>
     <div className='search-warp'>
     <SearchBar
        placeholder="请输入 公司/职位(20字以内)"
        ref={ref => this.manualFocusInst = ref}
        onCancel = { () => this.onCancel()}
        onSubmit = {()=>this.onSubmit()}
        maxLength={20}
        cancelText = '返回'
      />
     </div>
    <UserList userList = {this.userList} />
  </div>)
  }
}
export default connect(
  state => ({userList:state.userList}),
  { getUserList }
)(Staff)