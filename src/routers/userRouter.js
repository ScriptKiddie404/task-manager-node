const express = require('express');
const User = require('../models/User');
const router = new express.Router();
const auth = require('../middleware/auth');

// Crear usuario
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Realizar login
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);

        // Generamos un token para el usuario:
        // IMPORTANTE!: Notar que usamos "user" y no "User", esto es debido a que cada instancia debe tener un token diferente
        // Dentro del equema debemos definir este método con "methods" y no con "statics".
        const token = await user.generateAuthToken();

        res.status(200).send({ user: user.getPublicProfile(), token });
    } catch (error) {
        res.status(400).send();
    }
});

// Obtener la infromación del propio usuario:
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// Logout (eliminar 1 token)
router.post('/users/logout', auth, async (req, res) => {
    try {
        // Removemos el token del arreglo de tokens:
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
        /*
            Explicación:
            req.user.tokens → En auth.js habíamos guardado el user para futuras operacciones, dado que el user
            tiene la propiedad tokens, accedemos a ella (es un array).
            req.user.tokens.filter → Ahora iteramos sobre ese array con la función filter, el filter devuelve un array
            con todos los elementos que hay dado 'true' en el callback que le madamos.
            token → el elemento actual de iteración
            token.token != req.token → es el callback que ejecuta filter.
            El callback dice: "Si elemento que estás iterado es distinto al token que está guardado en response, devuélvelo.".
            Dado que el usuario tiene un token al momento de hacer logout, ese token no es devuelto al array de tokens.
            Por lo tanto al final sólo tenemos un arreglo con los tokens que siguen activos, los cuales pueden ser login's
            en otros dispositivos.
        */

        // Ahora guaradmos el usuario con las modificaciones en la BD:
        await req.user.save();

        // Damos una respuesta:
        res.send();

    } catch (error) {
        req.status(500).send({ error: 'deauth error' });
    }
});

// Logout all (eliminar todas las sesiones)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send({ error: 'Error in deatuhenticate all tokens!' });
    }
});

// Obtener usuario por ID
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

// Actualizar un determinado usuario
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

// Eliminar un usuario
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