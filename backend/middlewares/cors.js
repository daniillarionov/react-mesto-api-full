const allowedCors = [
  'https://go.to.mesto.nomoredomains.work',
  'http://go.to.mesto.nomoredomains.work',
  'localhost:3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});
