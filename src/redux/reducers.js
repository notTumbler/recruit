/**
 * 包含n个 reducer函数 
 */
/**
 * 判断是否已经完善信息？user.header是否有值
 * 判断用户类型:user.type
 */
import { combineReducers } from 'redux'
import {
  AUTH_SUCCESS, ERROR_MSG,
  RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST, RECEIVE_MSG,MSG_READ
} from './action-types';

import { getRedirectTo } from '../utils/getRedirectTo'
const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, header } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(type, header) };
    case ERROR_MSG:
      return {msg:action.data, redirectTo: '/' };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return { msg: action.data };
    default: return state;
  }
}


const initUserList = [];
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  //所有用户信息的对象，属性名:userid(一长串),属性值：{username,header}
  users: {},
  chatMsgs: [],
  unReadCount:0 //总未读消息数量
};
//产生聊天状态的reducer
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs,userid } = action.data;
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((PreTotal,msg)=>{
          return PreTotal +(!msg.read&&msg.to===userid?1:0)
        },0)
      };
    case RECEIVE_MSG:
      const {chatMsg} = action.data;
      return {
        users:state.users,
        chatMsgs:[...state.chatMsgs,chatMsg],
        unReadCount:state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
      };
    case MSG_READ:
      const { from,to,count } = action.data;
      state.chatMsgs.forEach(msg => {
        if(msg.from===from&&msg.to===to&&!msg.read){
          msg.read = true;
        }
      })
      return{
        users:state.users,
        chatMsgs:state.chatMsgs.map(msg => {
          if(msg.from===from&&msg.to===to&&!msg.read){
             return {...msg,read:true};
           }else{
             return msg;
           }
         }),
        unReadCount:state.unReadCount - count
      }
    default:
      return state;
  }
}


export default combineReducers({
  user,   //{}
  userList,  //[]
  chat  //{}
}) 