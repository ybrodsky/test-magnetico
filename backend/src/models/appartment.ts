export default function (sequelize, DataTypes) {
  const Appartment = sequelize.define('Appartment', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    night: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    month: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  }, {
    tableName: 'appartments',
    timestamps: false,
  });

  Appartment.associate = (models) => {
    Appartment.hasMany(models.Rent, {
      foreignKey: 'appartment_id',
    });
  };

  return Appartment;
}
