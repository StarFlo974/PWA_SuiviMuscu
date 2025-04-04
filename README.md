# 💪 Suivi Muscu - PWA Angular & API Platform

Une Progressive Web App (PWA) développée avec Angular pour suivre ses exercices de musculation. Le backend est basé sur Symfony & API Platform.

---

## 📦 Prérequis

### 🔧 Backend (API Platform)

- PHP >= 8.2  
- Composer  
- Symfony CLI  
- MySQL / MariaDB (ou SQLite)  
- Docker (optionnel)  

### 🖥️ Frontend (Angular)

- Node.js >= 18  
- npm >= 9  

---

## 🚀 Installation

### 🛠️ Backend - API Platform

```bash
# 1. Cloner le projet backend
git clone https://github.com/ton-utilisateur/ton-projet-api.git
cd ton-projet-api

# 2. Installer les dépendances
composer install

# 3. Créer la base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# 4. Lancer le serveur local
symfony serve -d
```

---

### 🖼️ Frontend (Angular)

```bash
# 1. Cloner le projet frontend
git clone https://github.com/ton-utilisateur/ton-projet-angular.git
cd ton-projet-angular/frontend

# 2. Installer les dépendances
npm install
```

---

## ⚙️ Configuration proxy (facultatif mais recommandé)

Vérifie que le fichier `proxy.conf.json` existe à la racine du projet :

```json
{
  "/api": {
    "target": "https://localhost:8000",
    "secure": false
  }
}
```

Dans `angular.json`, ajoute dans `serve.options` :

```json
"proxyConfig": "proxy.conf.json"
```

---

## ▶️ Lancer l'application

```bash
npm start
```

L'application sera disponible sur : [http://localhost:4200](http://localhost:4200)

---

## 📱 Fonctionnalités

- ✅ Création et suppression d’exercices  
- 🔌 Intégration API Platform (Symfony)  
- 📱 Mode hors-ligne avec PWA  
- 🎨 Design responsive avec TailwindCSS  
- 🛠️ Service Worker + Manifest  
- ⚠️ Fallback `offline.html` avec logo personnalisé  

---

## 📦 Build production

```bash
ng build --configuration production
```

Le contenu sera généré dans le dossier : `dist/frontend/browser`

---

## 🌐 Tester l'app en local

```bash
cd dist/frontend/browser
npx http-server -p 4000
```

L'app sera accessible sur : [http://localhost:4000](http://localhost:4000)

---

## 🧪 Vérifier le mode hors-ligne (PWA)

1. Accède à l’app via `http://localhost:4000`
2. Ouvre les **DevTools > Application**
3. Active "Offline"
4. Recharge la page → une page de secours (`offline.html`) avec un logo s’affiche 🎉

---

## 👨‍💻 Auteur

Développé par **Florian Starnort** et **Esteban Ouillon**🧠  
🎓 Étudiant MBA Dev Fullstack  
📱 Projet : Suivi Muscu - PWA
