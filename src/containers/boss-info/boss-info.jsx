import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import HeaderSelect from '../../components/header-select/header-select'
import { updateUser } from '../../redux/actions'

import './boss-info.less'
import { NavBar,InputItem,TextareaItem,Button } from 'antd-mobile'


class Boss extends React.Component{
  state = {
    header:'',post:'', info:'',
    company:'',salary:''
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
  //保存表单信息
  save = () => {
    this.props.updateUser(this.state);
  }

  render(){
    const { header,type } = this.props.user;
    if(header){
      const path = type==='dashen'?'/staff':'/boss';
      return <Redirect to={path} />
    }

    return (<div>
      <div className='navbar'>
      <NavBar>Boss&nbsp;信息完善</NavBar>
      </div>
      <HeaderSelect setHeader={this.setHeader}></HeaderSelect>
      <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange('post',val)}>招聘职位:</InputItem>
      <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company',val)}>公司名称:</InputItem>
      <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary',val)}>职位薪资:</InputItem>
      <TextareaItem title="职位要求:" rows={3} onChange={val => this.handleChange('info',val)}></TextareaItem>
      <Button className='btn'
        onClick={()=>this.save()}
      >保存</Button>
    </div>)
  }
}

export default connect(
  state => ({user:state.user}),
  {updateUser}
)(Boss)