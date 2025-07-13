import db from '../bd_config/db.js'; // Asegúrate de que la ruta sea correcta

export const mostrarCartas = async (req, res) => {
    try {
        const { edicion, tipo, raza, subRaza, rareza, page = 1 } = req.query;
        const limit = 100;
        const offset = (parseInt(page) - 1) * limit;

        const whereClause = {};

        if (edicion) whereClause['edicion_id'] = edicion;
        if (tipo) whereClause['tipo_id'] = tipo;
        if (raza) whereClause['raza_id'] = raza;
        if (rareza) whereClause['rareza_id'] = rareza;

        const includeSubRaza = {
            model: db.SubRaza,
            attributes: ['id', 'nombre'],
            through: { attributes: [] }
        };

        if (subRaza) {
            includeSubRaza.where = { id: subRaza };
        }

        // ✨ Paginación con count + rows
        const { count, rows: cartas } = await db.Carta.findAndCountAll({
            where: whereClause,
            include: [
                { model: db.Edicion, attributes: ['id', 'nombre'] },
                { model: db.Tipo, attributes: ['id', 'nombre'] },
                { model: db.Raza, attributes: ['id', 'nombre'] },
                includeSubRaza,
                { model: db.Rareza, attributes: ['id', 'nombre'] }
            ],
            order: [['id', 'DESC']],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        // Obtener filtros
        const ediciones = await db.Edicion.findAll({
                order: [['id', 'DESC']]
        });

        const tipos = await db.Tipo.findAll();
        const razas = await db.Raza.findAll();
        const subRazas = await db.SubRaza.findAll();
        const rarezas = await db.Rareza.findAll();

        let mazos = [];
        if (req.session.user && req.session.user.id) {
            mazos = await db.Mazos.findAll({
                where: { usuario_id: req.session.user.id },
                attributes: ['id', 'nombre']
            });
        }

        res.render('cartas', { 
            cartas, 
            ediciones, 
            tipos, 
            razas,
            mazos: mazos || [],
            subRazas, 
            rarezas,
            session: req.session,
            selectedEdicion: edicion || '',
            selectedTipo: tipo || '',
            selectedRaza: raza || '',
            selectedSubRaza: subRaza ? [subRaza] : [],
            selectedRareza: rareza || '',
            page: parseInt(page),
            totalPages
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las cartas');
    }
};



