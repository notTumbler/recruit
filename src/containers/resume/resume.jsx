import React from 'react'
import { connect } from 'react-redux'
import {
  List, InputItem, WhiteSpace, NavBar, Icon,
  TextareaItem,Toast
} from 'antd-mobile'
import './resume.less'

import { asyncPastResume,asyncGetResume } from '../../redux/actions'

class Resume extends React.Component {
    state = {
      name:'',
      workWill:'',
      jiaoYu:'',
      shiXi:'',
      skills:''
    }
    async componentDidMount(){
      let userId = this.props.user._id
      // console.log('sdfa'+userId)
      this.setState({userId})
      await this.props.asyncGetResume(userId)
      const {name,workWill,jiaoYu ,skills,shiXi} = this.props.resume
      if(name!=='' || workWill!=='' || jiaoYu!=='' || skills!=='' || shiXi!==''){
        this.setState({
          name,workWill,jiaoYu,skills,shiXi
        })
      }
    }
    save = () => {
      console.log(this.state)
      const {name,userId,workWill,jiaoYu ,skills} = this.state
      if(name==='' || userId==='' || workWill==='' || jiaoYu==='' || skills===''){
        Toast.info('请完善除实习经历外的其它信息',2)
        return
      }else{
        this.props.asyncPastResume(this.state)
        Toast.success('保存成功',2)
      }
    }
    preView = () => {
      console.log('preView')
    }
  render() {
    let { name,workWill,shiXi,jiaoYu,skills} = this.state
    return (<div>
      {/* //顶部 */}
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          rightContent={[
            // <Icon key="1" type="ellipsis" />,
          ]}
          onLeftClick={() => { this.props.history.push(`/personal`) }}
        >个人简历</NavBar>
      </div>
      <List>
        <InputItem
          // {...getFieldProps('focus')}
          clear
          placeholder=""
          value = {name}
          ref={el => this.inputRef = el}
          onChange = {val => (this.setState({name:val}))}
        >姓名：</InputItem>
        <InputItem
          // {...getFieldProps('autofocus')}
          clear
          autoComplete = 'on'
          value = {workWill}
          ref={el => this.autoFocusInst = el}
          onChange = {val => (this.setState({workWill:val}))}
        >求职意向：</InputItem>
        <InputItem
          // {...getFieldProps('focus')}
          clear
          placeholder=""
          value = {jiaoYu}
          ref={el => this.inputRef = el}
          onChange={val => (this.setState({jiaoYu:val}))}
        >教育经历:</InputItem>
        <List renderHeader={() => '实习经历：'}>
          <TextareaItem
            rows={5}
            count={200}
            value = {shiXi}
            onChange={val => (this.setState({shiXi:val}))}
          />
        </List>
        <List renderHeader={() => '专业技能：'}>
          <TextareaItem
            value = {skills}
            rows={5}
            count={200}
            onChange={val => this.setState({skills:val})}
          />
        </List>

      </List>
      <WhiteSpace />


      <WhiteSpace />

      <div className="twoBtn">
      <button className='firstBtn'
        onClick={() => this.save()}
      >保存</button>
      {/* <button className='secondBtn'
        onClick={()=>this.preView()}
      >预览</button> */}
      </div>
    </div>)

  }
}

export default connect(
  state => ({user:state.user,resume:state.resume}),
  {asyncPastResume,asyncGetResume}
)(Resume)