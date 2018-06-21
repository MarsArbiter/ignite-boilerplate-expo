import Axios from 'axios'
import {DOMAIN, CODES} from '../foundation/cerror'

//hand logic error from backend
export function dataMapper(response) {
  try {
    const data = response.data

    if (!data.code) {
      return {data: data.data}
    }

    return {
      error: {
        domain: DOMAIN.api,
        code: data.code
      }
    }
  } catch (err) {
    return {
      error: {
        domain: DOMAIN.parse,
      }
    }
  }
}


// hand raw error from axios http request
export function errorMapper(error) {

  const result = {
    domain: DOMAIN.noerror
  }

  if (Axios.isCancel(error)) {
    console.log('Request canceled', error.message);
    result.domain = DOMAIN.noerror
    result.code = CODES[DOMAIN.noerror].cancel
  } else if (error.response) {
    result.domain = DOMAIN.network
    result.code = error.response.status

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    result.domain = DOMAIN.request
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('request error ===>',error.request);
  } else {
    result.domain = DOMAIN.request
    // Something happened in setting up the request that triggered an Error
    console.log('request setting error', error.message);
  }

  return {
    error: result
  }
}
