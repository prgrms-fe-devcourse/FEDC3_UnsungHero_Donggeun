import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';
import useMutation from '../api/useMutation';
import useAxios from '../api/useAxios';
import { IPost } from '../types/post';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

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
    localStorage.setItem('tempTitleInUpdatePost', e.target.value);
  };
  const handleContentOnChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('tempContentInUpdatePost', e.target.value);
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

      const tempTitle = localStorage.getItem('tempTitleInUpdatePost') || '';
      const tempContent = localStorage.getItem('tempContentInUpdatePost') || '';

      if (tempTitle) {
        setTitle(tempTitle);
      }
      if (tempContent) {
        setContent(tempContent);
      }

      setChannelId(data.channel._id);
    }
  }, [data]);

  const handleUpdatePost = () => {
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
        localStorage.removeItem('tempTitleInUpdatePost');
        localStorage.removeItem('tempContentInUpdatePost');

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
    axios.delete(`${END_POINT}/posts/delete`, {
      data: {
        id: postId,
      },
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    navigate(`/`);
  };
  return (
    <Container>
      <h1>Update Post</h1>
      <input value={title} onChange={(e) => handleTitleOnChnage(e)} />
      <br />
      <textarea
        onChange={(e) => handleContentOnChnage(e)}
        rows={10}
        cols={100}
        value={content}
        placeholder='내용'
      />
      <br />
      <button onClick={handleUpdatePost}>내용 수정</button>
      <button onClick={handleDeletePost}>글 삭제</button>
    </Container>
  );
};

export default UpdatePost;
