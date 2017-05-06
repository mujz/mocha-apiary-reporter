var curl = require('./curl');

exports.create = function(mochaTest, request, response) {
  var hierarchy = getHierarchy(mochaTest);
  var summary = hierarchy[3];
  return {
    name: getName(mochaTest),
    summary: summary,
    hierarchy: hierarchy,
    request: request,
    response: response,
    snippets: {
      curl: curl.fromRequest(request)
    }
  };
};

function getName(mochaTest) {
  var opts = mochaTest.ctx['reporter'];
  return ((opts && opts.name) || mochaTest.title).trim();
}

function getHierarchy(mochaTest) {
  if (mochaTest.parent) {
    var shortName  = mochaTest.title;
    return getHierarchy(mochaTest.parent).concat(shortName);
  }
  return [];
}
