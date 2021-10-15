require('colors');

const { guardarInfo , leerInfo } = require('./helpers/guardarArchivo.js');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        listadoTareasCumplir,
        confirmarBorrado
    } = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas.js');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerInfo();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    
    do{

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const descrip = await leerInput('Descripción: ');
                tareas.crearTarea( descrip );
                break;
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas);
                break;

            case '3':
                tareas.listarTareasPendientes(false);
                //console.log(tareas);
                break;
        
            case '4':
                tareas.listarTareasPendientes(true);
                //console.log(tareas);
                break;
            case '5':
                const ids = await listadoTareasCumplir(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !=='0' ){
                    const confirma = await confirmarBorrado('¿Está seguro?'); 
                    if( confirma ){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
            break;            
            default:
            break;
        }
        guardarInfo(tareas.listadoArr);
        await pausa();

    }while( opt != 0)
    //pausa();
}

main();