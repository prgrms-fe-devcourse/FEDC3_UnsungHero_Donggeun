import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './post';
import User from './user';
import UserEdit from './user/UserEdit';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/userEdit/:id" element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
