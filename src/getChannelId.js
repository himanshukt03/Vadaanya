const https = require('https');
https.get('https://www.youtube.com/@vadaanyajanaasociety9272', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const match = data.match(/https:\/\/www\.youtube\.com\/channel\/(UC[^"]+)/);
    console.log(match ? match[1] : 'Not found');
  });
});
