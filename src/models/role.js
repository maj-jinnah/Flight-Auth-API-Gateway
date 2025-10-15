'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {through: 'User_Roles', as: 'user'});
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM('admin', 'customer', 'flight_company'),
      allowNull: false,
      defaultValue: 'customer',
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};