import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/createPost/CreatePost';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import PostDetails from './components/postDetails/PostDetails';
import DriversList from './components/drivers/DriversList';
import Register from './components/register/Register';

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>404 page not found</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/drivers" element={<DriversList />} />
      <Route path="/drivers/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default RouterOutlet;