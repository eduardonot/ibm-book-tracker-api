const statusCode = {
  200: 'ok',
  201: 'created',
  204: 'no-content',
  400: 'bad-request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not-found',
  405: 'method-not-allowed',
  500: 'internal-server-error'
}

module.exports = {
  send: (res, options) => {
    return res.status(options.status).json({
      message: statusCode[options.status],
      body: options.data ? options.data : null
    })
  }
}
