// Server-side polyfill for Edge Runtime
// This must be loaded before any other modules

// Polyfill 'self' for server-side Edge Runtime
if (typeof self === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  } else if (typeof global !== 'undefined') {
    global.self = global;
  }
}

// Ensure self is available globally
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

module.exports = {};