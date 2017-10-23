// test/test_index.js

// require all modules ending in "spec" from the
// current directory and all subdirectories
var testsContext = require.context("./specs", true, /\.spec$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\.js$/);
srcContext.keys().forEach(srcContext);