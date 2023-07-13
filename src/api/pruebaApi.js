import axios from 'axios';

const pruebaApi = axios.create({
	baseURL: 'http://localhost:4000',
});

export default pruebaApi;
