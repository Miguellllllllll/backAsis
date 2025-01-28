const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });

  try {
    await newUser.save();
    res.status(201).send('User added');
  } catch (err) {
    res.status(400).send('Error adding user');
  }
});

router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send('Error fetching users');
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).send('Error updating user');
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(400).send('Error deleting user');
  }
});

module.exports = router;
