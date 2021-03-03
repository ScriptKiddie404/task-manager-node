// // Algunas dependencias para dar estilo:
// const chalk = require('chalk');
// const okColor = chalk.bgGreenBright.black;
// const errorColor = chalk.bgRedBright.black;

// // Vamos a realizar un CRUD básico para MongoDB:
// // 1) Importamos mongodb (previamente instalado) -> npm i mongodb
// // Alternativa: const mongodb = require('mongodb')
// // Luego → const MongoClient = mongodb.MongoClient:
// const { MongoClient } = require('mongodb');

// // 2) Definimos los datos que vamos a utilizar
// const URL = 'mongodb://localhost:27017';
// const databaseName = 'task-manager';

// // 3) Usamos el cliente mongo para conectar
// // Parámetros: (URL, objecto, callback)
// MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

//     if (error) {
//         throw error;
//     }

//     console.log(okColor(" Connected correctly! 😀 "));

//     // 4) creamos la base de datos:
//     const db = client.db(databaseName);

//     // // Para buscar por id:
//     // const ObjectID = require('mongodb');
//     // db.collection('users').findOne({_id: new ObjectID('a87d08as7d08as')})...etc



// });


// // Realizar una consulta:
// db.collection('users').findOne({ name: 'Diana' }, (error, result) => {
//     console.log(result);
// });

// // Realizar una consulta que devuelva muchos documentos bajo 1 criterio.

// db.collection('users').find({ age: 11 }).toArray((error, result) => {
//     console.log(result);
// });

// // Devolver absolutamnente todo:
// db.collection('users').find({}).toArray((error, result) => {
//     console.log(result);
// });

// db.collection('users').insertOne({
//     name: 'John Doe',
//     age: 18
// }, (error, result) => {
//     if (error) {
//         return console.log(errorColor(' Unable to insert user, you stayed: 🤡 '));
//     }
//     console.log(result.ops);
// });

// // Un ejemplo de insertMany:
// db.collection('users').insertMany([
//     {
//         name: "Fernando",
//         age: 11
//     },
//     {
//         name: "Diana",
//         age: 30
//     },
//     {
//         name: "Jaja",
//         age: 70
//     }
// ], (error, result) => {
//     if (error) {
//         return console.log(errorColor(' Unable to insert user, you stayed: 🤡 '));
//     }
//     console.log(okColor(`${result.insertedCount} documents successfully inserted 😍 `));
// });



// db.collection('tasks').insertMany([
//     {
//         description: 'This is some random description #1',
//         completed: true
//     },
//     {
//         description: 'This is some random description #2',
//         completed: true
//     },
//     {
//         description: 'This is some random description #3',
//         completed: true
//     }
// ], (error, result) => {
//     if (error) {
//         return console.log(errorColor(' Unable to insert tasks, you stayed: 🤡 '))
//     }

//     console.log(okColor(`${result.insertedCount} documents successfully inserted 😍 `))
//     console.log(okColor(result.ops));

// });



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



// Async await examples

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

const foo = async () => {
    const sum = await add(2, 5);
    return sum;
}

foo().then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
})


// Async bcryt example

const encriptar = async (passowrd) => {
    const hashedPassword = await bcrypt.hash(passowrd, 8);
    const isCorrectPassword = bcrypt.compare(passowrd, hashedPassword);
    console.log(`La contraseña introducida fue: ${passowrd}`);
    console.log(`El hash generado fue: ${hashedPassword}`);
    if (isCorrectPassword) {
        console.log("Las contraseñas coinciden");
    }
}

encriptar("01011999");