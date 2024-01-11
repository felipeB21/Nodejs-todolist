module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    tableName: "users",
  };
  const User = sequelize.define(alias, cols, config);
  return User;
};
