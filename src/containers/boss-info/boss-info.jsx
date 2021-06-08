import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import HeaderSelect from '../../components/header-select/header-select'
import { updateUser } from '../../redux/actions'

import './boss-info.less'
import { NavBar,InputItem,TextareaItem,Button,Toast } from 'antd-mobile'
import hasOneIsEmpty from '../../utils/hasOneIsEmpty'


class BossInfo extends React.Component{
  state = {
    header:'',post:'', info:'',
    company:'',salary:'',city:''
  }

  componentDidMount(){
    //直接进来就判断有没有各项信息是否有值
    //不然只有defaultValue不会触发onChange事件，弹出信息提示框
    let { post,info,company,salary,city,header } = this.props.user
    // console.log('~~~~~~~~~~~')
    // console.log(this.props.user)
    // const haveOriginValue = hasOneIsEmpty(post,info,company,salary,city)
    // if(haveOriginValue){
    this.setState({
      post,info,company,salary,city,header
    })
    // }
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
    let { post,info,company,salary,city } = this.state
    const isStop = hasOneIsEmpty(post,info,company,salary,city)
    if(!isStop) {
      Toast.fail('请将必填信息填写完整',2)
      return
    }
    this.props.updateUser(this.state);
    const { type } = this.props.user;
    const path = type==='dashen'?'/staff':'/boss';
    Toast.info('保存成功',1.5)
    setTimeout(()=>{
      this.props.history.push(`${path}`)
    },1500)
  }
  render(){
    let { post,info,company,salary,city,header } = this.props.user
    return (<div>
      <div className='navbar'>
      <NavBar
      >个人信息</NavBar>
      </div>
      <HeaderSelect headerIcon={header} setHeader={this.setHeader}></HeaderSelect>
      <InputItem placeholder="请输入招聘职位" 
      onChange={val => this.handleChange('post',val)}
      defaultValue = {post}
      >招聘职位:</InputItem>
      <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company',val)}
      defaultValue = {company}
      >公司名称:</InputItem>
      <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary',val)}
      defaultValue = {salary}
      >职位薪资:</InputItem>
      <InputItem placeholder="请输入公司所在地" onChange={val => this.handleChange('city',val)}
      defaultValue = {city}
      >所在城市:</InputItem>
      <TextareaItem title="职位要求:" rows={3} onChange={val => this.handleChange('info',val)}
      defaultValue = {info}
      ></TextareaItem>
      <Button className='btn'
        onClick={()=>this.save()}
      >保存</Button>
    </div>)
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(BossInfo)