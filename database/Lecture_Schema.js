const Sequelize = require("sequelize");

module.exports = class Lecture extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        class: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        T_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        time: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        video: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        score: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        subject: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Lecture",
        tableName: "Lecture",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Lecture.belongsTo(db.Teacher, {
      foreignKey: "T_code",
      taegetKey: "T_code",
    });
  }
};
