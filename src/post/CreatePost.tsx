import axios from 'axios';
import { useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const chnnalId = '63bbe845400746566c234d41';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: string) => {
    setTitle(e);
  };
  const handleContentChange = (e: string) => {
    setContent(e);
  };

  const handleOnClick = async () => {
    const token = localStorage.getItem('TOKEN_KEY');
    if (!token) return;

    const testData = {
      title: title,
      content: content,
    };
    const temp = JSON.stringify(testData);

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
      <input onChange={(e) => handleTitleChange(e.target.value)} placeholder="제목" />
      <br />
      <textarea
        rows={10}
        cols={100}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="내용"
      />
      <br />
      <button onClick={handleOnClick}>글 작성</button>
    </div>
  );
}

export default CreatePost;
