/*
  https://formidable.com/blog/2021/node-esm-and-exports/
  https://github.com/FormidableLabs/trace-pkg/compare/experiment/esm-pkgs-support

  The approach followed by <common-consuming-esm> is not valid here,
    cause it would need us to call asynchronously React components.
  
  We simplify the process by making use of the "browser nature" of tests
    (Mocha - JSDom), and how "global" is available.
  
  So we:
    - resolve (assign the ESM package to a global var) at before() time
    - on our tests (must be within each suite) we just use that global var

*/

"use strict";

// Wrapper for dynamic import() of ESM-only packages.
// Only works in later versions of Node.js 12+

let _formigaRPkg
const _getFormigaRPkg = async () => {
  if (!_formigaRPkg) {
    _formigaRPkg = await import("../src/index.mjs");
  }

  return _formigaRPkg;
};


const _resolve = async () => Promise.all([
  global.formigaRPkg = await _getFormigaRPkg()
]);

module.exports = {
  _resolve,
};

