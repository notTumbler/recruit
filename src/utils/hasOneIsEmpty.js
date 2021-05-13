export default  function(){
  let temp = [...arguments]
  console.log(temp)
  // if(temp.includes(undefined)){
  //   console.log('haveTrue')
  //   return false
  // }
  return temp.every(item => item !== '')
}