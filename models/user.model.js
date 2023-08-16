module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',
    {
        id: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false}
    },
    {
        paranoid: true,
        timestamps: false
    });
    return User;
}