import { labelsStatutCandidature } from "../ENUM/candidatures.js";

export function verifEnumCandidature(labelStatut) {
  labelStatut = Object.keys(labelsStatutCandidature).find(
    (key) => labelsStatutCandidature[key] === labelStatut
  );

  if (labelStatut === undefined) {
    throw new Error(`Statut invalide : ${labelStatut}`);
  }
  return labelStatut;
}
