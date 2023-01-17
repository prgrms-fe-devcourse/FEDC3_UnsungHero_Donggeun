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
      <SignUpHeader>로그인</SignUpHeader>
      <SignUpContainer>
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
        <SignUpButton type='submit' disabled={isSubmitting}>
          로그인
        </SignUpButton>
      </SignUpContainer>
    </form>
  );
};

export default Login;

const SignUpHeader = styled.h1`
  text-align: center;
  margin-top: 100px;
`;

const SignUpContainer = styled.div`
  margin: 0 auto;
  width: 30vw;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 25px 45px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2), -1px -1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const FormTitle = styled.div`
  font-size: 1.125em;
  font-weight: 700;
  margin: 10px auto 35px auto;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 14px;
`;

const InputContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  position: relative;

  .logo {
    position: absolute;
    top: 13px;
    left: 10px;
    font-size: 26px;
  }
`;

const Input = styled.input`
  height: 50px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  outline: none;
  padding-left: 40px;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #ff1f1f;
`;

const SignUpButton = styled.button`
  background-color: #52d2a4;
  color: #e6e6e6;
  border-radius: 5px;
  border: none;
  height: 40px;
  margin-top: 20px;
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
  font-size: 12px;
  align-items: center;
`;

const CreateUserLink = styled(Link)`
  color: blue;
  margin-left: 5px;
`;
