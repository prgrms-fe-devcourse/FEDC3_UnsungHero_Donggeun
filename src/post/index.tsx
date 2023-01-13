import { Suspense } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import Loading from '../api/Loading';
import Comment from '../comment';
import Like from '../like';

function Post() {
  return (
    <>
      <ErrorBoundary>
        <h1>언성히어로 최고🤗</h1>
        <Suspense fallback={<Loading />}>
          <Comment />
          <Like />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Post;
