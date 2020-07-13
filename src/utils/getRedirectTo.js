export function getRedirectTo(type,header){
  let path;
  if(type === 'laoban'){
    path = 'boss'
  }else{
    path = 'staff'
  }

  if(!header){
    path += 'info'
  }
  return path;
}
