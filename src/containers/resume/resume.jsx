import React from 'react'
import {
  List, InputItem, WhiteSpace, NavBar, Icon,
  TextareaItem
} from 'antd-mobile'
import './resume.less'

class Resume extends React.Component {
  
    resumeValue = {
      name:'',
      workWill:'',
      jiaoYu:'',
      shiXi:'',
      Skills:''
    }
    save = () => {
      console.log('sava')
    }
    preView = () => {
      console.log('preView')
    }
  render() {
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
          ref={el => this.inputRef = el}
        >姓名：</InputItem>
        <InputItem
          // {...getFieldProps('autofocus')}
          clear
          placeholder=""
          ref={el => this.autoFocusInst = el}
        >求职意向：</InputItem>
        <InputItem
          // {...getFieldProps('focus')}
          clear
          placeholder=""
          ref={el => this.inputRef = el}
        >教育经历:</InputItem>
        <List renderHeader={() => '实习经历：'}>
          <TextareaItem
            rows={5}
            count={200}
          />
        </List>
        <List renderHeader={() => '专业技能：'}>
          <TextareaItem
            rows={5}
            count={200}
          />
        </List>

      </List>
      <WhiteSpace />


      <WhiteSpace />

      <div className="twoBtn">
      <button className='firstBtn'
        onClick={() => this.save()}
      >保存</button>
      <button className='secondBtn'
        onClick={()=>this.preView()}
      >预览</button>
      </div>
    </div>)

  }
}

export default Resume