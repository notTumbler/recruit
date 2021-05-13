/*
*  包含n个 action creator
同步、异步 action
*/
import {
  reqRegister, reqLogin, reqUpdateUser,
  reqUser, reqUserList,
  reqChatMsgList, reqReadMsg,
  reqUpdatePsw, reqGetResume, reqPastResume
} from '../api'
import {
  AUTH_SUCCESS, ERROR_MSG,
  RESET_USER, RECEIVE_USER, RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ,
  UPDATE_PSW, PAST_RESUME, GET_RESUME
} from './action-types'
// import ajax from '../api/ajax';
import io from 'socket.io-client'

/**
 * 单例对象
 * 1、创建对象之前：判断对象是否已经存在，不存在才创建
 * 2、创建对象之后：保存对象
 */
//socket.io
function initIO(dispatch, userid) {
  if (!io.socket) {
    //连接服务器，得到与服务器的连接对象
    io.socket = io('ws://localhost:3333');
    //绑定监听，接收服务器发送的消息，但是服务器会向所有连接的客户端发送消息
    io.socket.on('receiveMsg', chatMsg => {
      console.log('客户端接收服务器发送的消息', chatMsg);
      //所以，只有当chatMsg是与当前用户相关的信息，才去分发同步action保存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}
//发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log('发送消息：', { from, to, content });
    //发消息
    io.socket.emit('sendMsg', { from, to, content });
  }
}

//异步获取消息列表数据（工具函数）
//只有在成功登录之后才能获取消息列表 三个地方(注册，登录，自动登录成功时)
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 200) {
    const { users, chatMsgs } = result.data;
    //分发同步action
    dispatch(receiveMsgList({ users, chatMsgs, userid }));
  }
}


//读取消息的异步action
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from);
    const result = response.data;
    // console.log(response, result);
    if (result.code === 200) {
      const count = result.data;
      dispatch(msgRead({ count, from, to }))
    }
  }
}

//************************************************ */

//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
//错误信息提示的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
//接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
//重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });

//获取用户列表的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList });

//接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } })
//接收一条消息的同步action
const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } })
//读取完某条消息，并将其从未读消息中移除的同步action
const msgRead = ({ count, from, to }) => ({ type: MSG_READ, data: { count, from, to } })

//修改密码的同步的action
const updatePsw = (newPsw) => ({ type: UPDATE_PSW, data: newPsw })
//获取简历同步action
const getResume = (resume) => ({
  type: GET_RESUME,data:resume
})
//上传简历同步action
const pastResume = (newResume) => ({
  type:PAST_RESUME,data:newResume
})


// **********************************************

//注册异步action
//注册action
export const register = (user) => {
  const { username, password, repassword, type } = user;
  // 校验表单数据
  if (!username) {
    return errorMsg('用户名不能为空');
  } else if (password !== repassword) {
    return errorMsg('两次输入密码不一致');
  };
  // 表单数据合法，返回action
  return async dispatch => {
    const response = await reqRegister({ username, password, type });
    const result = response.data;
    if (result.code === 200) {
      //注册成功，可以获得消息列表
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
};

// 登录action
export const login = (user) => {
  const { username, password } = user;
  if (!username) {
    return errorMsg('用户名不能为空');
  } else if (!password) {
    return errorMsg('密码不能为空');
  }

  return async dispatch => {
    const response = await reqLogin(user);
    const result = response.data;
    console.log(result);
    if (result.code === 200) {
      //登录成功，可以获得消息列表
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    }
    if (result.code === 400) {
      dispatch(errorMsg(result.msg));
    }
  }
}

//更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 200) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}

//获取用户信息异步action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 200) {
      //自动登录成功，可以获得消息列表
      getMsgList(dispatch, result.data._id);

      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}

//获取用户列表的异步action
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 200) {
      dispatch(receiveUserList(result.data));
    } else {
      dispatch(errorMsg('没有找到相关的用户信息'));
    }
  }
}

//修改密码异步action
export const updatePassword = (newPsw) => {
  return async dispatch => {
    const response = await reqUpdatePsw(newPsw)
    const result = response.data
    console.log('这是result:' + result.data)
    if (result.code === 200) {
      dispatch(updatePsw(result.data))
    } else {
      dispatch(errorMsg('修改失败'))
    }
  }
}

//上传简历异步
export const asyncPastResume = (resumeObj) => {
  // console.log(`这是resumeOBJ${JSON.stringify(resumeObj)}`)
  const {name,workWill,jiaoYu,shiXi,skills,userId} = resumeObj
  return async dispatch => {
    const response = await reqPastResume({name,workWill,jiaoYu,shiXi,skills,userId})
    let result = response.data
    // console.log(`~~~~${JSON.stringify(result.data)}`)
    if(result.code === 200){
      dispatch(pastResume(result.data))
    }else{
      dispatch(errorMsg('上传失败'))
    }
  }
}

// 获取简历异步
export const asyncGetResume = (userId) => {
  return async dispatch => {
    const response = await reqGetResume(userId)
    const result = response.data
    console.log(`*****${JSON.stringify(result)}`)
    if(result.code === 200){
      dispatch(getResume(result.data))
    }else{
      dispatch(errorMsg('获取失败'))
    }
  }
}
