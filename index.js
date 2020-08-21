const getScreenshot = require('./screenshot');
const { parse } = require('url');

module.exports = async (req, res) => {
  // For CORS
  if (req.method === 'OPTIONS') return res.json('ok');

  const { query = {} } = parse(req.url || '', true);
  const { type = 'jpeg', path = '/' } = query; // png or jpeg

  const url = `https://kwis.app${path}`; // add protocol if missing
  const file = await getScreenshot(url, type);

  res.statusCode = 200;
  res.setHeader('Content-Type', `image/${type}`);
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=86400');
  res.end(file);
};
