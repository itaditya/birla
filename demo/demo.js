const birla = require('../birla')

const genFiles = async () => {
  const folderName = 'long_task';
  // const folderName = 'Button' + Math.random();
  await birla(folderName, 'simple-component', 'app/components/experiment');
}

genFiles();
