import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ILike } from '../types/like';
import { createLike, deleteLike } from './api';

interface ILikeProps {
  likeList?: ILike[];
  userId: string;
  postId: string;
  // refetchPost: () => void;
}

const Like = ({ likeList, userId, postId }: ILikeProps) => {
  const [isLike, setIsLike] = useState(false);

  const handleClickLike = async () => {
    const targetLike = likeList?.find(({ user }) => user === userId);

    if (isLike && targetLike) {
      await deleteLike(targetLike);
    } else {
      await createLike(postId);
    }

    // refetchPost();
  };

  useEffect(() => {
    if (likeList) {
      const userLikeIndex = likeList.findIndex(({ user }) => user === userId);
      setIsLike(userLikeIndex > -1 ? true : false);
    }
  }, [likeList]);

  return (
    <>
      <LikeContainer onClick={handleClickLike}>
        {isLike ? '❤️' : '🤍'}
        {likeList?.length}
      </LikeContainer>
    </>
  );
};

const LikeContainer = styled.div`
  width: 7%;
  box-sizing: content-box;
  font-size: 22px;
  cursor: pointer;
`;

export default Like;
