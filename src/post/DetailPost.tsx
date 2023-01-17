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

  const { data, fetchData } = useAxios<IPost>({
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
        <Title>{title}</Title>
        <CreateAt>작성일: {author.createAt}</CreateAt>
        <Div />
        <Author onClick={() => navigate(`/user/${author._id}`)}>
          <ProfileImg src={author.image} />
          <UserName>{author.fullName}</UserName>
        </Author>
        <Div />
        {image ? <ContentImage src={image} alt='이미지!' /> : null}
        <Textarea value={content} disabled rows={10} cols={100} />
        <Like likeList={likes} userId={userId || ''} postId={postId || ''} fetchData={fetchData} />
        <Div />
        {token ? <Button onClick={handleOnClickToUpdatePage}>내용 수정 페이지로 가기</Button> : null}
        <Div />
        <Comment commentList={comments} postId={postId || ''} fetchData={fetchData} />
      </Container>
    </ErrorBoundary>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #c4c4c4;
  padding: 1rem;
  width: 725px;
  box-shadow: 12px 12px 2px 1px rgba(216, 216, 235, 0.2);
`;

const Title = styled.h1`
  font-size: 20px;
`;

const CreateAt = styled.p``;

const UserName = styled.p`
  font-size: 14px;
  margin-left: 0.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
`;

const ContentImage = styled.img`
  margin-bottom: 1rem;
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
  font-size: 16px;
  &:focus {
    background-color: #f0f0f0;
    outline: none;
  }
`;

const Button = styled.button<{ backgroundColor?: string }>`
  padding: 0.5rem;
  align-self: end;
  border: solid #52d2a4;
  border-radius: 5%;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #48b790;
  }
`;

export default DetailPost;
