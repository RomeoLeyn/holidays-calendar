import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../../models/User";
import { HolidaysCalendar } from "../../models/Calendar";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [User, HolidaysCalendar],
});

export default sequelize;