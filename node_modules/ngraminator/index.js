
// nGramLengths is of the form [ 9, 10 ]
const getNGramsOfMultipleLengths = function (inputArray, nGramLengths) {
  var outputArray = []
  nGramLengths.forEach(function (len) {
    outputArray = outputArray.concat(getNGramsOfSingleLength(inputArray, len))
  })
  return outputArray
}

// nGramLengths is of the form { gte: 9, lte: 10 }
const getNGramsOfRangeOfLengths = function (inputArray, nGramLengths) {
  var outputArray = []
  for (var i = nGramLengths.gte; i <= nGramLengths.lte; i++) {
    outputArray = outputArray.concat(getNGramsOfSingleLength(inputArray, i))
  }
  return outputArray
}

// nGramLength is a single integer
const getNGramsOfSingleLength = function (inputArray, nGramLength) {
  return inputArray.slice(nGramLength - 1).map(function (item, i) {
    return inputArray.slice(i, i + nGramLength)
  })
}

exports.ngram = function (inputArray, nGramLength) {
  switch (nGramLength.constructor) {
    case Array: return getNGramsOfMultipleLengths(inputArray, nGramLength)
    case Number: return getNGramsOfSingleLength(inputArray, nGramLength)
    case Object: return getNGramsOfRangeOfLengths(inputArray, nGramLength)
  }
}
