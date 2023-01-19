import useMutation from '../api/useMutation';
import { Button } from '../common';
import { END_POINT } from '../api/apiAddress';
import useAxios from '../api/useAxios';
import { useToken } from '../contexts/TokenProvider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IMessage } from '../types/message';
import { Avatar } from '../common';
import styled from 'styled-components';

const MessageBox = () => {
  const [messageList, setMessageList] = useState<IMessage[]>();
  const tokenObject = useToken();
  const token = tokenObject?.token;

  const handleOnClickMessageBox = () => {
    MakeMessageList(messageList as IMessage[]);
  };

  useEffect(() => {
    axios({
      url: `${END_POINT}/messages/conversations`,
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((res) => {
      setMessageList(res.data);
    });
  }, []);

  const MakeMessageList = (messageList: IMessage[]) => {
    return messageList?.map((v, i) => {
      return (
        <div key={v._id}>
          <AuthorContainer>
            <Avatar src={v.sender.image} width={60} height={60}></Avatar>
            <AuthorContainerInfo>
              <AuthorName>보낸이: {v.sender.fullName}</AuthorName>
              <AuthorName>내용: {v.message}</AuthorName>
            </AuthorContainerInfo>
          </AuthorContainer>
        </div>
      );
    });
  };

  return (
    <TempContainer>
      <Button
        text={'메시지함'}
        color={'default'}
        onClick={handleOnClickMessageBox}
        width={6}
        height={6}
        disabled={false}
      ></Button>
      <h1>MessagBox</h1>
      {MakeMessageList(messageList as IMessage[])}
    </TempContainer>
  );
};

const TempContainer = styled.div`
  border: solid black;
`;

const AuthorContainerInfo = styled.div``;

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

export default MessageBox;
