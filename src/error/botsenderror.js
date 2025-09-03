function botsenderror(status, message){
    this.status = status;
    this.message = message;
}

botsenderror.badRequest = function(message) {
    return new botsenderror(400, message)
}

botsenderror.badRequest = function(message) {
    return new botsenderror(400, message)
}

botsenderror.badRequest = function(message) {
    return new botsenderror(500, message)
}

botsenderror.badRequest = function(message) {
    return new botsenderror(403, message)
}


module.exports = botsenderror;