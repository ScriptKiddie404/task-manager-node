const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {

    try {
        // Necesitamos validar al usuario:
        // Recuperamos el token y quitamos "bearer"
        const token = req.header('Authorization').replace('Bearer ', '');
        // Verificamos el token, debemos usar el secreto establecido en el schema.
        const decoded = jwt.verify(token, 'dummyscret');
        // Ahora vamos y buscamos al usuario a la base de datos:
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        // Si no encontramos dicho usuario, error:
        if (!user) {
            throw new Error()
        }

        // Guardamos el usuario en el request para manipularlo después:
        req.user = user;
        // También guardamos el token:
        req.token = token;
        // Una vez autenticados finalizamos el middleware y damos acceso a la ruta solicitada:
        next();
    } catch (error) {
        // En caso de que el usuario no esté validado:
        res.status(401).send({ error: 'Invalid authentication.' });
    }

}

module.exports = auth;