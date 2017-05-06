var curl = require('./curl');

var samples = {};

exports.reset = function() {
  samples = [];
}

exports.add = function(sample) {
  var sampleLevel = samples;
  for (var i = 0; i < sample.hierarchy.length - 1; i++) {
    var level = sample.hierarchy[i];
    if (!sampleLevel[level]) {
      sampleLevel[level] = (i === sample.hierarchy.length - 2) ? [] : {};
    }
    sampleLevel = sampleLevel[level];
  }
  sampleLevel.push(sample);
};

exports.get = function() {
  return samples;
}
