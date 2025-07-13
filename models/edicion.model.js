export default (sequelize, DataTypes) => {
    const Edicion = sequelize.define(
        'Edicion', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: { 
                type: DataTypes.STRING, 
                allowNull: false,
                unique: true,
            }
        },
    {
        tableName: 'ediciones',
        timestamps: true,
    })

    Edicion.associate = (models) => {
        Edicion.hasMany(models.Carta, {
            foreignKey: 'edicion_id',
            as: 'cartas'
        });
    }

    return Edicion
}