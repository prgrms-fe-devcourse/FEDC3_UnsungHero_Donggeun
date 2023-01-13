import { useState, useCallback } from 'react';
import { IComment } from '../types/comment';
import { IPost } from '../types/post';
import { createComment, deleteComment, getPost } from './api';

let resource = getPost<IPost>();

const Comment = () => {
  const post = resource.read();
  const [value, setValue] = useState('');
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createComment(value);

    resource = getPost<IPost>();
    setValue('');
  };

  const handleClickButton = async (id: string) => {
    await deleteComment(id);

    resource = getPost<IPost>();
    forceUpdate();
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
