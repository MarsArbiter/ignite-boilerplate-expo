import Axios from 'axios'
import pathToRegexp from 'path-to-regexp'

import httpClient from '../utils/httpClient'
import {dataMapper, errorMapper} from './mapper'
import {baseURL, APIObjects, Environment} from './config'
import mock from './mock'

const axios = Axios.create({baseURL})
Environment.enableMock && mock(axios)

const client = new httpClient({
  axios,
  dataMapper,
  errorMapper
})


function request(apiObject, {pattern, params, config} = {}) {

  const {path, method} = apiObject
  const url = pathToRegexp.compile(path)(pattern)

  const requestConfig = {
    ...{
      url,
      method,
      params
    },
    ...config
  }

  return client.request(requestConfig)
}


export {
  request,
  APIObjects
}
