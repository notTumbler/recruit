import ajax from './ajax'
//注册接口
export const reqRegister = (user) => ajax('/register',user,'POST');

//登录接口
export const reqLogin = (user) => ajax('/login',user,"POST")

//用户更新接口
export const reqUpdateUser = (user) => ajax('/update',user,'POST');

//通过cookie获取用户信息接口
export const reqUser = () => ajax('/user');

//通过user.type来获取用户列表
export const reqUserList = (type) => ajax('/userlist',{type});

//获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist');

//修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST');
