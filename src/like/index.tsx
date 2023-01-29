import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ILike } from '../types/like';
import { createLike, deleteLike } from './api';

interface ILikeProps {
  likeList?: ILike[];
  userId: string;
  postId: string;
  postuserId: string;
  fetchData: () => void;
  // refetchPost: () => void;
}

const Like = ({ likeList, userId, postId, postuserId, fetchData }: ILikeProps) => {
  const [isLike, setIsLike] = useState(false);

  const handleClickLike = async () => {
    const targetLike = likeList?.find(({ user }) => user === userId);

    if (isLike && targetLike) {
      await deleteLike(targetLike);
    } else {
      await createLike(postId, postuserId);
    }

    // refetchPost();
    fetchData();
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
  width: 100%;
  text-align: right;
  box-sizing: content-box;
  font-size: 1.375rem;
  cursor: pointer;
`;

export default Like;
