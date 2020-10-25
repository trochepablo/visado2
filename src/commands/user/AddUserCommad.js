const Command = require('../Command');

class AddUserCommand extends Command {
    execute(args) {
        const params = this.paramsBuilder(args);
        const name = params.name;
        this.unqfy.addUser(name);
    }
}

module.exports = AddUserCommand;
