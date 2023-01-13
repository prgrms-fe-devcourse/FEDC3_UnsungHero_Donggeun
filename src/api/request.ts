import axios from 'axios';

export const request = <T>(url: string) => {
  let status = 'pending';
  let result: T;

  const suspender = axios(url).then(
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
