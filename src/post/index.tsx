import { Suspense } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import Loading from '../api/Loading';
import Comment from '../comment';
import Like from '../like';
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate();
  const tempOnClickPostRead = () => {
    navigate('/post/63bfd65b72025f4f5c077349');
  };
  const tempOnClickPostCreate = () => {
    navigate('/post/create/63b5b7f5a87de522e8646d65');
  };

  return (
    <>
      <ErrorBoundary>
        <h1>언성히어로 최고🤗</h1>
        <Suspense fallback={<Loading />}>
          <Comment />
          <Like />
        </Suspense>
        <button onClick={tempOnClickPostRead}>임시 글 읽기 버튼</button>
        <button onClick={tempOnClickPostCreate}>임시 글 쓰기 버튼</button>
      </ErrorBoundary>
    </>
  );
}

export default Post;
