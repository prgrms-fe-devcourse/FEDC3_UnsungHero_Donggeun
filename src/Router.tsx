import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Post from './post';
import User from './user';
import UpdatePost from './post/UpdatePost';
import CreatePost from './post/CreatePost';
import DetailPost from './post/DetailPost';
import Search from './search/Index';
import UserEdit from './user/UserEdit';
import UserFollowers from './user/UserFollowers';
import UserFollowing from './user/UserFollowing';
import { Login, SignUp } from './auth';
import NotificationList from './notification/NotificationList';

import ErrorBoundary from './api/ErrorBoundary';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Post />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/notifications' element={<NotificationList />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/followers' element={<UserFollowers />} />
            <Route path='/following' element={<UserFollowing />} />
            <Route path='/post/:postId' element={<DetailPost />} />
            <Route path='/post/channelId/updatePost/:postId' element={<UpdatePost />} />
            <Route path='/post/create/:channelId' element={<CreatePost />} />
            <Route path='/channel/:channelId' element={<Search />} />
            <Route path='/userEdit/:id' element={<UserEdit />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
