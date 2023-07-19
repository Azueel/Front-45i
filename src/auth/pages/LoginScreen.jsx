import React, { useState } from 'react';
import '../css/auth.css';
import pruebaApi from '../../api/pruebaApi';
import { useNavigate } from 'react-router';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		//validaciones

		//Mandar Datos al backend
		try {
			const resp = await pruebaApi.post('/auth/login', {
				email,
				password,
			});

			localStorage.setItem('token', resp.data.token);

			navigate('/home');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			<h2>Login</h2>
			<form onSubmit={handleLogin} className="form">
				<input
					type="email"
					placeholder="correo Electronico"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="contraseña"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};
