import MockAdapter from 'axios-mock-adapter'
import example from './example'

const kMethodMapping = {
  'get': 'onGet',
  'post': 'onPost'
}

const mockData = [
  ...example,
]


//
export default function (axios, config={}) {

  const mockConfig = {
    ...{delayResponse: 2000},
    ...config
  }

  const mock = new MockAdapter(axios, mockConfig)
  for (let i = 0; i < mockData.length; i++) {
    const item = mockData[i]
    const mockMethod = kMethodMapping[item.method]

    if (item.response) {
      mock[mockMethod](item.path).reply(200, item.response);
    } else if (item.paramResponse) {
      for (let j = 0; j < item.paramResponse.length; j++) {
        const paramItem = item.paramResponse[j]
        mock[mockMethod](item.path, {params: paramItem.params}).reply(200, paramItem.response);
      }
    }
  }
}
