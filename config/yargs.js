const descripcion = {

    demand:true,
    alias:'d',
    desc:'Descripción de la tarea por hacer'
};

const completado = {

    default:true,
    alias:'c',
    desc:'Marca como completado o pendiente la tarea'
};


//importar yargs
const argv = require('yargs')
.command('crear', 'Crear un elemento por hacer', {
    
    descripcion
})
.command('actualizar', 'Actualiza el estado completo de una tarea', {

    descripcion:{
        alias:'d'
    },
    completado
})
.command('borrar', 'Borra una tarea', {

    descripcion:{
        alias:'d'
    }
})
.help()
.argv;

//exportar argv de yargs
module.exports = {
    argv
}