// DONNEES
//import TreeData from '../data/data.json' assert { type: "json" };
/* const fetchData = () => fetch('/public/data/data.json')
                  .then(res => res.json())
                  .catch(err => console.log(err)); */
const TreeData = await fetchData();


const store = PetiteVue.reactive({
  isAllItemsFull: false,
  currentResponse: '',
  currentGroup: '',
  currentChoice: '0',
  lastItem: {},
  allItems: [],
  allIntros: [],
  labelsSteps: [],
  introsSteps: []
  ,
  // DESELECTION des boutons radio
  uncheckRadioButtons() {
    [...document.querySelectorAll('input[data-type="radio"]')].forEach(element => {
      element.checked = false;
    });
  }
  ,
  // REMPLI "allItems" avec tous les éléments linéaires
  setAllItems(model) {
    if (this.isAllItemsFull) return;

    model?.choices?.map(item => {
      const levelSplit = item.level.split('.');
      const introItem = item.intro;
      let introObj = {};
      let groupObj = { "group": this.currentChoice };

      // Intro (ajout dans tableau "allIntros")
      (introItem) && this.allIntros.push({level: `${item.level}.1`, intro: introItem});
      (item.response) 
        ? item = {level: item.level, label: item.label, response: item.response}
        : item = {level: item.level, label: item.label, choices: item.choices};

      // Intro (utilisés dans le Récapitulatif)
      if (introItem) {
        introObj = { introStep: introItem };
        item = Object.assign(introObj, item);
      }

      // Group
      if (levelSplit.length > 1) {
        levelSplit.pop();
        const levelStr = [...levelSplit].toString().replaceAll(',', '.');
        groupObj = { "group": `${levelStr}.1` };
      }

      item = Object.assign(groupObj, item);
      this.allItems.push(item);

      // RECURSIVITE dans les enfants existants
      item.choices && this.setAllItems(item);
    });
    //console.log('------> allItems: ', this.allItems);
  }
  ,
  chooseIntro(level) {
    let newLevel = '';
    this.allIntros.find(item => {
      if (item.level === level) newLevel = item.intro;
    });
    return newLevel;
  }
  ,
  getGroup() {
    this.allItems.find(item => {
      if ({...item}.group.toString() === store.currentChoice) {
        this.currentGroup = item.group;
      }
    });
    return this.currentGroup;
  }
  ,
  getResponse() {
    this.allItems.find(item => {
      const if1 = (this.currentChoice === '0' && {...item}.group.toString() === this.currentChoice);
      const if2 = (this.currentChoice !== '0' && {...item}.group.toString() === `${this.currentChoice}.1`);
      
      if (if1 || if2) return this.currentResponse = item.response;
    });
    return this.currentResponse;
  }
  ,
  getSteps() {
    this.allItems.map(item => {
      const ifStep = ({...item}.level && {...item}.level.toString() === this.currentChoice);
      // Labels
      (ifStep) && this.labelsSteps.push(item.label);
      // Intros
      ({...item}.introStep && ifStep) && this.introsSteps.push(item.introStep);
      
    });
  }
  ,
  // RETOUR au choix précédent (au Clic)
  returnPrevStep(currentIndex) {
    this.currentResponse = '';
    this.labelsSteps = this.labelsSteps.filter((item, index) => index < currentIndex);

    const newChoice = this.currentChoice
                        .split('.')
                        .filter((item, index) => index < currentIndex);
    newChoice.length > 0 
      ? this.currentChoice = newChoice.join('.') 
      : this.currentChoice = '0';

    this.getChoice();
  }
  ,
  getChoice() {
    let isStepsNotFinished = true;
    let res = [];

    this.allItems.map(item => {
      const if1 = (this.currentChoice === '0' && {...item}.group.toString() === this.currentChoice);
      const if2 = (this.currentChoice !== '0' && {...item}.group.toString() === `${this.currentChoice}.1`);
      const ifResponse = ({...item}.response && {...item}.level.toString() === this.currentChoice);

      // Réponses
      if (ifResponse) {
        this.currentResponse = {...item}.response;
        isStepsNotFinished = false;
      }

      // Items (boutons radio + Labels...)
      if (isStepsNotFinished && (if1 || if2)) {
        res.push(item);
        this.lastItem = res;
      }
    });
    //console.log('------> lastItem: ', this.lastItem);

    if (isStepsNotFinished) return this.lastItem;
  }
  ,
  // ETAPE SUIVANTE (au Clic)
  nextChoice(level) {
    this.isAllItemsFull = true;
    this.currentChoice = level;
    this.uncheckRadioButtons();
    this.getGroup();
    this.currentResponse = '';
    this.getChoice();
    this.getSteps();
  }
});


// APPLICATION
function treeItem(model) {
  return {
    $template: '#choice-tree-template',
    model,
    store,
  }
}


// INITIALISATION
PetiteVue.createApp({
  TreeData,
  treeItem
}).mount("#app");