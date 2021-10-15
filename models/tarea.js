const { v4: uuid4 } = require('uuid');

class Tarea {

    id = '';
    descrip= '';
    completadoEn= null;

    constructor( descrip ) {
        this.id = uuid4();
        this.descrip = descrip;
        this.completadoEn = null;
    }

}

module.exports = Tarea;