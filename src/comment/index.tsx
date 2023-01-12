import { useState } from 'react';
import useAxios from '../api/useAxios';
import useMutation from '../api/useMutation';
import { IComment } from '../types/comment';
import { IPost } from '../types/post';
import { fetchPost } from './api';

const tempData = {
  postId: '63bbc0d78c65a93bebe29fd4',
  baseUrl: 'http://kdt.frontend.3rd.programmers.co.kr:5006',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
};
const resource = fetchPost<IPost>();

const Comment = () => {
  const post = resource.read();

  const [value, setValue] = useState('');
  const { data, fetchData } = useAxios<IPost>({
    url: `${tempData.baseUrl}/posts/${tempData.postId}`,
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
        postId: tempData.postId,
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
        {post?.comments.map(({ _id, comment }: IComment) => (
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
