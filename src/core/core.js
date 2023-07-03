const {User, eventEmitter} = require('./user')

class Core extends User {
    constructor(client) {
        super(client)
    }
}
module.exports = {Core, eventEmitter}