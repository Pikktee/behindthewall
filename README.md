# Behind The Wall

Eine Chrome-Erweiterung mit eigenem Bookmark-Backend fuer gespeicherte Artikel, einer serverseitigen Bibliothek und Archiv-Shortcuts.

## Funktionen

- Seite mitsamt extrahiertem Seitentext speichern
- Serverseitige Bibliothek mit Volltextsuche ueber Titel, URL und Inhalt
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

## Railway

Fuer den aktuellen Stand ist Railway die passendere Zielplattform als Vercel, weil das Backend auf einer persistenten SQLite-Datei basiert.

1. Neues Railway-Projekt aus diesem Repo anlegen.
2. Eine Volume mounten, zum Beispiel auf `/data`.
3. Diese Environment-Variable setzen:
   `BTW_API_TOKEN=<dein-token>`
4. Optional explizit setzen:
   `BTW_DB_PATH=/data/bookmarks.sqlite`

Wenn eine Railway-Volume gemountet ist, nutzt das Backend automatisch `RAILWAY_VOLUME_MOUNT_PATH/bookmarks.sqlite`.

## CloudPanel auf Hetzner

CloudPanel ist fuer dieses Backend eine sehr gute Option, weil du dort eine normale Node.js-App mit persistenter SQLite-Datei betreiben kannst.

Empfohlener Aufbau:

- Node.js Site in CloudPanel
- App Port `8787`
- PM2 als Process Manager
- SQLite-Datei unter `$HOME/var/lib/behind-the-wall/bookmarks.sqlite`
- API-Token als Environment-Variable `BTW_API_TOKEN`

### Schritte

1. In CloudPanel eine neue Node.js Site anlegen.
2. Das Repo in das Site-Verzeichnis deployen oder per Git pullen.
3. Im Projekt die Abhaengigkeiten installieren:
   `npm install`
4. Das Datenverzeichnis anlegen:
   `mkdir -p ~/var/lib/behind-the-wall`
5. Das API-Token setzen und PM2 starten:
   `export BTW_API_TOKEN="dein-starkes-token"`
   `export BTW_DB_PATH="$HOME/var/lib/behind-the-wall/bookmarks.sqlite"`
   `npx pm2 start ecosystem.config.cjs --update-env`
6. PM2-Konfiguration speichern:
   `npx pm2 save`

Die Datei [ecosystem.config.cjs](/Users/henrik/Dev/archive.is/ecosystem.config.cjs) ist dafuer vorbereitet.

### Extension-Konfiguration

In der Extension traegst du danach ein:

- Backend-URL: `https://deine-domain.tld`
- API-Token: dein gesetztes `BTW_API_TOKEN`

### Warum nicht Vercel

Vercel ist fuer den aktuellen Stand die falsche Zielplattform, weil dein Backend auf eine beschreibbare persistente SQLite-Datei angewiesen ist. Vercel dokumentiert selbst, dass SQLite in diesem Modell nicht passend ist, waehrend CloudPanel und Railway genau den klassischen persistenten App-Betrieb abdecken.

## Auto-Deploy nach git push

Im Repo liegt jetzt ein GitHub-Actions-Workflow unter [.github/workflows/deploy.yml](/Users/henrik/Dev/archive.is/.github/workflows/deploy.yml). Er deployed bei jedem Push auf `main` automatisch per SSH auf deinen Hetzner-Server, aktualisiert das Checkout, installiert Abhaengigkeiten und startet PM2 mit aktualisierten Env-Variablen neu.

Einmalig in GitHub unter `Settings -> Secrets and variables -> Actions` anlegen:

- `DEPLOY_HOST`:
  deine Server-Domain oder IP
- `DEPLOY_PORT`:
  meist `22`
- `DEPLOY_USER`:
  dein Site-User, z.B. `henrikheil-behindthewall-ssh`
- `DEPLOY_SSH_KEY`:
  der private SSH-Key, mit dem GitHub auf den Server darf
- `DEPLOY_PATH`:
  z.B. `/home/henrikheil-behindthewall-ssh/behindthewall`
- `BTW_API_TOKEN`:
  dein Backend-Token
- optional `BTW_DB_PATH`:
  z.B. `/home/henrikheil-behindthewall-ssh/var/lib/behind-the-wall/bookmarks.sqlite`
- optional `BTW_DATA_DIR`:
  z.B. `/home/henrikheil-behindthewall-ssh/var/lib/behind-the-wall`

Einmalig auf dem Server noetig:

1. einen SSH-Key fuer GitHub Actions erzeugen
2. den Public Key in `~/.ssh/authorized_keys` des Site-Users eintragen
3. den Private Key als `DEPLOY_SSH_KEY` in GitHub speichern

Danach reicht fuer Deployments:

1. lokal committen
2. nach `main` pushen

Der Workflow macht dann automatisch:

1. SSH auf den Server
2. `git pull`
3. `npm install --omit=dev`
4. PM2 Restart mit aktualisierten Env-Variablen

## Installation in Chrome

1. `chrome://extensions` oeffnen.
2. Entwicklermodus aktivieren.
3. "Entpackte Erweiterung laden" auswaehlen.
4. Diesen Ordner auswaehlen: `/Users/henrik/Dev/archive.is`
