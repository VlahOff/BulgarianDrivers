import { Route, Routes } from 'react-router-dom';
import HomePage from './components/home-page/HomePage';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="*" element={<h1>404 page not found</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default RouterOutlet;