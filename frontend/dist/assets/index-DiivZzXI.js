const __vite__mapDeps=(i, m=__vite__mapDeps, d=(m.f||(m.f=['assets/bootstrap-CjNNebl0.js', 'assets/vendor-react-Bo0aVqlV.js', 'assets/vendor-router-CjgOoOsb.js', 'assets/vendor-state-CM5LZqsW.js', 'assets/vendor-utils-DApFNfLf.js', 'assets/vendor-signalr-B3J6_ZFk.js', 'assets/vendor-dnd-BUfhfXVZ.js', 'assets/bootstrap-CJU6Uqio.css']))) => i.map((i) => d[i]);
import { b as m } from './vendor-react-Bo0aVqlV.js';

(function() {
  const e=document.createElement('link').relList; if (e&&e.supports&&e.supports('modulepreload')) {
    return;
  } for (const t of document.querySelectorAll('link[rel="modulepreload"]')) {
    u(t);
  } new MutationObserver((t) => {
    for (const o of t) {
      if (o.type==='childList') {
        for (const r of o.addedNodes) {
          r.tagName==='LINK'&&r.rel==='modulepreload'&&u(r);
        }
      }
    }
  }).observe(document, { childList: !0, subtree: !0 }); function s(t) {
    const o={}; return t.integrity&&(o.integrity=t.integrity), t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy), t.crossOrigin==='use-credentials'?o.credentials='include':t.crossOrigin==='anonymous'?o.credentials='omit':o.credentials='same-origin', o;
  } function u(t) {
    if (t.ep) {
      return;
    } t.ep=!0; const o=s(t); fetch(t.href, o);
  }
})(); const _='modulepreload'; const g=function(n) {
  return `/${n}`;
}; const d={}; const
  h=function(e, s, u) {
    let t=Promise.resolve(); if (s&&s.length>0) {
      document.getElementsByTagName('link'); const r=document.querySelector('meta[property=csp-nonce]'); const i=r?.nonce||r?.getAttribute('nonce'); t=Promise.allSettled(s.map((c) => {
        if (c=g(c), c in d) {
          return;
        } d[c]=!0; const a=c.endsWith('.css'); const f=a?'[rel="stylesheet"]':''; if (document.querySelector(`link[href="${c}"]${f}`)) {
          return;
        } const l=document.createElement('link'); if (l.rel=a?'stylesheet':_, a||(l.as='script'), l.crossOrigin='', l.href=c, i&&l.setAttribute('nonce', i), document.head.appendChild(l), a) {
          return new Promise((w, p) => {
            l.addEventListener('load', w), l.addEventListener('error', () => p(new Error(`Unable to preload CSS for ${c}`)));
          });
        }
      }));
    } function o(r) {
      const i=new Event('vite:preloadError', { cancelable: !0 }); if (i.payload=r, window.dispatchEvent(i), !i.defaultPrevented) {
        throw r;
      }
    } return t.then((r) => {
      for (const i of r||[]) {
        i.status==='rejected'&&o(i.reason);
      } return e().catch(o);
    });
  }; window.console=window.console||{}; window.console.log=window.console.log||function() {}; window.console.group=window.console.group||function() {}; window.console.groupEnd=window.console.groupEnd||function() {}; window.console.debug=window.console.debug||function() {}; window.console.warn=window.console.warn||function() {}; window.console.assert=window.console.assert||function() {}; String.prototype.startsWith||Object.defineProperty(String.prototype, 'startsWith', { enumerable: !1, configurable: !1, writable: !1, value(n, e) {
  return e=e||0, this.indexOf(n, e)===e;
} }); String.prototype.endsWith||Object.defineProperty(String.prototype, 'endsWith', { enumerable: !1, configurable: !1, writable: !1, value(n, e) {
  e=e||this.length, e=e-n.length; const s=this.lastIndexOf(n); return s!==-1&&s===e;
} }); 'contains'in String.prototype||(String.prototype.contains=function(n, e) {
  return String.prototype.indexOf.call(this, n, e)!==-1;
}); window.__REACT_DEVTOOLS_GLOBAL_HOOK__&&(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject=function() {}, window.__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE=function() {}); const O=`${window.Melodarr.urlBase}/initialize.json?t=${Date.now()}`; const y=await fetch(O); window.Melodarr=await y.json(); window.__webpack_public_path__=`${window.Melodarr.urlBase}/`; m.findDOMNode=(n) => (n instanceof HTMLElement?n:null); const { bootstrap: E }=await h(async() => {
  const { bootstrap: n }=await import('./bootstrap-CjNNebl0.js'); return { bootstrap: n };
}, __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7])); await E(); console.log('BOOTSTRAP EXECUTED');
