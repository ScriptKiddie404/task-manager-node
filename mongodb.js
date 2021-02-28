// Algunas dependencias para dar estilo:
const chalk = require('chalk');
const okColor = chalk.bgGreenBright.black;

// Vamos a realizar un CRUD básico para MongoDB:

// 1) Importamos mongodb (previamente instalado) -> npm i mongodb
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// 2) Definimos los datos que vamos a utilizar
const URL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// 3) Usamos el cliente mongo para conectar
// Parámetros: (URL, objecto, callback)
MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error) {
        console.log('Unable to connect to database');
    }

    console.log(okColor(" 😀 Connected correctly! 😀 "));

    // 4) creamos la base de datos:
    const db = client.db(databaseName);
    // 5) Crear una colecction:
    // db.collection('users').insertOne({
    //     name: 'Fernando',
    //     age: 18
    // });

});