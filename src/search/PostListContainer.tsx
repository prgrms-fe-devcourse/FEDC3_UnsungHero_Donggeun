import PostList from './PostList';
import { FunctionComponent } from 'react';

interface PostTitle {
  title: string;
}
interface PostListContainerProps {
  postTitles: PostTitle[];
  selectedSearchValue: string;
  inputSearchValue: string;
}

const PostListContainer: FunctionComponent<PostListContainerProps> = ({
  postTitles,
  selectedSearchValue,
  inputSearchValue,
}) => {
  return (
    <>
      <PostList
        postTitles={postTitles}
        selectedSearchValue={selectedSearchValue}
        inputSearchValue={inputSearchValue}
      />
    </>
  );
};

export default PostListContainer;
