import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { isUserLogged } from './store/auth-actions';

import PageNotFound from './components/404page/PageNotFound';
import CreatePost from './components/createPost/CreatePost';
import DriversList from './components/drivers/DriversList';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import PostDetails from './components/postDetails/PostDetails';
import Profile from './components/profile/Profile';
import UserPosts from './components/profile/UserPosts';
import ProtectedRoute from './ProtectedRoute';
import Register from './components/register/Register';
import Search from './components/search/Search';

const RouterOutlet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLogged());
  }, []);

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/drivers" element={<DriversList />} />
      <Route path="/drivers/:id" element={<PostDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-posts"
        element={
          <ProtectedRoute>
            <UserPosts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouterOutlet;
