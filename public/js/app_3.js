//import TreeData from '../data/data.json' assert { type: "json" };
const fetchData = () => fetch('http://127.0.0.1:5500/public/data/data_3.json')
                  .then(res => res.json())
                  .catch(err => console.log(err));
const TreeData = await fetchData();

const store = PetiteVue.reactive({
  allLevels: [],
  setAllLevels(level) {
    this.allLevels.push(level);
    console.log(typeof this.allLevels, '-=> allLevels: ', this.allLevels);
  },
});

function treeItem(model) {
  return {
    $template: '#choice-tree-template',
    model,
    store,
    currentChoice: '1',
    nextChoice() {},
  }
}

PetiteVue.createApp({
  TreeData: TreeData,
  treeItem
}).mount();