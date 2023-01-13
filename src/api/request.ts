import axios from 'axios';

export const request = <T>(url: string) => {
  let status = 'pending';
  let result: T;

  const fetch = () =>
    axios(url).then(
      (r) => {
        status = 'success';
        result = r.data;
      },
      (e) => {
        status = 'error';
        result = e;
      }
    );

  const suspender = fetch();

  const read = () => {
    if (status === 'pending') {
      throw suspender;
    } else if (status === 'error') {
      throw result;
    } else if (status === 'success') {
      return result;
    }
  };

  const refetch = async () => {
    await fetch();
    return read();
  };

  return {
    read,
    refetch,
  };
};
