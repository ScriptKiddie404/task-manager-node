const express = require('express');
const User = require('../models/User');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find({});
    try {
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    try {
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/users/:id', async (req, res) => {

    const { id } = req.params;
    const allowedUpdates = ['name', 'age', 'password', 'email'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' });
    }

    try {
        // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });

        // 1.- Conseguir el usuario por su ID
        // 2.- Modifiar los campos pasados en el body
        // 3.- Guardar el usuario en la bd
        const user = await User.findById(id); // #1

        if (!user) {
            return res.status(404).send({ error: `There is no element with id: ${id}` });
        }

        updates.forEach(update => user[update] = req.body[update]); //#2
        await user.save(); //#3

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ error: `There is no element with id: ${id}` });
        }
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;