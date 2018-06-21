const patterns = require('../lib/patterns')

module.exports = async function (context) {
  const {parameters, strings, print, ignite, prompt} = context
  const {camelCase, isBlank} = strings

  // validation
  if (isBlank(parameters.first) && !hasFolder) {
    print.info(`${context.runtime.brand} generate api <name>\n`)
    print.info('A name is required.')
    return
  }


  const methodQuestion = {
    name: 'method',
    type: 'input',
    default: 'get',
    message: `What's the method?`
  }
  const mockQuesture = {
    name: 'needMock',
    type: 'list',
    choices: ['true', 'false'],
    message: `Do you want a mock?`
  }
  const {method, needMock} = await prompt.ask([methodQuestion, mockQuesture])

  const name = camelCase(parameters.first)
  const content = `  ${name}: {
    path: '/${name}',
    method: '${method}'
  },`


  ignite.patchInFile(`./app/api/config.js`, {
    after: patterns[patterns.constants.PATTERN_API_OBJECT],
    insert: content
  })


  if (needMock === 'true') {
    const mockdir = './app/api/mock'
    const jobs = [
      {
        template: `apiMock.ejs`,
        target: `${mockdir}/${name}.js`
      }
    ]
    const props = {
      name: name
    }

    await ignite.copyBatch(context, jobs, props)


    const indexPath = `${mockdir}/index.js`
    const importToAdd = `import ${name} from './${name}'`
    const contentToAdd = `  ...${name},`


    ignite.patchInFile(indexPath, {
      after: patterns[patterns.constants.PATTERN_API_MOCK_IMPORT],
      insert: importToAdd
    })

    ignite.patchInFile(indexPath, {
      after: patterns[patterns.constants.PATTERN_API_MOCK_CONTENT],
      insert: contentToAdd
    })


  }


}
