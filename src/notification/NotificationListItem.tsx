import { useNavigate } from 'react-router-dom';
import { INotification } from '../types/notification';

const NotificationListItem = ({ _id, seen, comment, like, follow, author, post: postId }: INotification) => {
  const navigate = useNavigate();

  const commentLikeFollowCheeck = like ?? comment ?? follow;

  const renderText = (author: string | undefined) => {
    if (!commentLikeFollowCheeck) return '유효하지 않은 알람입니다.';
    if (comment) return author + '님이 댓글을 남기셨습니다.';
    if (like) return author + '님이 공감을 하셨습니다.';
    if (follow) return author + '님이 팔로우 하셨습니다.';
  };

  const renderTitle = () => {
    const title = '글 제목 => ';
    if (!commentLikeFollowCheeck) return;

    if (comment) {
      return title + JSON.parse(comment?.post.title).title;
    }

    if (like) {
      return title + JSON.parse(like?.post.title as string).title;
    }
  };

  const navigatePage = () => {
    if (!commentLikeFollowCheeck) return;

    if (comment || like) {
      navigate(`/post/${postId}`);
      return;
    }

    navigate(`/user/${author?._id}`);
  };

  return (
    <div
      onClick={navigatePage}
      style={{
        width: '200px',
        height: '200px',
        marginRight: '20px',
        marginBottom: '10px',
        backgroundColor: seen ? 'red' : 'yellow',
      }}
      key={_id}
    >
      {<div>{renderText(author?.fullName)}</div>}
      {<div>{renderTitle()}</div>}
    </div>
  );
};

export default NotificationListItem;
