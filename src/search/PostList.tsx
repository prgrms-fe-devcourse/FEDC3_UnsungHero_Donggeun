import { FunctionComponent } from 'react';

interface Ilikes {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
}

interface IfilteredPostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
  createdAt: string;
}
interface IpostListProps {
  filteredPostsInfo: IfilteredPostsInfo[];
}

const PostList: FunctionComponent<IpostListProps> = ({ filteredPostsInfo }) => {
  return (
    <>
      <ul>
        {filteredPostsInfo.map((postInfo, index) => {
          const { title, _id, likes, createdAt } = postInfo;
          const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          return (
            <li key={_id}>
              <div>
                <div>제목: {JSON.parse(title).title}</div>
                <div>공감수: {likes.length}</div>
                <div>닉네임: {fullName}</div>
                <div>작성일: {createdAt.slice(0, 10)}</div>
              </div>
              <div>내용: {JSON.parse(title).content}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default PostList;
