import axios from 'axios';

export const httpRequest = async (url, method, data) => {
	return axios({
		url: url,
		method: method,
		data: data,
	})
		.then(res => res.data)
		.catch(err => console.error(err));
};
