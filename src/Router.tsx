import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Post />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
