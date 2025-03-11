DROP DATABASE IF EXISTS missions_entraide;
CREATE DATABASE missions_entraide;
USE missions_entraide;

DROP TABLE IF EXISTS candidatures;
DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS utilisateurs;

CREATE TABLE IF NOT EXISTS utilisateurs (
id_util INT PRIMARY KEY AUTO_INCREMENT,
types ENUM('associations','benevoles') NOT NULL,
nom VARCHAR(50) NOT NULL,
prenom VARCHAR(50),
domaine ENUM('humanitaire','sport','santé', 'social'),
email VARCHAR(90) NOT NULL UNIQUE,
mdp VARCHAR(90) NOT NULL,
site_web VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS missions (
id_miss INT PRIMARY KEY AUTO_INCREMENT,
titre VARCHAR(50) NOT NULL,
description VARCHAR(250),
id_util INT NOT NULL,
date_debut DATE NOT NULL, 
CONSTRAINT fk_missions_asso FOREIGN KEY (id_util) REFERENCES utilisateurs(id_util)
);

CREATE TABLE IF NOT EXISTS candidatures (
id_cand INT PRIMARY KEY AUTO_INCREMENT,
id_util INT NOT NULL,
id_miss INT NOT NULL, 
date_cand DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
statut ENUM("Acceptée","Refusée", "en attente") DEFAULT "en attente",
CONSTRAINT fk_cand_bene FOREIGN KEY (id_util) REFERENCES utilisateurs (id_util) ON DELETE CASCADE,
CONSTRAINT fk_cand_miss FOREIGN KEY (id_miss) REFERENCES missions (id_miss) ON DELETE CASCADE
);

INSERT INTO utilisateurs ( types, nom, domaine, email, mdp, site_web) VALUES
('associations','A PROPOS', 'humanitaire', 'contact@collectifapropos.fr','apropos12', 'https://collectifapropos.fr'),
('associations','AMISTANCA AMISTANZA', 'social', 'amistanca@free.fr','tangetanza34' ,'www.amistanca.fr'),
('associations','UNION GYMNIQUE PALOISE', 'santé', 'u.g.pau@wanadoo.fr','ungypa56', 'www.uniongymniquepaloise.fr'),
('associations','ASSOCIATION RE CONNEXION', 'social', 'contact@associationreconnexion.com','assotion78', 'www.associationreconnexion.com'),
('associations','HUMANITE SOLIDAIRE 64', 'humanitaire', 'humasol64@yahoo.fr','humsol64', 'https://crde-bearn.fr/humanite-solidaire-64/'),
('associations','PAU CHEERLEADING', 'sport', 'paucheerleading@hotmail.fr','cheerleading64000', 'www..pau-cheerleading.com '),
('associations','KIOSQUES A EAU', 'santé', 'contact@kiosques-a-eau.fr','k10sque' ,'www.kiosques-a-eau.fr'),
('associations','LES PETITES CANTINES PAU', 'humanitaire', 'pau@lespetitescantines.org','pe111es' ,'https://pau.lespetitescantines.org'),
('associations','MAISON POUR TOUS LEO LAGRANGE', 'social', 'loisirspourtous@leolagrange-pau.fr','ma1s0np0urt0us' ,'www.leolagrange-pau.fr/'),
('associations','LES AMIS DE LENTRE-TEMPS', 'santé', 'amisdelentretemps@gmail.com','lesam1s2len1re', 'www.Bar-Associatif-lEntre-Temps-Pau');

SELECT * FROM utilisateurs;

INSERT INTO missions (titre, description, id_util, date_debut) VALUES
('Collecte de vêtements', 'Aidez-nous à trier et distribuer des vêtements aux personnes dans le besoin.', 1, '2026-03-15'),
('Distribution de repas', 'Participez à la distribution de repas aux sans-abris en centre-ville.', 2, '2026-03-20'),
('Sensibilisation à l’écologie', 'Organiser des ateliers sur l’écologie dans les écoles.', 3, '2026-04-05'),
('Accompagnement de personnes âgées', 'Visitez des personnes âgées isolées pour discuter et leur tenir compagnie.', 4, '2026-03-28'),
('Soutien scolaire', 'Aidez des enfants en difficulté avec du tutorat en maths et français.', 5, '2025-06-10'),
('Organisation d’un événement sportif', 'Aidez à la logistique d’un marathon caritatif.', 6, '2025-07-02'),
('Réhabilitation d’espaces verts', 'Venez planter des arbres et nettoyer un parc urbain.', 7, '2025-06-15'),
('Secours d’urgence', 'Soutenir les équipes de secours lors de catastrophes naturelles.', 8, '2025-08-01'),
('Traduction pour réfugiés', 'Aidez à la traduction et l’accompagnement administratif des réfugiés.', 9, '2025-05-25'),
('Animation en hôpital pour enfants', 'Organisez des jeux et spectacles pour les enfants hospitalisés.', 10, '2025-04-20');

SELECT * FROM missions;

INSERT INTO utilisateurs (types, nom, prenom, email, mdp)VALUES 
('benevoles','Benseghir', 'Sami', 'benseghir.sami@gmail.com','bensam28'),
('benevoles','Lafaille', 'Pierre', 'lafaille.pierre@gmail.com','lafpier29'),
('benevoles','Clément', 'Balthazar', 'Clement.balt@gmail.com','clebalt25'),
('benevoles','Sysoev', 'Artem', 'Sysoev.artem@gmail.com','sysart19'),
('benevoles','Benlaich', 'Mélinda', 'benlaich.melinda@gmail.com','benmel32'),
('benevoles','Lebonheur', 'Fatah', 'lebonheur.fatah@gmail.com','lebfat36'),
('benevoles','Chapelle', 'Nicolas', 'chapelle.nicolas@gmail.com','chapnic39');

SELECT * FROM utilisateurs;

INSERT INTO candidatures (id_util, id_miss) VALUES
(17,1),
(16,9),
(15,2),
(14,8),
(13,3),
(12,7),
(11,4);

SELECT * FROM candidatures;

CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table de liaison entre utilisateurs et associations avec un rôle spécifique dans l'association
CREATE TABLE users_organizations (
    user_id INT NOT NULL,
    organization_id INT NOT NULL,
    role ENUM('admin', 'membre') NOT NULL,
    PRIMARY KEY (user_id, organization_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
