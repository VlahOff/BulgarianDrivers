import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import CreatePost from './pages/createPost/CreatePost';
import DriverDetails from './pages/driverDetails/DriverDetails';
import DriversList from './pages/driversList/DriversList';
import HomePage from './pages/home/HomePage';
import Login from './pages/login/Login';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import UserPosts from './pages/userPosts/UserPosts';

const RouterOutlet = () => {
	return (
		<Routes>
			<Route
				path="*"
				element={<PageNotFound />}
			/>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/search"
				element={<Search />}
			/>
			<Route
				path="/drivers"
				element={<DriversList />}
			/>
			<Route
				path="/drivers/:id"
				element={<DriverDetails />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
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
