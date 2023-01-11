interface IComment {
  comment: string;
}

interface IAlarm {
  seen: boolean;
  _id: string;
  comment: IComment;
}

const AlarmListItem = ({ _id, seen, comment }: IAlarm) => {
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

export default AlarmListItem;
