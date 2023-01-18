import { useEffect, useState, useRef } from 'react';
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
import { Avatar, Button } from '../common';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

interface Iauthor {
  fullName: string;
  createAt: string;
  _id: string;
}

export interface ITextarea {
  scrollHeight: any;
}

const DetailPost = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState<Iauthor>({
    fullName: '',
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
      const _id = author._id;

      const createAt = data.createdAt;
      setAuthor({
        fullName: fullName,
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
        <Post>
          <TitleWrapper>
            <Title>
              <div>{title}</div>
              <CreateAt>작성일: {author.createAt}</CreateAt>
            </Title>
            {token ? (
              <Button
                text='내용 수정'
                color='default'
                onClick={handleOnClickToUpdatePage}
                width={6.25}
                height={1.875}
              />
            ) : null}
          </TitleWrapper>
          <Author onClick={() => navigate(`/user/${author._id}`)}>
            <Avatar src={data?.author.image} width={60} height={60} />
            <UserName>{author.fullName}</UserName>
          </Author>
          <Content>
            {image && <ContentImage src={image} alt='이미지!' />}
            <Textarea
              value={content}
              disabled
              rows={10}
              cols={100}
              ref={textareaRef}
              scrollHeight={textareaRef.current?.scrollHeight}
            />
          </Content>
          <Like
            likeList={likes}
            userId={userId || ''}
            postuserId={data?.author._id || ''}
            postId={postId || ''}
            fetchData={fetchData}
          />
        </Post>
      </Container>
      <Comment
        commentList={comments}
        userId={data?.author._id || ''}
        postId={postId || ''}
        fetchData={fetchData}
      />
    </ErrorBoundary>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3125rem;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 45.3125rem;
  min-height: 40rem;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const Post = styled.div`
  padding-bottom: 1.625rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 6.25rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const Title = styled.div`
  font-size: 1.375rem;
  > div {
    font-weight: bold;
  }
`;

const CreateAt = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 0.5rem;
`;

const UserName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Author = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const ContentImage = styled.img`
  margin: 1rem 0;
`;

const Content = styled.div`
  margin-top: 1rem;
  min-height: 32.5rem;
`;

const Textarea = styled.textarea<ITextarea>`
  resize: none;
  border: none;
  width: 100%;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background-color: ${({ theme }) => theme.colors.white};
  &:focus {
    background-color: #f0f0f0;
    outline: none;
  }
  height: ${({ scrollHeight }) => `${scrollHeight}px`};
`;

export default DetailPost;
