import styled from 'styled-components';
import { IsJsonString } from './isJsonString';
import { useNavigate } from 'react-router-dom';

interface Ilikes {
  _id: string;
}
interface Iauthor {
  fullName: string;
  username: string;
  image: string | undefined;
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
  currentChannelId: string | undefined;
}

const Span = styled.span`
  font-weight: 900;
`;

const PostList = ({
  filteredPostsInfo,
  selectedSearchOption,
  inputSearchValue,
  currentChannelId,
}: IpostListProps) => {
  const navigatePost = useNavigate();

  const selectPostsChannelTitle = () => {
    let PostsChannelTitle = '';
    switch (currentChannelId) {
      case '63b5b7f5a87de522e8646d65':
        PostsChannelTitle = '낚시 채널 게시글';
        break;
      case '63b5b825a87de522e8646d6f':
        PostsChannelTitle = '골프 채널 게시글';
        break;
      case '63bbe845400746566c234d41':
        PostsChannelTitle = '바둑 채널 게시글';
        break;
      default:
        PostsChannelTitle = '전체 게시글';
    }
    return <h2>{PostsChannelTitle}</h2>;
  };

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
    <div>
      {selectPostsChannelTitle()}
      <ul>
        {filteredPostsInfo.map((postInfo, index) => {
          // console.log(postInfo);
          const { title, _id, likes, createdAt } = postInfo;
          const { fullName, image } = postInfo.author; //fullName이 아니라 userName이 닉네임인 경우 변경해야함
          const postTitle = IsJsonString(title) ? JSON.parse(title).title : title;
          const postContent = IsJsonString(title) ? JSON.parse(title).content : ' ';

          return (
            <li key={_id} onClick={() => navigatePost(`/post/${_id}`)}>
              <div>
                <div>
                  제목:{' '}
                  {selectedSearchOption === '제목' || selectedSearchOption === '제목+내용'
                    ? highlightIncludedText(postTitle, inputSearchValue)
                    : postTitle}
                </div>
                <div>공감수: {likes.length}</div>
                <div>
                  {image === undefined ? (
                    <ProfileImg src='https://ifh.cc/g/35RDD6.png' alt='기본 프로필 이미지' />
                  ) : (
                    <ProfileImg src={image} alt='프로필 이미지' />
                  )}
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
    </div>
  );
};
export default PostList;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
