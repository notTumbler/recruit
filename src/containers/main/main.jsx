// 路由组件
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'
import './main.less'

import { getRedirectTo } from '../../utils/getRedirectTo'
import { getUser } from '../../redux/actions'

import BossInfo from '../boss-info/boss-info'
import StaffInfo from '../staff-info/staff-info'
import Boss from '../boss/boss'
import Staff from '../staff/staff'
import Message from '../message/message'
import Personal from '../personal/personal'
import Nofound from '../../components/not-found/no-found'
import Chat from '../../containers/chat/chat'
import Resume from '../resume/resume'
import UpdatePsw from '../updatePsw/index'

import NavFooter from '../../components/footer/footer'

class Main extends React.Component {

  componentDidMount() {
    // 1、如果cookie中有userid,
    //   -->登录过，但还没有登录(此时cookie中有userid,
    //   但是redux中的user里没有_id),才发送请求获取对应的user
    const userid = Cookies.get('userId');
    const { _id } = this.props.user;
    // console.log(_id,userid);
    if (userid && !_id) {
      // debugger
      //发送异步请求，获取user
      this.props.getUser();
    }
  }

  //包含所有导航组件的相关信息数据
  navList = [
    {
      path: '/boss',
      component: Boss,
      title: 'Staff列表',
      icon: 'staff',
      text: '求职'
    }, {
      path: '/staff',
      component: Staff,
      title: 'Boss列表',
      icon: 'boss',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'personal',
      text: '我的'
    },
  ]

  render() {

    const {user} = this.props;
    if(user.msg === '用户名或密码错误'){
      console.log('main.jsx -- 75');
      return <Redirect to='/login' />
    }

    //读取cookie中的userid
    const userid = Cookies.get('userId');
    // debugger
    console.log(userid);

    //如果没有，自动重定向到登录界面
    if (!userid) {
      return <Redirect to='/login' />
    }
    const {unReadCount } = this.props;
    //如果有，读取redux中的user状态
    //如果user没有_id,返回null(不做任何显示)
    if (!user._id) {
      return null;
    } else {
      //如果有_id,显示对应的界面
      //如果请求根路径,根据user中的type,header来计算出一个重定向的路由路径并自动重定向
      let path = this.props.location.pathname;
      if (path === '/') {
        //得到了重定向的路径
        path = getRedirectTo(user.type, user.header);
        // console.log(path);
        return <Redirect to={path} />
      }
    }

    //检查用户是否登录，如果没有，自动重定向到登录界面
    //思路:如果没有cookies(即user._id),那么mian的所有子路由都不能被访问->强行重定向到登录界面
    //问题，第一次怎么办，点击也不能跳到注册页面了(还未绑定跳转事件)
    //Low了，这里只能强制重定向/main下的页面，而注册登录两个页面是不受限制的
    // const { user } = this.props;
    // if(!user._id){
    //   return <Redirect to='/register' />
    // }


    //判断是否需要显示Navbar
    let { navList } = this;
    const path = this.props.location.pathname;
    //find()返回的是第一个返回值为true的对象
    let Navpath = navList.find(ele => ele.path === path);
    //隐藏起navlist中的一个对象
    if (Navpath) {
      if (user.type === 'dashen') {
        navList[0].hide = true;
      } else {
        navList[1].hide = true;
      }
    }
    navList = navList.filter(ele => !ele.hide)
    return (<div>

      <div className="top">
        {Navpath ? <NavBar className='main-nav'>{Navpath.title}</NavBar> : null}
      </div>
      <div className="center">
        <Switch>
          {
            navList.map((ele, index) => <Route path={ele.path} component={ele.component} key={index} />)
          }
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/staffinfo' component={StaffInfo} />
          <Route path='/chat/:userid' component={Chat}/>
          <Route path='/resume' component={Resume} />
          <Route path='/updatepsw' component={UpdatePsw} />
          <Route path='/nofound' component={Nofound} />
        </Switch>
      </div>
      <div className='bottom'>
      {Navpath?<NavFooter unReadCount={unReadCount}  navList={navList} /> : null}
      </div>
    </div>)
  }
  //直接写四个路由------->多lwo啊,用循环！！！
  // <Route path='/boss' component={Boss} />
  //       <Route path='/staff' component={Staff} />
  //       <Route path='/message' component={Message} />
  //       <Route path='/personal' component={Personal} />
}

export default connect(
  state => ({ user: state.user,unReadCount:state.chat.unReadCount }),
  { getUser }
)(Main)


/**
 * 实现自动登录
 * 1、如果cookie中有userid,
 * -->登录过，但还没有登录(此时cookie中有userid,
 * 但是redux中的user里没有_id),才发送请求获取对应的user
 * 2、如果cookie中没有userid,自动进入login页面
 * 3、如果cookie中有userid,说明当前已经登录，显示对应的界面
 * 如果请求根路径，则：
 * -->根据user中的type和header来计算出一个重定向的路由路径,并自动重定向
 */