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
import ErrorBoundary from './api/ErrorBoundary';
import NotFound from './NotFound';
import ScrollToTop from './common/Scroll';
import NotificationComponent from './notification';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/' element={<Post />} />
            <Route path='/notifications' element={<NotificationComponent />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/followers/:id' element={<UserFollowers />} />
            <Route path='/following/:id' element={<UserFollowing />} />
            <Route path='/post/:postId' element={<DetailPost />} />
            <Route path='/post/channelId/updatePost/:postId' element={<UpdatePost />} />
            <Route path='/post/create/:channelId' element={<CreatePost />} />
            <Route path='/channel/:channelId' element={<Search />} />
            <Route path='/userEdit/:id' element={<UserEdit />} />
            <Route path='/search/:channelId' element={<Search />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Router;
