import React, { useState } from 'react';
import '../css/auth.css';
import pruebaApi from '../../api/pruebaApi.js';
import { useNavigate } from 'react-router';

export const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		//validaciones

		//Mandar Datos al backend
		try {
			const resp = await pruebaApi.post('/auth/new', {
				name,
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
			<h2>Registrarse</h2>
			<form onSubmit={handleRegister} className="form">
				<input
					type="text"
					placeholder="Nombre"
					onChange={(e) => setName(e.target.value)}
				/>
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

				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};
