import { GET_PETS } from '../actions/types';
import { CREATE_PET } from '../actions/types';
import { DELETE_PET } from '../actions/types';
import { UPDATE_PET } from '../actions/types';

const initialState = {
	fishes: [],
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PETS:
			console.log('GET_PETS called', payload);
			return {
				...state,
				fishes: payload,
				loading: false,
			};
		case CREATE_PET:
			console.log('CREATE_PET called', payload);
			return {
				...state,
				fishes: [...state.fishes, payload],
				loading: false,
			};
		case DELETE_PET:
			console.log('DELETE_PET called', payload);
			return {
				...state,
				fishes: state.fishes.filter((fish) => fish._id !== payload),
				loading: false,
			};

		case UPDATE_PET:
			console.log('UPDATE_PET called', payload);
			state.fishes.find((fish) => {
				if (fish._id === payload.id) {
					fish.name = payload.name;
					fish.desc = payload.desc;
					fish.age = payload.age;
					fish.dob = payload.dob;
					return {
						...state,
						fishes: [...state.fishes, payload],
						loading: false,
					};
				} else return state;
			});
		default:
			return state;
	}
}
