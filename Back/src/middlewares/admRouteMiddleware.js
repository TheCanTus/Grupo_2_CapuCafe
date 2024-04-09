function isAdminRoute(req, res, next) {
    if (req.session.userLogged && req.session.userLogged.rol === 2) {
        res.locals.isAdmin = true;
        next();
    }
    else{
        return res.redirect('/')
    }
}

module.exports = isAdminRoute