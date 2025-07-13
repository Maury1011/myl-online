import db from '../bd_config/db.js';

export const createMazo = async (req, res) => {

    const name = req.body.name;
    const userId = req.session.user.id; // Obtener el ID del usuario de la sesión

    try {

        const newMazo = await db.Mazos.create({
            nombre: name,
            usuario_id: userId // Guardar el ID del usuario que creó el mazo
        });

        res.json({ message: 'Mazo creado exitosamente', mazo: newMazo });
    } catch (error) {
        console.error('Error al crear el mazo', error.message, error.stack);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};