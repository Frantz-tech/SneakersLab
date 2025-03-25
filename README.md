# SneakersLab

Initialisation du projet :

Ajout des outils de qualité de code & gestion des commits

liste des installations :

- npm init @eslint/config@latest
- npx eslint yourfile.js
- npm install --save-dev --save-exact prettier
- node --eval "fs.writeFileSync('.prettierrc','{}\n')"
- npm install -- save-dev husky
- npx husky init
- npm install --save-dev lint-staged
- npm lint-staged --help
- npm install --save-de @commitlint/{cli,config-conventional}
- echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
- npm install --save-dev @commitlint/cz-commitlint commitizen inquirer@9

Dans le package.json
{
"scripts": {
"commit": "git-cz"
},
"config": {
"commitizen": {
"path": "@commitlint/cz-commitlint"
}
}
}
