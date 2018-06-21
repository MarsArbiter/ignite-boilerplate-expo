// custome error

export const DOMAIN = {
  unknow: -1,
  noerror: 0, // no error, may be same case that user cancel this operation
  network: 1, // network error, check the code 300 400 ...
  api: 2,     // response status is 200, but some backend error may be indicated
  parse: 3,   // parse error, caused by parse data
  request: 4  // request error, whith wrong param or config
}

// error code for each DOMAIN
export const CODES = {
  [DOMAIN.noerror]: {
    cancel: 1 //
  }
}

export default class Error {
  domain = 0
  code = 0
  hint
}
