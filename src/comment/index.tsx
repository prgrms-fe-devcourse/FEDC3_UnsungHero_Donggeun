import { useState } from 'react';
import { IComment } from '../types/comment';
import { createComment, deleteComment } from './api';

interface ICommentProps {
  commentList?: IComment[];
  refetchPost: () => void;
}

const Comment = ({ commentList, refetchPost }: ICommentProps) => {
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createComment(value);
    refetchPost();

    setValue('');
  };

  const handleClickButton = async (id: string) => {
    await deleteComment(id);
    refetchPost();
  };

  return (
    <>
      <form onSubmit={handleSubmitInput}>
        <input placeholder='댓글을 입력해주세요' onChange={handleInputValue} value={value} />
        <button>전송</button>
      </form>
      <ul>
        {commentList?.map(({ _id, comment }: IComment) => (
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
