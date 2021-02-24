import axios from 'axios';
import { GET_REMINDERS } from './types';
import { CREATE_REMINDER } from './types';
import { DELETE_REMINDER } from './types';
import { UPDATE_REMINDER } from './types';
import { setAlert } from './alertActions';

// get reminders
export const getReminders = (id, fishId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/reminders/${id}?fishId=${fishId}`);

		dispatch({
			type: GET_REMINDERS,
			payload: res.data,
		});
	} catch (err) {
		console.error(err.error);
	}
};

// create reminder
export const createReminder = (formData, userId, fishId) => async (
	dispatch
) => {
	console.log('createReminder fired', formData, userId, fishId);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { ...formData, userId, fishId };
	console.log(body);

	try {
		const res = await axios.post('/api/reminders', body, config);
		console.log(res.data.reminder);

		dispatch({
			type: CREATE_REMINDER,
			payload: res.data.reminder,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

// delete reminder
export const deleteReminder = (id) => async (dispatch) => {
	console.log('deleteReminder fired', id);
	try {
		const res = await axios.delete(`/api/reminders/${id}`, '+77968903859');

		dispatch({
			type: DELETE_REMINDER,
			payload: id,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};

export const updateReminder = (id, formData) => async (dispatch) => {
	console.log('udpateReminder fired', id, formData);
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = formData;
	console.log(body);
	try {
		const res = await axios.put(`/api/reminders/${id}`, body, config); // pass edited reminder id, new formData, headers
		dispatch({
			type: UPDATE_REMINDER,
			payload: res.data,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (err) {
		console.error(err.error);
	}
};
