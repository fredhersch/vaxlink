#!/bin/sh
# Build the site from the current checkout and publish it to the gh-pages
# branch of origin (the fork's Pages source: Deploy from a branch, gh-pages,
# / root). Run after every merge to main:
#   git switch main && git pull && npm ci --ignore-scripts && sh scripts/publish-gh-pages.sh
set -eu
rev=$(git rev-parse --short HEAD)
url=$(git remote get-url origin)
npm run build
out=$(mktemp -d)
cp -r dist/. "$out"/
touch "$out/.nojekyll"
cd "$out"
git init -q -b gh-pages
git add -A
git commit -q -m "Publish the VaxLink site built from $rev"
git push -q -f "$url" HEAD:gh-pages
echo "published $rev to gh-pages"
