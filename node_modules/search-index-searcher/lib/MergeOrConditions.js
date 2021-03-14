const Transform = require('stream').Transform
const util = require('util')

const MergeOrConditions = function (q) {
  this.resultSet = []
  this.q = q
  Transform.call(this, { objectMode: true })
}
exports.MergeOrConditions = MergeOrConditions
util.inherits(MergeOrConditions, Transform)
MergeOrConditions.prototype._transform = function (doc, encoding, end) {
  // console.log(JSON.stringify(doc, null, 2))
  this.resultSet.push(doc)
  return end()
}
MergeOrConditions.prototype._flush = function (end) {
  var that = this
  // get rid of OR conditions- merge on doc id
  var mergedResultSet = this.resultSet.sort(function (a, b) {
    if (a.id < b.id) return 1
    if (a.id > b.id) return -1
    return 0
  }).reduce(function (merged, cur) {
    // merge scoring criteria (OR conditions)
    var lastDoc = merged[merged.length - 1]
    if (merged.length === 0 || (cur.id !== lastDoc.id)) {
      merged.push(cur)
    } else if (cur.id === lastDoc.id) {
      // in case a document is duplicated with different score, save the higher score
      lastDoc.scoringCriteria = lastDoc.scoringCriteria.concat(cur.scoringCriteria)
    }
    return merged
  }, [])

  // console.log(JSON.stringify(mergedResultSet, null, 2))

  // work out the score as an average of all OR conditions.
  mergedResultSet.map(function (item) {
    // sum up score

    if (item.scoringCriteria) {
      item.score = item.scoringCriteria.reduce(function (acc, val) {
        return { score: +acc.score + +val.score }
      }, { score: 0 }).score

      // TODO: possible to score multiple OR conditions by an AVERAGE, or a SUM

      // work out average score (score divided by total OR conditions)
      item.score = (item.score / item.scoringCriteria.length)
    }

    return item
  })

  // console.log(JSON.stringify(mergedResultSet, null, 2))

  mergedResultSet.forEach(function (item) {
    that.push(item)
  })
  return end()
}
