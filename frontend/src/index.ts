import './polyfills';
import 'Styles/globals.css';
import './index.css';

// Completely disable React DevTools to prevent it from swallowing the real error
// DevTools crashes on React 19's missing findDOMNode when trying to format console.error
/* eslint-disable no-underscore-dangle, no-empty-function, @typescript-eslint/no-empty-function */
// @ts-expect-error property does not exist on window
if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  // @ts-expect-error property does not exist on window
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
  // @ts-expect-error property does not exist on window
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE = function () {};
}
/* eslint-enable no-underscore-dangle, no-empty-function, @typescript-eslint/no-empty-function */

const initializeUrl = `${
  window.Melodarr.urlBase
}/initialize.json?t=${Date.now()}`;
const response = await fetch(initializeUrl);

window.Melodarr = await response.json();

/* eslint-disable no-undef, @typescript-eslint/ban-ts-comment, no-underscore-dangle */
// @ts-expect-error 2304
window.__webpack_public_path__ = `${window.Melodarr.urlBase}/`;
/* eslint-enable no-undef, @typescript-eslint/ban-ts-comment, no-underscore-dangle */

import ReactDOM from 'react-dom';
// Temporary shim to prevent WSOD from legacy libraries calling findDOMNode.
// React 19 removed findDOMNode, but some legacy dependencies may still call it.
// @ts-expect-error React 19 removed findDOMNode
ReactDOM.findDOMNode = (component: unknown) => {
  if (component instanceof HTMLElement) return component;
  return null;
};

// Removed monkey patch that was suppressing findDOMNode errors

const { bootstrap } = await import('./bootstrap');

await bootstrap();
console.log('BOOTSTRAP EXECUTED');
