//import TreeData from '../data/data.json' assert { type: "json" };
const TreeData = () => fetch('http://127.0.0.1:5500/public/data/data_2.json')
                  .then(res => res.json())
                  .catch(err => console.log(err));
console.log('TreeData: ', await TreeData());
function treeItem(model) {
  return {
    $template: '#choice-tree-template',
    model,
    levelRadioButtonArr: [],
    itemsNumber: 0,
    isHiddenReset: true,
    isChecked: '',
    eltOpened: '',
    displayResetButton(level) {
      this.isHiddenReset = false;
      this.eltOpened = level;
      console.log('eltOpened:', this.eltOpened);
      console.log(level, ' / split:', level.split('.').length);
      if (this.levelRadioButtonArr.length === 0 || !this.levelRadioButtonArr.includes(level)) {
        this.levelRadioButtonArr.push(level);
        console.log('levelRadioButtonArr: ', this.levelRadioButtonArr);
      }
    },
    hideResetButton() {
      this.isHiddenReset = true;
      this.isChecked = false;
      this.isChecked = '';
      this.eltOpened = '';
      console.log('eltOpened hide:', this.eltOpened);
    },
  }
}

PetiteVue.createApp({
  TreeData: await TreeData(),
  treeItem
}).mount();