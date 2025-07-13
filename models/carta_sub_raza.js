export default (sequelize, DataTypes) => {
    const CartaSubRaza = sequelize.define('CartaSubRaza', {
        carta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cartas', 
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        sub_raza_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sub_raza',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'carta_sub_raza',
        timestamps: false
    });

    return CartaSubRaza;
};
