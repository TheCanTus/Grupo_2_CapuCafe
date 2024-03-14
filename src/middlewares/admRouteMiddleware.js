function isAdminRoute(req, res, next) {
    if (req.session.userLogged && req.session.userLogged.role === 2) {
        res.locals.isAdmin = true;
        next();
    }
    else{
        return res.redirect('/')
    }
}

module.exports = isAdminRoute