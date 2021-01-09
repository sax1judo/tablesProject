import axios from 'axios';

export const httpRequest = async (url, method, data, responseType) => {
	return axios({
		url: url,
		method: method,
		responseType: responseType === undefined ? null : responseType,
		data: data,
	})
		.then(res => res.data)
		.catch(err => console.error(err));
};
export const exportExcelHttp = async (url, data) => {
	return axios({
		url: url,
		data: data,
		method: 'POST',
		responseType: 'blob',
	})
		.then(res => res)
		.catch(err => console.error(err));
};
