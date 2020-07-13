import React from 'react'
import { connect } from 'react-redux'

import { List, Badge } from 'antd-mobile'
import './message.less'

import QueueAnim from 'rc-queue-anim'

const Item = List.Item;
const Brief = Item.Brief;

/**
 * 对chatMsgs按chat_id进行分组，并得到每个组的LastMsgs组成的数组
 * 1.找出每个聊天的LastMsg,并用一个对象容器来保存{chat_id,LastMsg}
 * 2.得到所有的LastMsg的数组
 * 3.对数组进行排序(按create_time)
 */
function getLastMsgs(chatMsgs,userid) {
  // 1.找出每个聊天的LastMsg,并用一个对象容器来保存{chat_id:LastMsg}
  const lastMsgObjs = {};
  chatMsgs.forEach(msg => {

    //对msg进行个体的统计
    if(msg.to===userid && !msg.read){
      msg.unReadCount = 1;
    }else{
      msg.unReadCount = 0;
    }


    //得到msg的聊天标识id
    const chatId = msg.chat_id;
    //获取已保存的当前组件的lastMsg
    let lastMsg = lastMsgObjs[chatId];
    //没有 //当前msg就是所在组的LastMsg
    if (!lastMsg) {
      lastMsgObjs[chatId] = msg;
    } else {
      //保存已经统计的未读数量+当前msg的未读数量
      const unReadCount = lastMsg.unReadCount+msg.unReadCount;
      //如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
      //累加unReadCount 并保存在最新的lastMsg上
      lastMsgObjs[chatId].unReadCount = unReadCount;
    }
  })
  //2.得到所有的lastMsg数组
  const lastMsgs = Object.values(lastMsgObjs);
  //3.对数组进行排序(按create_time)降序
  lastMsgs.sort(function(m1, m2) {
    return m2.create_time - m1.create_time;
  })
  return lastMsgs;
}

class Message extends React.Component {

  render() {

    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    //通过chat_id来将chatMsgs分组
    let lastMsges = getLastMsgs(chatMsgs,user._id);
    console.log(lastMsges);
    return (<div>
      <List className="message-List">
        <QueueAnim type='left' duration={1000}>
        {
          lastMsges.map(msg => {
            //得到目标用户的id
            const targetUserId = msg.to === user._id?msg.from:msg.to;
            //得到目标用户的信息
            const targetUser = users[targetUserId];
            return(
              <Item key={msg._id}
                extra={<Badge text={msg.unReadCount} />}
                thumb={targetUser.header?require(`../../assets/img/${targetUser.header}.png`):null}
                arrow='horizontal'
                onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
        </QueueAnim>
        
      </List>
    </div>)
  }
}
export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {}
)(Message)