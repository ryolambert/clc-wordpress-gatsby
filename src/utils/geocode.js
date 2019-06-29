var https = require('https');

async function geocode(query) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`,
      async response => {
        let body = '';
        response.on('data', d => {
          body += d;
        });
        response.on('error', e => {
          let error = reject(e);
          return error;
        });
        response.on('end', () => {
          let results = resolve(JSON.parse(body));
          return results;
          // let newResults = results.features[0].center;
          // console.log(newResults);
        });
      }
    );
  });
}
module.exports = geocode;
