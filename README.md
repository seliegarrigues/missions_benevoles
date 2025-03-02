# missions_benevoles

#Présentation du projet#

Application Back-end de Gestion de missions d'associations et de candidatures de bénévoles

# Instructions pour installer et lancer lʼapplication

git clone https://github.com/seliegarrigues/missions_benevoles.git

configurer le .env en remplissant les champs du fichier .env.example

# Justification du choix technologique SQL vs NoSQL

Base relationnelle MariaDB (SQL) pour
s'assurer de la cohérence des données et des relations à tout moment.
technique éprouvée, utilisée depuis de longue date par de grands groupes.

## Informations complémentaires pour lʼutilisation

dossier repositories: isole la base de données du reste de l'application
ce qui rend plus facile la façon dont les données sont lues et écrites sans avoir
besoin de changer le code qui utilise ces données. Ce dossier n'est pas indispensable
surtout si vous êtes sur de ne jamais effectuer de changements.
