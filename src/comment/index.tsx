import { useState } from 'react';
import useMutation from '../api/useMutation';
import { IComment } from '../types/comment';
import { IPost } from '../types/post';
import { getPost } from './api';
import { tempData } from './tempData';

let resource = getPost<IPost>();

const Comment = () => {
  const post = resource.read();
  const [value, setValue] = useState('');
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

    resource = getPost<IPost>();
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

    resource = getPost<IPost>();
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
