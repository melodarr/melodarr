import { g as Ze, R as x, r as Re } from './vendor-react-Bo0aVqlV.js';
import { _ as $, a as ne, h as ke, P as Ae } from './vendor-state-CM5LZqsW.js';

function re(e) {
  return e.charAt(0)==='/';
} function ue(e, t) {
  for (let n=t, i=n+1, r=e.length; i<r; n+=1, i+=1) {
    e[n]=e[i];
  }e.pop();
} function et(e, t) {
  t===void 0&&(t=''); const n=e&&e.split('/')||[]; let i=t&&t.split('/')||[]; const r=e&&re(e); const a=t&&re(t); const c=r||a; if (e&&re(e)?i=n:n.length&&(i.pop(), i=i.concat(n)), !i.length) {
    return '/';
  } let u; if (i.length) {
    const f=i[i.length-1]; u=f==='.'||f==='..'||f==='';
  } else {
    u=!1;
  } for (var o=0, s=i.length; s>=0; s--) {
    const l=i[s]; l==='.'?ue(i, s):l==='..'?(ue(i, s), o++):o&&(ue(i, s), o--);
  } if (!c) {
    for (;o--; o) {
      i.unshift('..');
    }
  }c&&i[0]!==''&&(!i[0]||!re(i[0]))&&i.unshift(''); let h=i.join('/'); return u&&h.substr(-1)!=='/'&&(h+='/'), h;
} function Te(e) {
  return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e);
} function ie(e, t) {
  if (e===t) {
    return !0;
  } if (e==null||t==null) {
    return !1;
  } if (Array.isArray(e)) {
    return Array.isArray(t)&&e.length===t.length&&e.every((r, a) => {
      return ie(r, t[a]);
    });
  } if (typeof e=='object'||typeof t=='object') {
    const n=Te(e); const i=Te(t); return n!==e||i!==t?ie(n, i):Object.keys(Object.assign({}, e, t)).every((r) => {
      return ie(e[r], t[r]);
    });
  } return !1;
} const tt='Invariant failed'; function z(e, t) {
  throw new Error(tt);
} function te(e) {
  return e.charAt(0)==='/'?e:`/${e}`;
} function be(e) {
  return e.charAt(0)==='/'?e.substr(1):e;
} function nt(e, t) {
  return e.toLowerCase().indexOf(t.toLowerCase())===0&&'/?#'.indexOf(e.charAt(t.length))!==-1;
} function je(e, t) {
  return nt(e, t)?e.substr(t.length):e;
} function We(e) {
  return e.charAt(e.length-1)==='/'?e.slice(0, -1):e;
} function rt(e) {
  let t=e||'/'; let n=''; let i=''; const
    r=t.indexOf('#'); r!==-1&&(i=t.substr(r), t=t.substr(0, r)); const a=t.indexOf('?'); return a!==-1&&(n=t.substr(a), t=t.substr(0, a)), { pathname: t, search: n==='?'?'':n, hash: i==='#'?'':i };
} function F(e) {
  const t=e.pathname; const n=e.search; const i=e.hash; let r=t||'/'; return n&&n!=='?'&&(r+=n.charAt(0)==='?'?n:`?${n}`), i&&i!=='#'&&(r+=i.charAt(0)==='#'?i:`#${i}`), r;
} function I(e, t, n, i) {
  let r; typeof e=='string'?(r=rt(e), r.state=t):(r=$({}, e), r.pathname===void 0&&(r.pathname=''), r.search?r.search.charAt(0)!=='?'&&(r.search=`?${r.search}`):r.search='', r.hash?r.hash.charAt(0)!=='#'&&(r.hash=`#${r.hash}`):r.hash='', t!==void 0&&r.state===void 0&&(r.state=t)); try {
    r.pathname=decodeURI(r.pathname);
  } catch (a) {
    throw a instanceof URIError?new URIError(`Pathname "${r.pathname}" could not be decoded. This is likely caused by an invalid percent-encoding.`):a;
  } return n&&(r.key=n), i?r.pathname?r.pathname.charAt(0)!=='/'&&(r.pathname=et(r.pathname, i.pathname)):r.pathname=i.pathname:r.pathname||(r.pathname='/'), r;
} function it(e, t) {
  return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&ie(e.state, t.state);
} function me() {
  let e=null; function t(c) {
    return e=c, function() {
      e===c&&(e=null);
    };
  } function n(c, u, f, o) {
    if (e!=null) {
      const s=typeof e=='function'?e(c, u):e; typeof s=='string'?typeof f=='function'?f(s, o):o(!0):o(s!==!1);
    } else {
      o(!0);
    }
  } let i=[]; function r(c) {
    let u=!0; function f() {
      u&&c.apply(void 0, arguments);
    } return i.push(f), function() {
      u=!1, i=i.filter((o) => {
        return o!==f;
      });
    };
  } function a() {
    for (var c=arguments.length, u=new Array(c), f=0; f<c; f++) {
      u[f]=arguments[f];
    }i.forEach((o) => {
      return o.apply(void 0, u);
    });
  } return { setPrompt: t, confirmTransitionTo: n, appendListener: r, notifyListeners: a };
} const Fe=!!(typeof window<'u'&&window.document&&window.document.createElement); function Ke(e, t) {
  t(window.confirm(e));
} function at() {
  const e=window.navigator.userAgent; return (e.indexOf('Android 2.')!==-1||e.indexOf('Android 4.0')!==-1)&&e.indexOf('Mobile Safari')!==-1&&e.indexOf('Chrome')===-1&&e.indexOf('Windows Phone')===-1?!1:window.history&&'pushState'in window.history;
} function ot() {
  return window.navigator.userAgent.indexOf('Trident')===-1;
} function st() {
  return window.navigator.userAgent.indexOf('Firefox')===-1;
} function ct(e) {
  return e.state===void 0&&navigator.userAgent.indexOf('CriOS')===-1;
} const Le='popstate'; const
  Oe='hashchange'; function Se() {
  try {
    return window.history.state||{};
  } catch {
    return {};
  }
} function ut(e) {
  e===void 0&&(e={}), Fe||z(); const t=window.history; const n=at(); const i=!ot(); const r=e; const a=r.forceRefresh; const c=a===void 0?!1:a; const u=r.getUserConfirmation; const f=u===void 0?Ke:u; const o=r.keyLength; const s=o===void 0?6:o; const l=e.basename?We(te(e.basename)):''; function h(p) {
    const v=p||{}; const w=v.key; const m=v.state; const E=window.location; const S=E.pathname; const D=E.search; const K=E.hash; let W=S+D+K; return l&&(W=je(W, l)), I(W, m, w);
  } function d() {
    return Math.random().toString(36).substr(2, s);
  } const y=me(); function C(p) {
    $(j, p), j.length=t.length, y.notifyListeners(j.location, j.action);
  } function L(p) {
    ct(p)||_(h(p.state));
  } function A() {
    _(h(Se()));
  } let O=!1; function _(p) {
    if (O) {
      O=!1, C();
    } else {
      const v='POP'; y.confirmTransitionTo(p, v, f, (w) => {
        w?C({ action: v, location: p }):N(p);
      });
    }
  } function N(p) {
    const v=j.location; let w=R.indexOf(v.key); w===-1&&(w=0); let m=R.indexOf(p.key); m===-1&&(m=0); const E=w-m; E&&(O=!0, T(E));
  } const U=h(Se()); var R=[U.key]; function g(p) {
    return l+F(p);
  } function P(p, v) {
    const w='PUSH'; const
      m=I(p, v, d(), j.location); y.confirmTransitionTo(m, w, f, (E) => {
      if (E) {
        const S=g(m); const D=m.key; const K=m.state; if (n) {
          if (t.pushState({ key: D, state: K }, null, S), c) {
            window.location.href=S;
          } else {
            const W=R.indexOf(j.location.key); const X=R.slice(0, W+1); X.push(m.key), R=X, C({ action: w, location: m });
          }
        } else {
          window.location.href=S;
        }
      }
    });
  } function M(p, v) {
    const w='REPLACE'; const
      m=I(p, v, d(), j.location); y.confirmTransitionTo(m, w, f, (E) => {
      if (E) {
        const S=g(m); const D=m.key; const K=m.state; if (n) {
          if (t.replaceState({ key: D, state: K }, null, S), c) {
            window.location.replace(S);
          } else {
            const W=R.indexOf(j.location.key); W!==-1&&(R[W]=m.key), C({ action: w, location: m });
          }
        } else {
          window.location.replace(S);
        }
      }
    });
  } function T(p) {
    t.go(p);
  } function b() {
    T(-1);
  } function G() {
    T(1);
  } let V=0; function B(p) {
    V+=p, V===1&&p===1?(window.addEventListener(Le, L), i&&window.addEventListener(Oe, A)):V===0&&(window.removeEventListener(Le, L), i&&window.removeEventListener(Oe, A));
  } let H=!1; function Y(p) {
    p===void 0&&(p=!1); const v=y.setPrompt(p); return H||(B(1), H=!0), function() {
      return H&&(H=!1, B(-1)), v();
    };
  } function ce(p) {
    const v=y.appendListener(p); return B(1), function() {
      B(-1), v();
    };
  } var j={ length: t.length, action: 'POP', location: U, createHref: g, push: P, replace: M, go: T, goBack: b, goForward: G, block: Y, listen: ce }; return j;
} const $e='hashchange'; const
  ft={ hashbang: { encodePath: function(t) {
    return t.charAt(0)==='!'?t:`!/${be(t)}`;
  }, decodePath: function(t) {
    return t.charAt(0)==='!'?t.substr(1):t;
  } }, noslash: { encodePath: be, decodePath: te }, slash: { encodePath: te, decodePath: te } }; function qe(e) {
  const t=e.indexOf('#'); return t===-1?e:e.slice(0, t);
} function ee() {
  const e=window.location.href; const t=e.indexOf('#'); return t===-1?'':e.substring(t+1);
} function lt(e) {
  window.location.hash=e;
} function fe(e) {
  window.location.replace(`${qe(window.location.href)}#${e}`);
} function ht(e) {
  e===void 0&&(e={}), Fe||z(); const t=window.history; st(); const n=e; const i=n.getUserConfirmation; const r=i===void 0?Ke:i; const a=n.hashType; const c=a===void 0?'slash':a; const u=e.basename?We(te(e.basename)):''; const f=ft[c]; const o=f.encodePath; const s=f.decodePath; function l() {
    let v=s(ee()); return u&&(v=je(v, u)), I(v);
  } const h=me(); function d(v) {
    $(p, v), p.length=t.length, h.notifyListeners(p.location, p.action);
  } let y=!1; let C=null; function L(v, w) {
    return v.pathname===w.pathname&&v.search===w.search&&v.hash===w.hash;
  } function A() {
    const v=ee(); const w=o(v); if (v!==w) {
      fe(w);
    } else {
      const m=l(); const E=p.location; if (!y&&L(E, m)||C===F(m)) {
        return;
      } C=null, O(m);
    }
  } function O(v) {
    if (y) {
      y=!1, d();
    } else {
      const w='POP'; h.confirmTransitionTo(v, w, r, (m) => {
        m?d({ action: w, location: v }):_(v);
      });
    }
  } function _(v) {
    const w=p.location; let m=g.lastIndexOf(F(w)); m===-1&&(m=0); let E=g.lastIndexOf(F(v)); E===-1&&(E=0); const S=m-E; S&&(y=!0, b(S));
  } const N=ee(); const U=o(N); N!==U&&fe(U); const R=l(); var g=[F(R)]; function P(v) {
    const w=document.querySelector('base'); let m=''; return w&&w.getAttribute('href')&&(m=qe(window.location.href)), `${m}#${o(u+F(v))}`;
  } function M(v, w) {
    const m='PUSH'; const
      E=I(v, void 0, void 0, p.location); h.confirmTransitionTo(E, m, r, (S) => {
      if (S) {
        const D=F(E); const K=o(u+D); const W=ee()!==K; if (W) {
          C=D, lt(K); const X=g.lastIndexOf(F(p.location)); const Ce=g.slice(0, X+1); Ce.push(D), g=Ce, d({ action: m, location: E });
        } else {
          d();
        }
      }
    });
  } function T(v, w) {
    const m='REPLACE'; const
      E=I(v, void 0, void 0, p.location); h.confirmTransitionTo(E, m, r, (S) => {
      if (S) {
        const D=F(E); const K=o(u+D); const W=ee()!==K; W&&(C=D, fe(K)); const X=g.indexOf(F(p.location)); X!==-1&&(g[X]=D), d({ action: m, location: E });
      }
    });
  } function b(v) {
    t.go(v);
  } function G() {
    b(-1);
  } function V() {
    b(1);
  } let B=0; function H(v) {
    B+=v, B===1&&v===1?window.addEventListener($e, A):B===0&&window.removeEventListener($e, A);
  } let Y=!1; function ce(v) {
    v===void 0&&(v=!1); const w=h.setPrompt(v); return Y||(H(1), Y=!0), function() {
      return Y&&(Y=!1, H(-1)), w();
    };
  } function j(v) {
    const w=h.appendListener(v); return H(1), function() {
      H(-1), w();
    };
  } var p={ length: t.length, action: 'POP', location: R, createHref: P, push: M, replace: T, go: b, goBack: G, goForward: V, block: ce, listen: j }; return p;
} function Ue(e, t, n) {
  return Math.min(Math.max(e, t), n);
} function vt(e) {
  e===void 0&&(e={}); const t=e; const n=t.getUserConfirmation; const i=t.initialEntries; const r=i===void 0?['/']:i; const a=t.initialIndex; const c=a===void 0?0:a; const u=t.keyLength; const f=u===void 0?6:u; const o=me(); function s(P) {
    $(g, P), g.length=g.entries.length, o.notifyListeners(g.location, g.action);
  } function l() {
    return Math.random().toString(36).substr(2, f);
  } const h=Ue(c, 0, r.length-1); const d=r.map((P) => {
    return typeof P=='string'?I(P, void 0, l()):I(P, void 0, P.key||l());
  }); const y=F; function C(P, M) {
    const T='PUSH'; const
      b=I(P, M, l(), g.location); o.confirmTransitionTo(b, T, n, (G) => {
      if (G) {
        const V=g.index; const B=V+1; const H=g.entries.slice(0); H.length>B?H.splice(B, H.length-B, b):H.push(b), s({ action: T, location: b, index: B, entries: H });
      }
    });
  } function L(P, M) {
    const T='REPLACE'; const
      b=I(P, M, l(), g.location); o.confirmTransitionTo(b, T, n, (G) => {
      G&&(g.entries[g.index]=b, s({ action: T, location: b }));
    });
  } function A(P) {
    const M=Ue(g.index+P, 0, g.entries.length-1); const T='POP'; const b=g.entries[M]; o.confirmTransitionTo(b, T, n, (G) => {
      G?s({ action: T, location: b, index: M }):s();
    });
  } function O() {
    A(-1);
  } function _() {
    A(1);
  } function N(P) {
    const M=g.index+P; return M>=0&&M<g.entries.length;
  } function U(P) {
    return P===void 0&&(P=!1), o.setPrompt(P);
  } function R(P) {
    return o.appendListener(P);
  } var g={ length: d.length, action: 'POP', location: d[h], index: h, entries: d, createHref: y, push: C, replace: L, go: A, goBack: O, goForward: _, canGo: N, block: U, listen: R }; return g;
} function pe(e, t) {
  return pe=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n, i) {
    return n.__proto__=i, n;
  }, pe(e, t);
} function q(e, t) {
  e.prototype=Object.create(t.prototype), e.prototype.constructor=e, pe(e, t);
} const le=1073741823; const Me=typeof globalThis<'u'?globalThis:typeof window<'u'?window:typeof global<'u'?global:{}; function pt() {
  const e='__global_unique_id__'; return Me[e]=(Me[e]||0)+1;
} function dt(e, t) {
  return e===t?e!==0||1/e===1/t:e!==e&&t!==t;
} function mt(e) {
  let t=[]; return { on: function(i) {
    t.push(i);
  }, off: function(i) {
    t=t.filter((r) => {
      return r!==i;
    });
  }, get: function() {
    return e;
  }, set: function(i, r) {
    e=i, t.forEach((a) => {
      return a(e, r);
    });
  } };
} function gt(e) {
  return Array.isArray(e)?e[0]:e;
} function yt(e, t) {
  let n; let i; const r=`__create-react-context-${pt()}__`; const a=(function(u) {
    q(f, u); function f() {
      let s; return s=u.apply(this, arguments)||this, s.emitter=mt(s.props.value), s;
    } const o=f.prototype; return o.getChildContext=function() {
      let l; return l={}, l[r]=this.emitter, l;
    }, o.componentWillReceiveProps=function(l) {
      if (this.props.value!==l.value) {
        const h=this.props.value; const d=l.value; let y; dt(h, d)?y=0:(y=typeof t=='function'?t(h, d):le, y|=0, y!==0&&this.emitter.set(l.value, y));
      }
    }, o.render=function() {
      return this.props.children;
    }, f;
  })(Re.Component); a.childContextTypes=(n={}, n[r]=Ae.object.isRequired, n); const c=(function(u) {
    q(f, u); function f() {
      let s; return s=u.apply(this, arguments)||this, s.state={ value: s.getValue() }, s.onUpdate=function(l, h) {
        const d=s.observedBits|0; d&h&&s.setState({ value: s.getValue() });
      }, s;
    } const o=f.prototype; return o.componentWillReceiveProps=function(l) {
      const h=l.observedBits; this.observedBits=h??le;
    }, o.componentDidMount=function() {
      this.context[r]&&this.context[r].on(this.onUpdate); const l=this.props.observedBits; this.observedBits=l??le;
    }, o.componentWillUnmount=function() {
      this.context[r]&&this.context[r].off(this.onUpdate);
    }, o.getValue=function() {
      return this.context[r]?this.context[r].get():e;
    }, o.render=function() {
      return gt(this.props.children)(this.state.value);
    }, f;
  })(Re.Component); return c.contextTypes=(i={}, i[r]=Ae.object, i), { Provider: a, Consumer: c };
} const Ge=x.createContext||yt; const k={ exports: {} }; const wt=Array.isArray||function(e) {
  return Object.prototype.toString.call(e)=='[object Array]';
}; const ae=wt; k.exports=Ve; k.exports.parse=ge; k.exports.compile=Et; k.exports.tokensToFunction=ze; k.exports.tokensToRegExp=Je; const xt=new RegExp(['(\\\\.)', '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g'); function ge(e, t) {
  for (var n=[], i=0, r=0, a='', c=t&&t.delimiter||'/', u; (u=xt.exec(e))!=null;) {
    const f=u[0]; const o=u[1]; const s=u.index; if (a+=e.slice(r, s), r=s+f.length, o) {
      a+=o[1]; continue;
    } const l=e[r]; const h=u[2]; const d=u[3]; const y=u[4]; const C=u[5]; const L=u[6]; const A=u[7]; a&&(n.push(a), a=''); const O=h!=null&&l!=null&&l!==h; const _=L==='+'||L==='*'; const N=L==='?'||L==='*'; const U=h||c; const R=y||C; const g=h||(typeof n[n.length-1]=='string'?n[n.length-1]:''); n.push({ name: d||i++, prefix: h||'', delimiter: U, optional: N, repeat: _, partial: O, asterisk: !!A, pattern: R?At(R):A?'.*':Pt(U, g) });
  } return r<e.length&&(a+=e.substr(r)), a&&n.push(a), n;
} function Pt(e, t) {
  return !t||t.indexOf(e)>-1?`[^${Q(e)}]+?`:`${Q(t)}|(?:(?!${Q(t)})[^${Q(e)}])+?`;
} function Et(e, t) {
  return ze(ge(e, t), t);
} function Ct(e) {
  return encodeURI(e).replace(/[\/?#]/g, (t) => {
    return `%${t.charCodeAt(0).toString(16).toUpperCase()}`;
  });
} function Rt(e) {
  return encodeURI(e).replace(/[?#]/g, (t) => {
    return `%${t.charCodeAt(0).toString(16).toUpperCase()}`;
  });
} function ze(e, t) {
  for (var n=new Array(e.length), i=0; i<e.length; i++) {
    typeof e[i]=='object'&&(n[i]=new RegExp(`^(?:${e[i].pattern})$`, we(t)));
  } return function(r, a) {
    for (var c='', u=r||{}, f=a||{}, o=f.pretty?Ct:encodeURIComponent, s=0; s<e.length; s++) {
      const l=e[s]; if (typeof l=='string') {
        c+=l; continue;
      } const h=u[l.name]; var d; if (h==null) {
        if (l.optional) {
          l.partial&&(c+=l.prefix); continue;
        } else {
          throw new TypeError(`Expected "${l.name}" to be defined`);
        }
      } if (ae(h)) {
        if (!l.repeat) {
          throw new TypeError(`Expected "${l.name}" to not repeat, but received \`${JSON.stringify(h)}\``);
        } if (h.length===0) {
          if (l.optional) {
            continue;
          } throw new TypeError(`Expected "${l.name}" to not be empty`);
        } for (let y=0; y<h.length; y++) {
          if (d=o(h[y]), !n[s].test(d)) {
            throw new TypeError(`Expected all "${l.name}" to match "${l.pattern}", but received \`${JSON.stringify(d)}\``);
          } c+=(y===0?l.prefix:l.delimiter)+d;
        } continue;
      } if (d=l.asterisk?Rt(h):o(h), !n[s].test(d)) {
        throw new TypeError(`Expected "${l.name}" to match "${l.pattern}", but received "${d}"`);
      } c+=l.prefix+d;
    } return c;
  };
} function Q(e) {
  return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
} function At(e) {
  return e.replace(/([=!:$\/()])/g, '\\$1');
} function ye(e, t) {
  return e.keys=t, e;
} function we(e) {
  return e&&e.sensitive?'':'i';
} function Tt(e, t) {
  const n=e.source.match(/\((?!\?)/g); if (n) {
    for (let i=0; i<n.length; i++) {
      t.push({ name: i, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });
    }
  } return ye(e, t);
} function bt(e, t, n) {
  for (var i=[], r=0; r<e.length; r++) {
    i.push(Ve(e[r], t, n).source);
  } const a=new RegExp(`(?:${i.join('|')})`, we(n)); return ye(a, t);
} function Lt(e, t, n) {
  return Je(ge(e, n), t, n);
} function Je(e, t, n) {
  ae(t)||(n=t||n, t=[]), n=n||{}; for (var i=n.strict, r=n.end!==!1, a='', c=0; c<e.length; c++) {
    const u=e[c]; if (typeof u=='string') {
      a+=Q(u);
    } else {
      const f=Q(u.prefix); let o=`(?:${u.pattern})`; t.push(u), u.repeat&&(o+=`(?:${f}${o})*`), u.optional?u.partial?o=`${f}(${o})?`:o=`(?:${f}(${o}))?`:o=`${f}(${o})`, a+=o;
    }
  } const s=Q(n.delimiter||'/'); const l=a.slice(-s.length)===s; return i||(a=`${l?a.slice(0, -s.length):a}(?:${s}(?=$))?`), r?a+='$':a+=i&&l?'':`(?=${s}|$)`, ye(new RegExp(`^${a}`, we(n)), t);
} function Ve(e, t, n) {
  return ae(t)||(n=t||n, t=[]), n=n||{}, e instanceof RegExp?Tt(e, t):ae(e)?bt(e, t, n):Lt(e, t, n);
} const Ot=k.exports; const Xe=Ze(Ot); const St=function(t) {
  const n=Ge(); return n.displayName=t, n;
}; const $t=St('Router-History'); const Ut=function(t) {
  const n=Ge(); return n.displayName=t, n;
}; const J=Ut('Router'); const se=(function(e) {
  q(t, e), t.computeRootMatch=function(r) {
    return { path: '/', url: '/', params: {}, isExact: r==='/' };
  }; function t(i) {
    let r; return r=e.call(this, i)||this, r.state={ location: i.history.location }, r._isMounted=!1, r._pendingLocation=null, i.staticContext||(r.unlisten=i.history.listen((a) => {
      r._isMounted?r.setState({ location: a }):r._pendingLocation=a;
    })), r;
  } const n=t.prototype; return n.componentDidMount=function() {
    this._isMounted=!0, this._pendingLocation&&this.setState({ location: this._pendingLocation });
  }, n.componentWillUnmount=function() {
    this.unlisten&&this.unlisten();
  }, n.render=function() {
    return x.createElement(J.Provider, { value: { history: this.props.history, location: this.state.location, match: t.computeRootMatch(this.state.location.pathname), staticContext: this.props.staticContext } }, x.createElement($t.Provider, { children: this.props.children||null, value: this.props.history }));
  }, t;
})(x.Component); x.Component; const Mt=(function(e) {
  q(t, e); function t() {
    return e.apply(this, arguments)||this;
  } const n=t.prototype; return n.componentDidMount=function() {
    this.props.onMount&&this.props.onMount.call(this, this);
  }, n.componentDidUpdate=function(r) {
    this.props.onUpdate&&this.props.onUpdate.call(this, this, r);
  }, n.componentWillUnmount=function() {
    this.props.onUnmount&&this.props.onUnmount.call(this, this);
  }, n.render=function() {
    return null;
  }, t;
})(x.Component); const he={}; const Ht=1e4; let He=0; function It(e) {
  if (he[e]) {
    return he[e];
  } const t=Xe.compile(e); return He<Ht&&(he[e]=t, He++), t;
} function Ie(e, t) {
  return e===void 0&&(e='/'), t===void 0&&(t={}), e==='/'?e:It(e)(t, { pretty: !0 });
} function zt(e) {
  const t=e.computedMatch; const n=e.to; const i=e.push; const r=i===void 0?!1:i; return x.createElement(J.Consumer, null, (a) => {
    a||z(); const c=a.history; const u=a.staticContext; const f=r?c.push:c.replace; const o=I(t?typeof n=='string'?Ie(n, t.params):$({}, n, { pathname: Ie(n.pathname, t.params) }):n); return u?(f(o), null):x.createElement(Mt, { onMount: function() {
      f(o);
    }, onUpdate: function(l, h) {
      const d=I(h.to); it(d, $({}, o, { key: d.key }))||f(o);
    }, to: n });
  });
} const _e={}; const _t=1e4; let Ne=0; function Nt(e, t) {
  const n=String(t.end)+t.strict+t.sensitive; const i=_e[n]||(_e[n]={}); if (i[e]) {
    return i[e];
  } const r=[]; const a=Xe(e, r, t); const c={ regexp: a, keys: r }; return Ne<_t&&(i[e]=c, Ne++), c;
} function xe(e, t) {
  t===void 0&&(t={}), (typeof t=='string'||Array.isArray(t))&&(t={ path: t }); const n=t; const i=n.path; const r=n.exact; const a=r===void 0?!1:r; const c=n.strict; const u=c===void 0?!1:c; const f=n.sensitive; const o=f===void 0?!1:f; const s=[].concat(i); return s.reduce((l, h) => {
    if (!h&&h!=='') {
      return null;
    } if (l) {
      return l;
    } const d=Nt(h, { end: a, strict: u, sensitive: o }); const y=d.regexp; const C=d.keys; const L=y.exec(e); if (!L) {
      return null;
    } const A=L[0]; const O=L.slice(1); const _=e===A; return a&&!_?null:{ path: h, url: h==='/'&&A===''?'/':A, isExact: _, params: C.reduce((N, U, R) => {
      return N[U.name]=O[R], N;
    }, {}) };
  }, null);
} const Jt=(function(e) {
  q(t, e); function t() {
    return e.apply(this, arguments)||this;
  } const n=t.prototype; return n.render=function() {
    const r=this; return x.createElement(J.Consumer, null, (a) => {
      a||z(); const c=r.props.location||a.location; const u=r.props.computedMatch?r.props.computedMatch:r.props.path?xe(c.pathname, r.props):a.match; const f=$({}, a, { location: c, match: u }); const o=r.props; let s=o.children; const l=o.component; const h=o.render; return Array.isArray(s)&&s.length===0&&(s=null), x.createElement(J.Provider, { value: f }, f.match?s?typeof s=='function'?s(f):s:l?x.createElement(l, f):h?h(f):null:typeof s=='function'?s(f):null);
    });
  }, t;
})(x.Component); function Pe(e) {
  return e.charAt(0)==='/'?e:`/${e}`;
} function Bt(e, t) {
  return e?$({}, t, { pathname: Pe(e)+t.pathname }):t;
} function Dt(e, t) {
  if (!e) {
    return t;
  } const n=Pe(e); return t.pathname.indexOf(n)!==0?t:$({}, t, { pathname: t.pathname.substr(n.length) });
} function Be(e) {
  return typeof e=='string'?e:F(e);
} function ve(e) {
  return function() {
    z();
  };
} function De() {}x.Component; const Vt=(function(e) {
  q(t, e); function t() {
    return e.apply(this, arguments)||this;
  } const n=t.prototype; return n.render=function() {
    const r=this; return x.createElement(J.Consumer, null, (a) => {
      a||z(); const c=r.props.location||a.location; let u; let f; return x.Children.forEach(r.props.children, (o) => {
        if (f==null&&x.isValidElement(o)) {
          u=o; const s=o.props.path||o.props.from; f=s?xe(c.pathname, $({}, o.props, { path: s })):a.match;
        }
      }), f?x.cloneElement(u, { location: c, computedMatch: f }):null;
    });
  }, t;
})(x.Component); function Xt(e) {
  const t=`withRouter(${e.displayName||e.name})`;
  const n=function(r) {
    const a=r.wrappedComponentRef; const c=ne(r, ['wrappedComponentRef']); return x.createElement(J.Consumer, null, (u) => {
      return u||z(), x.createElement(e, $({}, c, u, { ref: a }));
    });
  }; return n.displayName=t, n.WrappedComponent=e, ke(n, e);
}x.useContext; x.Component; x.Component; const de=function(t, n) {
  return typeof t=='function'?t(n):t;
}; const Qe=function(t, n) {
  return typeof t=='string'?I(t, null, null, n):t;
}; const Ee=function(t) {
  return t;
}; let Z=x.forwardRef; typeof Z>'u'&&(Z=Ee); function jt(e) {
  return !!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey);
} const Wt=Z((e, t) => {
  const n=e.innerRef; const i=e.navigate; const r=e.onClick; const a=ne(e, ['innerRef', 'navigate', 'onClick']); const c=a.target; const u=$({}, a, { onClick: function(o) {
    try {
      r&&r(o);
    } catch (s) {
      throw o.preventDefault(), s;
    }!o.defaultPrevented&&o.button===0&&(!c||c==='_self')&&!jt(o)&&(o.preventDefault(), i());
  } }); return Ee!==Z?u.ref=t||n:u.ref=n, x.createElement('a', u);
}); const Ft=Z((e, t) => {
  const n=e.component; const i=n===void 0?Wt:n; const r=e.replace; const a=e.to; const c=e.innerRef; const u=ne(e, ['component', 'replace', 'to', 'innerRef']); return x.createElement(J.Consumer, null, (f) => {
    f||z(); const o=f.history; const s=Qe(de(a, f.location), f.location); const l=s?o.createHref(s):''; const h=$({}, u, { href: l, navigate: function() {
      const y=de(a, f.location); const C=r?o.replace:o.push; C(y);
    } }); return Ee!==Z?h.ref=t||c:h.innerRef=c, x.createElement(i, h);
  });
}); const Ye=function(t) {
  return t;
}; let oe=x.forwardRef; typeof oe>'u'&&(oe=Ye); function Kt() {
  for (var e=arguments.length, t=new Array(e), n=0; n<e; n++) {
    t[n]=arguments[n];
  } return t.filter((i) => {
    return i;
  }).join(' ');
}oe((e, t) => {
  const n=e['aria-current']; const i=n===void 0?'page':n; const r=e.activeClassName; const a=r===void 0?'active':r; const c=e.activeStyle; const u=e.className; const f=e.exact; const o=e.isActive; const s=e.location; const l=e.sensitive; const h=e.strict; const d=e.style; const y=e.to; const C=e.innerRef; const L=ne(e, ['aria-current', 'activeClassName', 'activeStyle', 'className', 'exact', 'isActive', 'location', 'sensitive', 'strict', 'style', 'to', 'innerRef']); return x.createElement(J.Consumer, null, (A) => {
    A||z(); const O=s||A.location; const _=Qe(de(y, O), O); const N=_.pathname; const U=N&&N.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1'); const R=U?xe(O.pathname, { path: U, exact: f, sensitive: l, strict: h }):null; const g=!!(o?o(R, O):R); const P=g?Kt(u, a):u; const M=g?$({}, d, {}, c):d; const T=$({ 'aria-current': g&&i||null, className: P, style: M, to: _ }, L); return Ye!==oe?T.ref=t||C:T.innerRef=C, x.createElement(Ft, T);
  });
}); export { Ft as L, se as R, Vt as S, q as _, Jt as a, zt as b, ut as c, xe as m, Xt as w };
