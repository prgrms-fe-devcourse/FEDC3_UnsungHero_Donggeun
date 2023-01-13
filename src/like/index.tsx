import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../api/useAxios';
import useMutation from '../api/useMutation';
import { ILike } from '../types/like';
import { IPost } from '../types/post';

const tempData = {
  baseUrl: 'http://kdt.frontend.3rd.programmers.co.kr:5006',
  userId: '63be3977ad5c5114f90101aa',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmJiZjBkOGM2NWE5M2JlYmUyOWZiMiIsImVtYWlsIjoieWpAMTIzLmNvbSJ9LCJpYXQiOjE2NzMyNDg1MjV9.wHXuuSkuHKMKDbaD0weUnGJkRW9P0Ae_k74BlFMWiqY',
};

const Like = () => {
  const { postId } = useParams();

  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState<ILike[]>([]);
  const { data, fetchData } = useAxios<IPost>({
    url: `${tempData.baseUrl}/posts/${postId}`,
    method: 'get',
  });
  const { mutate } = useMutation();

  const handleClickLike = () => {
    isLike ? deleteLike() : createLike();
  };

  const createLike = async () => {
    await mutate({
      url: `${tempData.baseUrl}/likes/create`,
      method: 'post',
      data: {
        postId: postId,
      },
    });

    fetchData();
  };

  const deleteLike = async () => {
    const targetLike = likes?.find(({ user }) => user === tempData.userId);

    await mutate({
      url: `${tempData.baseUrl}/likes/delete`,
      method: 'delete',
      data: { id: targetLike },
    });

    fetchData();
  };

  useEffect(() => {
    setIsLike(likes?.findIndex(({ user }) => user === tempData.userId) > -1 ? true : false);
  }, [likes]);

  useEffect(() => {
    if (data) {
      setLikes(data.likes);
    }
  }, [data]);

  return (
    <>
      <div style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={handleClickLike}>
        {isLike ? '❤️' : '🤍'}
        {data?.likes.length}
      </div>
    </>
  );
};

export default Like;
