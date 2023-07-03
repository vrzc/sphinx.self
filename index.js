const {Core, eventEmitter} = require("./src/core/core")
module.exports = {Core, on: eventEmitter.on.bind(eventEmitter)}