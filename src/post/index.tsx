import ErrorBoundary from '../api/ErrorBoundary';
import Comment from '../comment';
import Search from '../search/index';

function Post() {
  return (
    <>
      <h1>언성히어로 최고🤗</h1>
      <Search channelId='63bbe845400746566c234d41' />
    </>
  );
}

export default Post;
