# 📚 Système de Gestion de Bibliothèque Universitaire

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Stack](https://img.shields.io/badge/Stack-Full--Stack-green)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-.NET-purple)

Ce projet est une application web de gestion de bibliothèque permettant au **bibliothécaire** de gérer efficacement les livres, les étudiants et les emprunts.  
Il a été réalisé dans le cadre du **Projet de Fin de Formation (PFE)**.

---

## Fonctionnalités

###  Authentification
- Connexion sécurisée du bibliothécaire
- Accès protégé au dashboard
  
### Gestion des Livres
- Ajouter un livre
- Modifier un livre
- Supprimer un livre
- - Consulter la liste des livres
- Recherche et filtrage

### Gestion des Étudiants
- Ajouter un étudiant
- Modifier un étudiant
- Supprimer un étudiant
- Consultation des comptes étudiants

### Gestion des Emprunts
- Valider une demande d’emprunt
- Refuser une demande
- Gérer les retours
- Suivi des statuts :
  - En attente
  - Emprunté
  - Retourné

###  Pofile
- Voir ses informations personnelles : email, nom et rôle
- Changer son mot de passe 
- Pour les admins : ajouter de nouveaux utilisateurs avec email et mot de passe
---
##  Architecture Technique

### Frontend
- **React.js** : Interface utilisateur dynamique
- **Redux Toolkit** : Gestion globale de l’état
- **React Router** : Navigation entre pages
- **Axios** : Appels API
- **CSS / UI personnalisée** + animation (LiquidEther)

### Backend
- **ASP.NET Core Web API**
- Architecture en couches :
  - Controller
  - Service
  - Repository

### Base de données
- **SQL Server**
- Gestion relationnelle des données

   **---Installation---**
1️⃣ Cloner le projet
git clone https://github.com/ton-username/gestion-bibliotheque.git
2️⃣ Installer les dépendances frontend
npm install
3️⃣ Lancer le frontend
npm start
  **API Backend**

L'application utilise une API REST :

http://localhost:5000/api/

Exemples :

/livres
/etudiants
/emprunts
/auth/login

**Objectif du projet**
Mettre en pratique une architecture Full Stack
Utiliser React + Redux pour le frontend
Développer une API en .NET
Implémenter un système CRUD complet
Concevoir une interface moderne et intuitive

<img width="1600" height="780" alt="image" src="https://github.com/user-attachments/assets/de7302b8-27a2-4dee-9b2d-f53df492ca0f" />
<img width="1600" height="818" alt="image" src="https://github.com/user-attachments/assets/dac6a475-a6a2-457c-8b58-e0dec377f9ac" />
<img width="1599" height="767" alt="image" src="https://github.com/user-attachments/assets/97e42623-9b90-42ac-b01f-f0dff4e9751d" />
<img width="1600" height="779" alt="image" src="https://github.com/user-attachments/assets/4fdbaaf7-145b-4813-9f21-3c903718c17c" />
<img width="1599" height="773" alt="image" src="https://github.com/user-attachments/assets/6e7d8db1-ffa2-414e-97de-d676113c8879" />
<img width="1599" height="780" alt="image" src="https://github.com/user-attachments/assets/590842de-2ade-4c24-86b8-c7ef11595a2e" />
<img width="1599" height="779" alt="image" src="https://github.com/user-attachments/assets/9f260866-aba9-441f-96af-ef4be78cece0" />
<img width="1594" height="773" alt="image" src="https://github.com/user-attachments/assets/f052fcb0-8f07-43fa-a7c1-7055bf45c5d3" />
<img width="1600" height="778" alt="image" src="https://github.com/user-attachments/assets/dcd4d5bb-f7a8-472e-af76-d103f4b38459" />


🎓 À propos de l'Auteur

**Salma Tariq**
🎓 Développement Digital Full-Stack
🏫  CMC RABAT
📍 Maroc

📌 Remarque

Seul le bibliothécaire peut interagir avec le système 

Les étudiants n’ont pas accès direct à cette interface.

© 2026 - Application de Gestion de Bibliothèque
