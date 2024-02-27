const fs = require('fs');

module.exports = function override(config, env) {
  // Check if HTTPS is enabled
  if (process.env.HTTPS === 'true') {
    config.devServer.https = {
      key: fs.readFileSync(process.env.SSL_KEY_FILE),
      cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    };
  }

  return config;
};
