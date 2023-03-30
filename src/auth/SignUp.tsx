import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { IAuth } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser, AiOutlineLock, AiOutlineCheckCircle } from 'react-icons/ai';
import Header from './Header';
import { Button } from '../common';
import { IToken } from '../types/token';
import { useToken } from '../contexts/TokenProvider';
import { processSignUp } from './api';
import useOverlapConfirm from '../hooks/useOverlapConfirm';

const SignUp = () => {
  const tokenContextObj: IToken | null = useToken();
  const { CheckOverlapEmail, CheckOverlapName } = useOverlapConfirm();
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
    if (CheckOverlapName(fullName)) {
      setError('fullName', { message: '이미 사용중인 nickname 입니다.' }, { shouldFocus: true });
      return;
    }

    if (CheckOverlapEmail(email)) {
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

  useEffect(() => {
    tokenContextObj?.token && navigate('/');
  }, []);

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

          <Label htmlFor='name'>사용자 이름</Label>
          <InputContainer>
            <Input
              type='text'
              id='name'
              placeholder='홍길동'
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
                pattern: {
                  value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message: '비밀번호는 영어, 숫자, 특수문자를 포함한 8-15글자로 입력해야 합니다.',
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

  @media screen and (max-width: ${(props) => props.theme.media.mobile}) {
    border: none;
    background-color: transparent;
    box-shadow: unset;
    height: 110vh;
  }
`;

const FormTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 700;
  margin: 0.625rem auto 2.188rem auto;

  @media screen and (max-width: ${(props) => props.theme.media.mobile}) {
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

const IsUserLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  color: ${({ theme }) => theme.colors.link};
  margin: 0.625rem 0;
`;
