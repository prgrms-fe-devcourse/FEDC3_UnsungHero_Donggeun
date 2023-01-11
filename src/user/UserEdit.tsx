import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

const currentName = 'yellow'; //서버에서 받아오는 이름
const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const TOKEN = localStorage.getItem('token');
const headers = {
  Authorization: `bearer ${TOKEN}`,
};

interface IFormValue {
  fullName: string;
  password: string;
}

const id = '63bbb8d08c65a93bebe29f78';
const UserEdit = () => {
  const navigate = useNavigate();

  // const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    defaultValues: {
      fullName: currentName,
    },
  });

  const handleChangeUserInfo: SubmitHandler<IFormValue> = ({ fullName, password }) => {
    if (currentName !== fullName) getChangeUserName(fullName);
    if (password.length > 0) getChangePassword(password);

    navigate(`/user/${id}`);
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
      <div>커버이미지</div>
      <div>프로필 이미지</div>
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
        <button type='submit'>저장</button>
      </form>
    </>
  );
};

export default UserEdit;
