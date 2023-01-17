import { useState, useEffect } from 'react';
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
      <div style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={handleClickLike}>
        {isLike ? '❤️' : '🤍'}
        {likeList?.length}
      </div>
    </>
  );
};

export default Like;
