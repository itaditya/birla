const path = require('path')
const fs = require('fs-extra')

const dynamicToken = '$NAME'

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
  const destDir = path.join(dir, dest)
  await fs.copy(srcDir, dest)
}

const renameFiles = async(name, dest) => {
  const dir = path.join(process.cwd(), dest)
  const hasName = str => str.includes(dynamicToken)
  walk(dir, (filepath, filename, isDir) => {
    if (hasName(filename)) {
      const lastIndex = filepath.lastIndexOf(dynamicToken)
      const tokenLen = dynamicToken.length
      const prefix = filepath.substr(0, lastIndex)
      const suffix = filepath.substr(lastIndex + tokenLen)
      const newpath = prefix + name + suffix
      fs.renameSync(filepath, newpath)
    }
  })
}

const changeContent = async(name, dest) => {
  const dir = path.join(process.cwd(), dest)
  walk(dir, (filepath, filename, isDir) => {
    if (!isDir) {
      const origContent = fs.readFileSync(filepath, 'utf-8')
      const newContent = origContent.replace(/\$NAME/g, name)
      fs.writeFileSync(filepath, newContent)
    }
  })
}

const birla = async(name, templateName, dest) => {
  try {
    console.log('Starting copyTemplate process');
    await copyTemplate(templateName, dest)
  } catch(err) {
    console.log('Error Occurred during copyTemplate process');
  }
  try {
    console.log('Starting renameFiles process');
    await renameFiles(name, dest)
  } catch(err) {
    console.log('Error Occurred during renameFiles process');
  }
  try {
    console.log('Starting changeContent process');
    await changeContent(name, dest)
  } catch(err) {
    console.log('Error Occurred during changeContent process');
  }
}

module.exports = birla
