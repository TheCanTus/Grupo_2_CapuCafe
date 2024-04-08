const db = require('../../database/models');

const Usuario = db.Usuario;

const usersApicontroller = {
    // API usuarios
    'list': async (req, res) => {
        try {
            const usuarios = await Usuario.findAll({
                attributes: {
                    exclude: ['password']
                }
            });

            let respuesta = {
                meta: {
                    length: usuarios.length,
                    url: '/api/users',
                    statusCode: 200
                },              
                data: usuarios
            };

            res.status(200).json(respuesta);
        } catch (error) {
            console.error('Error: ' ,error);
            res.status(500).json({
                error: error.message,
                statusCode: 500
            });
        }
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