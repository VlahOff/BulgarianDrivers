import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthContext from './contexts/authContext';

import CreatePost from './components/createPost/CreatePost';
import DriversList from './components/drivers/DriversList';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import PostDetails from './components/postDetails/PostDetails';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import Search from './components/search/Search';
import ProtectedRoute from './components/UI/ProtectedRoute';

const RouterOutlet = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="*" element={<h1>404 page not found</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/create-post" element={
        <ProtectedRoute user={user}>
          <CreatePost />
        </ProtectedRoute>
      } />
      <Route path="/drivers" element={<DriversList />} />
      <Route path="/drivers/:id" element={<PostDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <ProtectedRoute user={user}>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default RouterOutlet;