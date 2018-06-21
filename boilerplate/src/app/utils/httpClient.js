import Axios from 'axios'

import {
  Observable
} from 'rxjs'

const normal = resp => resp

export default class Client {

  constructor({axios, dataMapper, errorMapper}) {
    this._inner = {
      axios: axios,
      errorHandles: [],
      dataMapper: dataMapper || normal,
      errorMapper: errorMapper || normal
    }

    this.header = {}
    this.request = this.request.bind(this)
  }


  request(config) {
    const {axios, dataMapper, errorMapper} = this._inner
    config.headers = {...this.headers, ...config.headers}

    const CancelToken = Axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token

    return Observable.create(observer => {

      axios.request(config)
        .then(function (response) {
          const result = dataMapper(response)
          result.error ? observer.error(result.error) : observer.next(result.data)
          observer.complete()
        })
        .catch(function (error) {
            const result = errorMapper(error)
            observer.error(result.error)
            observer.complete()
          }
        )
      return source.cancel
    })
  }

  addHeader(header) {
    this.headers = {...this.header, ...header}
  }

  resetHeader() {
    this.headers = {}
  }

  listenError(cb) {
    this._inner.errorHandles.push(cb)
  }

  _handleError(err) {
    for (let i = 0; i < this._inner.errorHandles.length; i++) {
      const cb = this._inner.errorHandles[i]
      cb(this, err)
    }
  }
}
