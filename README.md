# Behind The Wall

Eine Chrome-Erweiterung mit eigenem Bookmark-Backend fuer gespeicherte Artikel, Volltextsuche und Archiv-Shortcuts.

## Funktionen

- Seite mitsamt extrahiertem Seitentext speichern
- Zentrale Bibliothek mit Volltextsuche ueber Titel, URL und Inhalt
- Eigenes Backend mit SQLite und FTS5
- Archive.is-Snapshot anzeigen
- Wayback-Machine-Snapshots anzeigen
- Kontextmenue fuer Seiten und Links
- Tastaturkuerzel `Alt+Shift+A` fuer Archive.is
- Automatische URL-Bereinigung ohne Query-String und Fragment

Die Erweiterung enthaelt keine Paywall-Erkennung, keine automatische Umgehung und keine Content-Scraping-Logik.

## Backend starten

1. Im Projektordner ein API-Token setzen, zum Beispiel:
   `export BTW_API_TOKEN="mein-geheimes-token"`
2. Backend starten:
   `npm start`
3. Die Erweiterung in Chrome laden.
4. In den Erweiterungs-Einstellungen `http://127.0.0.1:8787` und dein API-Token eintragen.

Optional:

- `PORT` aendert den Port
- `HOST` aendert die Bind-Adresse
- `BTW_DB_PATH` setzt den Speicherort der SQLite-Datei

## Installation in Chrome

1. `chrome://extensions` oeffnen.
2. Entwicklermodus aktivieren.
3. "Entpackte Erweiterung laden" auswaehlen.
4. Diesen Ordner auswaehlen: `/Users/henrik/Dev/archive.is`
