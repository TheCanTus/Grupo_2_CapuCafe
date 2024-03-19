function isAdmin(req, res, next) {
    if (req.session.userLogged && req.session.userLogged.rol === 2) {
        res.locals.isAdmin = true;
        next();
    }
    else{
        next()
    }
}

module.exports = isAdmin