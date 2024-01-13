const path = require('path')

const user = {
    login:(req, res) =>{res.render(path.join(__dirname , '../views/users/login.ejs'));},
    register:(req, res) =>{res.render(path.join(__dirname , '../views/users/register.ejs'));},
    
    loginProcess: (req , res) => {
        let userToLogin = user.findByField('NombreDeUsuario', req.body.NombreDeUsuario);
        if (userToLogin) {
            let contraseñaCorrecta = bycryptjs.compareSync(req.body.contraseña, UserToLogin.contraseña);
            if (contraseñaCorrecta){
                delete userToLogin.contraseña;
                req.session.userLogged = userToLogin;
                return res.redirect('../views/index.ejs')
            }
            return res.render('../views/users/login.ejs', {
                errors : {
                    contraseña: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })
        }
        return res.render('../views/users/login.ejs', {
            errors : {
                email: {
                    msg: 'No se encontró el nombre de usuario'
                }
            }
        })
    },
}


module.exports = user;