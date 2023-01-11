import { useState, useEffect } from 'react';

interface IComment {
  _id: string;
  comment: string;
  author: any; // auth 타입 정의 후 불러오기
  post: string;
  createdAt: string;
  updatedAt: string;
}

function Comment() {
  const [value, setValue] = useState('');
  const [commentList, setCommentList] = useState<IComment[]>();

  const tempData = {
    postId: '63bbc0d78c65a93bebe29fd4',
    baseUrl: 'http://kdt.frontend.3rd.programmers.co.kr:5006',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

  const createComment = async () => {
    const data = {
      comment: value,
      postId: tempData.postId,
    };

    const response = await fetch(`${tempData.baseUrl}/comments/create`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${tempData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      getCommentList();
    }
  };

  const getCommentList = async () => {
    const response = await fetch(`${tempData.baseUrl}/posts/${tempData.postId}`);

    if (response.ok) {
      const { comments } = await response.json();

      setCommentList(comments);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitInput}>
        <input placeholder="댓글을 입력해주세요" onChange={handleInputValue} value={value} />
        <button>전송</button>
      </form>
      <ul>
        {commentList?.map(({ _id, comment }) => (
          <li key={_id}>{comment}</li>
        ))}
      </ul>
    </>
  );
}

export default Comment;
