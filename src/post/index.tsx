import { useEffect } from 'react';
import ErrorBoundary from '../api/ErrorBoundary';
import Search from '../search/Index';
import { useLocation, useNavigate } from 'react-router-dom';

function Post() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const videoUrl = 'https://youtu.be/gS8CALiBvEM';

  console.log(currentPath);
  console.log(navigate);

  useEffect(() => {
    if (currentPath === '/') {
      window.location.href = videoUrl;
    }
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </>
  );
}

export default Post;
