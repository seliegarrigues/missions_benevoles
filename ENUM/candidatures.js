const statutCandidature = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
};

// correspondance des statuts pour affichage

const labelsStatutCandidature = {
  [statutCandidature.PENDING]: "En attente",
  [statutCandidature.ACCEPTED]: "Acceptée",
  [statutCandidature.REJECTED]: "Rejetée",
};

export { statutCandidature, labelsStatutCandidature };
