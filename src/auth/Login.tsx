import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';
import { useToken } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../types/token';
import { IAuth } from '../types/auth';

const TOKEN_KEY = 'token';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IAuth>();
  const [, setValue] = useLocalStorage(TOKEN_KEY, '');
  const tokenContextObj: IToken | null = useToken();

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IAuth> = async ({ email, password }) => {
    await axios
      .post('http://kdt.frontend.3rd.programmers.co.kr:5006/login', {
        email,
        password,
      })
      .then((res) => {
        setValue(res.data.token);
        tokenContextObj?.addToken(res.data.token);
        navigate('/');
      })
      .catch(() => {
        setError(
          'password',
          { message: '아이디나 비밀번호 정보가 일치하지 않습니다. 다시 한번 확인해주세요.' },
          { shouldFocus: true }
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>로그인</h1>
      <input
        type='email'
        placeholder='이메일을 입력해주세요'
        {...register('email', {
          required: '이메일 입력은 필수 입니다',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
      />
      <span>{errors?.email?.message}</span>
      <input
        type='password'
        placeholder='비밀번호를 입력해주세요'
        {...register('password', {
          required: '비밀번호 입력은 필수 입니다',
          minLength: {
            value: 7,
            message: '7자리 이상의 비밀번호를 입력해주세요',
          },
        })}
      />
      <span>{errors?.password?.message}</span>
      <button type='submit' disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default Login;
