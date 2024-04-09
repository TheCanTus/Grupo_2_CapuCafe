const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models')

const Usuario = db.Usuario;


const { validationResult } = require('express-validator');
const { error } = require('console');

const usercontroller = {

registrar: async (req, res) => {
    res.render(path.resolve(__dirname, '../views/users/register.ejs'));
},

    create: async (req, res) => {
        try {
            const resultValidation = validationResult(req);
            if (!resultValidation.isEmpty()) {
                return res.render('../views/users/register.ejs', {
                    errors: resultValidation.mapped(),
                    old: req.body
                }
                );
            }

            const emailExists = await Usuario.findOne({ where: { email: req.body.email } });
            if (emailExists) {
                //return res.status(400).send('Este Email ya está registrado');
                return res.render('../views/users/register.ejs', {
                    errors: {
                        email: {
                            msg: 'El mail esta en uso'
                        }
                    }
                });
            }

            if (req.body.password !== req.body.confirm_password) {
                //return res.status(400).send('Las contraseñas no coinciden');
                return res.render('../views/users/register.ejs', {
                    errors: {
                        password: {
                            msg: 'Las contraseñas no coinciden'
                        }
                    }
                });
            }

            const newUser = await Usuario.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename,
                rol: 1
            });

            res.redirect('/login');

        } catch (error) {
            console.error('Error en la creación de usuario:', error);
            res.status(500).send("Hubo un error interno del servidor");
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
                        return res.render('../views/users/login.ejs', {
                            errors: {
                                email: {
                                    msg: 'Las credenciales son inválidas'
                                }
                            }
                        });
                    }

                    // Verifica si la contraseña es correcta
                    const passwordMatch = bcrypt.compareSync(password, userToLogin.password);

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
