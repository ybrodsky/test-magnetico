export default function (sequelize, DataTypes) {
  const Rent = sequelize.define('Rent', {
    appartment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  }, {
    tableName: 'rents',
    timestamps: false,
  });

  Rent.associate = (models) => {
    Rent.belongsTo(models.Appartment, {
      foreignKey: 'appartment_id',
    });
    Rent.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Rent;
}
