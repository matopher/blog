'use strict';

var node = require('esbuild-register/dist/node');
{
  node.register({
    target: "node".concat(process.version.slice(1))
  });
}
//# sourceMappingURL=esbuild.js.map
