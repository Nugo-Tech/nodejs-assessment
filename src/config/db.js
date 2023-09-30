import { Sequelize } from "sequelize";

export const testDbConnection = async () => {
  try {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
    );
    await sequelize.authenticate().then(() => {
      console.log("Database connection has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
);
