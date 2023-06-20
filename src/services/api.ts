import axios from 'axios';

const HTTP_HEADERS = {
	default: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	file: {
		'Content-Type': 'multipart/form-data',
		Accept: 'application/json'
	},
	alphanumeric: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json'
	}
};

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: HTTP_HEADERS.default
});

api.interceptors.request.use(
	(config) => Promise.resolve(config),
	(errors) => {
		console.log(errors);
		return Promise.reject(errors);
	}
);

export default api;
