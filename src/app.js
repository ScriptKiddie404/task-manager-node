// Imports for server stuff
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// Imports for data models
const User = require('./models/User');
const Task = require('./models/Task');
// Import for database connection
require('./db/mongoose');
// Unnecesary stuff just 4fun and color:
const chalk = require('chalk');
const okColor = chalk.bgGreenBright.black;
const errorColor = chalk.bgRedBright.black;


// =================== MIDDLEWARE ==================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// =================================================== //

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
        console.log(okColor("User created sucessfully!"));
    }).catch((error) => {
        res.status(400).send({ error: error.message });
        console.log(errorColor(error.message));
    });

});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send({ error: error.message });
    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send({ error: 'User not found, lol' });
        }
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send({ error: error.message });
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        console.log(okColor("Task created successfully!"));
        res.status(201).send(task);
    }).catch((error) => {
        console.log(errorColor(error.message));
        res.status(400).send({ error: error.message });
    });
});


app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(error => {
        res.status(500).send({ error: 'lol, something really bad happened!' });
    });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.findById(id).then(task => {
        if (!task) {
            return res.status(404).send({ error: 'there is no such task' });
        }
        res.status(200).send(task);
    }).catch(error => {
        res.status(500).send({ error: error.message });
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));