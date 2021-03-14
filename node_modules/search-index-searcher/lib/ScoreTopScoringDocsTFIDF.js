const Transform = require('stream').Transform
const util = require('util')

const ScoreTopScoringDocsTFIDF = function (options) {
  this.options = options
  Transform.call(this, { objectMode: true })
}
exports.ScoreTopScoringDocsTFIDF = ScoreTopScoringDocsTFIDF
util.inherits(ScoreTopScoringDocsTFIDF, Transform)
ScoreTopScoringDocsTFIDF.prototype._transform = function (clause, encoding, end) {
  const sep = this.options.keySeparator
  const that = this
  clause.queryClause.BOOST = clause.queryClause.BOOST || 0 // put this somewhere better
  const fields = Object.keys(clause.queryClause.AND)
  var i = 0

  // if there are no docs, just return
  if (clause.topScoringDocs.length === 0) return end()

  clause.topScoringDocs.forEach(function (docID) {
    docID = docID[1]
    // var vectors = []
    var tfVectors = {}
    // for each field in query:
    var fieldFetchCounter = 0
    fields.forEach(function (field) {
      // get vector for whole document field
      const vectorKey = 'DOCUMENT-VECTOR' + sep + field + sep + docID + sep
      that.options.indexes.get(vectorKey, function (err, docVector) {
        // DOCUMENT-VECTOR was not indexed for this doc. It was
        // probably indexed with storeVector: false
        if (err && err.notFound) {
          that.push({
            id: docID
          })
          if (++i === clause.topScoringDocs.length) return end()
          return
        }

        clause.queryClause.AND[field].forEach(function (token) {
          tfVectors[field + sep + token] = docVector[token]
        })
        // How to recognise last field?
        if (++fieldFetchCounter === fields.length) {
          var documentFrequencies = clause.termFrequencies
          // All vectors loaded from index: work out score
          // At this stage documents are scores per clause- the clauses are merged later
          // Work out tfidf per field/token
          const tfidf = {}
          for (var j = 0; j <= documentFrequencies.length; j++) {
            var item = documentFrequencies[j]
            if (!item) continue
            var tf = +item.tf
            var df = +tfVectors[item.gte] // should this be gte?
            var idf = Math.log10(1 + (1 / df))
            tfidf[item.gte] = (tf * idf)
          }

          // Work out tfidf per clause
          var score = (Object.keys(tfidf).reduce(function (prev, cur) {
            return (tfidf[prev] || 0) + tfidf[cur]
          }, 0) / Object.keys(tfidf).length)

          that.push({
            id: docID,
            scoringCriteria: [{
              tf: tfVectors,
              df: documentFrequencies,
              tfidf: tfidf,
              boost: +clause.queryClause.BOOST,
              score: score - +clause.queryClause.BOOST
            }],
            score: score - +clause.queryClause.BOOST
          })

          if (++i === clause.topScoringDocs.length) {
            return end()
          }
        }
      })
    })
  })
}
