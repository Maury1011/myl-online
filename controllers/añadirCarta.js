import db from '../bd_config/db.js';

export const añadirCarta = async (req, res) => {

    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { mazoId, cartaId } = req.body; // Asegúrate de que el cuerpo de la solicitud contiene cartaId y mazoId
    console.log('Datos recibidos:', cartaId, mazoId);
    const cartaIds = parseInt(cartaId, 10);
    const mazoIds = parseInt(mazoId, 10);
    try {
        await db.CartasMazo.create({
            carta_id: cartaIds,
            mazo_id: mazoIds
        });

        res.json({ message: 'Carta añadida correctamente al mazo.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al añadir carta al mazo.' });
    }

}




