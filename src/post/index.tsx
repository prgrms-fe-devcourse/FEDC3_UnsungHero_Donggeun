import axios from 'axios';
import ErrorBoundary from '../api/ErrorBoundary';
import Search from '../search/Index';

const END_POINT = `http://kdt.frontend.3rd.programmers.co.kr:5006`;
function Post() {
  const APItest = () => {
    axios.get(END_POINT).then((res) => console.log(`response is here ${res}`));
  };
  APItest();

  return (
    <>
      <div>API TEST</div>
      {/* <ErrorBoundary>
        <Search />
        <h1>언성히어로 최고🤗</h1>
      </ErrorBoundary> */}
    </>
  );
}

export default Post;
