import axios from 'axios';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface Iprops {
  url: string;
  method: string;
  body?: object;
  headers?: object;
}

export const useCustomApi = async ({ url, body, headers, method }: Iprops) => {
  // const token = localStorage.getItem('TOKEN_KEY');
  // if (!token) return console.warn('Need Token');

  switch (method) {
    case 'GET':
      try {
        return await axios
          .get(`${END_POINT}${url}`, {
            data: {
              ...body,
              ...headers,
            },
          })
          .then((res) => res.data)
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
      break;
    case 'POST':
      try {
        axios
          .post(`${END_POINT}${url}`, body, headers)
          .then((res) => res.data)
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
      break;
    case 'DELETE':
      try {
        axios
          .delete(`${END_POINT}${url}`, {
            data: {
              ...body,
              ...headers,
            },
          })
          .then((res) => res.data)
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
      break;
    case 'PUT':
      try {
        axios
          .put(`${END_POINT}${url}`, body, headers)
          .then((res) => res.data)
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      console.log('method is not valid');
  }
};
export default useCustomApi;
