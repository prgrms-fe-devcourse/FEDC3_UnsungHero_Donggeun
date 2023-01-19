import ErrorBoundary from '../api/ErrorBoundary';
import Search from '../search/Index';
function Post() {
  return (
    <>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </>
  );
}

export default Post;
