/*
 *
 *
 * */
const {merge, pipe, assoc, omit, __} = require('ramda')

async function install (context) {
  const {
    filesystem,
    parameters,
    template,
    print,
    system
  } = context

  const name = parameters.third
  const APP_PATH = `${process.cwd()}/${name}`
  const PLUGIN_PATH = __dirname
  const spinner = creatSpinner(print, `using the ${print.colors.cyan('expo')} boilerplate`)

  async function initProject () {
    await system.spawn(`exp init ${name} -t blank`, {stdio: [process.stdin, 'ignore', process.stderr]})
    process.chdir(name)
  }

  async function copyFiles () {
    filesystem.copy(`${PLUGIN_PATH}/boilerplate/src`, APP_PATH, {
      overwrite: true,
      matching: '!*.ejs'
    })

    filesystem.copy(`${PLUGIN_PATH}/boilerplate/plugins`, `${APP_PATH}/ignite`, {
      overwrite: true,
    })
  }

  async function setupGit () {
    // initialize git
    const gitExists = await filesystem.exists('.git')
    if (!gitExists && !parameters.options['skip-git'] && system.which('git')) {
      await system.run('git init . && git add . && git commit -m "Initial commit."')
    }

    if (gitExists) {
      await system.run('git add . && git commit -m "Initial commit."')
    } else if (!parameters.options['skip-git'] && system.which('git')) {
      await system.run('git init . && git add . && git commit -m "Initial commit."')
    }
  }

  /**
  /**
   * Merge the package.json.ejs from our template into the one provided from react-native init.
   */
  async function mergePackageJsons () {
    const rawJson = await template.generate({
      directory: `${PLUGIN_PATH}/boilerplate/src`,
      template: 'package.json.ejs',
      props: {}
    })


    const newPackageJson = JSON.parse(rawJson)
    const currentPackage = filesystem.read('package.json', 'json')

    // deep merge, lol
    const newPackage = pipe(
      assoc(
        'dependencies',
        merge(currentPackage.dependencies, newPackageJson.dependencies)
      ),
      assoc(
        'devDependencies',
        merge(currentPackage.devDependencies, newPackageJson.devDependencies)
      ),
      assoc('scripts', merge(currentPackage.scripts, newPackageJson.scripts)),
      merge(
        __,
        omit(['dependencies', 'devDependencies', 'scripts'], newPackageJson)
      )
    )(currentPackage)

    // write this out
    filesystem.write('package.json', newPackage, {jsonIndent: 2})
  }

  async function installDep () {
    await system.run("yarn", {stdio: 'inherit'})
  }



  await spinner(initProject, {hint: '▸ init project'})
  await spinner(copyFiles, {hint: '▸ copy files'})
  await spinner(mergePackageJsons, {hint: '▸ merge package'})
  // await spinner(installDep, {hint: '▸ yarn'})
  await spinner(setupGit, {hint: '▸ setting up git'})

  // Wrap it up with our success message.
  print.info('')
  print.info('----- Installed! -----')
  print.info('')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  exp start'))
  print.info('')
}

function creatSpinner (print, title) {
  const spinner = print
    .spin(title)
    .succeed()

  return async function (cb, {hint} = {}) {
    spinner.text = hint
    spinner.start()
    await cb()
    spinner.stop()
  }
}

module.exports = {install}
