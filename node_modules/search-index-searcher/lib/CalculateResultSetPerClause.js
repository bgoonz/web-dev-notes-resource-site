const Transform = require('stream').Transform
const _difference = require('lodash.difference')
const _intersection = require('lodash.intersection')
const _spread = require('lodash.spread')
const siUtil = require('./siUtil.js')
const util = require('util')

const CalculateResultSetPerClause = function (options) {
  this.options = options
  Transform.call(this, { objectMode: true })
}
exports.CalculateResultSetPerClause = CalculateResultSetPerClause
util.inherits(CalculateResultSetPerClause, Transform)
CalculateResultSetPerClause.prototype._transform = function (queryClause, encoding, end) {
  const sep = this.options.keySeparator
  const that = this
  const frequencies = []
  var NOT = function (includeResults) {
    const bigIntersect = _spread(_intersection)
    var include = bigIntersect(includeResults)
    // if there are no NOT conditions, simply end()
    if (siUtil.getKeySet(queryClause.NOT, sep).length === 0) {
      that.push({
        queryClause: queryClause,
        set: include,
        termFrequencies: frequencies,
        BOOST: queryClause.BOOST || 0
      })
      return end()
    } else {
      // if there ARE "NOT"-conditions, remove all IDs specified by NOT
      var i = 0
      var excludeResults = []
      siUtil.getKeySet(queryClause.NOT, sep).forEach(function (item) {
        var excludeSet = {}
        that.options.indexes.createReadStream({gte: item[0], lte: item[1] + sep})
          .on('data', function (data) {
            for (var i = 0; i < data.value.length; i++) {
              excludeSet[data.value[i]] = 1
            }
          })
          .on('error', function (err) {
            that.options.log.debug(err)
          })
          .on('end', function () {
            var exclude = Object.keys(excludeSet)
            excludeResults.push(exclude.sort())
            if (++i === siUtil.getKeySet(queryClause.NOT, sep).length) {
              excludeResults.forEach(function (excludeSet) {
                include = _difference(include, excludeSet)
              })
              that.push({
                queryClause: queryClause,
                set: include,
                termFrequencies: frequencies,
                BOOST: queryClause.BOOST || 0
              })
              return end()
            }
          })
      })
    }
  }
  // Get all of the IDs in the AND conditions
  var IDSets = []
  siUtil.getKeySet(queryClause.AND, sep).forEach(function (item) {
    var includeSet = {}
    var setLength = 0
    that.options.indexes.createReadStream({gte: item[0], lte: item[1]})
      .on('data', function (data) {
        setLength += data.value.length
        for (var i = 0; i < data.value.length; i++) {
          includeSet[data.value[i]] = 1
        }
      })
      .on('error', function (err) {
        that.options.log.debug(err)
      })
      .on('end', function () {
        var include = Object.keys(includeSet)
        frequencies.push({
          gte: item[0].split(sep)[1] + sep + item[0].split(sep)[2],
          lte: item[1].split(sep)[1] + sep + item[1].split(sep)[2],
          tf: include.length, // actual term frequency across docs
          setLength: setLength // number of array elements that need to be traversed
        })
        IDSets.push(include.sort())
        if (IDSets.length === siUtil.getKeySet(queryClause.AND, sep).length) {
          NOT(IDSets)
        }
      })
  })
}
