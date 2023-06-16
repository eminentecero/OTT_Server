const Sequelize = require("sequelize");

module.exports = class Teacher extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        School_Code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        T_code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        class: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Teacher",
        tableName: "Teacher",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Teacher.hasMany(db.Lecture, {
      foreignKey: "T_code",
      sourceKey: "T_code",
    });
    db.Teacher.hasMany(db.Student, {
      foreignKey: "T_code",
      sourceKey: "T_code",
    });
    db.Teacher.belongsTo(db.School, {
      foreignKey: "School_Code",
      taegetKey: "School_Code",
    });
  }
};
