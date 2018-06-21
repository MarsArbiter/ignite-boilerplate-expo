const constants = {
  PATTERN_IMPORTS: 'imports',
  PATTERN_STORE_INDEX:'storeIndex',
  PATTERN_ROUTES: 'routes',
  PATTERN_ROUTER_NAME: 'routeName',
  PATTERN_API_OBJECT: 'apiObject',
  PATTERN_API_MOCK_IMPORT: 'apiMockImport',
  PATTERN_API_MOCK_CONTENT: 'apiMockContent',
}

module.exports = {
  constants,
  [constants.PATTERN_IMPORTS]: `import[\\s\\S]*from\\s+'react-navigation';?`,
  [constants.PATTERN_STORE_INDEX]: `export default {`,
  [constants.PATTERN_ROUTES]: 'export const screens = {',
  [constants.PATTERN_ROUTER_NAME]: 'Navigator\.js',
  [constants.PATTERN_API_OBJECT]: 'export const APIObjects = {',
  [constants.PATTERN_API_MOCK_IMPORT]: "import MockAdapter from 'axios-mock-adapter'",
  [constants.PATTERN_API_MOCK_CONTENT]: "const mockData = \\\["
}
