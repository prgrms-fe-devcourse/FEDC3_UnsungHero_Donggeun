import { useState, useEffect } from 'react';
import { getPost } from '../comment/api';
import { tempData } from '../comment/tempData';
import { ILike } from '../types/like';
import { IPost } from '../types/post';
import { createLike, deleteLike } from './api';

const resource = getPost<IPost>();

const Like = () => {
  let post = resource.read();
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState<ILike[]>([]);

  const handleClickLike = async () => {
    const targetLike = likes?.find(({ user }) => user === tempData.userId);

    if (isLike && targetLike) {
      await deleteLike(targetLike);
    } else {
      await createLike();
    }

    post = resource.read();
  };

  useEffect(() => {
    const userLikeIndex = likes?.findIndex(({ user }) => user === tempData.userId);

    setIsLike(userLikeIndex > -1 ? true : false);
  }, [likes]);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
    }
  }, [post]);

  return (
    <>
      <div style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={handleClickLike}>
        {isLike ? '❤️' : '🤍'}
        {post?.likes.length}
      </div>
    </>
  );
};

export default Like;
