import axios from 'axios';
import { GET_PETS } from './types';
import { CREATE_PET } from './types';
import { DELETE_PET } from './types';
import { UPDATE_PET } from './types';
import { setAlert } from './alertActions';

// get fishes
export const getFishes = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/fishes/${id}`);

		dispatch({
			type: GET_PETS,
			payload: res.data,
		});
	} catch (err) {
		console.error(err.error);
	}
};

// create fish
export const createFish = (formData, userId) => async (dispatch) => {
	console.log('createFish fired', formData, userId);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { ...formData, userId };
	console.log(body);

	try {
		const res = await axios.post('/api/fishes', body, config);
		console.log(res.data.fish);

		dispatch({
			type: CREATE_PET,
			payload: res.data.fish,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

// delete fish
export const deleteFish = (id) => async (dispatch) => {
	console.log('deleteFish fired', id);
	try {
		const res = await axios.delete(`/api/fishes/${id}`);

		dispatch({
			type: DELETE_PET,
			payload: id,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};

export const updateFish = (id, formData) => async (dispatch) => {
	console.log('udpateFish fired', id, formData);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = formData;
	console.log(body);
	try {
		const res = await axios.put(`/api/fishes/${id}`, body, config); // pass edited fish id, new formData, headers
		dispatch({
			type: UPDATE_PET,
			payload: res.data,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};
