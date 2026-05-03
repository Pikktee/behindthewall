#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$PWD}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
BTW_DATA_DIR="${BTW_DATA_DIR:-$HOME/var/lib/behind-the-wall}"

cd "$APP_DIR"

if [ -d .git ]; then
  git fetch origin "$DEPLOY_BRANCH"
  git checkout "$DEPLOY_BRANCH"
  git pull --ff-only origin "$DEPLOY_BRANCH"
fi

mkdir -p "$BTW_DATA_DIR"

export BTW_DB_PATH="${BTW_DB_PATH:-$BTW_DATA_DIR/bookmarks.sqlite}"

if [ -z "${BTW_API_TOKEN:-}" ]; then
  echo "BTW_API_TOKEN is not set" >&2
  exit 1
fi

npm install --omit=dev

if npx pm2 describe behind-the-wall >/dev/null 2>&1; then
  npx pm2 restart behind-the-wall --update-env
else
  npx pm2 start ecosystem.config.cjs --update-env
fi

npx pm2 save
