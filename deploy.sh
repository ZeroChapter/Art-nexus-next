#!/usr/bin/env bash
# Атомарный деплой Next.js на прод.
#
# Локально (с Mac, если есть SSH):
#   ./deploy.sh
#
# На сервере:
#   cd /root/back-nexus/Art-nexus-next && ./deploy.sh
#
set -euo pipefail

SERVER="${DEPLOY_SERVER:-root@104.128.136.37}"
APP_DIR="${DEPLOY_APP_DIR:-/root/back-nexus/Art-nexus-next}"
NODE_BIN="${DEPLOY_NODE_BIN:-/root/.nvm/versions/node/v20.20.2/bin}"
PM2="${NODE_BIN}/pm2"

run_on_server() {
  ssh -o BatchMode=yes "$SERVER" "export PATH=\"${NODE_BIN}:\$PATH\"; bash -s" <<EOF
set -euo pipefail
cd "$APP_DIR"

echo "--- 1. Обновление кода ---"
git fetch origin
BRANCH="\$(git rev-parse --abbrev-ref HEAD)"
git reset --hard "origin/\${BRANCH}"

echo "--- 2. Бэкап старых static-chunks (для пользователей с закешированным HTML) ---"
STATIC_BACKUP=""
if [ -d .next/static ]; then
  STATIC_BACKUP=\$(mktemp -d)
  cp -a .next/static/. "\$STATIC_BACKUP/"
fi

echo "--- 3. Сборка ---"
rm -rf .next/cache/images
npm run build

echo "--- 4. Слияние старых chunks (не перезаписываем новые) ---"
if [ -n "\$STATIC_BACKUP" ]; then
  cp -an "\$STATIC_BACKUP"/. .next/static/ 2>/dev/null || cp -a "\$STATIC_BACKUP"/. .next/static/
  rm -rf "\$STATIC_BACKUP"
fi

echo "--- 5. Перезапуск pm2 ---"
if ${PM2} describe art-nexus-next >/dev/null 2>&1; then
  ${PM2} restart art-nexus-next
else
  ${PM2} start deploy/ecosystem.config.cjs
  ${PM2} save
fi

echo "--- 6. Проверка ---"
sleep 2
curl -sf -o /dev/null -w "HTTP %{http_code} за %{time_total}s\n" http://127.0.0.1:3001/
echo "--- Деплой завершён ---"
EOF
}

if [[ "${1:-}" == "--local" ]]; then
  export PATH="${NODE_BIN}:$PATH"
  cd "$(dirname "$0")"
  APP_DIR="$(pwd)"

  echo "--- 1. Обновление кода ---"
  git fetch origin
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  git reset --hard "origin/${BRANCH}"

  STATIC_BACKUP=""
  if [ -d .next/static ]; then
    STATIC_BACKUP=$(mktemp -d)
    cp -a .next/static/. "$STATIC_BACKUP/"
  fi

  rm -rf .next/cache/images
  npm run build

  if [ -n "$STATIC_BACKUP" ]; then
    cp -an "$STATIC_BACKUP"/. .next/static/ 2>/dev/null || cp -a "$STATIC_BACKUP"/. .next/static/
    rm -rf "$STATIC_BACKUP"
  fi

  if pm2 describe art-nexus-next >/dev/null 2>&1; then
    pm2 restart art-nexus-next
  else
    pm2 start deploy/ecosystem.config.cjs
    pm2 save
  fi
else
  run_on_server
fi
