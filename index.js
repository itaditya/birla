#! /usr/bin/env node
const program = require('commander')

const birla = require('./birla')

 program
  .arguments('<dest>')
  .option('-n, --name <name>', 'The value of $NAME')
  .option('-t, --template <template>', 'The name of template to use from birla-templates')
  .action(dest => {
    console.log(program.name, program.template, dest)
    birla(program.name, program.template, dest)
  })
  .parse(process.argv)
