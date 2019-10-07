import request from '@/utils/request';
import { serverPreUrl} from '../../config/CommonStatic'

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(){
    return request(`${serverPreUrl}/user/current`,{
    method: 'GET',
  });
}


export async function queryNotices() {
  return request('/api/notices');
}
