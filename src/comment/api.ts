import { request } from '../api/request';
import { tempData } from './tempData';

export const getPost = <T>() => {
  return request<T>(`${tempData.baseUrl}/posts/${tempData.postId}`);
};
