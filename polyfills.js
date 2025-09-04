// Polyfill for Edge Runtime compatibility
// This fixes the "ReferenceError: self is not defined" error

// Universal polyfill for 'self' that works in all environments
(function() {
  'use strict';
  
  // Check if 'self' is already defined
  if (typeof self !== 'undefined') {
    return; // self is already available
  }
  
  // Define self based on available global objects
  var globalObject;
  
  if (typeof globalThis !== 'undefined') {
    globalObject = globalThis;
  } else if (typeof global !== 'undefined') {
    globalObject = global;
  } else if (typeof window !== 'undefined') {
    globalObject = window;
  } else {
    // Fallback for environments where none of the above are available
    globalObject = (function() { return this; })() || {};
  }
  
  // Define self on the global object
  try {
    Object.defineProperty(globalObject, 'self', {
      value: globalObject,
      writable: true,
      enumerable: false,
      configurable: true
    });
  } catch (e) {
    // Fallback if defineProperty fails
    globalObject.self = globalObject;
  }
})();