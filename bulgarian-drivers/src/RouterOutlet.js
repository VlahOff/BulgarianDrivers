import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/createPost-page/CreatePost';
import HomePage from './components/home-page/HomePage';
import Login from './components/login-page/Login';
import Posts from './components/posts-page/Posts';
import Register from './components/register-page/Register';

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>404 page not found</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
};

export default RouterOutlet;