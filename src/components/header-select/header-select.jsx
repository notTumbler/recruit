/**
 * 用户选择头像 UI 组件
 */
import React from 'react'
import { List,Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
import wu from './wu.png'

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
    // console.log(this.headerList);
  }
  componentDidMount(){
    const {headerIcon} = this.props
    if(headerIcon){
      let newIcon = require(`../../assets/img/${headerIcon}.png`)
      this.setState({icon:newIcon})
   }
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
    let {icon} = this.state;
    //用户更新，获取当前头像
    //用户注册，则跳过
    const listHeader = !icon ? <div>
      请选择头像:
      <img src={wu} alt='' 
        style = {{
          width:'200px',
          height:'202px',
          border:'2px solid #ccc',
          borderRadius:'50%',
          margin:'auto',
          boxShadow:'0 0 4px',
          marginTop:'44px'
        }}
       />
      </div>
    :(
      <div style = {{
      }}>
        <div
           style={{
            background:'#fff',
            padding:'8px',
            marginTop:'44px'
          }}
        >
        已选择头像:<img src={icon} alt='选择头像' />
        </div>
      </div>
    );
    
  return(<div className='header-select'>
    <List renderHeader={()=>listHeader}>
      <Grid data={this.headerList} columnNum={5}
        onClick = {this.handleClick}
      ></Grid>
    </List>
  </div>)
  }
}
