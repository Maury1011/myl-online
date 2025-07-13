
export default (sequelize, DataTypes) => {
    const SubRaza = sequelize.define(
        'SubRaza', {
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
        tableName: 'sub_raza',
        timestamps: false,
    })

    return SubRaza
}