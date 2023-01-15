import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';
import User from './user';
import UpdatePost from './post/UpdatePost';
import CreatePost from './post/CreatePost';
import DetailPost from './post/DetailPost';
import Search from './search/Index';
// import UserEdit from './user/UserEdit';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/post/:postId' element={<DetailPost />} />
          <Route path='/post/channelId/updatePost/:postId' element={<UpdatePost />} />
          <Route path='/post/create/:chnnalId' element={<CreatePost />} />
          <Route path='/channel/:channelId' element={<Search />} />
          {/* <Route path='/userEdit/:id' element={<UserEdit />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
