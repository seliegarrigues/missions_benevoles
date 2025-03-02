# missions_benevoles

#Présentation du projet#

Application Back-end de Gestion de missions d'associations et de candidatures de bénévoles

# Instructions pour installer et lancer lʼapplication

git clone https://github.com/seliegarrigues/missions_benevoles.git

configurer le .env en remplissant les champs du fichier .env.example

ouvrir son terminal
créer un nouveau dossier
code .
ouverture visual Studio Code
une fois dans le bon dossier: cd mon-dossier
npm init -y
verifier apparition de package.json
installation dépendance : npm i express mariadb nodemon dotenv
jsonwebtoken cookie-parser swagger-ui-express
ajouter "type": "module","start": "nodemon app.js", dans package.json
.gitignore : .env et node_modules/
npm install

# Justification du choix technologique SQL vs NoSQL

Base relationnelle MariaDB (SQL) pour
s'assurer de la cohérence des données et des relations à tout moment.
technique éprouvée, utilisée depuis de longue date par de grands groupes.

## Informations complémentaires pour lʼutilisation

fonctionnalités : Récupération de la liste des missions -

- Récupération d'une mission par son id - création de mission - modification d'une mission - suprression d'une mission - Récupération de la liste des candidatures - Récupération d'une candidature par son Id- Ajout d'une candidature - mise à jour du statut de la candidature - suppression d'une candidature - récupération de la liste des utilisateurs - récupération d'un utilisateur par son Id ou son email - creation d'un utilisateur ( inscription - JWT) - connexion d'un utilisateur avec authentification et autorisation - récupération du profil de l'utilisateur connecté - deconnexion de l'utilisateur - permission limitée pour mis à jour du statut candidature -

dossier repositories: isole la base de données du reste de l'application
ce qui rend plus facile la façon dont les données sont lues et écrites sans avoir
besoin de changer le code qui utilise ces données. Ce dossier n'est pas indispensable
surtout si vous êtes sur de ne jamais effectuer de changements.
