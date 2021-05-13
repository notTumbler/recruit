import React from 'react'
import { connect } from 'react-redux'
import { sendMsg, readMsg, asyncGetResume } from '../../redux/actions'




//第三方动画库
import QueueAnim from 'rc-queue-anim'
import {
  NavBar, List, InputItem, Grid, Icon, Popover,
  Toast 
} from 'antd-mobile'
import './chat.less'

//引入的组件
import ShowResumeInfo from '../../components/showResumeInfo/index'

const Item = List.Item;

class Chat extends React.Component {
  state = {
    content: '',
    //是否显示表情列表
    isShow: false,
    visible: false,
    toastData: '投递成功',
    isShowToast: false,
    isShowResumeInfo: false
  }
  pastCount = 0
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
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  //退出前将消息变为已读
  componentWillUnmount() {
    //发送请求更新消息的未读状态
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    // console.log(from,to);
    this.props.readMsg(from, to);
    //
  }
  //发送消息，直达底部
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
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
    // console.log('fasongxiaoxi', from, to);
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
  //投递简历按钮
  pastResume = () => {
    this.setState({
      visible: false,
      isShowToast: true
    })
    if (this.pastCount > 0) {
      Toast.success('已投递,请勿重复投递')
    } else {
      Toast.success('投递成功', 2);
    }
    this.pastCount++
  }
  //查看简历按钮
  checkResume = async (userId) => {
    // console.log('查看简历')
    // console.log(userId)
    await this.props.asyncGetResume(userId)
    // console.log(this.props.resume)
    this.setState({ isShowResumeInfo: true })
  }
  //改变预览简历
  showResumeModal = (bool) => {
    this.setState({isShowResumeInfo:bool})
  }
  render() {
    // console.log(this.props.resume)
    //resume的各项信息
    const resumeInfo = this.props.resume
    const { user } = this.props;
    //决定是看简历还是投简历
    const { type } = user
    // console.log(type)
    const { users, chatMsgs } = this.props.chat;
    //当前聊天的chat_id
    const meId = user._id;
    //如果还没有获取到数据，直接不做任何显示
    if (!users[meId]) {
      return (<div>空空如也</div>);
    };
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    // console.log(`charId~~${chatId}`)
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
          rightContent={
            <Popover
              // mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={false}
              overlay={[
                (
                  type === 'dashen' ?
                    (<Item key="4" value="scan"
                      onClick={() => this.pastResume()}
                    >投递简历</Item>) :
                    (<Item key="6" value="scan"
                      onClick={() => this.checkResume(targetId)}
                    >查看简历</Item>)
                ),

                (<Item key="5" value="scan"
                  onClick={() => this.setState({
                    visible: false
                  })}
                >举报</Item>)
              ]}
              align={{
                offset: [-5, -10],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{ 
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
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
      {
        this.state.isShowResumeInfo ? (
          <div className='show-resume-info'>
            <ShowResumeInfo chen={this.showResumeModal} name={users[targetId].username} resumeInfo={resumeInfo} />
          </div>
        ) : null
      }

    </>)
  }
}
export default connect(
  state => ({
    user: state.user,
    chat: state.chat,
    resume: state.resume
  }),
  { sendMsg, readMsg, asyncGetResume }
)(Chat)