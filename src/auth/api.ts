import axios from 'axios';
import { END_POINT } from '../api/apiAddress';

export const processLogin = async (email: string, password: string) => {
  return await axios.post(`${END_POINT}/login`, {
    email,
    password,
  });
};

export const processSignUp = async (email: string, fullName: string, password: string) => {
  return await axios.post(`${END_POINT}/signup`, {
    email,
    fullName,
    password,
  });
};
