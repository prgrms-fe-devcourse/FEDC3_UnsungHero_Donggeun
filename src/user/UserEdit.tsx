import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserEditImg from './UserEditImg';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const TOKEN = localStorage.getItem('token');
const headers = {
  Authorization: `bearer ${TOKEN}`,
};

interface IFormValue {
  fullName: string;
  password: string;
}

const UserEdit = () => {
  const { id } = useParams();
  const [imgFiles, setimgFiles] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<IFormValue>({
    defaultValues: () =>
      axios.get(`${API_URL}/users/${id}`).then(({ data }) => {
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

    navigate(`/user/${id}`);
  };

  const getChangeImg = async (formdata: FormData) => {
    await axios.post(`${API_URL}/users/upload-photo`, formdata, { headers });
  };

  const getChangePassword = async (password: string) => {
    return await axios.put(`${API_URL}/settings/update-password`, { password }, { headers });
  };

  const getChangeUserName = async (fullName: string) => {
    return await axios.put(
      `${API_URL}/settings/update-user`,
      {
        fullName,
        username: '',
      },
      { headers }
    );
  };

  return (
    <>
      <UserEditImg id={id} setimgFiles={setimgFiles} />
      <form onSubmit={handleSubmit(handleChangeUserInfo)}>
        <input
          type='text'
          {...register('fullName', {
            minLength: {
              value: 2,
              message: '2자리 이상의 이름을 입력해주세요',
            },
          })}
        />

        <input
          type='password'
          {...register('password', {
            minLength: {
              value: 7,
              message: '7자리 이상의 비밀번호를 입력해주세요.',
            },
          })}
        />
        <span>{errors?.password?.message}</span>
        <button type='submit' disabled={isSubmitting}>
          저장
        </button>
      </form>
    </>
  );
};

export default UserEdit;
