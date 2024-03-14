function authMiddleware(req, res, next) {
    if (!req.session.userLogged){
        return res.redirect('/login')
    }else{
        next();
    }
    
}

module.exports = authMiddleware;