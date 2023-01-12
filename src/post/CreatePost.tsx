import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const Container = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
`;

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const { chnnalId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN_KEY');

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleOnClickCreatePost = async () => {
    if (!token) return;

    const newPost = {
      title: title,
      content: content,
    };
    const temp = JSON.stringify(newPost);

    const contentData = {
      title: temp,
      image: image,
      channelId: chnnalId,
    };

    axios
      .post(`${END_POINT}/posts/create`, contentData, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const { _id } = res.data;
        navigate(`/post/${_id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnClickUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <Container>
      <h1>글 작성 페이지</h1>
      <input type='text' size={99} onChange={(e) => handleChangeTitle(e)} placeholder='제목을 입력하세요' />
      <br />
      <textarea
        rows={10}
        cols={100}
        onChange={(e) => handleChangeContent(e)}
        placeholder='내용을 입력하세요'
      />
      <br />
      <input
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={(e) => handleOnClickUploadImage(e)}
      />
      <button onClick={handleOnClickCreatePost}>글 작성</button>
    </Container>
  );
}

export default CreatePost;
