const db = require('../../database/models');

const Usuario = db.Usuario;

const usersApicontroller = {
    // API usuarios
    'list': (req, res) => {
        Usuario.findAll()
            .then(users => {
                let formattedUsers = users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        detail: "http://localhost:8000/api/users/"+ user.id
                    };
                });

                let respuesta = {
                    count: users.length,
                    users: formattedUsers
                };

                res.json(respuesta);
            })
            .catch(err => {
                console.error('Error al obtener usuarios:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    },
    // API usuarios - Detalle de usuario por ID
    'detail': (req, res) => {
        const userId = req.params.id;

        Usuario.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                // Formatear la respuesta del usuario para excluir información sensible
                const formattedUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profileImageUrl: user.avatar
                };

                // Devolver el objeto literal con la estructura requerida
                res.json(formattedUser);
            })
            .catch(err => {
                console.error('Error al obtener usuario:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    }

}

module.exports = usersApicontroller