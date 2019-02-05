const path = require('path')
const fs = require('fs-extra')
const changeCase = require('change-case')

const walk = (rootdir, callback) => {
  fs.readdirSync(rootdir).forEach((filename) => {
    const filepath = path.join(rootdir, filename)
    const isDir = fs.statSync(filepath).isDirectory()
    if (isDir) {
      walk(filepath, callback)
    }
    callback(filepath, filename, isDir)
  })
}

const copyTemplate = async(templateName, dest) => {
  const dir = process.cwd()
  const srcDir = path.join(dir, 'birla-templates', templateName)
  await fs.copy(srcDir, dest)
}

const renameFiles = (names, dest) => {
  const dir = path.join(process.cwd(), dest)
  walk(dir, (filepath, filename) => {
    let newpath = filepath;
    if (filename.includes('$NAME_c')) {
      newpath = filepath.replace(/\$NAME_c(?!.*\$NAME_c)/, names.camel);
    } else if (filename.includes('$NAME_p')) {
      newpath = filepath.replace(/\$NAME_p(?!.*\$NAME_p)/, names.pascal);
    } else if (filename.includes('$NAME_s')) {
      newpath = filepath.replace(/\$NAME_s(?!.*\$NAME_s)/, names.snake);
    } else if (filename.includes('$NAME_h')) {
      newpath = filepath.replace(/\$NAME_h(?!.*\$NAME_h)/, names.param);
    } else if(filename.includes('$NAME')) {
      newpath = filepath.replace(/\$NAME(?!.*\$NAME)/, names.default);
    }
    fs.renameSync(filepath, newpath)
  })
}

const changeContent = (names, dest) => {
  const dir = path.join(process.cwd(), dest)
  walk(dir, (filepath, _, isDir) => {
    if (!isDir) {
      const origContent = fs.readFileSync(filepath, 'utf-8')
      const newContent = origContent
        .replace(/\$NAME_c/g, names.camel)
        .replace(/\$NAME_p/g, names.pascal)
        .replace(/\$NAME_s/g, names.snake)
        .replace(/\$NAME_h/g, names.param)
        .replace(/\$NAME/g, names.default);
      fs.writeFileSync(filepath, newContent)
    }
  })
}

const birla = async(name, templateName, dest) => {
  try {
    console.log('Starting copyTemplate process');
    await copyTemplate(templateName, dest)
    try {
      const names = { default: name };
      names.camel = changeCase.camelCase(name);
      names.pascal = changeCase.pascalCase(name);
      names.snake = changeCase.snakeCase(name);
      names.param = changeCase.paramCase(name);

      console.log('Starting renameFiles process');
      renameFiles(names, dest)
      try {
        console.log('Starting changeContent process');
        changeContent(names, dest);
      } catch (err) {
        console.log('Error Occurred during changeContent process');
      }
    } catch (err) {
      console.log(err);
      console.log('Error Occurred during renameFiles process');
    }
  } catch(err) {
    console.log('Error Occurred during copyTemplate process');
  }
}

module.exports = birla
