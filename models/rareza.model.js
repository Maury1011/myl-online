export default (sequelize, DataTypes) => {
    
    const Rareza = sequelize.define(
        'Rareza', {
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
        tableName: 'rarezas',
        timestamps: true,
    })

    Rareza.associate = (models) => {
        Rareza.hasMany(models.Carta, {
            foreignKey: 'rareza_id',
            as: 'cartas'
        });
    }

    return Rareza
}