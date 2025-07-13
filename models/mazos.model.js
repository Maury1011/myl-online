
export default (sequalize, DataTypes) => {
    const Mazo = sequalize.define(
        'Mazo', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            
            usuario_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id'
                }
            },
            nombre: { type: DataTypes.STRING, allowNull: false },
        },
    {
        tableName: 'mazos',
        timestamps: true,
    })

    return Mazo
}