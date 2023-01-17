import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { useToken, useUserId } from '../contexts/TokenProvider';
import { IComment } from '../types/comment';
import { ILike } from '../types/like';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';

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
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState<Iauthor>({
    fullName: '',
    image: PROFIE_IMG_URL,
    createAt: '',
    _id: '',
  });
  const [comments, setComments] = useState<IComment[]>([]);
  const [likes, setLikes] = useState<ILike[]>([]);

  const { postId } = useParams();

  const tokenObject = useToken();
  const token = tokenObject?.token;

  const userObject = useUserId();
  const userId = userObject?.userId;

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
      setImage(data.image as string);

      setComments(data.comments);

      setLikes(data.likes);
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
        <Div />
        <Author onClick={() => navigate(`/user/${author._id}`)}>
          <p>작성자: {author.fullName}</p>
          <ProfileImg src={author.image} />
        </Author>
        <Div />
        <Textarea value={content} disabled rows={10} cols={100} />
        <Div />
        {token ? <Button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</Button> : null}
        <Comment commentList={comments} postId={postId || ''} />
        <Like likeList={likes} userId={userId || ''} postId={postId || ''} />
      </Container>
      <div>
        <img src={image} alt='이미지!' />
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

const Author = styled.div`
  background-color: #e6dada;
`;

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

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
`;

export default DetailPost;
