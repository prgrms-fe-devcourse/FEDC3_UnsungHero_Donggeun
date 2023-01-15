import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../contexts/TokenProvider';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  const tokenContextObj = useToken();
  const token = tokenContextObj?.token;

  const handleTitleOnChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    localStorage.setItem('tempTitle', e.target.value);
  };
  const handleContentOnChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('tempContent', e.target.value);
  };

  const fetchPost = async () => {
    const result = await axios
      .get(`${END_POINT}/posts/${postId}`)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });
    const post = JSON.parse(result.title);
    setTitle(post.title);
    setContent(post.content);

    const tempTitle = localStorage.getItem('tempTitle') || '';
    const tempContent = localStorage.getItem('tempContent') || '';

    if (tempTitle) {
      setTitle(tempTitle);
    }
    if (tempContent) {
      setContent(tempContent);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
      channelId: '63b5b7f5a87de522e8646d65', // 첫 번 쨰 채널
    };

    axios
      .put(`${END_POINT}/posts/update`, post, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        localStorage.removeItem('tempTitle');
        localStorage.removeItem('tempContent');
      });

    navigate(`/post/${postId}`);
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
