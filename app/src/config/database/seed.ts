import "reflect-metadata"; //typeorm
import { AppDataSource } from "./AppDataSource";
import { Pizza } from "@entities/Pizza";
import { Category } from "@entities/Category";

async function clear(): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const categoryRepository = AppDataSource.getRepository(Category);
    const pizzaRepository = AppDataSource.getRepository(Pizza);

    // Nettoyage dans l'ordre inverse des dépendances
    await pizzaRepository.deleteAll();
    await categoryRepository.deleteAll();

    await categoryRepository.save([
      { name: "Tradition" },
      { name: "Contemporaine" }
    ]);

    const traditionCategory: Category | null = await categoryRepository.findOne(
      {
        where: { name: "Tradition" }
      }
    );
    const contemporaineCategory: Category | null =
      await categoryRepository.findOne({
        where: { name: "Contemporaine" }
      });

    await pizzaRepository.save([
      { name: "Margherita", category: traditionCategory! },
      { name: "Marinara", category: traditionCategory! },
      { name: "Regina", category: traditionCategory! },
      { name: "Diavola", category: traditionCategory! },
      { name: "Quattro Stagioni", category: traditionCategory! },
      { name: "Quattro Formaggi", category: traditionCategory! },
      { name: "Americana", category: contemporaineCategory! },
      { name: "Ortolana", category: contemporaineCategory! }
    ]);

    //suppression de la connexion à la base de données
    await AppDataSource.destroy();

    console.log("Database cleared with success");
  } catch (error) {
    console.error(error);
    console.error("Can't clear database");
  }
}

async function seed(): Promise<void> {
  try {
    //suppression des données
    await clear();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const categoryRepository = AppDataSource.getRepository(Category);
    const pizzaRepository = AppDataSource.getRepository(Pizza);

    //suppression de la connexion à la base de données
    await AppDataSource.destroy();

    console.log("Database seeded with success");
  } catch (error) {
    console.error("Can't seed database");
  }
}

//lorsque le fichier seed est exécuté par Bun (via la commande seed du fichier package.json)
//la fonction seed est automatiquement exécutée
seed();
