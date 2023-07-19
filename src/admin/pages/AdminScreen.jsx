import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pruebaApi from '../../api/pruebaApi';
import { useNavigate } from 'react-router';

export const AdminScreen = () => {
	//guardar usuarios traidos del backend
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	//guardar productos traidos del backend
	const [cargarProductos, setCargarProductos] = useState([]);

	//hook que se encarga de abrir y cerrar el modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	//hook que se encarga de abrir y cerrar el modal de editar
	const [isModalOpenEditar, setIsModalOpenEditar] = useState(false);

	const navigate = useNavigate();

	//hook para almacenar los datos del formulario de agregarProducto
	const [formDate, setFormDate] = useState({
		name: '',
		precio: '',
		descripcion: '',
	});

	//hok para almacenar los datos del formulario de editarProducto
	const [formDateEditar, setFormDateEditar] = useState({
		_id: '',
		name: '',
		precio: '',
		descripcion: '',
	});

	const handleChangeForm = (e) => {
		setFormDate({
			...formDate,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeFormEditar = (e) => {
		setFormDateEditar({
			...formDateEditar,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();

		const { name, precio, descripcion } = formDate;

		//validaciones
		if (name.trim() === '' || precio === '' || descripcion.trim() === '') {
			return console.log('todos los campos son obligatorios');
		}

		guardarProductoDB(name, precio, descripcion);
		setIsModalOpen(false);
	};

	const guardarProductoDB = async (name, precio, descripcion) => {
		try {
			const resp = await pruebaApi.post('/admin/new', {
				name,
				precio,
				descripcion,
			});

			console.log(resp);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const cargarUserDB = async () => {
		try {
			const resp = await pruebaApi.get('/admin/usuarios');
			setCargarUsuarios(resp.data.usuarios);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const cargarProductosDB = async () => {
		try {
			const resp = await pruebaApi.get('/admin/productos');

			setCargarProductos(resp.data.productos);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const eliminarProductoClick = async (id) => {
		try {
			const resp = await pruebaApi.delete(`/admin/eliminar/${id}`);
			console.log(resp);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	const editarProductoClick = (producto) => {
		setIsModalOpenEditar(true);
		setFormDateEditar(producto);
	};

	const handleSubmitFormEditar = (e) => {
		e.preventDefault();

		const { _id, name, precio, descripcion } = formDateEditar;

		//validaciones
		if (name.trim() === '' || precio === '' || descripcion.trim() === '') {
			return console.log('todos los campos son obligatorios');
		}

		editarProductoDB(_id, name, precio, descripcion);
		setIsModalOpenEditar(false);
	};

	const editarProductoDB = async (_id, name, precio, descripcion) => {
		try {
			const resp = await pruebaApi.put('/admin/editar', {
				_id,
				name,
				precio,
				descripcion,
			});

			console.log(resp);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login');
			}
		}
	};

	useEffect(() => {
		cargarUserDB();
		cargarProductosDB();
	}, []);

	useEffect(() => {
		cargarProductosDB();
	}, [editarProductoDB, eliminarProductoClick, guardarProductoDB]);

	useEffect(() => {}, []);

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
						<th>Editar</th>
						<th>Eliminar</th>
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
								<td>
									<button onClick={() => editarProductoClick(producto)}>
										Editar
									</button>
								</td>

								<td>
									<button onClick={() => eliminarProductoClick(producto._id)}>
										Eliminar
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>

			{/* Botón con icono "+" */}
			<div className="d-flex justify-content-end me-5">
				<button
					className="add-product-button border rounded-circle p-3 bg-dark "
					onClick={() => setIsModalOpen(true)}
				>
					<FaPlus className="add-product-icon text-white" />
				</button>
			</div>

			{/* Modal para agregar producto */}
			<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
				<h2>Agregar producto</h2>
				<Form onSubmit={handleSubmitForm}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formDate.name}
							onChange={handleChangeForm}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="precio"
							className="w-50"
							value={formDate.precio}
							onChange={handleChangeForm}
						/>
					</Form.Group>

					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="descripcion"
							className="w-50"
							value={formDate.descripcion}
							onChange={handleChangeForm}
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>

			{/* Modal de Editar */}
			<Modal
				isOpen={isModalOpenEditar}
				onRequestClose={() => setIsModalOpenEditar(false)}
			>
				<h2>Editar producto</h2>
				<Form onSubmit={handleSubmitFormEditar}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formDateEditar.name}
							onChange={handleChangeFormEditar}
							placeholder="Enter email"
							className="w-50"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>precio</Form.Label>
						<Form.Control
							type="number"
							name="precio"
							className="w-50"
							value={formDateEditar.precio}
							onChange={handleChangeFormEditar}
						/>
					</Form.Group>

					<Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
						<Form.Label>Descripcion</Form.Label>
						<textarea
							name="descripcion"
							className="w-50"
							value={formDateEditar.descripcion}
							onChange={handleChangeFormEditar}
						></textarea>
					</Form.Group>
					<Button type="submit">Agregar</Button>
				</Form>
			</Modal>
		</>
	);
};
