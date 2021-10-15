const inquirer = require('inquirer');
require('colors');

const preguntas =[
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`        
           },  
           {
                value: '2',
                name: `${'2.'.green} Listar tareas`        
            },  
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`        
            }, 
             {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`        
            }, 
             {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`        
            }, 
            {     
                value: '6',
                name: `${'6.'.green} Borrar tarea`        
            }, 
            {
                value: '0',
                name: `${'0.'.green} Salir`        
            },
    ]
    }];
const confirmar = [
    {
        type: 'input',
        name: 'mensaje',
        message: `\nPresione ${'Enter'.green} para continuar`
    }
];

const inquirerMenu = async() => {

    console.log('========================'.green);
    console.log(' Seleccione una opción');
    console.log('========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}

const pausa = async() => {
    console.log('\n');
    const { mensaje } = await inquirer.prompt(confirmar);
    return mensaje;
}
const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'descrip',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {descrip} =  await inquirer.prompt(question);
    return descrip;
}
const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( (tarea,i) => {
        
        const idx = `${i+1}`.green;
        return{
            value: tarea.id,
            name: `${idx }. ${tarea.descrip}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmarBorrado = async(message)=>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}
const listadoTareasCumplir = async( tareas = [] ) => {
    const choices = tareas.map( (tarea,i) => {
        
        const idx = `${i+1}`.green;
        return{
            value: tarea.id,
            name: `${idx }. ${tarea.descrip}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCumplir,
    confirmarBorrado
}