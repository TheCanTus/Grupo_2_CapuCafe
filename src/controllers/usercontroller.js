const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const user = require('../models/usuarios')
const db = require('../database/models')

const Usuario = db.Usuario;


const { validationResult } = require('express-validator');
const { error } = require('console');

const usercontroller = {
    registrar: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },

    create: (req, res) => {
        let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
        const errors = validationResult(req);

        let userInDB = user.findByField('email', req.body.email);

        if (userInDB) {
            return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
                errors: {
                    email: {
                        msg: 'Este Email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }

        if (errors.isEmpty()) {
            let usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename,
                role: 1,
            }
            archivoUsuarios.push(usuario);
            let nuevoUsuarioGuardar = JSON.stringify(archivoUsuarios, null, 2)
            fs.writeFileSync(path.resolve(__dirname, '../database/usuarios.json'), nuevoUsuarioGuardar);
            res.redirect('/login')
        } else {
            console.log(errors.errors)
            return res.render(path.resolve(__dirname, '../views/users/register.ejs'), { errors: errors.errors, old: req.body });
        }
    },

    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    },

    loginProcess: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Busca el usuario por su email en la base de datos
            const userToLogin = await Usuario.findOne({ where: { email } });

            if (req.session.userLogged) {
                return req.redirect('/users/profile')
            }

            if (!userToLogin) {
                return res.redirect('/users/login', {
                    errors: {
                        email: {
                            msg: 'No se encontró el nombre de usuario'
                        }
                    }
                });
            }

            // Verifica si la contraseña es correcta
            const passwordMatch = bcrypt.compareSync(password, userToLogin.password);

            console.log(passwordMatch);

            if (!passwordMatch) {
                return res.render('../views/users/login.ejs', {
                    errors: {
                        password: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }

            //cookies
            if (req.body.remember_user) {
                res.cookie('userEmail', userToLogin.email, { maxAge: 60 * 60 * 24 * 7 });
            }

            // Elimina la contraseña del objeto usuario antes de almacenarlo en la sesión
            delete userToLogin.password;

            // Almacena al usuario en la sesión
            req.session.userLogged = userToLogin;

            // Redirecciona al perfil del usuario
            res.redirect('/users/profile');
        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
            res.status(500).send("Hubo un error interno del servidor");
        }

        /* let userToLogin = user.findByField('Email', req.body.email);
        if (req.session.userLogged) {
            return req.redirect('/users/profile')
        }
        if (userToLogin) {
            let contraseñaCorrecta = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (contraseñaCorrecta) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                //cookies
                if (req.body.remember_user) {
                    res.cookie('userEmail', userToLogin.email, { maxAge: 60 * 60 * 24 * 7});
                }

                //console.log(req.session)
                return res.redirect('/user/profile')
            }
            return res.render('../views/users/login.ejs', {
                errors: {
                    password: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })


        }
        return res.render('../views/users/login.ejs', {
            errors: {
                email: {
                    msg: 'No se encontró el nombre de usuario'
                }
            }
        }) */

    },

    profile: (req, res) => {
        return res.render('../views/users/profile.ejs', {
            user: req.session.userLogged
        });
    },

    logOut: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        return res.redirect("/");
    }

}


module.exports = usercontroller;
