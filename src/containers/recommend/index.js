import React from 'react';
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import './index.less'
import {  Carousel } from 'antd-mobile'

class  Recommend extends React.Component{

  constructor(){
    super()
    this.state = {
      shufflingData: [
        {
          keyVal:1,
          href:'https://zhuanti.lagou.com/zlxxxcy.html',
          pictrue:require('../../assets/shufflingImg/one.PNG')
        },
        {
          keyVal:2,
          href:'https://zhuanti.lagou.com/2021czhd.html',
          pictrue:require('../../assets/shufflingImg/two.JPG')
        },
        {
          keyVal:3,
          href:'https://zhuanti.lagou.com/ouke0406.html',
          pictrue:require('../../assets/shufflingImg/three.JPG')
        },{
          keyVal:4,
          href:'http://edu.51testing.net/htm/41LPC/zlzs.html',
          pictrue:require('../../assets/shufflingImg/four.jpg')
        }
      ],
      imgHeight: 200,
    }
  }
  componentDidMount(){
    console.log(this.props.user.type)
    let newType = this.props.user.type
    let resetType = newType ==='dashen'?'laoban':'dashen'
    //获取userList
    this.props.getUserList(resetType);
  }
  render(){
    const { post } = this.props.user
    const { userList } = this.props
    // userList.map(item=>console.log(item.post))
    let postArr = post.trim().split(/\s+/)
    console.log(postArr)
    this.userList = userList.filter(item => {
      let chen = item.post.toLowerCase().split(/\s+/)
      let  newArr = chen.concat(postArr)
      let newSet = [...new Set(newArr)]
      return newArr.length > newSet.length
    })
    // console.log('-------------------------')
    // console.log(this.userList)
    return(<div className='recommend'>
      <div className='recommend-shuffling'>
      <Carousel
          autoplay={true}
          infinite
          dotStyle={{}}
          dotActiveStyle={{background:'#fff',width:'12px',borderRadius:'8px'}}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.state.shufflingData.map(item => (
            <a
              key={item.keyVal}
              href={item.href}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`${item.pictrue}`}
                alt=""
                style={{ width: '100%',height:'100%', verticalAlign: 'top'}}
              />
            </a>
          ))}
        </Carousel>
      </div>
      <div className="recommend-head">
        <b><i>相关推荐：</i></b>
        {postArr.map(item => (<div key={item+'!'} className='head-item'>{item}</div>))}
      </div>
      <div className='user-list-wrap'>
        <UserList userList={this.userList}/>
      </div>
    </div>)
  }
}
export default  connect(
  state => ({user:state.user,resume:state.resume,userList:state.userList}),
  {getUserList}
)(Recommend)