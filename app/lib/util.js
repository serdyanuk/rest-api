const parseHTTPBodyToJSON = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = {
  parseHTTPBodyToJSON,
};
