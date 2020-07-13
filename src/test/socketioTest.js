// import io from 'socket.io-client'

// const socket = io('ws://localhost:3333')

// socket.on('receiveMsg',function(data){
//   console.log('浏览器接收到消息:'+data);
// })

// socket.emit('sendMsg',{name:'Tom',data:Date.now()});
// console.log('浏览器端向服务器发送消息',{name:'Tom',date:Date.now()});
import io from 'socket.io-client'

//连接服务器并得到与服务器的连接对象
const socket = io('ws://localhost:3333')

//发送消息
socket.emit('sendMsg',{name:'波哥'});
console.log('客户端向服务器发出了一句"波哥"');

//接收消息
socket.on('receiveMsg',data => {
  console.log('客户端接受到了服务器返回的消息'+data.name);
  
})
