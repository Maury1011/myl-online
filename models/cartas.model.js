

export default (sequelize, DataTypes) => {
    const Carta = sequelize.define(
        'Carta', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: { type: DataTypes.STRING, allowNull: false },
            fuerza: { type: DataTypes.INTEGER, allowNull: true },
            coste: { type: DataTypes.INTEGER, allowNull: true },
            raza_id: { 
                type: DataTypes.INTEGER, 
                allowNull: true,
                references: {
                    model: 'razas',
                    key: 'id'
                }
            },
            tipo_id: { 
                type: DataTypes.INTEGER, 
                allowNull: true,
                references: {
                    model: 'tipos',
                    key: 'id'
                }
            },
            rareza_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false,
                references: {
                    model: 'rarezas',
                    key: 'id'
                }
            },
            habilidad: { type: DataTypes.TEXT, allowNull: true },
            imagen: { type: DataTypes.STRING, allowNull: false },
            url: { type: DataTypes.STRING, allowNull: true },
            edicion_id: { 
                type: DataTypes.INTEGER, 
                allowNull: true,
                references: {
                    model: 'ediciones',
                    key: 'id'
                }
            },
            imperio: { type: DataTypes.BOOLEAN, allowNull: true },
            infanteria: { type: DataTypes.BOOLEAN, allowNull: true },
            vcr: { type: DataTypes.BOOLEAN, allowNull: true },
            unificado: { type: DataTypes.BOOLEAN, allowNull: true },
            primerbloque: { type: DataTypes.BOOLEAN, allowNull: true },
        },
    {
        tableName: 'cartas',
        timestamps: true,
    })

    return Carta
}






