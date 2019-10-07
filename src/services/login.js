import request from '@/utils/request';
import { serverPreUrl } from '../../config/CommonStatic'
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export async function userLogin(params){
  console.log(params)
  let formData = new FormData();
  for(let key in params){
    if(!!params[key]){
      formData.append(key,params[key]);
    }
  }
    return request(`${serverPreUrl}/user/login`,{
    method: 'POST',
    body: formData,
  });
}
