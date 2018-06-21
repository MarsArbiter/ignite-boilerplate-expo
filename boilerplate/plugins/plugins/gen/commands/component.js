
module.exports = async function (context) {
  const {parameters, strings, print, ignite} = context
  const {camelCase, isBlank} = strings

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  let name = camelCase(parameters.first)
  const props = {name}
  const jobs = [{
    template: 'component.ejs',
    target: `app/components/${name}/index.js`
  }, {
    template: 'component-style.ejs',
    target: `app/components/${name}/Styles.js`
  }]

  await ignite.copyBatch(context, jobs, props)
}
