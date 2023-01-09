import axios from 'axios';
import { useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const chnnalId = '63bbe845400746566c234d41';

const UpdatePost = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const token = localStorage.getItem('TOKEN_KEY');

  const handleOnClick = () => {
    if (!token) return;

    axios.put(`${END_POINT}/posts/update`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div>
      <h1>UpdatePost Component</h1>
      <button onClick={handleOnClick}></button>
    </div>
  );
};

export default UpdatePost;
