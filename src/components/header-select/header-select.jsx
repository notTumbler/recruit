/**
 * 用户选择头像 UI 组件
 */
import React from 'react'
import { List,Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default  class HeaderSelect extends React.Component{
  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }

  state = {
    icon:null //图片对象，默认没有值
  }

  constructor(props){
    super(props)
    this.headerList = []
    for(let i=0;i<20;i++){
      this.headerList.push({
        text:`avatar${i+1}`,
        icon: require(`../../assets/img/avatar${i+1}.png`)
      })
    }
    console.log(this.headerList);
    
  }

  handleClick = ({text,icon}) => {
    //更新当前组件状态
    this.setState({
      icon
    });
    //更新父组件状态
    this.props.setHeader(text);
  }

  render(){
    const {icon} = this.state;
    const listHeader = !icon?'请选择头像'
    :(
      <div>
        已选择头像:<img src={icon} alt='选择头像' />
      </div>
    );
    
  return(<div>
    <List renderHeader={()=>listHeader}>
      <Grid data={this.headerList} columnNum={5}
        onClick = {this.handleClick}
      ></Grid>
    </List>
  </div>)
  }
}
