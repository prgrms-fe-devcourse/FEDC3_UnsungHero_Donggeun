import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';
import User from './user';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/user/:id' element={<User />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
