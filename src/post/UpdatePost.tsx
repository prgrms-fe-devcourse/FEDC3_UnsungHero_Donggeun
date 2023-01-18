import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';
import { Button } from '../common';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [channelId, setChannelId] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const { mutate } = useMutation();

  const handleTitleOnChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem(`tempTitleInUpdatePost${postId}`, e.target.value);
  };
  const handleContentOnChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem(`tempContentInUpdatePost${postId}`, e.target.value);
  };

  const { data } = useAxios<IPost>({
    url: `${END_POINT}/posts/${postId}`,
    method: 'get',
  });

  useEffect(() => {
    if (typeof data === 'object') {
      const post = JSON.parse(data?.title as string);
      setTitle(post.title);
      setContent(post.content);

      const tempTitle = localStorage.getItem(`tempTitleInUpdatePost${postId}`) || '';
      const tempContent = localStorage.getItem(`tempContentInUpdatePost${postId}`) || '';

      if (tempTitle) {
        setTitle(tempTitle);
      }
      if (tempContent) {
        setContent(tempContent);
      }

      setChannelId(data.channel._id);
    }
  }, [data]);

  const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postToUpdate = {
      title: title,
      content: content,
    };
    const jsonToUpdate = JSON.stringify(postToUpdate);

    const post = {
      postId: postId,
      title: jsonToUpdate,
      image: null,
      channelId: channelId,
    };

    axios
      .put(`${END_POINT}/posts/update`, post, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        localStorage.removeItem(`tempTitleInUpdatePost${postId}`);
        localStorage.removeItem(`tempContentInUpdatePost${postId}`);

        navigate(`/post/${postId}`);
      });

    // mutate({
    //   url: `${END_POINT}/posts/update`,
    //   method: 'post',
    //   data: {
    //     ...post,
    //   },
    // }).then(() => {
    //   localStorage.removeItem('tempTitleInUpdatePost');
    //   localStorage.removeItem('tempContentInUpdatePost');

    //   navigate(`/post/${postId}`);
    // });
  };

  const handleDeletePost = () => {
    mutate({
      url: `${END_POINT}/posts/delete`,
      method: 'delete',
      data: {
        id: postId,
      },
    }).then(() => navigate(`/channel/${channelId}`));
  };

  return (
    <Form onSubmit={(e) => handleUpdatePost(e)}>
      <TitleInput value={title} onChange={(e) => handleTitleOnChnage(e)} />
      <Content>
        <Textarea
          onChange={(e) => handleContentOnChnage(e)}
          rows={10}
          cols={100}
          value={content}
          placeholder='내용'
        />
      </Content>
      <ButtonContainer>
        <Button
          text='내용 수정'
          color='default'
          width={8}
          height={1.875}
          style={{ marginRight: '2.25rem' }}
        />
        <Button text='글 삭제' color='delete' onClick={handleDeletePost} width={8} height={1.875} />
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 40rem;
  width: 45.3125rem;
  border-radius: 3%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const TitleInput = styled.input`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.larger};
  font-weight: bold;
  margin: 0.625rem;
  padding-bottom: 0.625rem;
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  resize: none;
  border: none;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.medium};
  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  min-height: 32.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.contentLine};
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;

const ImageInput = styled.input`
  padding: 0.5rem;
  background-color: #fafafa;
  border-radius: 3%;
  cursor: pointer;
  &::file-selector-button {
    cursor: pointer;
    border: none;
    /* background-color: #52d2a4; */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export default UpdatePost;
