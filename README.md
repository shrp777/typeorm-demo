# Démo TypeORM + Bun + MariaDB + Docker

## Endpoints de l'API

- Home : <HTTP GET <http://localhost:3000>
- Read Pizzas : <HTTP GET <http://localhost:3000/pizzas>
- Read Pizza by id : <HTTP GET <http://localhost:3000/pizzas/{id}>
- Read Pizza by id + Pizza's Category : <HTTP GET <http://localhost:3000/pizzas/{id}/category>

- Read Categories : <HTTP GET <http://localhost:3000/categories>
- Read Category by id : <HTTP GET <http://localhost:3000/categories/{id}>
- Read Category by id + Pizzas : <HTTP GET <http://localhost:3000/categories/{id}/pizzas>

## Commandes Docker utiles

Commandes à effectuer depuis la racine du projet.

```bash
# Démarrage des services
docker compose up 

# Démarrage des services en mode détaché
docker compose up -d

# Démarrage des services + build
docker compose up --build

# Activation du mode watch
docker compose up --watch

# Build des images associées aux conteneurs
docker compose build

# Stop les services et supprime les conteneurs
docker compose down

# Stop les services et supprime les conteneurs et les volumes (base de données ré-initialisée)
docker compose down -v
```

## Base de données

- 1. : démarrer les services Docker dans un premier terminal

```bash
docker compose up
```

- 1. : exécuter cette commande dans un second terminal (les services Docker doivent être démarrés)

```bash
docker exec -ti app bun run seed 
```

## Adminer

- URL : <http://localhost:8080>
- serveur : mariadb
- base de données : pizzas
- utilisateur : pizzas
- mot de passe : cf. mariadb/.env

--

!["Logotype Shrp"](https://sherpa.one/images/sherpa-logotype.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
