#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install pipenv  # Añade esta línea
pipenv install      # Tu línea 8 original

pipenv run upgrade
