export default (sequelize, DataTypes) => {
    const CartaMazo = sequelize.define(
        'CartaMazo', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            carta_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false,
                references: {
                    model: 'cartas',
                    key: 'id'
                },
                onDelete: 'CASCADE',
            },
            mazo_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false,
                references: {
                    model: 'mazos',
                    key: 'id'
                },
                onDelete: 'CASCADE',
            },
        },
    {
        tableName: 'carta_mazo',
        timestamps: false,
    })

    return CartaMazo
}