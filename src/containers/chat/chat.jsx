import React from 'react'
import { connect } from 'react-redux'
import { sendMsg,readMsg } from '../../redux/actions'

//第三方动画库
import QueueAnim from 'rc-queue-anim'
import {
  NavBar, List, InputItem, Grid, Icon
} from 'antd-mobile' 
import './chat.less'

const Item = List.Item;

class Chat extends React.Component {

  state = {
    content: '',
    //是否显示表情列表
    isShow: false
  }
  //准备好表情的数据
  componentWillMount() {
    const emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
      '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔',
      '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵',
      '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕',
      '😟', '🙁', '☹', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
      '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓',
      '😩', '😫', '🥱', '😤', '😡', '😠', '🤬',
    ];
    this.emojis = emojis.map(item => ({ text: item }));
  }
  //进入聊天界面，直达最底部
  componentDidMount(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  //退出前将消息变为已读
  componentWillUnmount(){
    //发送请求更新消息的未读状态
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    // console.log(from,to);
    this.props.readMsg(from,to);
  }
  //发送消息，直达底部
  componentDidUpdate(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  //异步派发
  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({
      isShow
    })
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }


  handleSend = () => {
    //收集数据
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    console.log('fasongxiaoxi', from, to);
    //发送消息
    if (content) {
      this.props.sendMsg({ from, to, content })
    }
    //清除输入数据
    this.setState({
      content: '',
      isShow: false
    })
  }

  render() {

    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    //计算当前聊天的chat_id
    const meId = user._id;
    //如果还没有获取到数据，直接不做任何显示
    if (!users[meId]) {
      return null;
    };
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    //对chatMsgs进行过滤（chat_id)
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    //为了更好的性能，在循环外先得到头像,用户可能未完成信息完善
    const targetHeader = users[targetId].header;
    const targetIcon = targetHeader ? require(`../../assets/img/${targetHeader}.png`) : null;


    return (<>
      <div id="chat-page">
        <NavBar icon={<Icon type='left' />}
          className="chat-nav"
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List className="chat-List">
          <QueueAnim type='top' delay={200}>
          {
            msgs.map(msg => {
              if (targetId === msg.from) { //对方发给我的
                return (
                  <Item key={msg._id}
                    thumb={targetIcon}>
                    {msg.content}
                  </Item>
                )
              } else {
                //我发给别人的
                return (
                  <Item key={msg._id}
                    className='chat-me'
                    extra='我'>
                    {msg.content}
                  </Item>
                )
              }
            })
          }
          </QueueAnim>
        </List>
        <div className="inputItem">
          <InputItem placeholder='请输入'
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span >
                <span onClick={() => this.toggleShow()} style={{ marginRight: 10 }} role='img' aria-labelledby="emojisList" >🤣</span>
                <span onClick={() => this.handleSend()}>发送</span>
              </span>
            } />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({ content: this.state.content + item.text })
              }}
            ></Grid>
          ) : null}
        </div>
      </div>
    </>)
  }
}
export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  { sendMsg,readMsg }
)(Chat)