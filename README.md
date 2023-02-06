# README

## API
- Javascript ES6
- Petite-Vue (Progressive application, ___fork___ allégé de Vue.js)

## Ressources
- https://github.com/vuejs/petite-vue

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
const fetchData = () => fetch('http://127.0.0.1:5500/public/data/data.json')
                  .then(res => res.json())
                  .catch(err => console.log(err));
const TreeData = await fetchData();
```

## Règles

Champs générés ___dynamiquement___ :
- `group`

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
- intro doivent être également dans le récap, cad au-dessus du label
- boutons  ___Modifier la sélection___ placés à côté de chaque étape du récap.