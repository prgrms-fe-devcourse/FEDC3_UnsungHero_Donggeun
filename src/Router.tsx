import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './post';
import DetailPost from './post/DetailPost';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
