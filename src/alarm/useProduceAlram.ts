import axios from 'axios';

interface IAlram {
  notificationType: string;
  notificationTypeId: string;
  userId: string;
  postId: string;
}

const TOKEN_KEY = 'token';

export const produceAlram = async ({ notificationType, notificationTypeId, userId, postId }: IAlram) => {
  const body = {
    notificationType,
    notificationTypeId,
    userId,
    postId,
  };

  const item = localStorage.getItem(TOKEN_KEY);
  const token = item ? JSON.parse(item) : '';

  await axios
    .post('http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/create', body, {
      headers: { Authorization: `bearer ${token}` },
    })
    .catch((err) => {
      console.log(err);
    });
};
