import { FunctionComponent } from 'react';
import styled, { StyledComponent } from 'styled-components';

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
  selectedSearchOption: string;
  inputSearchValue: string;
}

const Span = styled.span`
  font-weight: 900;
`;

const PostList: FunctionComponent<IpostListProps> = ({
  filteredPostsInfo,
  selectedSearchOption,
  inputSearchValue,
}) => {
  const highlightIncludedText = (content: string, searchedValue: string) => {
    const title = content.toLowerCase();
    const searchValue = searchedValue.toLowerCase();
    if (searchValue !== '' && title.includes(searchValue)) {
      const matchText = content.split(new RegExp(`(${searchValue})`, 'gi'));
      return (
        <>
          {matchText.map((text, index) =>
            text.toLowerCase() === searchValue.toLowerCase() ? <Span key={index}>{text}</Span> : text
          )}
        </>
      );
    }
    return content;
  };

  return (
    <>
      <ul>
        {filteredPostsInfo.map((postInfo, index) => {
          const { title, _id, likes, createdAt } = postInfo;
          const { fullName } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          const postTitle = JSON.parse(title).title;
          const postContent = JSON.parse(title).content;

          return (
            <li key={_id}>
              <div>
                <div>
                  제목:{' '}
                  {selectedSearchOption === '제목' || selectedSearchOption === '제목+내용'
                    ? highlightIncludedText(postTitle, inputSearchValue)
                    : postTitle}
                </div>
                <div>공감수: {likes.length}</div>
                <div>
                  닉네임:{' '}
                  {selectedSearchOption === '작성자'
                    ? highlightIncludedText(fullName, inputSearchValue)
                    : fullName}
                </div>
                <div>작성일: {createdAt.slice(0, 10)}</div>
              </div>
              <div>
                내용:{' '}
                {selectedSearchOption === '제목+내용'
                  ? highlightIncludedText(postContent, inputSearchValue)
                  : postContent}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default PostList;
