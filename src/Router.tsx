import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';
import User from './user';
import UpdatePost from './post/UpdatePost';
import CreatePost from './post/CreatePost';
import DetailPost from './post/DetailPost';

// import UserEdit from './user/UserEdit';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/user/:id' element={<User />} />
          <Route path='/post/:postId' element={<DetailPost />} />
          <Route path='/post/channelId/updatePost/:postId' element={<UpdatePost />} />
          <Route path='/post/create/channelId' element={<CreatePost />} />
          {/* <Route path='/userEdit/:id' element={<UserEdit />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
