import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import HeaderSelect from '../../components/header-select/header-select'
import { updateUser } from '../../redux/actions'

import './staff-info.less'
import { NavBar, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import hasOneIsEmpty from '../../utils/hasOneIsEmpty'
class StaffInfo extends React.Component {
  state = {
    header: '',
    post: '',
    info: '',
    city: '',
    salary:''
  }

  componentDidMount(){
    //直接进来就判断有没有各项信息是否有值
    //不然只有defaultValue不会触发onChange事件，弹出信息提示框
    let { post,info,company,salary,city,header } = this.props.user
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

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    let { post, info, company, salary, city } = this.state
    const isStop = hasOneIsEmpty(post, info, company, salary, city)
    if (!isStop) {
      Toast.fail('请将必填信息填写完整', 2)
      return
    }
    this.props.updateUser(this.state);
    const { type } = this.props.user;
    const path = type === 'dashen' ? '/staff' : '/boss';
    Toast.info('保存成功',1.5)
    setTimeout(()=> {
      this.props.history.push(`${path}`)
    },1500)
  }
  render() {
    let { post,info,salary,city,header } = this.props.user

    return (<div>
      <NavBar className='navbar'
      >个人信息</NavBar>
      <HeaderSelect headerIcon={header} setHeader={this.setHeader}></HeaderSelect>
      <InputItem placeholder="请输入应聘职位" onChange={(val) => this.handleChange('post', val)}
      defaultValue={post}>应聘职位:</InputItem>
      <InputItem placeholder="请输入期望城市" onChange={(val) => this.handleChange('city', val)}
      defaultValue={city}>意向城市:</InputItem>
      <InputItem placeholder="请输入期望薪资" onChange={(val) => this.handleChange('salary', val)}
      defaultValue={salary}>期望薪资:</InputItem>
      <TextareaItem title="个人简介:" rows={3} onChange={(val) => this.handleChange('info', val)}
      defaultValue={info}></TextareaItem>
      <Button className='btn' onClick={() => this.save()}>保存</Button>
    </div>)
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(StaffInfo)