import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'
import { SearchBar } from 'antd-mobile'
import './boss.less'

class Boss extends React.Component{
  constructor(){
    super()
      this.state = {
        userList:null
      }
  }
  componentDidMount(){
    let type = 'dashen'
    //获取userList
    this.props.getUserList(type);
  }
  searchContent:''
  //提交
  onSubmit = () => {
    const serachValue = this.manualFocusInst.state.value
    this.searchContent = serachValue
    // console.log(this.props.userList)
    let newArr = this.props.userList.filter((item) => {
      return item.post.toLowerCase().search(`${this.searchContent}`)!== -1
    })
    console.log(newArr)
    this.setState({userList:newArr})
  }
  // 取消
  onCancel = () => {
    let newArr = this.props.userList
    this.setState({userList:newArr})
  }
  render(){
    const {userList} = this.props;
    this.userList = this.state.userList || userList
  return(<div className='boss'>
    <div className='search-warp'>
     <SearchBar
        placeholder="请输入需求岗位"
        ref={ref => this.manualFocusInst = ref}
        onCancel = { () => this.onCancel()}
        onSubmit = {()=>this.onSubmit()}
        maxLength={20}
        cancelText = '返回'
      />
     </div>
    <UserList userList={this.userList} />
  </div>)
  }
}

export default connect(
  state => ({userList:state.userList}),
  { getUserList }
)(Boss)