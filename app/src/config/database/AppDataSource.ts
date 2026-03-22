import "reflect-metadata"; //typeorm
import { DataSource } from "typeorm";
import { Pizza } from "@entities/Pizza";
import { Category } from "@entities/Category";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  logging: false,
  entities: [Pizza, Category]
});
