var server = require('pushstate-server');

server.start({
  port: 4200,
  directories: ['./core-site', './1-tools', './2-content']
});
