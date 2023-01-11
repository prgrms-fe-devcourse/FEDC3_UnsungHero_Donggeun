import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';

function Post() {
  return (
    <ErrorBoundary>
      <Comment />
    </ErrorBoundary>
  );
}

export default Post;
