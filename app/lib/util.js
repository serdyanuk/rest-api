const parseHTTPBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req
      .on('data', (chunk) => {
        body += chunk;
      })
      .on('end', () => {
        resolve(body);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const parseHTTPBodyToJSON = async (req) => {
  try {
    const body = await parseHTTPBody(req);
    return JSON.parse(body);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  parseHTTPBodyToJSON,
};
