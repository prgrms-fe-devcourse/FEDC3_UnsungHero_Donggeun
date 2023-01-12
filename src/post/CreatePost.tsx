import axios from 'axios';
import { useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const chnnalId = '63bbe845400746566c234d41'; // params로 받아오면 될듯?

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
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
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnClickUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <div>
      <h1>글 작성 페이지</h1>
      <input type='text' onChange={(e) => handleChangeTitle(e)} placeholder='제목' />
      <br />
      <textarea rows={10} cols={100} onChange={(e) => handleChangeContent(e)} placeholder='내용' />
      <br />
      <button onClick={handleOnClickCreatePost}>글 작성</button>
      <input
        type='file'
        accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={(e) => handleOnClickUploadImage(e)}
      ></input>
    </div>
  );
}

export default CreatePost;
