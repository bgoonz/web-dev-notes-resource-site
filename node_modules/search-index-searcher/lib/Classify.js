const Transform = require('stream').Transform
const ngraminator = require('ngraminator')
const util = require('util')

const checkTokens = function (that, potentialMatches, field, done) {
  var i = 0 // eslint-disable-line
  var match = function (i) {
    if (i === potentialMatches.length) return done()
    var matchQuery = {
      beginsWith: potentialMatches[i],
      field: field,
      type: 'ID',
      sort: 'alphabetical',
      threshold: 0
    }
    that.searcher.match(matchQuery)
      .on('data', function (match) {
        if (match.token === potentialMatches[i]) { that.push(match) }
      }).on('end', function () {
        match(++i)
      })
  }
  match(0)
}

const Classify = function (searcher, options) {
  this.options = Object.assign({}, searcher.options, options)
  this.searcher = searcher
  // should maybe be maxNGramLength
  this.maxNGramLength = this.options.maxNGramLength || 1
  this.field = this.options.field || '*'
  this.stack = []
  Transform.call(this, { objectMode: true })
}

exports.Classify = Classify

util.inherits(Classify, Transform)

Classify.prototype._transform = function (token, encoding, end) {
  var stack = this.stack
  var t = token.toString()
  var that = this
  var potentialMatches = []
  stack.push(t)
  if (stack.length < this.maxNGramLength) return end()
  stack.forEach(function (item, i) {
    potentialMatches.push(stack.slice(0, (1 + i)).join(' ').toLowerCase())
  })
  checkTokens(that, potentialMatches, this.field, function () {
    stack.shift()
    return end()
  })
}

Classify.prototype._flush = function (end) {
  var that = this
  var stack = this.stack
  var potentialMatches = ngraminator.ngram(stack, {
    gte: 1,
    lte: that.maxNGramLength
  }).map(function (token) {
    return token.join(' ').toLowerCase()
  })
  checkTokens(that, potentialMatches, this.field, function () {
    return end()
  })
}
