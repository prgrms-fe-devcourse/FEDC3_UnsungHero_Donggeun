import useMutation from '../api/useMutation';
import { tempData } from '../comment/tempData';
import { ILike } from '../types/like';
import { IPost } from '../types/post';

const { mutate } = useMutation();

export const createLike = async (postId: string, userId: string) => {
  const likeData = await mutate({
    url: `${tempData.baseUrl}/likes/create`,
    method: 'post',
    data: {
      postId: postId,
    },
  });

  produceLikeNotification(likeData, userId, postId);
};

export const deleteLike = async (targetLike: ILike) => {
  await mutate({
    url: `${tempData.baseUrl}/likes/delete`,
    method: 'delete',
    data: { id: targetLike },
  });
};

const produceLikeNotification = (likeData: IPost, userId: string, postId: string) => {
  const body = {
    notificationType: 'LIKE',
    notificationTypeId: likeData?._id,
    userId,
    postId,
  };

  mutate({
    url: `http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/create`,
    method: 'post',
    data: {
      ...body,
    },
  });
};
