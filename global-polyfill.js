// Global polyfill that runs before any other code
// This must be the very first thing that executes

// Immediately define self if it doesn't exist
if (typeof self === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  } else if (typeof global !== 'undefined') {
    global.self = global;
  } else if (typeof window !== 'undefined') {
    window.self = window;
  } else {
    // Last resort fallback
    var globalScope = (function() { return this; })() || {};
    globalScope.self = globalScope;
  }
}

// Also define it on the current context
if (typeof self === 'undefined') {
  self = globalThis || global || window || this || {};
}