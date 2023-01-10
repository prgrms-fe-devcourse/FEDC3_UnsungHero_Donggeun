import PostList from './PostList';
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
interface IpostListContainerProps {
  postsInfo: IpostsInfo[];
  selectedSearchValue: string;
  inputSearchValue: string;
}

const PostListContainer: FunctionComponent<IpostListContainerProps> = ({
  postsInfo,
  selectedSearchValue,
  inputSearchValue,
}) => {
  return (
    <>
      <PostList
        postsInfo={postsInfo}
        selectedSearchValue={selectedSearchValue}
        inputSearchValue={inputSearchValue}
      />
    </>
  );
};

export default PostListContainer;
