var https = require('https');

// function geocode(query) {
//   return (
//     https.get(
//       `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         query
//       )}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`,
//       response => {
//         let body = '';
//         response.on('data', d => {
//           body += d;
//         });
//         response.on('error', e => {
//           let error = e;
//           return error;
//         });
//         response.on('end', () => {
//           let results = JSON.parse(body);
//           return results;
//         });
//       }
//     )
//   );
// }


function geocode(query, callback) {
  https.get(
    `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`,
    response => {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });
      response.on('error', function(e) {
        console.log(e);
        return e;
      });
      response.on('end', function() {
        // console.log(JSON.parse(body));
        return JSON.parse(body);
        // callback(null, JSON.parse(body));
      });
    }
  );
}

if (require.main === module) {
  if (!process.env.MapboxAccessToken) {
    console.log('environment variable MapboxAccessToken must be set');
    process.exit(1);
  }
  geocode(process.env.MapboxAccessToken, process.argv[2], function(
    err,
    result
  ) {
    if (err) return console.log('Error: ' + err);
    // console.log(JSON.stringify(result, null, 2));
    return JSON.parse(result);
  });
}

// async function geocode(query) {
//   return new Promise((resolve, reject) => {
//     https.get(
//       `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         query
//       )}.json?access_token=${process.env.GATSBY_MAPBOX_TOKEN}`,
//       async response => {
//         let body = '';
//         response.on('data', d => {
//           body += d;
//         });
//         response.on('error', e => {
//           let error = reject(e);
//           return error;
//         });
//         response.on('end', () => {
//           let results = resolve(JSON.parse(body));
//           return results;
//         });
//       }
//     );
//   });
// }

module.exports = geocode;
