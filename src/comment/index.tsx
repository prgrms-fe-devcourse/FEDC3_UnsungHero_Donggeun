import { useState, useEffect } from 'react';

function Comment() {
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

  const createComment = async () => {
    const json = {
      comment: value,
      postId: '63bbc0d78c65a93bebe29fd4',
    };

    const response = await fetch('http://kdt.frontend.3rd.programmers.co.kr:5006/comments/create', {
      method: 'POST',
      headers: {
        Authorization:
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitInput}>
        <input placeholder="댓글 입력해주세요" onChange={handleInputValue} value={value} />
        <button>전송</button>
      </form>
    </>
  );
}

export default Comment;
