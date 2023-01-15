import { useNavigate } from 'react-router-dom';
import { INotification } from '../types/notification';

const NotificationListItem = ({ _id, seen, comment, like, author, post: postId }: INotification) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${postId}`)}
      style={{
        width: '200px',
        height: '200px',
        marginRight: '20px',
        marginBottom: '10px',
        backgroundColor: seen ? 'red' : 'yellow',
      }}
      key={_id}
    >
      {seen ? <div>----확인 한 댓글----</div> : <div>----확인 전 댓글----</div>}
      {
        <div>
          {author?.fullName}님이 {comment ? '댓글을 남기셨습니다' : '공감을 하셨습니다'}
        </div>
      }
      {<div>글제목 : {comment ? comment?.post.title : like?.post.title}</div>}
    </div>
  );
};

export default NotificationListItem;
