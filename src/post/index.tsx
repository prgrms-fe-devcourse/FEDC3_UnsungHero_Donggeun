import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Like from '../like';
import DetailPost from './DetailPost';

function Post() {
  return (
    <>
      <ErrorBoundary>
        <h1>언성히어로 최고🤗</h1>
        <DetailPost />
        <Comment />
        <Like />
      </ErrorBoundary>
    </>
  );
}

export default Post;
