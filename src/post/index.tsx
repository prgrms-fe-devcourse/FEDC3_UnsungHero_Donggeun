import ErrorBoundary from '../api/ErrorBoundary';
import Search from '../search/Index';
function Post() {
  return (
    <>
      <ErrorBoundary>
        <Search />
        <h1>언성히어로 최고🤗</h1>
      </ErrorBoundary>
    </>
  );
}

export default Post;
