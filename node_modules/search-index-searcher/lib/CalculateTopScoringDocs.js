const Transform = require('stream').Transform
const _sortedIndexOf = require('lodash.sortedindexof')
const util = require('util')

const CalculateTopScoringDocs = function (options, offset, pageSize) {
  this.options = options
  this.offset = offset
  this.pageSize = pageSize
  this.seekLimit = offset + pageSize
  Transform.call(this, { objectMode: true })
}
exports.CalculateTopScoringDocs = CalculateTopScoringDocs
util.inherits(CalculateTopScoringDocs, Transform)
CalculateTopScoringDocs.prototype._transform = function (clauseSet, encoding, end) {
  const sep = this.options.keySeparator
  // clauseSet = JSON.parse(clauseSet)
  const that = this

  // use smallest token set (lowest frequency)
  const lowestFrequency = clauseSet.termFrequencies.sort(function (a, b) {
    return a.setLength - b.setLength
  })[0]

  const gte = 'TF' + sep + lowestFrequency.gte
  const lte = 'TF' + sep + lowestFrequency.lte + sep

  // walk down the DF array of lowest frequency hit until (offset +
  // pagesize) hits have been found

  var topScoringDocs = []
  that.options.indexes.createReadStream({gte: gte, lte: lte})
    .on('data', function (data) {
      var intersections = []
      // Do intersection and pagination cutoffs here- only push
      // results that are in the resultset
      for (var i = 0
        ; ((i < data.value.length) && (intersections.length < that.seekLimit)); i++) {
        if (_sortedIndexOf(clauseSet.set, data.value[i][1]) !== -1) {
          intersections.push(data.value[i])
        }
      }
      topScoringDocs = topScoringDocs.concat(intersections)
    })
    .on('error', function (err) {
      that.options.log.debug(err)
    })
    .on('end', function () {
      // if no TF keys were present, then index has been generated
      // with fastSort disabled. Simply return a page (offset +
      // pageSize) sized slice from the beginning of the clauseSet
      if (topScoringDocs.length === 0) {
        topScoringDocs = clauseSet.set
        // slice results from end of array since it is sorted ascendingly
          .slice(-that.seekLimit, clauseSet.set.length)
          .map(function (id) {
            return [1, id]
          })
      }
      // fetch document vectors for the highest scores and work out
      // complete score for each selected doc.
      clauseSet['topScoringDocs'] = topScoringDocs
      that.push(clauseSet)
      return end()
    })
}
