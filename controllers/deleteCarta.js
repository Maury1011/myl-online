import db from "../bd_config/db.js";

export const deleteCarta = async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { cartaId ,mazoId } = req.body; // Asegúrate de que el cuerpo de la solicitud contiene cartaId y mazoId
    console.log('Datos recibidos para eliminar:', cartaId, mazoId);
    const cartaIds = parseInt(cartaId, 10);
    const mazoIds = parseInt(mazoId, 10);

    try {
        await db.CartasMazo.destroy({
            where: {
                carta_id: cartaIds,
                mazo_id: mazoIds
            }
        });

        res.json({ message: 'Carta eliminada correctamente del mazo.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar carta del mazo.' });
    }
}