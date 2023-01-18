import { IAuth } from '../types/auth';
import axios from 'axios';

export const processLogin = async (email: string, password: string) => {
  return await axios.post('http://kdt.frontend.3rd.programmers.co.kr:5006/login', {
    email,
    password,
  });
};

export const processSignUp = async (email: string, fullName: string, password: string) => {
  return await axios.post('http://kdt.frontend.3rd.programmers.co.kr:5006/signup', {
    email,
    fullName,
    password,
  });
};
