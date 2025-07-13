import db from '../bd_config/db.js';

export const deleteMazo = async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const mazoId = req.body.mazoId; // Asegúrate de que el cuerpo de la solicitud contiene mazoId

    try {
        await db.Mazos.destroy({
            where: {
                id: mazoId,
                usuario_id: req.session.user.id // Asegúrate de que el mazo pertenece al usuario autenticado
            }
        });

        res.json({ message: 'Mazo eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el mazo.' });
    }
}














