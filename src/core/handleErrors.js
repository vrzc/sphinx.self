class error extends Error {
    constructor(name, message) {
        switch(name) {
            case "syntax":
                super("[Syntax Error]: " + message)
                this.name = ''
                break;
            default:
                super("[Unknown Error]", message)
        }
    }
}
module.exports = {error}