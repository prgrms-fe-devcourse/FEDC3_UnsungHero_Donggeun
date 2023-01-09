import { FunctionComponent } from 'react';

interface PostTitle {
  title: string;
}
interface PostListProps {
  postTitles: PostTitle[];
  selectedSearchValue: string;
  inputSearchValue: string;
}

const PostList: FunctionComponent<PostListProps> = ({
  postTitles,
  selectedSearchValue,
  inputSearchValue,
}) => {
  console.log(postTitles);
  return (
    <ul>
      {postTitles.map((postTitle) => (
        <li>{postTitle.title}</li>
      ))}
    </ul>
  );
};
export default PostList;
