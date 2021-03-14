const Readable = require('stream').Readable
const Transform = require('stream').Transform
const util = require('util')

const MatchMostFrequent = function (q, options) {
  this.options = options
  Transform.call(this, { objectMode: true })
}
util.inherits(MatchMostFrequent, Transform)
MatchMostFrequent.prototype._transform = function (q, encoding, end) {
  const sep = this.options.keySeparator
  const that = this
  var results = []
  this.options.indexes.createReadStream({
    start: 'DF' + sep + q.field + sep + q.beginsWith,
    end: 'DF' + sep + q.field + sep + q.beginsWith + sep
  })
  .on('data', function (data) {
    results.push(data)
  })
  .on('error', function (err) {
    that.options.log.error('Oh my!', err)
  })
  // .on('end', sortResults)
  .on('end', function () {
    results.sort(function (a, b) {
      // sort first by frequency and then by value
      var frequencySort = b.value.length - a.value.length
      if (frequencySort === 0) {
        // sort alphabetically by key ascending
        if (b.key < a.key) return 1
        if (b.key > a.key) return -1
        return 0
      } else {
        // sort by frequency (value.length)
        return frequencySort
      }
    })
      .slice(0, q.limit)
      .forEach(function (item) {
        var m = {}
        switch (q.type) {
          case 'ID': m = {
            token: item.key.split(sep)[2],
            documents: item.value
          }; break
          case 'count': m = {
            token: item.key.split(sep)[2],
            documentCount: item.value.length
          }; break
          default: m = item.key.split(sep)[2]
        }
        that.push(m)
      })
    return end()
  })
}

const MatchAlphabetical = function (q, options) {
  this.options = options
  Transform.call(this, { objectMode: true })
}
util.inherits(MatchAlphabetical, Transform)
MatchAlphabetical.prototype._transform = function (q, encoding, end) {
  const sep = this.options.keySeparator
  const that = this

  var space = {
    start: 'DF' + sep + q.field + sep + q.beginsWith,
    end: 'DF' + sep + q.field + sep + q.beginsWith + sep
  }
  var i = 0
  var rs = this.options.indexes.createReadStream(space)
  rs.on('data', function (data) {
    var m = {}
    switch (q.type) {
      case 'ID': m = {
        token: data.key.split(sep)[2],
        documents: data.value
      }; break
      case 'count': m = {
        token: data.key.split(sep)[2],
        documentCount: data.value.length
      }; break
      default: m = data.key.split(sep)[2]
    }
    that.push(m)
    if (++i === q.limit) {
      rs.destroy()
      return end()
    }
  })
  rs.on('error', function (err) {
    that.options.log.error('Oh my!', err)
  })
  rs.on('end', function () {
    return end()
  })
}

exports.match = function (q, options) {
  var s = new Readable({ objectMode: true })
  q = Object.assign({}, {
    beginsWith: '',
    field: '*',
    threshold: 3,
    limit: 10,
    type: 'simple',
    sort: 'frequency'
  }, q)
  if (q.beginsWith.length < q.threshold) {
    s.push(null)
    return s
  }
  s.push(q)
  s.push(null)
  if (q.sort === 'alphabetical') {
    return s.pipe(new MatchAlphabetical(q, options))
  } else {
    // default to "sort by frequency"
    return s.pipe(new MatchMostFrequent(q, options))
  }
}
