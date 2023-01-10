import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

interface IFormValue {
  email: string;
  fullName: string;
  password: string;
  passwordConfrim: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<IFormValue>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmitHandler: SubmitHandler<IFormValue> = async ({ email, fullName, password }) => {
    await axios.post('http://kdt.frontend.3rd.programmers.co.kr:5006/signup', {
      email,
      fullName,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>회원가입</h1>
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
        type='text'
        placeholder='이름을 입력해주세요!'
        {...register('fullName', {
          required: '이름 입력은 필수 입니다',
          minLength: {
            value: 2,
            message: '2자리 이상의 이름을 입력해주세요',
          },
        })}
      />
      <span>{errors?.fullName?.message}</span>
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
      <input
        type='password'
        placeholder='비밀번호를 한번 더 입력해주세요'
        {...register('passwordConfrim', {
          required: '비밀번호 확인 입력은 필수 입니다',
          validate: (value) => (value !== passwordRef.current ? '비밀번호가 일치하지 않습니다' : true),
        })}
      />
      <span>{errors?.passwordConfrim?.message}</span>
      <button type='submit' disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
