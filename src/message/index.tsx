import useAxios from '../api/useAxios';
import { END_POINT } from '../api/apiAddress';
import { IUser } from '../types/user';
import { Avatar } from '../common';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';

const Message = () => {
  const [userList, setUserLIst] = useState<IUser[]>([]);
  const [message, setMessage] = useState('');
  const [searchUser, setSearchUser] = useState('');

  const { data } = useAxios<IUser[]>({
    url: `${END_POINT}/users/get-users`,
    method: 'get',
  });

  useEffect(() => {
    if (typeof data === 'object') {
      setUserLIst(data as IUser[]);
    }
  }, [data]);

  const { mutate } = useMutation();

  const tokenObject = useToken();
  const token = tokenObject?.token;

  const handleOnClickSendMessage = () => {
    console.log('hi');
  };

  const handleOnChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmitMessage = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const messageToSend = {
      message: message,
      receiver: id, // 사용자 id
    };

    mutate({
      url: `${END_POINT}/messages/create`,
      method: 'post',
      data: messageToSend,
    });
  };

  const handleOnChangeSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const handleOnSubmitFilteringUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(searchUser);
    const filterResult = userList.filter((v, i) => {
      return v.fullName.includes(searchUser);
    });

    setUserLIst(filterResult);
  };

  const MakeUserList = (data: IUser[]) => {
    return data?.map((v, i) => {
      return (
        <div key={v._id}>
          <AuthorContainer onClick={handleOnClickSendMessage}>
            <Avatar src={v.image} width={60} height={60} />
            <AuthorName>{v.fullName}</AuthorName>
            <MessageContainer onSubmit={(e) => handleOnSubmitMessage(e, v._id)}>
              <MessageInput onChange={handleOnChangeMessage}></MessageInput>
              <button type='submit'>보내기</button>
            </MessageContainer>
          </AuthorContainer>
        </div>
      );
    });
  };

  return (
    <>
      {/* <form onSubmit={handleOnSubmitFilteringUser}>
        찾을유저
        <input type='text' onChange={handleOnChangeSearchUser} />
        <button type='submit'>찾기</button>
      </form> */}
      <MessageBox />
      {MakeUserList(userList as IUser[])}
    </>
  );
};

const AuthorContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5rem;
`;

const AuthorName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  text-decoration: underline;
`;
const MessageContainer = styled.form``;
const MessageInput = styled.input``;

export default Message;
