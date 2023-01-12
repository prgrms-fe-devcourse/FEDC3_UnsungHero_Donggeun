import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../api/useAxios';
import useMutation from '../api/useMutation';
import { IPost } from '../types/post';

const tempData = {
  baseUrl: 'http://kdt.frontend.3rd.programmers.co.kr:5006',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
};

const Comment = () => {
  const { postId } = useParams();
  const [value, setValue] = useState('');
  const { data, fetchData } = useAxios<IPost>({
    url: `${tempData.baseUrl}/posts/${postId}`,
    method: 'get',
  });
  const { mutate } = useMutation();

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

  const handleClickButton = (id: string) => {
    deleteComment(id);
  };

  const createComment = async () => {
    await mutate({
      url: `${tempData.baseUrl}/comments/create`,
      method: 'post',
      data: {
        comment: value,
        postId: postId,
      },
    });

    fetchData();
    setValue('');
  };

  const deleteComment = async (id: string) => {
    await mutate({
      url: `${tempData.baseUrl}/comments/delete`,
      method: 'delete',
      data: {
        id,
      },
    });

    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmitInput}>
        <input placeholder='댓글을 입력해주세요' onChange={handleInputValue} value={value} />
        <button>전송</button>
      </form>
      <ul>
        {data?.comments.map(({ _id, comment }) => (
          <li key={_id}>
            {comment}
            <button onClick={() => handleClickButton(_id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comment;
