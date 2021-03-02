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


// =========== MIDDLEWARE ============= //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
        console.log(okColor("User created sucessfully!"));
    }).catch((error) => {
        res.status(400).send({ error: error.message });
        console.log(errorColor(error.message));
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

app.listen(port, () => console.log(`Listening on port ${port}`));