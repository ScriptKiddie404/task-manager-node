const mongoose = require('mongoose');
const { Schema } = mongoose;
// Importing the validator instance:
const validator = require('validator');
// Importing bcrypt to hash
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
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
        minlength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error(`'The password must not contains the word password`);
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

// Definición del Middleware para el schema:
//|||||||||||||||||||||||||||||||||||||||||//
// Debemos usar función normal (usaremos this)
// También debemos asegurarnos
UserSchema.pre('save', async function () {

    if (this.isModified('password')) {
        const ROUNDS_NUMBER = 8;
        this.password = await bcrypt.hash(this.password, ROUNDS_NUMBER);
    }
});


// Convertir schema a modelo
const User = mongoose.model('User', UserSchema);

module.exports = User;