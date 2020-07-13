/*
  包含n个 action type 名称常量
*/

// 注册/登录成功
export const AUTH_SUCCESS = 'auth_success'
// 注册/登录失败
export const ERROR_MSG = 'error_msg'
//重置用户信息
export const  RESET_USER = 'reset_user'
export const RECEIVE_USER = 'resive_user'

//接受用户列表数据
export const RECEIVE_USER_LIST = 'receive_user_list'

//用户消息部分
//接收所有相关消息列表
export const RECEIVE_MSG_LIST = 'receive_msg_list'
//接收到一条消息
export const RECEIVE_MSG = 'receive_msg'
//读取完某条消息，并将其从未读消息中移除
export const MSG_READ = 'msg_read'