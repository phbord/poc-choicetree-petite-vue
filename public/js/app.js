// DONNEES
//import TreeData from '../data/data.json' assert { type: "json" };
/* const fetchData = () => fetch('http://127.0.0.1:5500/public/data/data.json')
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
  labelsSteps: []
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
      let groupObj = { "group": this.currentChoice };

      // Intro (ajout dans tableau "allIntros")
      (item.intro) && this.allIntros.push({level: `${item.level}.1`, intro: item.intro});
      (item.response) 
        ? item = {level: item.level, label: item.label, response: item.response}
        : item = {level: item.level, label: item.label, choices: item.choices};

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
    //console.log('setAllItems(model) ------> allItems: ', this.allItems);
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
      
      (ifStep) && this.labelsSteps.push(item.label);
    })
  }
  ,
  // RETOUR au choix précédent (au Clic)
  returnPrevStep() {
    this.labelsSteps.pop();
    this.currentResponse = '';

    if (this.currentChoice.split('.').length === 1) {
      this.currentChoice = '0';
    }
    else {
      const newChoice = this.currentChoice.split('.')
                                          .filter((item, index) => index < this.currentChoice.split('.').length - 1);
      this.currentChoice = newChoice.join('.');
    }

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
    //console.log('getChoice() ------> lastItem: ', this.lastItem);

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