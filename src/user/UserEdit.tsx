import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const token = localStorage.getItem('token');
const header = {
  Authorization: `bearer ${token}`,
};

const UserEdit = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://kdt.frontend.3rd.programmers.co.kr:5006/users/${id}`)
      .then(({ data }) => setUserName(data.fullName));
  }, []);

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(() => e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  };

  const submitUserName = (e: React.MouseEvent) => {
    e.preventDefault();
    requestChangeUserName();

    if (password.length > 4) {
      requestChangePassword();
      setPassword('');
      alert('저장이 완료되었습니다.');
    }
  };

  const requestChangePassword = async () => {
    return await axios.put(
      `http://kdt.frontend.3rd.programmers.co.kr:5006/settings/update-password`,
      {
        password: password,
      },
      {
        headers: header,
      }
    );
  };
  const requestChangeUserName = async () => {
    return await axios.put(
      `http://kdt.frontend.3rd.programmers.co.kr:5006/settings/update-user`,
      {
        fullName: userName,
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
        <input type='text' value={userName} onChange={handleChangeUserName} />
        <input type='password' value={password} onChange={handleChangePassword} />
        <button onClick={submitUserName}>저장</button>
      </form>
    </>
  );
};

export default UserEdit;
