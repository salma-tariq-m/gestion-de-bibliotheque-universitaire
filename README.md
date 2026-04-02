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
📸 Aperçu 
<img width="1600" height="819" alt="image" src="https://github.com/user-attachments/assets/661e4657-13eb-4aa0-9ec7-b369d7f58bb6" />
<img width="1593" height="776" alt="image" src="https://github.com/user-attachments/assets/e369423f-1f9f-4dd6-83a9-b29a543a0dfe" />
<img width="1590" height="769" alt="image" src="https://github.com/user-attachments/assets/6da2e6bb-03fd-44cb-a289-d7cb6489968f" />
<img width="1590" height="777" alt="image" src="https://github.com/user-attachments/assets/4c15b124-c650-412f-821f-926466845c92" />
<img width="1585" height="772" alt="image" src="https://github.com/user-attachments/assets/f4b64723-3cf1-4b91-bcdf-9d6c99844bd9" />
<img width="1587" height="776" alt="image" src="https://github.com/user-attachments/assets/49971be5-edc0-47c6-b190-93029fb36cc1" />
<img width="1598" height="777" alt="image" src="https://github.com/user-attachments/assets/fdfd52d6-e82b-4c2e-9707-4ee5def03a89" />

🎓 À propos de l'Auteur

**Salma Tariq**
🎓 Développement Digital Full-Stack
🏫  CMC RABAT
📍 Maroc

📌 Remarque

Seul le bibliothécaire peut interagir avec le système 

Les étudiants n’ont pas accès direct à cette interface.

© 2026 - Application de Gestion de Bibliothèque
