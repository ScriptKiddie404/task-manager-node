const mongoose = require('mongoose');
// Importing the vlaidator instance:
const validator = require('validator');
// Making a connection
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



// Crear el modelo de usuario:
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }

    },
    age: {
        type: Number
    }
});




// // Ejemplo creando una instancia del modelo:
// const yo = new User({
//     name: 'Guadalupe',
//     email: "perra@gmail.com",
//     age: 22
// });

// // Guardar dicha instancia en la DB (prmise version)
// yo.save().then(() => {
//     console.log(yo);
// }).catch(error => {
//     console.log(error);
// });

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// // Creando una instancia de dicha tarea:
// const washDishes = new Task({
//     description: "Wash dishes, lol?",
//     completed: false
// });

// // Guardamos en la base:
// washDishes.save().then(() => {
//     console.log(washDishes)
// }).catch(error => {
//     console.log(error);
// });

//////////// NEXT → 5