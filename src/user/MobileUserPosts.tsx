import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { IPost } from '../types/post';

import UserPostListItem from './UserPostListItem';

const MobileUserPosts = () => {
  const { id: currentPageId } = useParams();
  const listRef = useRef<HTMLDivElement>(null);
  const InfiniteScrollProps = {
    url: `/posts/author/${currentPageId}`,
    loader: listRef,
  };
  const { list } = useIntersectionObserver(InfiniteScrollProps);
  const userPostList = list as IPost[];
  return (
    <>
      {userPostList && userPostList.map((post) => <UserPostListItem key={post._id} post={post} />)}
      <div ref={listRef} />
    </>
  );
};

export default MobileUserPosts;
