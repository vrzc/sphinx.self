class error extends Error {
    constructor(name, message) {
        switch(name) {
            case "syntax":
                super("[Syntax Error]: " + message)
                this.name = ''
                break;
            case "rate":
                super("[RATE_LIMIT_REACHED]: " + message)
                this.name = ''
                break;
            default:
                super("[Unknown Error]", message)
        }
    }
}
module.exports = {error}