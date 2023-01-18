import axios from 'axios';
import ErrorBoundary from '../api/ErrorBoundary';
import Search from '../search/Index';

function Post() {
  const APItest = () => {
    // fetch(`/api/channels`).then((res) => console.log(res));
    axios({
      method: 'get',
      url: `/api/channels`,
    }).then((res) => console.log(res.data));
  };
  APItest();

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
