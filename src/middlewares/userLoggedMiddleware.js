const db = require('../database/models')

const Usuario = db.Usuario;

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    
    try {
        const userFromCookie = await Usuario.findOne({ where: { email: emailInCookie } });
        
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }

        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged; 
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
    }

    next();
}

module.exports = userLoggedMiddleware;