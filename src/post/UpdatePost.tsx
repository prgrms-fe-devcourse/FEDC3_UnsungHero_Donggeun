import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';

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
      <Div />
      <Textarea
        onChange={(e) => handleContentOnChnage(e)}
        rows={10}
        cols={100}
        value={content}
        placeholder='내용'
      />
      <Div />
      <Button type='submit'>내용 수정</Button>
      <Button onClick={handleDeletePost} backgroundColor={'red'}>
        글 삭제
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 725px;
  border: solid 1px #c4c4c4;
  border-radius: 3%;
  box-shadow: 12px 12px 2px 1px rgba(216, 216, 235, 0.2);
`;

const TitleInput = styled.input`
  border: none;
  font-size: 20px;
  &:focus {
    background-color: #fafafa;
    outline: none;
  }
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
    background-color: #fafafa;
    outline: none;
  }
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

const Button = styled.button<{ backgroundColor?: string }>`
  width: 200px;
  align-self: end;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#52d2a4')};
  color: #ffffff;
  border: none;
  border-radius: 5%;
  cursor: pointer;
`;

export default UpdatePost;
