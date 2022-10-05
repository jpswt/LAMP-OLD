import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router';
import cookie from 'cookie';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './components/Dashboard';
import RenderBoards from './components/RenderBoards';
import RenderRequests from './components/RenderRequests';
// import VolRequests from './components/volunteer/VolRequests';

export const checkAuth = () => {
	const cookies = cookie.parse(document.cookie);
	return cookies['loggedIn'] ? true : false;
};

const ProtectedRoutes = () => {
	return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Landing />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/register" element={<Register />}></Route>
			<Route element={<ProtectedRoutes />}>
				<Route path="/dashboard" element={<RenderBoards />}></Route>
				<Route path="/sparks" element={<RenderRequests />}></Route>
			</Route>
		</Routes>
	);
};

export default Router;
