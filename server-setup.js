// Server setup that runs before any other server code
// This file ensures 'self' is defined in the server environment

// Define self globally before any other code runs
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

// Export a function that can be called to ensure self is defined
module.exports = function ensureSelfDefined() {
  if (typeof self === 'undefined') {
    if (typeof globalThis !== 'undefined') {
      globalThis.self = globalThis;
    } else if (typeof global !== 'undefined') {
      global.self = global;
    }
  }
};

// Call it immediately
module.exports();