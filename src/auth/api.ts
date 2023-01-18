import axios from 'axios';

export const processLogin = async (email: string, password: string) => {
  return await axios.post('/api/login', {
    email,
    password,
  });
};

export const processSignUp = async (email: string, fullName: string, password: string) => {
  return await axios.post('/api/signup', {
    email,
    fullName,
    password,
  });
};
