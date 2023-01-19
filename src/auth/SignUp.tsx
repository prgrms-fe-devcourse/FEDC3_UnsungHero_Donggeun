import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { IAuth } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser, AiOutlineLock, AiOutlineCheckCircle } from 'react-icons/ai';
import Header from './Header';
import { Button } from '../common';
import { IToken } from '../types/token';
import { useToken } from '../contexts/TokenProvider';
import useAxios from '../api/useAxios';
import { processSignUp } from './api';
import { END_POINT } from '../api/apiAddress';

const SignUp = () => {
  const [allFullNameList, setAllFullNameList] = useState<string[] | undefined>([]);
  const [allEmailList, setAllEmailList] = useState<string[] | undefined>([]);
  const tokenContextObj: IToken | null = useToken();
  const { data: userData } = useAxios<IAuth[]>({
    url: `${END_POINT}/users/get-users`,
    method: 'get',
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IAuth>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IAuth> = async ({ email, fullName, password }) => {
    if (allFullNameList?.indexOf(fullName) !== -1) {
      setError('fullName', { message: '이미 사용중인 nickname 입니다.' }, { shouldFocus: true });
      return;
    }

    if (allEmailList?.indexOf(email) !== -1) {
      setError('email', { message: '이미 사용중인 email 입니다.' }, { shouldFocus: true });
      return;
    }

    try {
      await processSignUp(email, fullName, password);
      navigate('/login');
    } catch (e) {
      console.warn(e);
    }
  };

  const getAllUserData = async () => {
    const allFullNameData = userData?.map((data: IAuth) => data.fullName);
    const allEmailData = userData?.map((data: IAuth) => data.email);
    setAllFullNameList(allFullNameData);
    setAllEmailList(allEmailData);
  };

  useEffect(() => {
    tokenContextObj?.token && navigate('/');
  }, []);

  useEffect(() => {
    getAllUserData();
  }, [userData]);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
        <SignUpHeader>회원가입</SignUpHeader>
        <SignUpContainer>
          <FormTitle>언성히어로에 오신 것을 환영합니다!</FormTitle>

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

          <Label htmlFor='name'>사용자 이름</Label>
          <InputContainer>
            <Input
              type='text'
              id='name'
              {...register('fullName', {
                required: '이름 입력은 필수 입니다',
                minLength: {
                  value: 2,
                  message: '2자리 이상의 이름을 입력해주세요',
                },
                maxLength: {
                  value: 10,
                  message: '10자리 이하의 이름을 입력해주세요',
                },
              })}
            />
            <AiOutlineUser className='logo' />
            <ErrorText>{errors?.fullName?.message}</ErrorText>
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

          <Label htmlFor='passwordConfirm'>비밀번호 확인</Label>
          <InputContainer>
            <Input
              type='password'
              id='passwordConfirm'
              {...register('passwordConfrim', {
                required: '비밀번호 확인 입력은 필수 입니다',
                validate: (value) => (value !== passwordRef.current ? '비밀번호가 일치하지 않습니다' : true),
              })}
            />
            <AiOutlineCheckCircle className='logo' />
            <ErrorText>{errors?.passwordConfrim?.message}</ErrorText>
          </InputContainer>
          <Button text='가입하기' color='default' height={2.5} disabled={isSubmitting} />
          <IsUserLink to='/login'>이미 계정이 있으신가요?</IsUserLink>
        </SignUpContainer>
      </form>
    </>
  );
};

export default SignUp;

const SignUpHeader = styled.h1`
  text-align: center;
  margin-top: 6.25rem;
`;

const SignUpContainer = styled.div`
  margin: 0 auto;
  min-width: 420px;
  width: 30vw;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1.563rem 2.813rem;
  border-radius: 5px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const FormTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 700;
  margin: 0.625rem auto 2.188rem auto;
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
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.alert};
`;

const IsUserLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  color: ${({ theme }) => theme.colors.link};
  margin: 0.625rem 0;
`;
