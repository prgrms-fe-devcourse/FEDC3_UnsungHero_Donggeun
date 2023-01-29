import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IPost } from '../types/post';

import UserPostListItem from './UserPostListItem';

const MobileUserPosts = () => {
  const { id: currentPageId } = useParams();
  const listRef = useRef<HTMLDivElement>(null);
  const { list } = useInfiniteScroll(`/posts/author/${currentPageId}`, listRef);
  return (
    <>
      {list && list.map((post) => <UserPostListItem key={post._id} post={post} />)}
      <div ref={listRef} />
    </>
  );
};

export default MobileUserPosts;
