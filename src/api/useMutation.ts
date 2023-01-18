import axios from 'axios';
import { TOKEN_KEY } from '../contexts/TokenProvider';
import { IRequest } from '../types/request';

const useMutation = () => {
  const mutate = async ({ url, method, data }: IRequest) => {
    console.log(`localStorage ${localStorage.getItem(TOKEN_KEY)}`);
    const config = {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem(TOKEN_KEY) || '')}`,
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
      data,
    };

    try {
      let response;
      if (method === 'delete') {
        response = await axios[method](`/api${url}`, config);
      } else {
        response = await axios[method](`/api${url}`, data, config);
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }
    }
  };

  return { mutate };
};

export default useMutation;
