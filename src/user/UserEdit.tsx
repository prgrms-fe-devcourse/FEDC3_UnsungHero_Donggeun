import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserEditImg from './UserEditImg';
import useMutation from '../api/useMutation';
import styled from 'styled-components';
import { Button } from '../common';
import useFollow from '../follow/useFollow';
import { END_POINT } from '../api/apiAddress';
import useOverlapConfirm from '../auth/useOverlapConfirm';
import Loading from '../api/Loading';

interface IFormValue {
  fullName: string;
  password: string;
}

const UserEdit = () => {
  const { id } = useParams();
  const { mutate } = useMutation();
  const [imgFiles, setimgFiles] = useState({});
  const navigate = useNavigate();
  const { CheckOverlapName } = useOverlapConfirm();
  const [isLoading, setIsLoading] = useState(false);

  const { currentData: myData } = useFollow(id as string);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<IFormValue>();

  const handleChangeUserInfo: SubmitHandler<IFormValue> = async ({ fullName, password }) => {
    setIsLoading(true);

    if (dirtyFields.fullName) {
      if (!CheckUserName(fullName)) return;
      await getChangeUserName(fullName);
    }
    if (dirtyFields.password) await getChangePassword(password);

    for (const formdata of Object.values(imgFiles)) {
      if (formdata instanceof FormData) {
        await getChangeImg(formdata);
      }
    }

    setIsLoading(false);
    navigate(`/user/${id}`, { replace: true });
  };

  const CheckUserName = (fullName: string) => {
    if (CheckOverlapName(fullName)) {
      setIsLoading(false);
      setError('fullName', { message: '이미 사용중인 nickname 입니다.' }, { shouldFocus: true });
      return false;
    }
    return true;
  };

  const getChangeImg = async (formdata: FormData) => {
    return await mutate({
      url: `${END_POINT}/users/upload-photo`,
      method: 'post',
      data: formdata,
    });
  };

  const getChangePassword = async (password: string) => {
    return await mutate({
      url: `${END_POINT}/settings/update-password`,
      method: 'put',
      data: {
        password,
      },
    });
  };

  const getChangeUserName = async (fullName: string) => {
    return await mutate({
      url: `${END_POINT}/settings/update-user`,
      method: 'put',
      data: {
        fullName,
        username: '',
      },
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Wrapper>
        <UserEditImg id={id} setimgFiles={setimgFiles} />
        <Form onSubmit={handleSubmit(handleChangeUserInfo)}>
          <UserName>
            <Label>유저네임</Label>
            <Input
              type='text'
              {...register('fullName', {
                minLength: {
                  value: 2,
                  message: '2자리 이상의 이름을 입력해주세요',
                },
                maxLength: {
                  value: 10,
                  message: '최대 10글자까지 가능합니다.',
                },
              })}
              defaultValue={myData?.fullName}
            />
            <Error>{errors?.fullName?.message}</Error>
          </UserName>
          <Label>비밀번호</Label>
          <Input
            type='password'
            {...register('password', {
              minLength: {
                value: 7,
                message: '7자리 이상의 비밀번호를 입력해주세요.',
              },
            })}
          />
          <Error>{errors?.password?.message}</Error>
          <Button
            text={'저장'}
            color={'default'}
            width={6.25}
            height={1.875}
            disabled={isSubmitting}
            style={{ position: 'absolute', top: '29%', right: '2%' }}
          />
        </Form>
      </Wrapper>
    </>
  );
};

export default UserEdit;

const Wrapper = styled.div`
  margin-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  height: 100%;
  min-height: 40rem;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  border-radius: 5px;
  position: relative;
  z-index: 5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 23.125rem;
`;

const UserName = styled.div`
  height: 150px;
`;

const Input = styled.input`
  display: block;
  width: 24.375rem;
  height: 2.5rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Label = styled.label`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.large};
  width: 24.375rem;
`;

const Error = styled.div`
  display: block;
  height: 1rem;
  color: ${({ theme }) => theme.colors.alert};
  width: 24.375rem;
`;
