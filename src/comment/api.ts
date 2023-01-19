// import { request } from '../api/request';
import useMutation from '../api/useMutation';
import { IPost } from '../types/post';
import { END_POINT } from '../api/apiAddress';

// export const getPost = <T>(postId: string) => {
//   return request<T>(`${tempData.baseUrl}/posts/${postId}`);
// };

const { mutate } = useMutation();

export const createComment = async (value: string, userId: string, postId: string) => {
  const commentData = await mutate({
    url: `${END_POINT}/comments/create`,
    method: 'post',
    data: {
      comment: value,
      postId: postId,
    },
  });

  produceCommentNotification(commentData, userId, postId);
};

export const deleteComment = async (id: string) => {
  try {
    await mutate({
      url: `${END_POINT}/comments/delete`,
      method: 'delete',
      data: {
        id,
      },
    });
  } catch {
    alert('본인의 댓글이 아니므로 삭제할 수 없습니다.');
  }
};

export const produceCommentNotification = (commentData: IPost, userId: string, postId: string) => {
  const body = {
    notificationType: 'COMMENT',
    notificationTypeId: commentData?._id,
    userId,
    postId,
  };

  mutate({
    url: `${END_POINT}/notifications/create`,
    method: 'post',
    data: {
      ...body,
    },
  });
};
