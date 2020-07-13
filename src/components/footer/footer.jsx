import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { TabBar } from 'antd-mobile'
import './footer.less'

const Item = TabBar.Item;

 class Footer extends React.Component{
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount:PropTypes.number.isRequired
  }


  render(){
  const {navList,unReadCount} = this.props;
  //希望在非路由组件中使用路由库的api
  //只需使用withRouter()
  const path = this.props.location.pathname;
  return(<div className='tabbar' >
    <TabBar style={{width:'100%',height: '45px' 
  }}>
      {
        navList.map((nav,index) => (
          <Item key={nav.path}
                badge={nav.path==='/message'?unReadCount:0}
                title = {nav.text}
                icon = {{uri:require(`./images/${nav.icon}.png`)}}
                selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                selected = {path === nav.path}
                onPress={()=>this.props.history.push(nav.path)}
          ></Item>
        ))
      }
    </TabBar>
  </div>)
  }
}

//内部会向组件中传入一些路由组件特有的属性：history/location/math
export default withRouter(Footer);