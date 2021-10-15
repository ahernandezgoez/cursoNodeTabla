const Tarea = require("./tarea");
const fs = require('fs');
require('colors');
const archivo = './db/data.json';

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            listado.push(this._listado[key]);
        });

        return listado;
    }
    
    
    
    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {
          
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        });
        //Object.keys(tareas).forEach(key=>{
        //    const tarea = tareas[key].id;
        //    this._listado[tarea] = tareas[key];
        //});
        //return this._listado;
    }
    crearTarea( descrip = ''){
        const tarea = new Tarea( descrip );
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto( ){
        //this.cargarTareasFromArray(tareas);
        //Object.keys(this._listado).forEach(  (key,index) =>{
        //    if(this._listado[key].completadoEn !== null)
        //    console.log(`${index+1}`.green,  this._listado[key].descrip, ' Completada '.green, ' | ', ' Pendiente'.red);
        //    else console.log(`${index+1}`.red,  this._listado[key].descrip, ' Completada '.red, ' | ', ' Pendiente'.green);
        //})

        this.listadoArr.forEach((tarea,index)=>{
            const i = `${index + 1}`.green;
            const { descrip , completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                        ?   'Completada'.green
                                        :   'Pendiente'.red; 
            console.log(`${i}. ${descrip} :: ${estado}` );
        });
    }
    listarTareasPendientes( pendientes ){
        let i=1;
        let j=1;
        this.listadoArr.forEach((tarea)=>{
            const { descrip , completadoEn } = tarea;
            const estado = ( completadoEn )
                                ?   'Completada'.green
                                :   'Pendiente'.red;
            if( pendientes && completadoEn === null){
                console.log(`${i}. ${descrip} :: ${estado} :: ${completadoEn}` );
                i++;
            }
            if( !pendientes && completadoEn != null){
                console.log(`${j}. ${descrip} :: ${estado}` );
                j++;
            }
            });

    }
    toggleCompletadas( ids = [] ){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }
}
module.exports = Tareas;