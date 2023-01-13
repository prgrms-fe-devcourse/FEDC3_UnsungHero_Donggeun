import { useState } from 'react';
import { IComment } from '../types/comment';
import { IPost } from '../types/post';
import { createComment, deleteComment, getPost } from './api';

const resource = getPost<IPost>();

const Comment = () => {
  const [post, setPost] = useState<IPost | undefined>(resource.read());
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createComment(value);
    const result = await resource.refetch();

    setPost(result);
    setValue('');
  };

  const handleClickButton = async (id: string) => {
    await deleteComment(id);
    const result = await resource.refetch();

    setPost(result);
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
