// Import for database connection
require('./db/mongoose');
// Imports for server stuff
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
// Import routers:
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');

// =================================================== //
// =================== MIDDLEWARE ==================== //
// =================================================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// =================================================== //
// =================== ROUTERS ======================= //
// =================================================== //
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});