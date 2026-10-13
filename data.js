// Bildliste. Für eigene Bilder: Datei in img/ legen und hier eintragen.
//   answer: "drumming" oder "cumming"
//   focus:  Ausschnitt fürs Rätsel – x/y in Prozent des Bildes (Mitte des Gesichts),
//           zoom = Vergrößerung (2–4 ist meist gut)
//   censor: true legt beim Auflösen das Zensur-Overlay über das Bild (außer übers Gesicht)
window.ITEMS = [
  { src: "img/drum1.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/drum2.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/drum3.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/drum4.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/drum5.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/drum6.svg",  answer: "drumming", focus: { x: 50, y: 37, zoom: 3 } },
  { src: "img/other1.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
  { src: "img/other2.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
  { src: "img/other3.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
  { src: "img/other4.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
  { src: "img/other5.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
  { src: "img/other6.svg", answer: "cumming",  focus: { x: 50, y: 37, zoom: 3 }, censor: true },
];

// Anzahl Bilder pro Runde (0 = alle)
window.ROUND_LENGTH = 10;
