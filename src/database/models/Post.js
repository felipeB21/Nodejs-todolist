module.exports = (sequelize, DataTypes) => {
  let alias = "Post";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    tableName: "posts",
  };
  const Post = sequelize.define(alias, cols, config);
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return Post;
};
