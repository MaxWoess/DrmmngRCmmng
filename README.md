# Drumming or Cumming?

Ein Rate-Spiel: Du siehst nur einen Ausschnitt eines Gesichts und musst raten, ob die Person
gerade **Schlagzeug spielt** oder **kommt**. Nach dem Tipp zoomt das Bild heraus und zeigt die
Auflösung.

Reine statische Website (HTML/CSS/JS, keine Abhängigkeiten).

## Starten

`index.html` im Browser öffnen – oder mit einem lokalen Server:

```sh
python3 -m http.server
```

Lässt sich direkt über GitHub Pages veröffentlichen.

## Funktionen

- Gesichts-Nahaufnahme als Rätsel, nach dem Tipp Herauszoomen aufs ganze Bild
- Auflösungs-Stempel (Overlay) und optionaler Zensur-Balken über allem außer dem Gesicht
- Punkte, aktuelle Serie und Rekord-Serie (wird im Browser gespeichert)
- Zufällige Reihenfolge ohne Wiederholung, einstellbare Rundenlänge
- Ergebnis-Bildschirm mit Bewertung, Nochmal-Spielen und Teilen
- Tastatur: `←`/`D` = Drumming, `→`/`C` = Cumming, `Enter`/`Leertaste` = weiter
- Läuft auf Handy und Desktop

## Eigene Bilder

1. Bilder in `img/` ablegen.
2. In `data.js` eintragen: Antwort, Gesichtsposition (`focus.x`/`focus.y` in Prozent), Zoom
   und ggf. `censor: true`.

Die mitgelieferten Bilder sind neutrale Platzhalter-Grafiken.

**Hinweis:** Nur Bilder verwenden, an denen du die Rechte hast und bei denen die abgebildeten
Personen erwachsen sind und der Verwendung zugestimmt haben.
