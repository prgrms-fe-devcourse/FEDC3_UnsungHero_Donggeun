import { useState } from 'react';
import styled from 'styled-components';
import { IComment } from '../types/comment';

import { createComment, deleteComment } from './api';

const PROFIE_IMG_URL = 'https://ifh.cc/g/35RDD6.png';

interface ICommentProps {
  commentList?: IComment[];
  postId: string;
  //refetchPost: () => void;
}

const Comment = ({ commentList, postId }: ICommentProps) => {
  const [value, setValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createComment(value, postId);
    //refetchPost();

    setValue('');
  };

  const handleClickButton = async (id: string) => {
    await deleteComment(id);

    //refetchPost();
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmitInput(e)}>
        <TextArea placeholder='댓글을 입력해주세요' onChange={handleInputValue} value={value} rows={3} />
        {/* <Input placeholder='댓글을 입력해주세요' onChange={handleInputValue} value={value} /> */}
        <Button type='submit'>전송</Button>
      </Form>
      <Ul>
        {commentList?.map(({ _id, author, comment }: IComment) => (
          <Li key={_id}>
            <AuthorContainer>
              <AuthorImage src={author.image || PROFIE_IMG_URL} />
              <AuthorName>{author.fullName}</AuthorName>
            </AuthorContainer>
            <CommentContainer>
              <PCmoment>{comment}</PCmoment>
              <ButtonX onClick={() => handleClickButton(_id)}>X</ButtonX>
            </CommentContainer>
          </Li>
        ))}
      </Ul>
    </>
  );
};

const Form = styled.form`
  display: flex;
`;
const TextArea = styled.textarea`
  width: 700px;
  resize: none;
`;
const Button = styled.button`
  margin-left: 0.5rem;
  background-color: #52d2a4;
  border: none;
  color: #ffffff;
  align-self: right;
`;
const Ul = styled.ul``;
const Li = styled.li`
  list-style-type: none;
  border-bottom: solid #c4c4c4 1px;
  display: flex;
  flex-direction: row;
`;
const AuthorContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AuthorImage = styled.img`
  width: 50px;
  border-radius: 50%;
`;
const AuthorName = styled.p`
  font-size: 12px;
  text-decoration: underline;
`;
const CommentContainer = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;
const PCmoment = styled.p`
  font-size: 14px;
  display: block;
`;
const ButtonX = styled.button`
  align-self: flex-end;
  margin-left: 1rem;
  background-color: #fafafa;
  border: none;
  cursor: pointer;
  &:hover {
    background: #48b790;
  }
`;

export default Comment;
