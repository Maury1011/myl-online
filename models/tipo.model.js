export default (sequelize, DataTypes) => { 
    const Tipo = sequelize.define( 
        'Tipo', { 
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
        tableName: 'tipos', 
        timestamps: true, 
    }) 

    Tipo.associate = (models) => {
        Tipo.hasMany(models.Carta, {
            foreignKey: 'tipo_id',
            as: 'cartas'
        });
    }
    
    return Tipo 
}