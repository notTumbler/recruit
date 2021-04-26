import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import HeaderSelect from '../../components/header-select/header-select'
import { updateUser } from '../../redux/actions'

import './staff-info.less'
import { NavBar,InputItem,TextareaItem,Button } from 'antd-mobile'

class Staff extends React.Component{
  state = {
    header:'',
    post:'',
    info:''
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name,value) => {
    this.setState({
      [name]:value
    })
  }

  save = () => {
    this.props.updateUser(this.state);
  }
  render(){
    const { header,type } = this.props.user;
    if(header){
      console.log(header);
      
      const path = type==='dashen'?'/staff':'/boss';
    return <Redirect to={path} />
    }

    return (<div>
      <NavBar  className='navbar'>Staff&nbsp;信息完善</NavBar>
      <HeaderSelect setHeader={this.setHeader}></HeaderSelect>
      <InputItem placeholder="请输入应聘职位" onChange={(val)=> this.handleChange('post',val)}>应聘职位:</InputItem>
      <TextareaItem title="个人简介:" rows={3} onChange={(val)=> this.handleChange('info',val)}></TextareaItem>
      <Button className='btn' onClick={()=>this.save()}>保存</Button>
    </div>)
  }
}

export default connect(
  state => ({user:state.user}),
  { updateUser }
)(Staff)