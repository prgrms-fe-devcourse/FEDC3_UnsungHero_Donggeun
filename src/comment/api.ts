import { request } from '../api/request';
import useMutation from '../api/useMutation';
import { tempData } from './tempData';

const { mutate } = useMutation();

export const getPost = <T>() => {
  return request<T>(`${tempData.baseUrl}/posts/${tempData.postId}`);
};

export const createComment = async (value: string) => {
  await mutate({
    url: `${tempData.baseUrl}/comments/create`,
    method: 'post',
    data: {
      comment: value,
      postId: tempData.postId,
    },
  });
};

export const deleteComment = async (id: string) => {
  await mutate({
    url: `${tempData.baseUrl}/comments/delete`,
    method: 'delete',
    data: {
      id,
    },
  });
};
