import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const TOKEN = localStorage.getItem('token');
const header = {
  Authorization: `bearer ${TOKEN}`,
};

interface ICheckPassword {
  validated: boolean;
  message: string;
}

const UserEdit = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({
    currentName: '',
    newName: '',
  });
  const [password, setPassword] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/users/${id}`).then(({ data }) =>
      setUserName({
        currentName: data.fullName,
        newName: data.fullName,
      })
    );
  }, []); //다른 컴포넌트와 중복되는 api호출 부분.

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName({
      ...userName,
      newName: e.target.value,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  };

  const handleChangeUserInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    const { validated, message } = CheckUserPassword(password);

    if (!validated) return alert(message);

    if (userName.currentName !== userName.newName) {
      //유저이름이 변경되었을 때만 호출
      getChangeUserName();
    }

    if (password.length > 0) {
      //비밀번호가 입력되었을 때만 호출
      getChangePassword();
    }

    navigate(`/user/${id}`);
  };

  const CheckUserPassword = (password: string): ICheckPassword => {
    if (password.length > 0 && password.length < 7) {
      return {
        validated: false,
        message: '비밀번호는 7글자 이상 입력해주세요!',
      };
    }

    return {
      validated: true,
      message: '',
    };
  };

  const getChangePassword = async () => {
    return await axios.put(
      `${API_URL}/settings/update-password`,
      {
        password: password,
      },
      {
        headers: header,
      }
    );
  };
  const getChangeUserName = async () => {
    return await axios.put(
      `${API_URL}/settings/update-user`,
      {
        fullName: userName.newName,
        username: '',
      },
      {
        headers: header,
      }
    );
  };
  return (
    <>
      <div>커버이미지</div>
      <div>프로필 이미지</div>
      <form>
        <input type='text' value={userName.newName} onChange={handleChangeUserName} />
        <input type='password' value={password} onChange={handleChangePassword} />
        <button onClick={handleChangeUserInfo}>저장</button>
      </form>
    </>
  );
};

export default UserEdit;
