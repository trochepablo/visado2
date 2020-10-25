class Command {

    constructor() {
        this.unqfy = null;
    }

    execute() {
        throw "Method execute not implemented yet.";
    }

    paramsBuilder(args) {
        const params = [];

        while (args.length > 0) {
            const param = args.shift();
            const value = this.parseValueByType(args.shift());
            params.push({ [param]: value });
        }
        return Object.assign(...params);
    }

    parseValueByType(value) {
        
        // si es number
        if (!Number.isNaN(parseInt(value))) {
            return parseInt(value);
        } 
        // si esta dividido por comas es un array
        if (value.indexOf(',') > 0) { 
            return value.replace(/ /g, '').split(','); // quitar especios en blancos y convetir en array
        }
        // por defecto no parsea, si es string o cualquier otro tipo
        return value;
    }

    setUNQfy(instance) {
        this.unqfy = instance;
    }
}

module.exports = Command;
