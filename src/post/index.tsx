import { Suspense } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';

function Post() {
  return (
    <>
      <ErrorBoundary>
        <h1>언성히어로 최고🤗</h1>
        <Suspense fallback={<div>loading...</div>}>
          <Comment />
          <Like />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Post;
