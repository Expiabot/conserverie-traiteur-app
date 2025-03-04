# Guide d'installation

Ce document décrit les étapes nécessaires pour installer et configurer l'application de Conserverie et Service Traiteur.

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- MongoDB

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Expiabot/conserverie-traiteur-app.git
cd conserverie-traiteur-app
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env` dans le répertoire `backend` avec les variables suivantes :

```
NODE_ENV=development
PORT=5000
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PAYPAL_CLIENT_ID=votre_client_id_paypal
STRIPE_SECRET_KEY=votre_clé_secrète_stripe
```

### 4. Exécution de l'application

#### Mode développement

```bash
# Dans le répertoire backend
npm run dev

# Dans le répertoire frontend (dans un autre terminal)
npm start
```

#### Mode production

```bash
# Construire le frontend
cd frontend
npm run build

# Lancer le serveur (depuis la racine)
cd ../backend
npm start
```

## Base de données

### Importation des données initiales

Vous pouvez importer des données d'exemple dans la base de données :

```bash
cd backend
npm run data:import
```

### Suppression des données

Pour supprimer toutes les données de la base de données :

```bash
cd backend
npm run data:destroy
```

## Utilisation

L'application sera accessible à l'adresse suivante :

- Frontend : http://localhost:3000
- API Backend : http://localhost:5000/api