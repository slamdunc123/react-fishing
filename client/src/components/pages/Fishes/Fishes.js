import React, { useState, useEffect } from 'react';
import Spinner from '../../partials/Spinner/Spinner';
import FishesForm from './FishesForm';
import FishRecord from './FishRecord';
import FishesTable from './FishesTable';

import { useDispatch, useSelector } from 'react-redux';
import {
	getFishes,
	createFish,
	deleteFish,
	updateFish,
} from '../../../redux/actions/fishActions';
import { resetAlerts } from '../../../redux/actions/alertActions';
import Modal from '../../partials/Modal/Modal';

const Fishes = () => {
	const alerts = useSelector((state) => state.alertReducer);
	const { token, isAuthenticated, user } = useSelector(
		(state) => state.authReducer
	);
	const fishes = useSelector((state) => state.fishReducer.fishes); //gets from rootReducer which has fishReducer imported
	const loading = useSelector((state) => state.fishReducer.loading); //gets from rootReducer which has fishReducer imported
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedFish, setEditedFish] = useState({
		id: '',
		name: '',
		desc: '',
		dob: '',
		age: '',
	});
	const [updatedFish, setUpdatedFish] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [fishId, setFishId] = useState();
	const [display, setDisplay] = useState('records');

	const getUserId = () => {
		let userId;
		if (user !== null) {
			userId = user._id;
		} else {
			userId = localStorage.getItem('userId');
		}
		return userId;
	};

	const handleCreate = (formData) => {
		setShowModal(false);
		setIsEditing(false);
		dispatch(createFish(formData, getUserId()));
	};

	const handleAdd = () => {
		setShowModal(true);
		setIsEditing(false);
		setModalTitle('add');
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
				handleCreate={handleCreate}
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

	const handleDisplay = (e) => {
		const { value } = e.target;
		setDisplay(value);

		console.log(e.target.value);
	};

	const getFishRecordsDisplay = () => {
		return fishes.map((fish) => (
			<div key={fish._id} className='col-lg-4 col-sm-6 mb-4'>
				<FishRecord
					fish={fish}
					handleRemove={handleRemove}
					handleEdit={handleEdit}
					handleAdd={handleAdd}
				/>
			</div>
		));
	};

	const getFishTableDisplay = () => (
		<FishesTable
			fishes={fishes}
			handleRemove={handleRemove}
			handleEdit={handleEdit}
			handleAdd={handleAdd}
		/>
	);

	const getDisplay = () => {
		if (display === 'records') {
			return getFishRecordsDisplay();
		} else {
			return getFishTableDisplay();
		}
	};

	useEffect(() => {
		dispatch(resetAlerts());
		dispatch(getFishes(getUserId()));
		setUpdatedFish(false);
	}, [updatedFish, dispatch]);

	return (
		<div className='container'>
			{showModal ? getModal() : false}
			<h3>Fishes</h3>
			<button
				className='btn'
				disabled={alerts.length > 0}
				onClick={handleAdd}
			>
				<i className='fas fa-plus-circle fa-lg text-success'></i>
			</button>
			<div className='custom-control custom-radio custom-control-inline'>
				<input
					type='radio'
					id='rd_1'
					name='rd'
					className='custom-control-input'
					value='records'
					onClick={handleDisplay}
					checked={display === 'records'}
				/>
				<label className='custom-control-label' htmlFor='rd_1'>
					Records
				</label>
			</div>
			<div className='custom-control custom-radio custom-control-inline'>
				<input
					type='radio'
					id='rd_2'
					name='rd'
					className='custom-control-input'
					value='table'
					onClick={handleDisplay}
					checked={display === 'table'}
				/>
				<label className='custom-control-label' htmlFor='rd_2'>
					Table
				</label>
			</div>
			<div className='row mt-4'>
				{loading ? (
					<Spinner />
				) : fishes.length > 0 ? (
					getDisplay()
				) : (
					<p>No fishes to display - please add one</p>
				)}
			</div>
		</div>
	);
};

export default Fishes;
