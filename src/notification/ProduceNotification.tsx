import { INotification } from '../types/notification';
import useMutation from '../api/useMutation';

const ProduceNotification = ({ notificationType, notificationTypeId, userId, postId }: INotification) => {
  const body = {
    notificationType,
    notificationTypeId,
    userId,
    postId,
  };

  const { mutate } = useMutation();
  const createNotification = () => {
    mutate({
      url: `http://kdt.frontend.3rd.programmers.co.kr:5006/notifications/create`,
      method: 'post',
      data: {
        ...body,
      },
    });
  };

  return <button onClick={createNotification}>알람 전송</button>;
};

export default ProduceNotification;
