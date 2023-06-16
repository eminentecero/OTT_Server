const Sequelize = require("sequelize");

module.exports = class Student extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        S_code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        class: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Student",
        tableName: "Student",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Student.belongsTo(db.Teacher, {
      foreignKey: "T_code",
      taegetKey: "T_code",
    });
    db.Student.belongsTo(db.School, {
      foreignKey: "School_Code",
      taegetKey: "School_Code",
    });
  }
};
