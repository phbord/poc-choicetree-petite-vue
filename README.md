# README

## API
- Javascript ES6
- Petite-Vue (Progressive enhancement application, ___fork___ allégé de Vue.js)

## Ressources
- github du POC : https://github.com/phbord/poc-choicetree-petite-vue
- github de la librairie : https://github.com/vuejs/petite-vue
- documentation Petite-Vue :
    - https://www.npmjs.com/package/petite-vue#comparison-with-standard-vue
    - https://www.notion.so/phbord/Petite-Vue-30544ff0d7cb4d3788b0d29bbb7754ab
    - https://cours.brosseau.ovh/tp/vuejs3/petite-vue.html
    - https://www.programmez.com/actualites/petite-vue-une-bibliotheque-legere-inspiree-de-vuejs-32684
- documentation Vue.js :
    - https://vuejs.org
    - https://www.notion.so/phbord/Vue-66ac208d0ada44a88ea32e5fb1a6b8d0
- exemples :
    - Petite-Vue - Global State Management => https://codepen.io/phbord/pen/bGjYNpN
    - Petite-Vue - Simple component => https://codepen.io/phbord/pen/LYBOPdV
    - Petite-Vue - Components with Template => https://codepen.io/phbord/pen/RwBjbjG?editors=1010

## Organisation des fichiers
- `data.json`
    - données générées par le backend
- `app.js`
    - initialisation et chargement des données et de l'application
    - stockage des variables et fonctions
- `app.html`
    - page générale
    - appel du fichier Json
    - template `#choice-tree-template` (Petite-Vue et ses intéractions)
    - bloc `#app` où sera injecté le template

## Champs de `data.json`
- `choices`(array)
- `level` (string)
- `label` (string)
- `intro` (string)
- `response` (string)

## Intégrer les données dans `app.js`
```
import TreeData from '../data/data.json' assert { type: "json" };
const TreeData = await fetchData();
```

ou

```
const fetchData = () => fetch('/public/data/data.json')
                  .then(res => res.json())
                  .catch(err => console.log(err));
const TreeData = await fetchData();
```

## Règles

Champs générés ___dynamiquement___ :
- `group`
- `introStep`
- `intro` (déplacé dans la variable `allItems`)

Champs obligatoires :
- `level`
- `label`
- `help`

Champs facultatifs :
- `intro`

Un des deux champs doit être affiché :
- soit `response`
- soit `choices`

Affichage des champs au clic
- `intro`
- `response`

clic sur le bouton ___Modifier___
- retour à l'étape ___n-1___

## Eléments à conserver OBLIGATOIREMENT (sur `app.html`)
Directives (Vue)
- `init`
- `v-scope`
- `v-bind`
- `v-html`
- `v-if`
- `@click`...

Attributs (Html)
- `id="app"`
- `data-type="radio"`

Attibuts dynamiques (Vue.js)
- `:id`
- `:class`
- `:name`
- `:for`
- `:key`...

## Fonctionnalités
- appel au fichier Json, à la fin de la page Html (`app.html`)
```
const fetchData = () => fetch('/public/data/data.json')
                            .then(res => res.json())
                            .catch(err => console.log(err));
```
- clic sur un choix
    - boutons radio
    - remplacement du bloc de choix en cours, par celui de l'étape suivante (N+1)
    - affichage du récapitulatif du parcours (labels), au-dessus du bloc de choix
- clic sur bouton ___Modifier la sélection___
    - retour sur l'étape d'avant (N-1)
    - mise à jour du récapitulatif du parcours
- affichage des intros au dessus des choix
- affichage des réponses
    - en fin de parcours

## Reste à faire
- Externalisation du `template` du fichier `app.html`
    - web components => ___n'a pas l'air de fonctionner___
    - mixin (Twig) ?
- intégration
    - autres éléments
    - modals
    - Twig
    - Css