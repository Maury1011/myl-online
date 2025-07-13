export default (sequelize, DataTypes) => {
    const Raza = sequelize.define(
        'Raza', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: { 
                type: DataTypes.STRING, 
                allowNull: false,
                unique: true,
            },
        },
    {
        tableName: 'razas',
        timestamps: true,
    })

    Raza.associate = (models) => {
        Raza.hasMany(models.Carta, {
            foreignKey: 'raza_id',
            as: 'cartas'
        });
    };

    return Raza
}