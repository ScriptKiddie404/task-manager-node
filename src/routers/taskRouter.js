const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();
const auth = require('../middleware/auth.js');

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
        res.status(200).send(req.user.tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/tasks/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            res.status(404).send({ error: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/tasks/:id', async (req, res) => {

    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update!' });
    }

    try {
        // const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).send({ error: `There is not element with id: ${id}` });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }

});

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ error: `There is no task with id: ${id}` });
        }
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;