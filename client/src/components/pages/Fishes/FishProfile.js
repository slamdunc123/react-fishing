import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FishesForm from './FishesForm';
import Modal from '../../partials/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	getFishes,
	deleteFish,
	updateFish,
} from '../../../redux/actions/fishActions';
import { resetAlerts } from '../../../redux/actions/alertActions';

const FishProfile = () => {
	const dispatch = useDispatch();
	const fishes = useSelector((state) => state.fishReducer.fishes);
	const alerts = useSelector((state) => state.alertReducer);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editedFish, setEditedFish] = useState({
		id: '',
		name: '',
		desc: '',
	});
	const [updatedFish, setUpdatedFish] = useState(false);
	const [fishId, setFishId] = useState();

	const history = useHistory();
	const { location: pathname } = history;
	const pathUrl = pathname.pathname;
	const pathUrlLastItem = pathUrl.substring(pathUrl.lastIndexOf('/') + 1);
	console.log(pathUrlLastItem);

	const getUserId = () => {
		const userId = localStorage.getItem('userId');
		return userId;
	};

	const handleUpdate = (id, formData) => {
		setShowModal(false);
		setIsEditing(false);
		setUpdatedFish(true);
		dispatch(updateFish(id, formData));
	};

	const handleEdit = (id, name, desc, age, dob) => {
		setShowModal(true);
		setModalTitle('edit');
		setIsEditing(true);
		setEditedFish({
			id: id,
			name: name,
			desc: desc,
			age: age,
			dob: dob,
		});
	};

	const handleDelete = () => {
		setShowModal(false);
		dispatch(deleteFish(fishId));
		history.push('/fishes');
	};

	const handleRemove = (id) => {
		setFishId(id);
		setShowModal(true);
		setModalTitle('delete');
	};

	const getModalBody = () => {
		return modalTitle === 'delete' ? (
			<>
				<h3>Are you sure?</h3>
				<hr />
				<button className='btn btn-danger' onClick={handleDelete}>
					Delete
				</button>
			</>
		) : (
			<FishesForm
				isEditing={isEditing}
				editedFish={editedFish}
				handleUpdate={handleUpdate}
			/>
		);
	};

	const getModal = () => {
		return (
			<Modal
				title={modalTitle}
				body={getModalBody()}
				setShowModal={setShowModal}
			/>
		);
	};

	//TODO: not clear why this is fixing the refresh issue on a selected fish profile page
	let fish;
	if (fishes !== []) {
		fish = fishes.find((fish) => fish._id === pathUrlLastItem);
	}

	useEffect(() => {
		dispatch(resetAlerts());
		dispatch(getFishes(getUserId()));
		setUpdatedFish(false);
	}, [updatedFish, dispatch]);

	return (
		<>
			<div>Fish Profile</div>
			{showModal ? getModal() : false}
			{fish !== undefined ? (
				<div className='card'>
					<div className='text-center'>
						{fish.imageFile ? (
							<img
								src={fish.imageFile}
								alt=''
								class='rounded-circle'
								width='100'
								height='100'
							/>
						) : (
							<i className='fas fa-fish fa-4x text-primary'></i>
						)}
					</div>
					<div className='card-body'>
						<h5 className='card-title text-center'>{fish.name}</h5>
						<p className='card-text'>{fish.desc}</p>
						<div className='row justify-content-center'>
							<button
								onClick={() =>
									handleEdit(
										fish._id,
										fish.name,
										fish.desc,
										fish.age,
										fish.dob
									)
								}
								className='btn'
								disabled={alerts.length > 0}
							>
								<i className='fas fa-pencil-alt text-warning'></i>
							</button>
							<button
								onClick={() => handleRemove(fish._id)}
								className='btn'
								disabled={alerts.length > 0}
							>
								<i className='fas fa-trash text-danger'></i>
							</button>
							<Link
								// className='badge badge-primary'
								className='btn'
								title='reminders'
								to={{
									pathname: '/reminders',
									fishId: pathUrlLastItem,
								}}
							>
								<i className='fas fa-clock text-info'></i>
							</Link>
						</div>
					</div>
				</div>
			) : (
				false
			)}
		</>
	);
};

export default FishProfile;
