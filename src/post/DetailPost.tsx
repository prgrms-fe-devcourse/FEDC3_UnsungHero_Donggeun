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
const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

interface Iauthor {
  fullName: string;
  image: string;
  createAt: string;
  _id: string;
}

const DetailPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState<Iauthor>({
    fullName: '',
    image: PROFIE_IMG_URL,
    createAt: '',
    _id: '',
  });

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

      const author = data?.author;
      const fullName = author.fullName;
      const image = author.image;
      const _id = author._id;

      const createAt = data.createdAt;
      setAuthor({
        fullName: fullName,
        image: image ?? PROFIE_IMG_URL,
        createAt: createAt,
        _id: _id,
      });
    }
  }, [data]);

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/updatePost/${postId}`);
  };

  return (
    <ErrorBoundary>
      <Container>
        <h1>{title}</h1>
        <p>작성일: {author.createAt}</p>
        <Author onClick={() => navigate(`/user/${author._id}`)}>
          <p>작성자: {author.fullName}</p>
          <ProfileImg src={author.image} />
        </Author>
        <Textarea value={content} disabled rows={10} cols={100} />
        <br />
        {token ? <button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</button> : null}
        <Comment />
        <Like />
      </Container>
    </ErrorBoundary>
  );
};

const Textarea = styled.textarea`
  resize: none;
`;

const Author = styled.div`
  background-color: #e6dada;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
`;

export default DetailPost;
