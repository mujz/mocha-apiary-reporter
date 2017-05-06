var _ = require('lodash');
var optionsUtil = require('./options');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var DEFAULT_OUTPUT_FILE = "./apiary.apibp";
var DEFAULT_NAME = "API Documentation";

exports.toDisk = function(model) {
  var options = optionsUtil.get();
  console.log('\n-> Building Apiary documentation');
  render(model, options);
  console.log('\nDone!\n');
};

function render(model, options) {
  if (options.outputFile) {
    // create the output folder
    mkdirp.sync(path.dirname(outputFile));
  } else {
    options.outputFile = DEFAULT_OUTPUT_FILE;
  }

  var apiaryBlueprint = genBluePrint(model, options.name, options.baseUrl, options.description);

  fs.writeFileSync(options.outputFile, apiaryBlueprint);
  console.log('Generated in ' + path.resolve(options.outputFile));
};

function genBluePrint(model, name, url, desc) {
  var tabs = '        ',
    newLine = '\n',
    twoLines = '\n\n',
    apibp = [];

  apibp.push("aFORMAT: 1A"); // Format
  if (url) {
    apibp.push("HOST: " + url); // BaseUrl
  }
  apibp.push("# " + (name || DEFAULT_NAME)); // Name
  if (desc) {
    apibp.push(desc); // Description
  }

  var collectionNames = Object.keys(model);
  for (var i in collectionNames) {
    apibp.push("## " + collectionNames[i]);
    var collection = model[collectionNames[i]];
    var routeNames = Object.keys(collection);
    for (var j in routeNames) {
      apibp.push("### " + routeNames[j]);
      var route = collection[routeNames[j]];
      var desc = Object.keys(route)[0];
      var tests = route[desc];

      // Add request method and path to the route header
      var req0 = tests[0].request;
      apibp[apibp.length - 1] += " [" + req0.method + " " + req0.path + "]";

      // Add route description
      apibp.push(desc);
      for (var k in tests) {
        var test = tests[k];
        if (test.request.method !== 'GET') {
          apibp.push('+ Request (' + test.request.headers['content-type'] + ')');
          JSON.stringify(test.request.data, null, 4).replace(new RegExp(newLine, 'g'), newLine + tabs);
          apibp.push(
            tabs +
            JSON.stringify(test.request.data, null, 4)
            .replace(new RegExp(newLine, 'g'), newLine + tabs)
          );
        }

        apibp.push('+ Response ' + test.response.status);
        if (typeof test.response.body === 'object') {
          test.response.body = JSON.stringify(test.response.body, null, 4);
        }
        apibp.push(tabs + test.response.body.replace(new RegExp(newLine, 'g'), newLine + tabs));
      }
    }
  }
  return apibp.join(twoLines);
}

