import axios from 'axios';
import { useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const chnnalId = '63bbe845400746566c234d41';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem('TOKEN_KEY');

  const handleChangeTitle = (e: string) => {
    setTitle(e);
  };
  const handleChangeContent = (e: string) => {
    setContent(e);
  };

  const handleOnClickPost = async () => {
    if (!token) return;

    const newPost = {
      title: title,
      content: content,
    };
    const temp = JSON.stringify(newPost);

    const contentData = {
      title: temp,
      image: null,
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

  return (
    <div>
      <h1>글 작성 페이지</h1>
      <input type='text' onChange={(e) => handleChangeTitle(e.target.value)} placeholder='제목' />
      <br />
      <textarea
        rows={10}
        cols={100}
        onChange={(e) => handleChangeContent(e.target.value)}
        placeholder='내용'
      />
      <br />
      <button onClick={handleOnClickPost}>글 작성</button>
    </div>
  );
}

export default CreatePost;
