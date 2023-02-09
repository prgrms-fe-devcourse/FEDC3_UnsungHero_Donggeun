import { useForm, SubmitHandler } from 'react-hook-form';
import useLocalStorage from '../hooks/useLocalStorage';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../types/token';
import { IAuth } from '../types/auth';
import { IUserId } from '../types/useId';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Header from './Header';
import { Button } from '../common';
import { useEffect } from 'react';
import { processLogin } from './api';

const TOKEN_KEY = 'token';
const USERID_KEY = 'userId';

const Login = () => {
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
    try {
      const { data: userData } = await processLogin(email, password);
      setValue(userData.token);
      setUserId(userData.user._id);
      tokenContextObj?.addToken(userData.token);
      userIdContext?.addUserId(userData.user._id);
      navigate('/');
    } catch (e) {
      setError(
        'password',
        { message: '아이디나 비밀번호 정보가 일치하지 않습니다. 다시 한번 확인해주세요.' },
        { shouldFocus: true }
      );
    }
  };

  useEffect(() => {
    tokenContextObj?.token && navigate('/');
  }, []);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
        <LoginHeader>로그인</LoginHeader>
        <LoginContainer>
          <FormTitle>언성히어로에 어서오세요!</FormTitle>
          <Label htmlFor='email'>이메일</Label>
          <InputContainer>
            <Input
              type='email'
              id='email'
              placeholder='example@naver.com'
              {...register('email', {
                required: '이메일 입력은 필수 입니다',
                pattern: {
                  value: /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/,
                  message: '이메일은 형식에 맞춰 소문자, 숫자로만 입력해야 합니다.',
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
              })}
            />
            <AiOutlineLock className='logo' />
            <ErrorText>{errors?.password?.message}</ErrorText>
          </InputContainer>

          <CreateUserIntroduce>
            <span>계정이 필요하신가요? </span>
            <CreateUserLink to='/signup'>가입하기</CreateUserLink>
          </CreateUserIntroduce>
          <Button text='로그인' color='default' height={2.5} disabled={isSubmitting} />
        </LoginContainer>
      </form>
    </>
  );
};

export default Login;

const LoginHeader = styled.h1`
  text-align: center;
  margin-top: 6.25rem;
`;

const LoginContainer = styled.div`
  margin: 0 auto;
  min-width: 25rem;
  width: 30vw;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1.563rem 2.813rem;
  border-radius: 5px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: ${(props) => props.theme.media.moblie}) {
    border: none;
    background-color: transparent;
    box-shadow: unset;
  }
`;

const FormTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 700;
  margin: 0.625rem auto 2.188rem auto;

  @media screen and (max-width: ${(props) => props.theme.media.moblie}) {
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
`;

const Label = styled.label`
  margin-bottom: 0.313rem;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.small};
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
  height: 1rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.alert};
`;

const CreateUserIntroduce = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
  margin-bottom: 0.3125rem;
`;

const CreateUserLink = styled(Link)`
  color: ${({ theme }) => theme.colors.link};
  margin-left: 0.3125rem;
`;
