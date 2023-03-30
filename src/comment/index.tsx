import styled from 'styled-components';
import { useState } from 'react';
import { IComment } from '../types/comment';
import { createComment, deleteComment } from './api';
import { Avatar, Button } from '../common';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/user';
import { useUserId } from '../contexts/TokenProvider';

interface ICommentProps {
  commentList?: IComment[];
  postId: string;
  userId: string;

  fetchData: () => void;
}

const Comment = ({ commentList, userId, postId, fetchData }: ICommentProps) => {
  const [value, setValue] = useState('');
  const [anonymous, setAnonymous] = useState<boolean>(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 300) {
      e.target.value = e.target.value.slice(0, 300);
    }

    setValue(e.target.value);
  };

  const handleSubmitInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = JSON.stringify({
      comment: value,
      anonymous: anonymous,
    });

    await createComment(newComment, userId, postId);
    fetchData();

    setValue('');
  };

  const handleClickButton = async (id: string) => {
    await deleteComment(id);

    fetchData();
  };

  const navigate = useNavigate();

  const handleClickMoveToUserPage = (author: IUser) => {
    navigate(`/user/${author._id}`);
  };

  const temp = () => {
    setAnonymous(!anonymous);
  };

  const IsJSON = (e: any) => {
    try {
      const result = JSON.parse(e);
      return true;
    } catch {
      return false;
    }
  };

  const loginedUser = useUserId()?.userId;
  const IsAuthore = (e: any) => {
    if (loginedUser === e._id) {
      return true;
    } else if (loginedUser === userId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <CommentForm onSubmit={(e) => handleSubmitInput(e)}>
        <TextArea placeholder='댓글을 입력해주세요' onChange={handleInputValue} value={value} rows={3} />
        <ButtonWrapper>
          <Secret>
            익명
            <input type='checkbox' onChange={temp} />
          </Secret>
          <Button
            text='전송'
            color='white'
            width={5}
            height={1.875}
            style={{ marginTop: '0.875rem', marginLeft: 'auto' }}
          />
        </ButtonWrapper>
      </CommentForm>
      <Ul>
        <CommentTitle>전체 댓글</CommentTitle>
        {commentList && commentList?.length > 0 ? (
          commentList?.map(({ _id, author, comment }: IComment) => (
            <Li key={_id}>
              {IsJSON(comment) ? (
                <>
                  <AuthorContainer onClick={() => handleClickMoveToUserPage(author)}>
                    <Avatar src={author.image} width={60} height={60} />
                    <AuthorName>{author.fullName}</AuthorName>
                  </AuthorContainer>
                  <CommentContainer>
                    {IsAuthore(author) ? (
                      <PCmoment>{JSON.parse(comment).comment}</PCmoment>
                    ) : (
                      <PCmoment>비밀 댓글입니다</PCmoment>
                    )}
                    <ButtonX onClick={() => handleClickButton(_id)}>X</ButtonX>
                  </CommentContainer>
                </>
              ) : (
                <>
                  <AuthorContainer onClick={() => handleClickMoveToUserPage(author)}>
                    <Avatar src={author.image} width={60} height={60} />
                    <AuthorName>{author.fullName}</AuthorName>
                  </AuthorContainer>
                  <CommentContainer>
                    <PCmoment>{comment}</PCmoment>
                    <ButtonX onClick={() => handleClickButton(_id)}>X</ButtonX>
                  </CommentContainer>
                </>
              )}
            </Li>
          ))
        ) : (
          <Nothing>댓글이 없습니다.</Nothing>
        )}
      </Ul>
    </>
  );
};

const CommentForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    margin-right: 1.125rem;
    margin-bottom: 1.125rem;
  }
`;
const TextArea = styled.textarea`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
  padding: 1.875rem 0.625rem 0.625rem 0.625rem;
  width: 95%;
  min-height: 7.5rem;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Ul = styled.ul`
  width: 100%;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

const CommentTitle = styled.p`
  margin: 0 1.25rem;
  padding: 1.5rem 0;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.colors.contentLine};
`;
const Li = styled.li`
  list-style-type: none;
  padding: 0.625rem 1.25rem;
  border-bottom: solid #c4c4c4 1px;
  display: flex;
`;
const AuthorContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5rem;
`;

const AuthorName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.smaller};
  text-decoration: underline;
`;
const CommentContainer = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PCmoment = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
const ButtonX = styled.button`
  margin-left: 1rem;
  padding: 0.4375rem 0.4375rem 0.3125rem 0.4375rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3125rem;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

const Nothing = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.lightGray};
  padding: 0.625rem 0 1.25rem 0;
`;

const Secret = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;

  & input {
    margin-left: 6px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;

export default Comment;
