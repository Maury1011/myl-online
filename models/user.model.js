export default (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: true
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Carta, {
            foreignKey: 'usuario_id',
            as: 'mazos'
        });
    }

    return Usuario;
};
