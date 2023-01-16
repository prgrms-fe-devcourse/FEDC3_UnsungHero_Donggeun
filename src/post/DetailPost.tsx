import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { useToken } from '../contexts/TokenProvider';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const DetailPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const { postId } = useParams();

  const tokenObject = useToken();
  const token = tokenObject?.token;

  const { data } = useAxios<IPost>({
    url: `${END_POINT}/posts/${postId}`,
    method: 'get',
  });

  useEffect(() => {
    if (typeof data === 'object') {
      const post = JSON.parse(data?.title as string);
      setTitle(post.title);
      setContent(post.content);

      setImage(data.image || '');
    }
  }, [data]);

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/updatePost/${postId}`);
  };

  return (
    <ErrorBoundary>
      <Container>
        <H1>제목: {title}</H1>
        <Div />
        <Textarea value={content} disabled rows={10} cols={100} />
        <Div />
        {token ? <Button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</Button> : null}
        <Comment />
        <Like />
      </Container>
      <div>
        <img src={image} />
      </div>
    </ErrorBoundary>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #c4c4c4;
  border-radius: 3%;
  margin: 5rem;
  padding: 1rem;
  max-width: 50%;
  box-shadow: 12px 12px 2px 1px rgba(216, 216, 235, 0.2);
`;

const H1 = styled.h1``;

const Div = styled.div`
  width: 98%;
  border: solid #c4c4c4 1px;
  margin: 1rem 0;
  justify-content: center;
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  &:focus {
    background-color: #f0f0f0;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  align-self: end;
  border: none;
  border-radius: 5%;
  background-color: #52d2a4;
  color: #ffffff;
`;

export default DetailPost;
