import useMutation from '../api/useMutation';
import { ILike } from '../types/like';
import { IPost } from '../types/post';

const { mutate } = useMutation();

export const createLike = async (postId: string, userId: string) => {
  const likeData = await mutate({
    url: `/likes/create`,
    method: 'post',
    data: {
      postId: postId,
    },
  });

  produceLikeNotification(likeData, userId, postId);
};

export const deleteLike = async (targetLike: ILike) => {
  await mutate({
    url: `/likes/delete`,
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
    url: `/api/notifications/create`,
    method: 'post',
    data: {
      ...body,
    },
  });
};
