const db = require('../database/models')

const Usuario = db.Usuario;

async function userLoggedMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        res.locals.isLogged = false;
    } else {
        res.locals.isLogged = true;
    }

    let emailInCookie = req.cookies.userEmail;

    try {
        if (emailInCookie) {
            const userFromCookie = await Usuario.findOne({ where: { email: emailInCookie } });

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
    }

    next();
}

module.exports = userLoggedMiddleware;