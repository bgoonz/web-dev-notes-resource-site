const list = require('../list');
const fn = require('./fn');

module.exports = fn(list);




for f in *; do nf=$(echo "$f" |sed -e 's/[^A-Za-z0-9.-]/./g;s/\.\.\././g;s/\.\././g'); test "$f" != "$nf" && mv "$f" "$nf" && echo "$nf"; done
