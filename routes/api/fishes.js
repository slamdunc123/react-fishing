const express = require('express');
const router = express.Router();
const config = require('config');
const Fish = require('../../models/Fish');

// @router  GET api/fishes - http://localhost:5000/api/fishes
// @desc    fishes test route
// @access  Public
// router.get('/', (req, res) => res.send('fishes test route'));

// @router  GET api/fishes - http://localhost:5000/api/fishes
// @desc    Get all fishes
// @access  Public

router.get('/', async (req, res) => {
	try {
		const fishes = await Fish.find();
		res.json(fishes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @router  GET api/fishes - http://localhost:5000/api/fishes/1
// @desc    Get fish by userId
// @access  Public

router.get('/:userId', async (req, res) => {
	console.log(req.params);
	try {
		const fishes = await Fish.find({ userId: req.params.userId });
		res.json(fishes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route POST api/fishes
// @desc Create an fish
// @access Public

router.post('/', async (req, res) => {
	console.log('req.body', req.body);
	const { userId, name, desc } = req.body;
	try {
		// check if fish naem already exists
		let fish = await Fish.findOne({
			userId: userId,
			name: name,
		});
		if (fish) {
			return res.status(400).json({
				errors: [{ msg: 'Fish already exists' }],
			});
		}

		const newFish = new Fish({
			name: req.body.name,
			desc: req.body.desc,
			age: req.body.age,
			dob: req.body.dob,
			imageFile: req.body.imageFile,
			userId: req.body.userId,
		});
		console.log('newFish', newFish);
		// save item to database
		fish = await newFish.save();
		res.json({ fish: fish, msg: 'Fish created' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route DELETE api/fishes
// @desc Delete an fish
// @access Public

router.delete('/:id', async (req, res) => {
	try {
		// check if fish exists
		const fish = await Fish.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!fish) {
			return res.status(404).json({
				msg: 'Fish not found',
			});
		}

		await fish.remove();

		res.json({
			msg: 'Fish deleted successfully.',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route UPDATE api/fishes
// @desc Update an fish
// @access Public

router.put('/:id', async (req, res) => {
	try {
		// check if fish exists
		let fish = await Fish.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!fish) {
			return res.status(404).json({
				msg: 'Fish not found',
			});
		}
		fish = await Fish.findByIdAndUpdate(req.params.id, req.body);
		await res.json({
			msg: 'Item updated successfully.',
			fish: fish,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
