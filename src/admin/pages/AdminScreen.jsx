import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import pruebaApi from '../../api/pruebaApi';

export const AdminScreen = () => {
	//guardar usuarios traidos del backend
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	//guardar productos traidos del backend
	const [cargarProductos, setCargarProductos] = useState([]);

	const cargarUserDB = async () => {
		try {
			const resp = await pruebaApi.get('/admin/usuarios');
			setCargarUsuarios(resp.data.usuarios);
		} catch (error) {
			console.log(error);
		}
	};

	const cargarProductosDB = async () => {
		try {
			const resp = await pruebaApi.get('/admin/productos');

			setCargarProductos(resp.data.productos);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		cargarUserDB();
		cargarProductosDB();
	}, []);

	return (
		<>
			<h1 className="text-center p-3">Admin Page</h1>

			<h3>Usuarios</h3>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>First Name</th>
						<th>Email</th>
					</tr>
				</thead>

				{cargarUsuarios.map((usuario) => {
					return (
						<tbody key={usuario._id}>
							<tr>
								<td>{usuario._id}</td>
								<td>{usuario.name}</td>
								<td>{usuario.email}</td>
							</tr>
						</tbody>
					);
				})}
			</Table>

			<h3 className="mt-5">Productos</h3>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Nombre Producto</th>
						<th>Precio</th>
						<th>Descripcion</th>
					</tr>
				</thead>

				{cargarProductos.map((producto) => {
					return (
						<tbody key={producto._id}>
							<tr>
								<td>{producto._id}</td>
								<td>{producto.name}</td>
								<td>{producto.precio}</td>
								<td>{producto.descripcion}</td>
							</tr>
						</tbody>
					);
				})}
			</Table>
		</>
	);
};
