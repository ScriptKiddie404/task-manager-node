const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
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
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        if (!task) {
            return res.status(404).send({ error: `There is not element with id: ${id}` });
        }
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