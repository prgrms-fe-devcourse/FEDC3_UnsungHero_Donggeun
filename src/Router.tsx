import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';

function Router() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default Router;
