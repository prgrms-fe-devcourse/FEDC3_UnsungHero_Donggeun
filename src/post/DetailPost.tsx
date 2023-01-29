import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';
import { IPost } from '../types/post';
import { useUserId } from '../contexts/TokenProvider';
import { IComment } from '../types/comment';
import { ILike } from '../types/like';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Avatar, Button } from '../common';
import { END_POINT } from '../api/apiAddress';
import Skeleton from '../common/Skeleton';

interface Iauthor {
  fullName: string;
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
    createAt: '',
    _id: '',
  });
  const [comments, setComments] = useState<IComment[]>([]);
  const [likes, setLikes] = useState<ILike[]>([]);

  const { postId } = useParams();

  const userObject = useUserId();
  const userId = userObject?.userId;

  const {
    data: postData,
    refetch: fetchData,
    isLoading,
  } = useQuery<IPost>(
    [postId],
    async () => {
      return await axios.get(`${END_POINT}/posts/${postId}`).then(({ data }) => data);
    },
    {
      refetchOnMount: true,
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (typeof postData === 'object') {
      const post = JSON.parse(postData?.title as string);
      setTitle(post.title);
      setContent(post.content);

      const author = postData?.author;
      const fullName = author.fullName;
      const _id = author._id;

      const createAt = postData.createdAt;
      setAuthor({
        fullName: fullName,
        createAt: createAt,
        _id: _id,
      });
      setImage(postData.image as string);
      setComments(postData.comments);
      setLikes(postData.likes);
    }
  }, [postData]);

  const handleOnClickToUpdatePage = () => {
    navigate(`/post/channelId/updatePost/${postId}`);
  };

  const identification = author._id === userId ? true : false;

  return (
    <ErrorBoundary>
      <Container>
        <Post>
          {isLoading ? (
            <>
              <Skeleton.Paragraph line={3} />
              <Author>
                <Skeleton.Circle size={60} />
              </Author>
              <Content>
                <ImageWarpper>
                  <Skeleton.Box width={600} height={300} />
                </ImageWarpper>
                <Skeleton.Paragraph line={3} style={{ marginTop: '20px' }} />
              </Content>
            </>
          ) : (
            <>
              <TitleWrapper>
                <Title>
                  <div>{title}</div>
                  <CreateAt>작성일: {author.createAt.slice(0, 10)}</CreateAt>
                </Title>
                {identification ? (
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
                <Avatar src={postData?.author.image} width={60} height={60} />
                <UserName>{author.fullName}</UserName>
              </Author>
              <Content>
                <ImageWarpper>{image && <ContentImage src={image} alt='이미지!' />}</ImageWarpper>
                <ContentText>{content}</ContentText>
              </Content>
            </>
          )}
          <Like
            likeList={likes}
            userId={userId || ''}
            postuserId={postData?.author._id || ''}
            postId={postId || ''}
            fetchData={fetchData}
          />
        </Post>
      </Container>
      <Comment
        commentList={comments}
        userId={postData?.author._id || ''}
        postId={postId || ''}
        fetchData={fetchData}
      />
    </ErrorBoundary>
  );
};

export default DetailPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3125rem;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 45.3125rem;
  min-height: 40rem;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  @media (max-width: ${({ theme }) => theme.media.moblie}) {
    width: 100vw;
  }
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
    word-wrap: break-word;
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
  max-height: 31.25rem;
  max-width: 43.3125rem;
  margin: 1rem 0;
`;

const ImageWarpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 1rem;
  min-height: 32.5rem;
`;

const ContentText = styled.div`
  line-height: 180%;
  white-space: pre-wrap;
  border: none;
  width: 100%;

  font-size: ${({ theme }) => theme.fontSize.medium};
  background-color: ${({ theme }) => theme.colors.white};
  &:focus {
    background-color: #f0f0f0;
    outline: none;
  }

  overflow: hidden;
`;
