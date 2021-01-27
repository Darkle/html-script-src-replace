#!/usr/bin/env node
const fs = require('fs')

const { program } = require('commander')
const cheerio = require('cheerio')

program
  .option('-id, --script-element-id <scriptElementId>', 'HTML script element id')
  .option('-i, --html-input-file <htmlInputFile>', 'HTML input file')
  .option('-o, --html-output-file <htmlOutputFile>', 'HTML output file')
  .option('-pr, --filename-prefix <filenamePrefix>', 'File name prefix')
  .option('-po, --filename-postfix <filenamePostfix>', 'File name postfix')

program.parse(process.argv)

if(!process.env.CACHE_BUST_STRING || process.env.CACHE_BUST_STRING.length < 1){
  throw new Error('Error, process.env.CACHE_BUST_STRING not set.')
}
if(!program.htmlInputFile){
  throw new Error('Error, no --html-input-file set.')
}
if(!program.htmlOutputFile){
  throw new Error('Error, no --html-output-file set.')
}

const $ = cheerio.load(fs.readFileSync(program.htmlInputFile, 'utf8'))
const script = program.scriptElementId ? $(`script[id="${program.scriptElementId}"]`) : $('script')

if(!script.get(0)){
  throw new Error('Could not find the script tag')
}

const scriptSrc = script.attr('src')
const fileName = scriptSrc.slice(scriptSrc.lastIndexOf('/') + 1, scriptSrc.length - 3)
const filePath = scriptSrc.slice(0, scriptSrc.lastIndexOf('/') +1)
const prefix = program.filenamePrefix ? program.filenamePrefix : ''
const postfix = program.filenamePostfix ? program.filenamePostfix : ''
const newScriptSrc = `${filePath}${prefix}${fileName}${postfix}${process.env.CACHE_BUST_STRING}.js`

script.attr('src', newScriptSrc)

fs.writeFileSync(program.htmlOutputFile, $.html(), 'utf8')
