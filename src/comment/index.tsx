import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  comment: string;
  author: any;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

function Comment() {
  const [value, setValue] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>();

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

  const getCommentList = async () => {
    const response = await fetch(
      'http://kdt.frontend.3rd.programmers.co.kr:5006/posts/63bbc0d78c65a93bebe29fd4',
      {
        method: 'GET',
      }
    );

    if (response.ok) {
      const res = await response.json();
      setCommentList(res.comments);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitInput}>
        <input placeholder="댓글 입력해주세요" onChange={handleInputValue} value={value} />
        <button>전송</button>
      </form>
      <ul>
        {commentList?.map(({ comment }) => (
          <li>{comment}</li>
        ))}
      </ul>
    </>
  );
}

export default Comment;
