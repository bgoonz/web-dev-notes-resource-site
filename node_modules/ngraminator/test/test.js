var test = require('tape')
var ngraminator = require('../')

test('basic ngrams (length 3)', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    ['mary', 'had', 'a'],
    ['had', 'a', 'little'],
    ['a', 'little', 'lamb'],
    ['little', 'lamb', 'it\'s'],
    ['lamb', 'it\'s', 'fleece']
  ]
  var actualResult = ngraminator.ngram(arr, 3)
  t.looseEqual(actualResult, expectedResult)
})

test('basic ngrams (length 6)', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    [ 'mary', 'had', 'a', 'little', 'lamb', 'it\'s' ],
    [ 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece' ]
  ]
  var actualResult = ngraminator.ngram(arr, 6)
  t.looseEqual(actualResult, expectedResult)
})

test('basic ngrams (length 1)', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    [ 'mary' ], [ 'had' ], [ 'a' ], [ 'little' ], [ 'lamb' ], [ 'it\'s' ], [ 'fleece' ]
  ]
  var actualResult = ngraminator.ngram(arr, 1)
  t.looseEqual(actualResult, expectedResult)
})

test('ngrams of 2 seperate lengths (length [1, 2])', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    [ 'mary' ],
    [ 'had' ],
    [ 'a' ],
    [ 'little' ],
    [ 'lamb' ],
    [ 'it\'s' ],
    [ 'fleece' ],
    [ 'mary', 'had' ],
    [ 'had', 'a' ],
    [ 'a', 'little' ],
    [ 'little', 'lamb' ],
    [ 'lamb', 'it\'s' ],
    [ 'it\'s', 'fleece' ] ]
  var actualResult = ngraminator.ngram(arr, [1, 2])
  t.looseEqual(actualResult, expectedResult)
})

test('ngrams of 2 seperate lengths (length [2, 5, 1])', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    [ 'mary', 'had' ],
    [ 'had', 'a' ],
    [ 'a', 'little' ],
    [ 'little', 'lamb' ],
    [ 'lamb', 'it\'s' ],
    [ 'it\'s', 'fleece' ],
    [ 'mary', 'had', 'a', 'little', 'lamb' ],
    [ 'had', 'a', 'little', 'lamb', 'it\'s' ],
    [ 'a', 'little', 'lamb', 'it\'s', 'fleece' ],
    [ 'mary' ], [ 'had' ], [ 'a' ], [ 'little' ], [ 'lamb' ], [ 'it\'s' ], [ 'fleece' ]
  ]
  var actualResult = ngraminator.ngram(arr, [2, 5, 1])
  t.looseEqual(actualResult, expectedResult)
})

test('ngrams of a range of lengths (length { gte: 4, lte: 6 })', function (t) {
  t.plan(1)
  var arr = ['mary', 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece']
  var expectedResult = [
    [ 'mary', 'had', 'a', 'little' ],
    [ 'had', 'a', 'little', 'lamb' ],
    [ 'a', 'little', 'lamb', 'it\'s' ],
    [ 'little', 'lamb', 'it\'s', 'fleece' ],
    [ 'mary', 'had', 'a', 'little', 'lamb' ],
    [ 'had', 'a', 'little', 'lamb', 'it\'s' ],
    [ 'a', 'little', 'lamb', 'it\'s', 'fleece' ],
    [ 'mary', 'had', 'a', 'little', 'lamb', 'it\'s' ],
    [ 'had', 'a', 'little', 'lamb', 'it\'s', 'fleece' ]
  ]
  var actualResult = ngraminator.ngram(arr, { gte: 4, lte: 6 })
  t.looseEqual(actualResult, expectedResult)
})
