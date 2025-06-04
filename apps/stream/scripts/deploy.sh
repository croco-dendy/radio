#!/usr/bin/env bash
set -e

# Папка з бекендом на сервері
TARGET_DIR="$HOME/polissya.portal/apps/core"

# Переходимо в потрібну папку
cd "$TARGET_DIR"

# Оновлюємо код з гілки main
git fetch --all
git reset --hard origin/main

# Інсталюємо production-залежності
bun install --production

# Перезавантажуємо процес у PM2 (ім'я process: core-backend)
pm2 reload core-backend
