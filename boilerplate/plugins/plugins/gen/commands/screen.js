const filter = require('../lib/filter')
const patterns = require('../lib/patterns')

module.exports = async function (context) {
  // grab some features
  const {parameters, print, strings, ignite, filesystem, prompt} = context
  const {camelCase, pascalCase, isBlank} = strings
  const config = ignite.loadIgniteConfig()

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate screen <name>\n`)
    print.info('A name is required.')
    return
  }


  const name = camelCase(parameters.first)
  const dir = `app/screens/${name}`
  const props = {name}


  // geneerate srceens
  await (async () => {
    const jobs = [
      {
        template: `screen.ejs`,
        target: `${dir}/index.js`
      }, {
        template: 'screen-style.ejs',
        target: `${dir}/Styles.js`
      }
    ]

    await ignite.copyBatch(context, jobs, {name:pascalCase(name)})
  })()

  //generate mobx store
  if (config.mobx) {
    const {needMobx} = await prompt.ask({
      name: 'needMobx',
      type: 'list',
      message: 'Do you want need store?',
      choices: ['true', 'false']
    })

    if (needMobx === 'true') {

      const jobs = [{
        template: `store.ejs`,
        target: `app/stores/${name}.js`
      }]

      // make the templates
      await ignite.copyBatch(context, jobs, props)

      //
      const importContent = `import ${name} from './${name}'`
      const exportContent = `  ${name}`


      ignite.patchInFile(`./app/stores/index.js`, {
        before: `\n`,
        insert: importContent
      })

      ignite.patchInFile(`./app/stores/index.js`, {
        after: patterns[patterns.constants.PATTERN_STORE_INDEX],
        insert: exportContent
      })
    }
  }


  if (config.navigation === 'react-navigation') {
    const domains = filter(filesystem.list('./app/navigation/'), item => {
      const reg = new RegExp(patterns[patterns.constants.PATTERN_ROUTER_NAME])
      return reg.test(item)
    })
    const domainChoices = ['none', ...domains]

    const {router} = await prompt.ask({
      name: 'router',
      type: 'list',
      message: 'Which router do you want to add?',
      choices: domainChoices
    })

    if (router === domainChoices[0]) {
      print.info(`Not need navigation`)
    } else {
      const appNavFilePath = `app/navigation/${router}`
      const importToAdd = `import ${name} from '../../${dir}'`
      const routeToAdd = `  ${name}: { screen: ${name} },`


      // insert screen import
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_IMPORTS],
        insert: importToAdd
      })

      // insert screen route
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_ROUTES],
        insert: routeToAdd
      })
    }
  } else {
    print.info(`Screen ${name} created, manually add it to your navigation`)
  }
}
