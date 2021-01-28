const stat = require('../stat');
const dirSize = require('../dirSize');
const fn = require('./fn');

module.exports = fn(stat, dirSize);



find './' -type f - print0 | xargs - rl0 rename_bad_filename
