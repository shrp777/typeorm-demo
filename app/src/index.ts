import "reflect-metadata"; //typeorm
import { AppDataSource } from "./config/database/AppDataSource"; //typeorm
import type { Repository } from "typeorm";
import { Pizza } from "@entities/Pizza";
import { Category } from "@entities/Category";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    console.log(`Server running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Can't connect database");
    //console.error("Database connection failed:", err);
    process.exit(1);
  });

const pizzaRepository: Repository<Pizza> = AppDataSource.getRepository(Pizza);
const categoryRepository: Repository<Category> =
  AppDataSource.getRepository(Category);

const routes = {
  "/": {
    GET: async () => {
      const pizzas = await pizzaRepository.find();
      return Response.json(
        {
          success: true,
          message: "Pizzas Napoli",
          data: {
            endpoints: [
              "HTTP GET /",
              "HTTP GET /pizzas",
              "HTTP GET /pizzas/{id}",
              "HTTP GET /pizzas/{id}/category",
              "HTTP GET /categories",
              "HTTP GET /categories/{id}",
              "HTTP GET /categories/{id}/pizzas"
            ]
          }
        },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/pizzas": {
    GET: async () => {
      const pizzas = await pizzaRepository.find();
      return Response.json(
        { success: true, message: "Pizzas list", data: pizzas },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/pizzas/:id": {
    GET: async (req: any) => {
      const id: number = Number(req.params.id);
      const pizza: Pizza | null = await pizzaRepository.findOne({
        where: { id: id }
      });
      if (!pizza)
        return Response.json(
          { success: false, message: "Pizza not found" },
          {
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      return Response.json(
        { success: true, message: "Pizza found", data: pizza },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/pizzas/:id/category": {
    GET: async (req: any) => {
      const id: number = Number(req.params.id);
      const pizza: Pizza | null = await pizzaRepository.findOne({
        where: { id: id },
        relations: ["category"]
      });

      if (!pizza)
        return Response.json(
          { success: false, message: "Pizza not found" },
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      return Response.json(
        { success: true, message: "Pizza found", data: pizza },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/categories": {
    GET: async () => {
      const categories = await categoryRepository.find();
      return Response.json(
        { success: true, message: "Categories list", data: categories },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/categories/:id": {
    GET: async (req: any) => {
      const id = Number(req.params.id);
      const category: Category | null = await categoryRepository.findOne({
        where: { id: id }
      });

      if (!category)
        return Response.json(
          { success: false, message: "Category not found" },
          { status: 404, headers: { "Content-Type": "application/json" } }
        );

      return Response.json(
        { success: true, message: "Category found", data: category },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/categories/:id/pizzas": {
    GET: async (req: any) => {
      const id = Number(req.params.id);
      const category: Category | null = await categoryRepository.findOne({
        where: { id: id },
        relations: ["pizzas"]
      });

      if (!category)
        return Response.json(
          { success: false, message: "Category not found" },
          { status: 404, headers: { "Content-Type": "application/json" } }
        );

      return Response.json(
        { success: true, message: "Categories list", data: category },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  "/favicon.ico": {
    GET: (req: any) => {
      return new Response("Not Found", { status: 404 });
    }
  }
};

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  routes: routes,
  fetch: Bun.serve
};
