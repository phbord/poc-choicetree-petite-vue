import TreeData from '../data/pre-data.json' assert { type: "json" };

function treeItem(model) {
    return {
      $template: '#choice-tree-template',
      model,
    }
  }
  
  PetiteVue.createApp({
    TreeData,
    treeItem
  }).mount();