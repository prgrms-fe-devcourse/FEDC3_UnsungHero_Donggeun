import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserEditImg from './UserEditImg';
import useMutation from '../api/useMutation';
import styled from 'styled-components';
import { Button } from '../common';

interface IFormValue {
  fullName: string;
  password: string;
}

const UserEdit = () => {
  const { id } = useParams();
  const { mutate } = useMutation();
  const [imgFiles, setimgFiles] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<IFormValue>({
    defaultValues: () =>
      axios.get(`/api/users/${id}`).then(({ data }) => {
        return {
          fullName: data.fullName,
          password: '',
        };
      }),
  });

  const handleChangeUserInfo: SubmitHandler<IFormValue> = async ({ fullName, password }) => {
    if (dirtyFields.fullName) await getChangeUserName(fullName);
    if (dirtyFields.password) await getChangePassword(password);

    for (const formdata of Object.values(imgFiles)) {
      if (formdata instanceof FormData) {
        await getChangeImg(formdata);
      }
    }

    navigate(`/user/${id}`, { replace: true });
  };

  const getChangeImg = async (formdata: FormData) => {
    return await mutate({
      url: `/users/upload-photo`,
      method: 'post',
      data: formdata,
    });
  };

  const getChangePassword = async (password: string) => {
    return await mutate({
      url: `/settings/update-password`,
      method: 'put',
      data: {
        password,
      },
    });
  };

  const getChangeUserName = async (fullName: string) => {
    return await mutate({
      url: `/settings/update-user`,
      method: 'put',
      data: {
        fullName,
        username: '',
      },
    });
  };

  return (
    <Wrapper>
      <UserEditImg id={id} setimgFiles={setimgFiles} />
      <Form onSubmit={handleSubmit(handleChangeUserInfo)}>
        <Label>유저네임</Label>
        <Input
          type='text'
          {...register('fullName', {
            minLength: {
              value: 2,
              message: '2자리 이상의 이름을 입력해주세요',
            },
          })}
        />

        <Label>비밀번호</Label>
        <PasswordInput
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
          width={100}
          height={30}
          disabled={isSubmitting}
          style={{ position: 'absolute', top: '29%', right: '2%' }}
        />
      </Form>
    </Wrapper>
  );
};

export default UserEdit;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 45.313rem;
  border: 1px solid black;
  height: 100%;
  min-height: 40rem;
  border: 1px solid ${({ theme }) => theme.colors.boxLine};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
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

const Input = styled.input`
  display: block;
  width: 24.375rem;
  height: 2.5rem;
  margin-bottom: 5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const PasswordInput = styled(Input)`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.large};
  padding-bottom: 0.625rem;
  width: 24.375rem;
`;

const Error = styled.div`
  display: block;
  height: 1rem;
  color: ${({ theme }) => theme.colors.alert};
  width: 24.375rem;
`;
