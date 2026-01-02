// Patch for Node 12+ compatibility with older graceful-fs
// This file should be required before grunt loads
var realFs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(realFs);
