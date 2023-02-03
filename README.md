# README

## Organisation des fichiers
- `data.json`
    - données générées par le backend
- `app.js`
    - initialisation et chargement des données et de l'application
    - stockage des variables et fonctions
- `app.html`
    - page générale
    - template Petite-Vue et ses intéractions
    - bloc intégrant le template

## Champs de `data.json`
- `choices`(array)
- `level` (string)
- `label` (string)
- `intro` (string)
- `response` (string)

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
- affichage d'un récapitulatif (des labels) au-dessus du bloc de choix
- clic sur un choix
    - remplacement du bloc de choix en cours, par celui de l'étape suivante (N+1)
- clic sur bouton `Modifier la sélection`
    - retour sur l'étape d'avant (N-1)
- affichage des intros au dessus des choix
- affichage des réponses
    - en fin de parcours

## Reste à faire
- Affichage
    - récap. (champ `label` de summary)
- Clic sur bouton `Modifier la sélection`
    - boutons radio => désélectionnés
    - blocs enfants => repliés
    - récap. (summary) => maj
- Externalisation des `templates`