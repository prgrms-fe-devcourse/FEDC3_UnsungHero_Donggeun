import axios from 'axios';

const tempData = {
  postId: '63bbc0d78c65a93bebe29fd4',
  baseUrl: 'http://kdt.frontend.3rd.programmers.co.kr:5006',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
};

export const fetchPost = <T>() => {
  let status = 'pending';
  let result: T;

  const suspender = axios(`${tempData.baseUrl}/posts/${tempData.postId}`).then(
    (r) => {
      status = 'success';
      result = r.data;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'error') {
        throw result;
      }
      if (status === 'success') {
        return result;
      }
    },
  };
};
