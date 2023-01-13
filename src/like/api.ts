import useMutation from '../api/useMutation';
import { tempData } from '../comment/tempData';
import { ILike } from '../types/like';

const { mutate } = useMutation();

export const createLike = async () => {
  await mutate({
    url: `${tempData.baseUrl}/likes/create`,
    method: 'post',
    data: {
      postId: tempData.postId,
    },
  });
};

export const deleteLike = async (targetLike: ILike) => {
  await mutate({
    url: `${tempData.baseUrl}/likes/delete`,
    method: 'delete',
    data: { id: targetLike },
  });
};
