const Sequelize = require("sequelize");

module.exports = class TimeTable extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        School_Code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        Class: {
          type: Sequelize.INTEGER.UNSIGNED,
          unique: false,
          allowNull: false,
        },
        Mon1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Mon2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Mon3: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Mon4: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Mon5: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Mon6: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue3: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue4: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue5: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Tue6: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed3: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed4: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed5: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Wed6: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu3: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu4: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu5: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Thu6: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri3: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri4: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri5: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Fri6: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: "TimeTable",
        tableName: "TimeTable",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.TimeTable.belongsTo(db.School, {
      foreignKey: "School_Code",
      sourceKey: "School_Code",
    });
  }
};
