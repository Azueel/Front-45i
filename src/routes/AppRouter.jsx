import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../auth/pages/LoginScreen';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { HomeScreen } from '../home/pages/HomeScreen';
import { AdminScreen } from '../admin/pages/AdminScreen';

export const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/home" element={<HomeScreen />} />
					<Route path="/admin" element={<AdminScreen />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
