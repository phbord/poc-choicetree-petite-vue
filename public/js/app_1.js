import TreeData from '../data/data_1.json' assert { type: "json" };

function treeItem(model) {
  return {
    $template: '#choice-tree-template',
    model,
    levelRadioButtonArr: [],
    isShow: true,
    isHiddenReset: true,
    isChecked: '',
    displayResetButton(level) {
      this.isHiddenReset = false;
      console.log('split:', level.split('-').length);
      if (this.levelRadioButtonArr.length === 0 || !this.levelRadioButtonArr.includes(level)) {
        this.levelRadioButtonArr.push(level);
        console.log('levelRadioButtonArr: ', this.levelRadioButtonArr);
      }
    },
    hideResetButton() {
      this.isHiddenReset = true;
      this.isChecked = false;
      this.isChecked = '';
    }
  }
}

PetiteVue.createApp({
  TreeData,
  treeItem
}).mount();