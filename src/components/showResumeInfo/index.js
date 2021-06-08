import React from 'react'

import './index.less'
import { Card, Icon } from 'antd-mobile'
import ResumeImg from '../../assets/img/resume.png'

class ShowResumeInfo extends React.Component {
  render() {
    console.log(this.props)
    const { name, resumeInfo } = this.props
    console.log(resumeInfo)
    return (<div className='resume-wrap'>
      <Card>
        <Card.Header
          title={`${name}  的简历`}
          thumb={ResumeImg}
          extra={<Icon onClick={() => {
            console.log('~~~~')
            this.props.chen(false)
          }
          } type='cross'></Icon>}
        />
        <div className='card-body'>
          <Card.Body>
            
            <div className='name  resume-public'>
              <b>姓名：</b>
              {resumeInfo.name}</div>
            <div className='work-will  resume-public'>
              <b>求职意向：</b>
              {resumeInfo.workWill}</div>
            <div className='jiao-yu  resume-public'>
              <b>教育经历：</b>
              {resumeInfo.jiaoYu}</div>
            <div className='shi-xi  resume-public'>
              <div><b>实习经历:</b></div>
              <textarea
                rows={5}
                // cols = {20}
                readOnly={true}
                value= {resumeInfo.shiXi}
              >
               
              </textarea>
              </div>
            <div className='skills  resume-public'>
              <div><b>专业技能：</b></div>
              <textarea
                rows = {8}
                // cols = {20}
                readOnly = {true}
                value={resumeInfo.skills}
              >
                
              </textarea>
            </div>
          </Card.Body>
        </div>
        {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
      </Card>
    </div>)
  }
}

export default ShowResumeInfo