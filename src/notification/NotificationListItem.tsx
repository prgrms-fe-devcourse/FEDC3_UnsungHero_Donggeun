import { INotification } from '../types/notification';

const NotificationListItem = ({ _id, seen, comment }: INotification) => {
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        marginRight: '20px',
        backgroundColor: seen ? 'red' : 'yellow',
      }}
      key={_id}
    >
      {seen ? <div>----확인 한 댓글----</div> : <div>----확인 전 댓글----</div>}
      {comment?.comment ? <div>{comment.comment}</div> : '댓글 없음'}
    </div>
  );
};

export default NotificationListItem;
