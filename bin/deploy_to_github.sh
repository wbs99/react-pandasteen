#!/usr/bin/env bash
rm -rf dist
pnpm run build -- --base /react-pandasteen-preview/
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:wbs99/react-pandasteen-preview.git
git push -f origin master:master
echo '============ 部署成功 ============'
cd -