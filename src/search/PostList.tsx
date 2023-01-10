import { FunctionComponent } from 'react';

interface Ilikes {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
}

interface IpostsInfo {
  title: string;
  _id: string;
  author: Iauthor;
  likes: Ilikes[];
}
interface IPostListProps {
  postsInfo: IpostsInfo[];
  selectedSearchValue: string;
  inputSearchValue: string;
}

const PostList: FunctionComponent<IPostListProps> = ({
  postsInfo,
  selectedSearchValue,
  inputSearchValue,
}) => {
  console.log(postsInfo);
  return (
    <ul>
      {postsInfo
        .filter((postInfo) => {
          const { title } = postInfo;
          const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함

          if (selectedSearchValue === '제목') {
            return JSON.parse(title).title.includes(inputSearchValue);
          } else if (selectedSearchValue === '제목+내용') {
            return (
              JSON.parse(title).title.includes(inputSearchValue) ||
              JSON.parse(title).content.includes(inputSearchValue)
            );
          } else if (selectedSearchValue === '작성자') {
            return fullName.includes(inputSearchValue);
          }
        })
        .map((postInfo) => {
          const { title, _id, likes } = postInfo;
          const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          return (
            <li key={_id}>
              <div>
                {JSON.parse(title).title}
                <div>공감수: {likes.length}</div>
                <div>작성자: {fullName}</div>
              </div>
              <div>{JSON.parse(title).content}</div>
            </li>
          );
        })}
    </ul>
  );
};
export default PostList;
