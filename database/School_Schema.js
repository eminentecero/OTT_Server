const Sequelize = require("sequelize");

module.exports = class School extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        School_Code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        School_Name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: "School",
        tableName: "School",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.School.hasMany(db.Teacher, {
      foreignKey: "School_Code",
      sourceKey: "School_Code",
    });
    db.School.hasMany(db.Student, {
      foreignKey: "School_Code",
      sourceKey: "School_Code",
    });
  }
};
