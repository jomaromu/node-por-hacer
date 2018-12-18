const fs = require('fs');

//arreglo vacío que tendrá los por hacer
let listadoPorHacer = [];

//funcion que convierte el array en objeto json
let guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    //guardar data en el archivo data.json
    fs.writeFile('./db/data.json', data, (err) => {

        if(err) throw new Error('No se pudo grabar la información');
    })
}

//funcion que carga la base de datos
const cargarDB = () => {

    //evaluar si la base de datos no contiene datos
    try {

        //meter la base de datos en el arreglo listadoPorHacer
        listadoPorHacer = require('../db/data.json');
        
    } catch (error) {
        
        listadoPorHacer = [];
    }
}

//funcion que crea el por hacer
let crear = (descripcion) => {

    cargarDB();

    //objeto que contiene la descripcion
    let porHacer = {

        descripcion,
        completado:false
    };

    //meter el objeto porHacer dentro del arreglo listadoPorHacer
    listadoPorHacer.push(porHacer);

    guardarDB();

    //devolver el objeto
    return porHacer;
}

//funcion que obtiene el listado de cosas por hacer
const getListado = () => {

    cargarDB();
    return listadoPorHacer;

}

//funcion que actualiza las cosas por hacer
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >= 0){

        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    }else{

        return false;
    }
}

//funcion que borra una tarea
const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {

        return tarea.descripcion !== descripcion;
    });

    if(listadoPorHacer.length === nuevoListado.length){

        return false;

    }else{

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {

    crear,
    getListado,
    actualizar,
    borrar
}
