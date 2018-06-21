import {APIObjects} from '../config'

export default [
  {
    path: APIObjects.example.path,
    method: APIObjects.example.method,
    response: {
      data: {
        foo: 'foo',
        bar: 'bar'
      }
    },
    paramResponse: [{
      params: {page: 2, pageSize: 2},
      response: {
        data: [{
          foo: 'foo1',
          bar: 'bar1'
        }, {
          foo: 'foo1',
          bar: 'bar1'
        }, {
          foo: 'foo1',
          bar: 'bar1'
        },
        ]
      }
    }]
  }
]
