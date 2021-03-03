// Imports for server stuff
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
// Imports for data models
const User = require('./models/User');
const Task = require('./models/Task');
// Import for database connection
require('./db/mongoose');

// =================== MIDDLEWARE ==================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// =================================================== //

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    try {
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    /*
        We need to make a validation for the possible updates:
        1) We need to get all the keys from request object.
        2) Now we need to iterate over updates and compare if EVERY single update it's
        contained in allowed updates array.
        3) If any of this values doesn't appear in allowed updates array, the validOperation const
        it's going to be false, otherwise, the value it's going to be true.
        4) Now we use the valid operation const to make a evaluation and retrieve error if it's neccesary.
    */
    const allowedUpdates = ['name', 'age', 'password', 'email'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        if (!user) {
            return res.status(404).send({ error: `There is no element with id: ${id}` });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/tasks/:id', async (req, res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));