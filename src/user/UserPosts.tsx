import { useState } from 'react';
import { Pagination } from '../common';
import { IPost } from '../types/post';

import UserPostListItem from './UserPostListItem';

interface IProps {
  posts: [];
}

const UserPosts = ({ posts }: IProps) => {
  const [page, setPage] = useState(1);

  const limit = 7;
  const offset = (page - 1) * limit;

  return (
    <>
      {posts &&
        posts
          .slice(offset, offset + limit)
          .map((post: IPost) => <UserPostListItem key={post._id} post={post} />)}
      <Pagination total={posts?.length as number} limit={limit} page={page} setPage={setPage} />
    </>
  );
};

export default UserPosts;
