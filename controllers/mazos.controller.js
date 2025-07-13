import db from '../bd_config/db.js';

export const obtenerMazos = async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        const usuarioId = req.session.user.id;
        let cartasMazo = parseInt(req.query.cartasMazo, 10);

        // Buscar todos los mazos del usuario
        const mazos = await db.Mazos.findAll({
            where: { usuario_id: usuarioId },
            order: [['id', 'ASC']],
        });

        // Si el usuario no tiene mazos, mostrar mensaje
        if (mazos.length === 0) {
            return res.render('mazosUsuario', {
                cartas: [],
                mazos: [],
                cartasMazo: null,
                nameMazo: 'Sin mazos',
                ediciones: [],
                selectedMazos: [],
                mensaje: 'No tenés mazos disponibles. Creá uno para comenzar.',
            });
        }

        // Si cartasMazo no es un número válido o no pertenece al usuario, usar el primer mazo del usuario
        const mazoValido = mazos.find(m => m.id === cartasMazo);
        if (!mazoValido) {
            cartasMazo = mazos[0].id;
        }

        // Obtener el nombre del mazo
        let nameMazo = await db.Mazos.findOne({
            where: { id: cartasMazo, usuario_id: usuarioId },
        });
        nameMazo = nameMazo ? nameMazo.nombre : 'Sin nombre';

        // Preparar los includes
        const includeMazos = {
            model: db.Mazos,
            attributes: ['id', 'nombre'],
            through: { attributes: [] },
            where: { id: cartasMazo },
        };

        // Cargar ediciones y cartas del mazo
        const ediciones = await db.Edicion.findAll();
        const cartas = await db.Carta.findAll({
            include: [
                { model: db.Edicion, attributes: ['id', 'nombre'] },
                includeMazos,
            ],
            order: [['id', 'ASC']],
            limit: 400,
        });

        // Renderizar vista
        res.render('mazosUsuario', {
            cartas,
            mazos,
            cartasMazo,
            nameMazo,
            ediciones,
            selectedMazos: [cartasMazo],
        });
    } catch (error) {
        console.error('Error al obtener mazos:', error);
        res.status(500).json({ message: 'Error al cargar mazos', error: error.message });
    }
};
