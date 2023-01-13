import { useState, useEffect } from 'react';
import { tempData } from '../comment/tempData';
import { ILike } from '../types/like';
import { createLike, deleteLike } from './api';

interface ILikeProps {
  likeList?: ILike[];
  refetchPost: () => void;
}

const Like = ({ likeList, refetchPost }: ILikeProps) => {
  const [isLike, setIsLike] = useState(false);

  const handleClickLike = async () => {
    const targetLike = likeList?.find(({ user }) => user === tempData.userId);

    if (isLike && targetLike) {
      await deleteLike(targetLike);
    } else {
      await createLike();
    }

    refetchPost();
  };

  useEffect(() => {
    if (likeList) {
      const userLikeIndex = likeList.findIndex(({ user }) => user === tempData.userId);
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
