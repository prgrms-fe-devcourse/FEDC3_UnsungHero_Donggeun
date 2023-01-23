import { Suspense } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import Loading from '../api/Loading';
import Search from '../search/Index';
function Post() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </Suspense>
  );
}

export default Post;
