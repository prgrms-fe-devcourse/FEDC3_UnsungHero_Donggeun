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
    }
  }, [data]);

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/updatePost/${postId}`);
  };

  return (
    <ErrorBoundary>
      <Container>
        <h1>제목: {title}</h1>
        <textarea value={content} disabled rows={10} cols={100} />
        <br />
        {token ? <button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</button> : null}
        <Comment />
        <Like />
      </Container>
    </ErrorBoundary>
  );
};

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

export default DetailPost;
