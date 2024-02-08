const MiddleGlobal = (req, resp, next) => {
    resp.locals.errors = req.flash("errors");
    resp.locals.sucess = req.flash("sucess");
    resp.locals.userID = req.session.userID;
    resp.locals.user = req.session.user;
    next();
}

const MiddleLogin = (req, resp, next) => {
    if(!req.session.user) return req.flash("errors", "Faça login para poder criar contatos!");
    next();
}


module.exports = { MiddleGlobal, MiddleLogin };