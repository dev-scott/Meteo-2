const JourSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

let NewDate = new Date();

let option = {
  weekday: "long",
};

let jourActuel = NewDate.toLocaleDateString("fr-FR", option);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let JourEnOrdre = JourSemaine.slice(JourSemaine.indexOf(jourActuel)).concat(
  JourSemaine.slice(0, JourSemaine.indexOf(jourActuel))
);

export default JourEnOrdre;
