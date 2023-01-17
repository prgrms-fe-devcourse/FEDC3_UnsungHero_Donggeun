import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../types/token';
import { IAuth } from '../types/auth';
import { IUserId } from '../types/useId';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

const TOKEN_KEY = 'token';
const USERID_KEY = 'userId';

const Login = () => {
  const [allOnlineEmail, setAllOnlineEmail] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IAuth>();
  const [, setValue] = useLocalStorage(TOKEN_KEY, '');
  const [, setUserId] = useLocalStorage(USERID_KEY, '');
  const tokenContextObj: IToken | null = useToken();
  const userIdContext: IUserId | null = useUserId();

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IAuth> = async ({ email, password }) => {
    if (allOnlineEmail?.indexOf(email) !== -1) {
      setError('email', { message: '현재 접속중인 email 입니다.' }, { shouldFocus: true });
      return;
    }

    await axios
      .post('http://kdt.frontend.3rd.programmers.co.kr:5006/login', {
        email,
        password,
      })
      .then(({ data }) => {
        setValue(data.token);
        setUserId(data.user._id);
        tokenContextObj?.addToken(data.token);
        userIdContext?.addUserId(data.user._id);
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

  const getAllOnlineEmailData = async () => {
    await axios.get('http://kdt.frontend.3rd.programmers.co.kr:5006/users/online-users').then(({ data }) => {
      const serverData = data;
      const allFullNameData = serverData.map((data: IAuth) => data.email);
      setAllOnlineEmail(allFullNameData);
    });
  };

  useEffect(() => {
    getAllOnlineEmailData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
      <LoginHeader>로그인</LoginHeader>
      <LoginContainer>
        <FormTitle>언성히어로에 어서오세요!</FormTitle>
        <Label htmlFor='email'>이메일</Label>
        <InputContainer>
          <Input
            type='email'
            id='email'
            {...register('email', {
              required: '이메일 입력은 필수 입니다',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          <AiOutlineMail className='logo' />
          <ErrorText>{errors?.email?.message}</ErrorText>
        </InputContainer>

        <Label htmlFor='password'>비밀번호</Label>
        <InputContainer>
          <Input
            type='password'
            id='password'
            {...register('password', {
              required: '비밀번호 입력은 필수 입니다',
              minLength: {
                value: 7,
                message: '7자리 이상의 비밀번호를 입력해주세요',
              },
            })}
          />
          <AiOutlineLock className='logo' />
          <ErrorText>{errors?.password?.message}</ErrorText>
        </InputContainer>
        <CreateUserIntroduce>
          <span>계정이 필요하신가요? </span>
          <CreateUserLink to='/signup'>가입하기</CreateUserLink>
        </CreateUserIntroduce>
        <LoginButton type='submit' disabled={isSubmitting}>
          로그인
        </LoginButton>
      </LoginContainer>
    </form>
  );
};

export default Login;

const LoginHeader = styled.h1`
  text-align: center;
  margin-top: 6.25rem;
`;

const LoginContainer = styled.div`
  margin: 0 auto;
  width: 30vw;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1.563rem 2.813rem;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2), -1px -1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const FormTitle = styled.div`
  font-size: 1.125em;
  font-weight: 700;
  margin: 0.625rem auto 2.188rem auto;
`;

const Label = styled.label`
  margin-bottom: 0.313rem;
  font-weight: 700;
  font-size: 0.875rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1.563rem;
  display: flex;
  flex-direction: column;
  position: relative;

  .logo {
    position: absolute;
    top: 0.813rem;
    left: 0.625rem;
    font-size: 1.625rem;
  }
`;

const Input = styled.input`
  height: 3.125rem;
  margin-bottom: 0.313rem;
  border-radius: 0.313rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  outline: none;
  padding-left: 2.5rem;
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ff1f1f;
`;

const LoginButton = styled.button`
  background-color: #52d2a4;
  color: #e6e6e6;
  border-radius: 0.313rem;
  border: none;
  height: 2.5rem;
  margin-top: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e6e6e6;
    color: #52d2a4;
  }
`;

const CreateUserIntroduce = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
`;

const CreateUserLink = styled(Link)`
  color: blue;
  margin-left: 0.3125rem;
`;
