#!/bin/bash
set -eu

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm use 20 >/dev/null
fi

cd "$(dirname "$0")/.."

echo "=== node $(node -v) ==="
echo "=== npm install ==="
npm install

echo "=== npm run build ==="
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1024}"
set -a
. ./.env
set +a
npm run build

echo "=== restart next on :${PORT:-3001} ==="
fuser -k "${PORT:-3001}"/tcp 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
sleep 2

nohup npm start > /var/log/art-nexus-next.log 2>&1 &
sleep 8

if curl -sf "http://127.0.0.1:${PORT:-3001}" >/dev/null; then
  echo "OK: Next.js responds on :${PORT:-3001}"
else
  echo "FAIL: Next.js not responding"
  tail -40 /var/log/art-nexus-next.log
  exit 1
fi

echo "BUILD_ID=$(cat .next/BUILD_ID)"
