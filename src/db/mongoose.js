const mongoose = require('mongoose');
// Importing the vlaidator instance:
const validator = require('validator');
// Making a connection
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


// Crear el modelo task:
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

// Crear el modelo de usuario:
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error(`'The password must not contains the word \"password\"`);
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});




// // Ejemplo creando una instancia del modelo:
// const yo = new User({
//     name: 'Raymond',
//     email: 'jejeputos@gmail.com',
//     password: 'pedro12password',
//     age: 22
// });

// // Guardar dicha instancia en la DB (prmise version)
// yo.save().then(() => {
//     console.log(yo);
// }).catch(error => {
//     console.log(error);
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

//////////// NEXT → 7