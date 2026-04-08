import { a as ir, g as He, R as _, r as b } from './vendor-react-Bo0aVqlV.js';

function j() {
  return j=Object.assign?Object.assign.bind():function(e) {
    for (let r=1; r<arguments.length; r++) {
      const t=arguments[r]; for (const n in t) {
        ({}).hasOwnProperty.call(t, n)&&(e[n]=t[n]);
      }
    } return e;
  }, j.apply(null, arguments);
} function H(e) {
  '@babel/helpers - typeof'; return H=typeof Symbol=='function'&&typeof Symbol.iterator=='symbol'?function(r) {
    return typeof r;
  }:function(r) {
    return r&&typeof Symbol=='function'&&r.constructor===Symbol&&r!==Symbol.prototype?'symbol':typeof r;
  }, H(e);
} function sr(e, r) {
  if (H(e)!='object'||!e) {
    return e;
  } const t=e[Symbol.toPrimitive]; if (t!==void 0) {
    const n=t.call(e, r); if (H(n)!='object') {
      return n;
    } throw new TypeError('@@toPrimitive must return a primitive value.');
  } return (r==='string'?String:Number)(e);
} function cr(e) {
  const r=sr(e, 'string'); return H(r)=='symbol'?r:`${r}`;
} function fr(e, r, t) {
  return (r=cr(r))in e?Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }):e[r]=t, e;
} function _e(e, r) {
  const t=Object.keys(e); if (Object.getOwnPropertySymbols) {
    let n=Object.getOwnPropertySymbols(e); r&&(n=n.filter((o) => {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), t.push.apply(t, n);
  } return t;
} function je(e) {
  for (let r=1; r<arguments.length; r++) {
    var t=arguments[r]!=null?arguments[r]:{}; r%2?_e(Object(t), !0).forEach((n) => {
      fr(e, n, t[n]);
    }):Object.getOwnPropertyDescriptors?Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)):_e(Object(t)).forEach((n) => {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  } return e;
} function E(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
} const Ae=(function() {
  return typeof Symbol=='function'&&Symbol.observable||'@@observable';
})(); const me=function() {
  return Math.random().toString(36).substring(7).split('').join('.');
}; const J={ INIT: `@@redux/INIT${me()}`, REPLACE: `@@redux/REPLACE${me()}`, PROBE_UNKNOWN_ACTION: function() {
  return `@@redux/PROBE_UNKNOWN_ACTION${me()}`;
} }; function pr(e) {
  if (typeof e!='object'||e===null) {
    return !1;
  } for (var r=e; Object.getPrototypeOf(r)!==null;) {
    r=Object.getPrototypeOf(r);
  } return Object.getPrototypeOf(e)===r;
} function lr(e, r, t) {
  let n; if (typeof r=='function'&&typeof t=='function'||typeof t=='function'&&typeof arguments[3]=='function') {
    throw new Error(E(0));
  } if (typeof r=='function'&&typeof t>'u'&&(t=r, r=void 0), typeof t<'u') {
    if (typeof t!='function') {
      throw new Error(E(1));
    } return t(lr)(e, r);
  } if (typeof e!='function') {
    throw new Error(E(2));
  } let o=e; let u=r; let i=[]; let a=i; let s=!1; function f() {
    a===i&&(a=i.slice());
  } function c() {
    if (s) {
      throw new Error(E(3));
    } return u;
  } function p(d) {
    if (typeof d!='function') {
      throw new Error(E(4));
    } if (s) {
      throw new Error(E(5));
    } let y=!0; return f(), a.push(d), function() {
      if (y) {
        if (s) {
          throw new Error(E(6));
        } y=!1, f(); const P=a.indexOf(d); a.splice(P, 1), i=null;
      }
    };
  } function l(d) {
    if (!pr(d)) {
      throw new Error(E(7));
    } if (typeof d.type>'u') {
      throw new Error(E(8));
    } if (s) {
      throw new Error(E(9));
    } try {
      s=!0, u=o(u, d);
    } finally {
      s=!1;
    } for (let y=i=a, g=0; g<y.length; g++) {
      const P=y[g]; P();
    } return d;
  } function v(d) {
    if (typeof d!='function') {
      throw new Error(E(10));
    } o=d, l({ type: J.REPLACE });
  } function S() {
    let d; const y=p; return d={ subscribe: function(P) {
      if (typeof P!='object'||P===null) {
        throw new Error(E(11));
      } function w() {
        P.next&&P.next(c());
      }w(); const h=y(w); return { unsubscribe: h };
    } }, d[Ae]=function() {
      return this;
    }, d;
  } return l({ type: J.INIT }), n={ dispatch: l, subscribe: p, getState: c, replaceReducer: v }, n[Ae]=S, n;
} function dr(e) {
  Object.keys(e).forEach((r) => {
    const t=e[r]; const n=t(void 0, { type: J.INIT }); if (typeof n>'u') {
      throw new Error(E(12));
    } if (typeof t(void 0, { type: J.PROBE_UNKNOWN_ACTION() })>'u') {
      throw new Error(E(13));
    }
  });
} function wt(e) {
  for (var r=Object.keys(e), t={}, n=0; n<r.length; n++) {
    const o=r[n]; typeof e[o]=='function'&&(t[o]=e[o]);
  } const u=Object.keys(t); let i; try {
    dr(t);
  } catch (a) {
    i=a;
  } return function(s, f) {
    if (s===void 0&&(s={}), i) {
      throw i;
    } for (var c=!1, p={}, l=0; l<u.length; l++) {
      const v=u[l]; const S=t[v]; const d=s[v]; const y=S(d, f); if (typeof y>'u') {
        throw f&&f.type, new Error(E(14));
      } p[v]=y, c=c||y!==d;
    } return c=c||u.length!==Object.keys(s).length, c?p:s;
  };
} function vr() {
  for (var e=arguments.length, r=new Array(e), t=0; t<e; t++) {
    r[t]=arguments[t];
  } return r.length===0?function(n) {
    return n;
  }:r.length===1?r[0]:r.reduce((n, o) => {
    return function() {
      return n(o.apply(void 0, arguments));
    };
  });
} function Ot() {
  for (var e=arguments.length, r=new Array(e), t=0; t<e; t++) {
    r[t]=arguments[t];
  } return function(n) {
    return function() {
      const o=n.apply(void 0, arguments); let u=function() {
        throw new Error(E(15));
      }; const i={ getState: o.getState, dispatch: function() {
        return u.apply(void 0, arguments);
      } }; const a=r.map((s) => {
        return s(i);
      }); return u=vr.apply(void 0, a)(o.dispatch), je(je({}, o), {}, { dispatch: u });
    };
  };
} const Ke={ exports: {} }; const yr='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'; const hr=yr; const mr=hr; function ke() {} function Ve() {}Ve.resetWarningCache=ke; const br=function() {
  function e(n, o, u, i, a, s) {
    if (s!==mr) {
      const f=new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'); throw f.name='Invariant Violation', f;
    }
  }e.isRequired=e; function r() {
    return e;
  } const t={ array: e, bigint: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: r, element: e, elementType: e, instanceOf: r, node: e, objectOf: r, oneOf: r, oneOfType: r, shape: r, exact: r, checkPropTypes: Ve, resetWarningCache: ke }; return t.PropTypes=t, t;
}; Ke.exports=br(); const gr=Ke.exports; const Et=He(gr); const M=_.createContext(null); function Sr(e) {
  e();
} let Ye=Sr; const Pr=function(r) {
  return Ye=r;
}; const wr=function() {
  return Ye;
}; const Ie={ notify: function() {} }; function Or() {
  const e=wr(); let r=null; let t=null; return { clear: function() {
    r=null, t=null;
  }, notify: function() {
    e(() => {
      for (let o=r; o;) {
        o.callback(), o=o.next;
      }
    });
  }, get: function() {
    for (var o=[], u=r; u;) {
      o.push(u), u=u.next;
    } return o;
  }, subscribe: function(o) {
    let u=!0; const i=t={ callback: o, next: null, prev: t }; return i.prev?i.prev.next=i:r=i, function() {
      !u||r===null||(u=!1, i.next?i.next.prev=i.prev:t=i.prev, i.prev?i.prev.next=i.next:r=i.next);
    };
  } };
} const Se=(function() {
  function e(t, n) {
    this.store=t, this.parentSub=n, this.unsubscribe=null, this.listeners=Ie, this.handleChangeWrapper=this.handleChangeWrapper.bind(this);
  } const r=e.prototype; return r.addNestedSub=function(n) {
    return this.trySubscribe(), this.listeners.subscribe(n);
  }, r.notifyNestedSubs=function() {
    this.listeners.notify();
  }, r.handleChangeWrapper=function() {
    this.onStateChange&&this.onStateChange();
  }, r.isSubscribed=function() {
    return !!this.unsubscribe;
  }, r.trySubscribe=function() {
    this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.handleChangeWrapper):this.store.subscribe(this.handleChangeWrapper), this.listeners=Or());
  }, r.tryUnsubscribe=function() {
    this.unsubscribe&&(this.unsubscribe(), this.unsubscribe=null, this.listeners.clear(), this.listeners=Ie);
  }, e;
})(); const Q=typeof window<'u'&&typeof window.document<'u'&&typeof window.document.createElement<'u'?b.useLayoutEffect:b.useEffect; function Ct(e) {
  const r=e.store; const t=e.context; const n=e.children; const o=b.useMemo(() => {
    const a=new Se(r); return a.onStateChange=a.notifyNestedSubs, { store: r, subscription: a };
  }, [r]); const u=b.useMemo(() => {
    return r.getState();
  }, [r]); Q(() => {
    const a=o.subscription; return a.trySubscribe(), u!==r.getState()&&a.notifyNestedSubs(), function() {
      a.tryUnsubscribe(), a.onStateChange=null;
    };
  }, [o, u]); const i=t||M; return _.createElement(i.Provider, { value: o }, n);
} function X(e, r) {
  if (e==null) {
    return {};
  } const t={}; for (const n in e) {
    if ({}.hasOwnProperty.call(e, n)) {
      if (r.indexOf(n)!==-1) {
        continue;
      } t[n]=e[n];
    }
  } return t;
} const Ge={ exports: {} }; const m={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const O=typeof Symbol=='function'&&Symbol.for; const Pe=O?Symbol.for('react.element'):60103; const we=O?Symbol.for('react.portal'):60106; const ee=O?Symbol.for('react.fragment'):60107; const re=O?Symbol.for('react.strict_mode'):60108; const te=O?Symbol.for('react.profiler'):60114; const ne=O?Symbol.for('react.provider'):60109; const oe=O?Symbol.for('react.context'):60110; const Oe=O?Symbol.for('react.async_mode'):60111; const ue=O?Symbol.for('react.concurrent_mode'):60111; const ae=O?Symbol.for('react.forward_ref'):60112; const ie=O?Symbol.for('react.suspense'):60113; const Er=O?Symbol.for('react.suspense_list'):60120; const se=O?Symbol.for('react.memo'):60115; const ce=O?Symbol.for('react.lazy'):60116; const Cr=O?Symbol.for('react.block'):60121; const Rr=O?Symbol.for('react.fundamental'):60117; const xr=O?Symbol.for('react.responder'):60118; const Nr=O?Symbol.for('react.scope'):60119; function x(e) {
  if (typeof e=='object'&&e!==null) {
    const r=e.$$typeof; switch (r) {
      case Pe:switch (e=e.type, e) {
        case Oe:case ue:case ee:case te:case re:case ie:return e; default:switch (e=e&&e.$$typeof, e) {
          case oe:case ae:case ce:case se:case ne:return e; default:return r;
        }
      } case we:return r;
    }
  }
} function Je(e) {
  return x(e)===ue;
}m.AsyncMode=Oe; m.ConcurrentMode=ue; m.ContextConsumer=oe; m.ContextProvider=ne; m.Element=Pe; m.ForwardRef=ae; m.Fragment=ee; m.Lazy=ce; m.Memo=se; m.Portal=we; m.Profiler=te; m.StrictMode=re; m.Suspense=ie; m.isAsyncMode=function(e) {
  return Je(e)||x(e)===Oe;
}; m.isConcurrentMode=Je; m.isContextConsumer=function(e) {
  return x(e)===oe;
}; m.isContextProvider=function(e) {
  return x(e)===ne;
}; m.isElement=function(e) {
  return typeof e=='object'&&e!==null&&e.$$typeof===Pe;
}; m.isForwardRef=function(e) {
  return x(e)===ae;
}; m.isFragment=function(e) {
  return x(e)===ee;
}; m.isLazy=function(e) {
  return x(e)===ce;
}; m.isMemo=function(e) {
  return x(e)===se;
}; m.isPortal=function(e) {
  return x(e)===we;
}; m.isProfiler=function(e) {
  return x(e)===te;
}; m.isStrictMode=function(e) {
  return x(e)===re;
}; m.isSuspense=function(e) {
  return x(e)===ie;
}; m.isValidElementType=function(e) {
  return typeof e=='string'||typeof e=='function'||e===ee||e===ue||e===te||e===re||e===ie||e===Er||typeof e=='object'&&e!==null&&(e.$$typeof===ce||e.$$typeof===se||e.$$typeof===ne||e.$$typeof===oe||e.$$typeof===ae||e.$$typeof===Rr||e.$$typeof===xr||e.$$typeof===Nr||e.$$typeof===Cr);
}; m.typeOf=x; Ge.exports=m; const Qe=Ge.exports; const Ee=Qe; const Mr={ childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }; const Tr={ name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }; const $r={ $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }; const Xe={ $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }; const Ce={}; Ce[Ee.ForwardRef]=$r; Ce[Ee.Memo]=Xe; function qe(e) {
  return Ee.isMemo(e)?Xe:Ce[e.$$typeof]||Mr;
} const Fr=Object.defineProperty; const _r=Object.getOwnPropertyNames; const De=Object.getOwnPropertySymbols; const jr=Object.getOwnPropertyDescriptor; const Ar=Object.getPrototypeOf; const Ue=Object.prototype; function Ze(e, r, t) {
  if (typeof r!='string') {
    if (Ue) {
      const n=Ar(r); n&&n!==Ue&&Ze(e, n, t);
    } let o=_r(r); De&&(o=o.concat(De(r))); for (let u=qe(e), i=qe(r), a=0; a<o.length; ++a) {
      const s=o[a]; if (!Tr[s]&&!(t&&t[s])&&!(i&&i[s])&&!(u&&u[s])) {
        const f=jr(r, s); try {
          Fr(e, s, f);
        } catch {}
      }
    }
  } return e;
} const Ir=Ze; const We=He(Ir); const qr=[]; const Dr=[null, null]; function Ur(e, r) {
  const t=e[1]; return [r.payload, t+1];
} function Le(e, r, t) {
  Q(() => {
    return e.apply(void 0, r);
  }, t);
} function Wr(e, r, t, n, o, u, i) {
  e.current=n, r.current=o, t.current=!1, u.current&&(u.current=null, i());
} function Lr(e, r, t, n, o, u, i, a, s, f) {
  if (e) {
    let c=!1; let p=null; const l=function() {
      if (!c) {
        const d=r.getState(); let y; let g; try {
          y=n(d, o.current);
        } catch (P) {
          g=P, p=P;
        }g||(p=null), y===u.current?i.current||s():(u.current=y, a.current=y, i.current=!0, f({ type: 'STORE_UPDATED', payload: { error: g } }));
      }
    }; t.onStateChange=l, t.trySubscribe(), l(); const v=function() {
      if (c=!0, t.tryUnsubscribe(), t.onStateChange=null, p) {
        throw p;
      }
    }; return v;
  }
} const Br=function() {
  return [null, 0];
}; function zr(e, r) {
  r===void 0&&(r={}); const t=r; const n=t.getDisplayName; const o=n===void 0?function(w) {
    return `ConnectAdvanced(${w})`;
  }:n; const u=t.methodName; const i=u===void 0?'connectAdvanced':u; const a=t.renderCountProp; const s=a===void 0?void 0:a; const f=t.shouldHandleStateChanges; const c=f===void 0?!0:f; const p=t.storeKey; const l=p===void 0?'store':p; t.withRef; const v=t.forwardRef; const S=v===void 0?!1:v; const d=t.context; const y=d===void 0?M:d; const g=X(t, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef', 'forwardRef', 'context']); const P=y; return function(h) {
    const R=h.displayName||h.name||'Component'; const N=o(R); const A=j({}, g, { getDisplayName: o, methodName: i, renderCountProp: s, shouldHandleStateChanges: c, storeKey: l, displayName: N, wrappedComponentName: R, WrappedComponent: h }); const
      D=g.pure; function fe(C) {
      return e(C.dispatch, A);
    } const K=D?b.useMemo:function(C) {
      return C();
    }; function U(C) {
      const I=b.useMemo(() => {
        const z=C.reactReduxForwardedRef; const he=X(C, ['reactReduxForwardedRef']); return [C.context, z, he];
      }, [C]); const T=I[0]; const k=I[1]; const L=I[2]; const pe=b.useMemo(() => {
        return T&&T.Consumer&&Qe.isContextConsumer(_.createElement(T.Consumer, null))?T:P;
      }, [T, P]); const $=b.useContext(pe); const B=!!C.store&&!!C.store.getState&&!!C.store.dispatch; $&&$.store; const F=B?C.store:$.store; const le=b.useMemo(() => {
        return fe(F);
      }, [F]); const xe=b.useMemo(() => {
        if (!c) {
          return Dr;
        } const z=new Se(F, B?null:$.subscription); const he=z.notifyNestedSubs.bind(z); return [z, he];
      }, [F, B, $]); const V=xe[0]; const Ne=xe[1]; const Me=b.useMemo(() => {
        return B?$:j({}, $, { subscription: V });
      }, [B, $, V]); const Te=b.useReducer(Ur, qr, Br); const or=Te[0]; const Y=or[0]; const ur=Te[1]; if (Y&&Y.error) {
        throw Y.error;
      } const $e=b.useRef(); const de=b.useRef(L); const G=b.useRef(); const Fe=b.useRef(!1); const ve=K(() => {
        return G.current&&L===de.current?G.current:le(F.getState(), L);
      }, [F, Y, L]); Le(Wr, [de, $e, Fe, L, ve, G, Ne]), Le(Lr, [c, F, V, le, de, $e, Fe, G, Ne, ur], [F, V, le]); const ye=b.useMemo(() => {
        return _.createElement(h, j({}, ve, { ref: k }));
      }, [k, h, ve]); const ar=b.useMemo(() => {
        return c?_.createElement(pe.Provider, { value: Me }, ye):ye;
      }, [pe, ye, Me]); return ar;
    } const q=D?_.memo(U):U; if (q.WrappedComponent=h, q.displayName=U.displayName=N, S) {
      const W=_.forwardRef((I, T) => {
        return _.createElement(q, j({}, I, { reactReduxForwardedRef: T }));
      }); return W.displayName=N, W.WrappedComponent=h, We(W, h);
    } return We(q, h);
  };
} function Be(e, r) {
  return e===r?e!==0||r!==0||1/e===1/r:e!==e&&r!==r;
} function be(e, r) {
  if (Be(e, r)) {
    return !0;
  } if (typeof e!='object'||e===null||typeof r!='object'||r===null) {
    return !1;
  } const t=Object.keys(e); const n=Object.keys(r); if (t.length!==n.length) {
    return !1;
  } for (let o=0; o<t.length; o++) {
    if (!Object.prototype.hasOwnProperty.call(r, t[o])||!Be(e[t[o]], r[t[o]])) {
      return !1;
    }
  } return !0;
} function Hr(e, r) {
  const t={}; const n=function(i) {
    const a=e[i]; typeof a=='function'&&(t[i]=function() {
      return r(a.apply(void 0, arguments));
    });
  }; for (const o in e) {
    n(o);
  } return t;
} function Re(e) {
  return function(t, n) {
    const o=e(t, n); function u() {
      return o;
    } return u.dependsOnOwnProps=!1, u;
  };
} function ze(e) {
  return e.dependsOnOwnProps!==null&&e.dependsOnOwnProps!==void 0?!!e.dependsOnOwnProps:e.length!==1;
} function er(e, r) {
  return function(n, o) {
    o.displayName; const u=function(a, s) {
      return u.dependsOnOwnProps?u.mapToProps(a, s):u.mapToProps(a);
    }; return u.dependsOnOwnProps=!0, u.mapToProps=function(a, s) {
      u.mapToProps=e, u.dependsOnOwnProps=ze(e); let f=u(a, s); return typeof f=='function'&&(u.mapToProps=f, u.dependsOnOwnProps=ze(f), f=u(a, s)), f;
    }, u;
  };
} function Kr(e) {
  return typeof e=='function'?er(e):void 0;
} function kr(e) {
  return e?void 0:Re((r) => {
    return { dispatch: r };
  });
} function Vr(e) {
  return e&&typeof e=='object'?Re((r) => {
    return Hr(e, r);
  }):void 0;
} const Yr=[Kr, kr, Vr]; function Gr(e) {
  return typeof e=='function'?er(e):void 0;
} function Jr(e) {
  return e?void 0:Re(() => {
    return {};
  });
} const Qr=[Gr, Jr]; function Xr(e, r, t) {
  return j({}, t, e, r);
} function Zr(e) {
  return function(t, n) {
    n.displayName; const o=n.pure; const u=n.areMergedPropsEqual; let i=!1; let a; return function(f, c, p) {
      const l=e(f, c, p); return i?(!o||!u(l, a))&&(a=l):(i=!0, a=l), a;
    };
  };
} function et(e) {
  return typeof e=='function'?Zr(e):void 0;
} function rt(e) {
  return e?void 0:function() {
    return Xr;
  };
} const tt=[et, rt]; function nt(e, r, t, n) {
  return function(u, i) {
    return t(e(u, i), r(n, i), i);
  };
} function ot(e, r, t, n, o) {
  const u=o.areStatesEqual; const i=o.areOwnPropsEqual; const a=o.areStatePropsEqual; let s=!1; let f; let c; let p; let l; let v; function S(w, h) {
    return f=w, c=h, p=e(f, c), l=r(n, c), v=t(p, l, c), s=!0, v;
  } function d() {
    return p=e(f, c), r.dependsOnOwnProps&&(l=r(n, c)), v=t(p, l, c), v;
  } function y() {
    return e.dependsOnOwnProps&&(p=e(f, c)), r.dependsOnOwnProps&&(l=r(n, c)), v=t(p, l, c), v;
  } function g() {
    const w=e(f, c); const h=!a(w, p); return p=w, h&&(v=t(p, l, c)), v;
  } function P(w, h) {
    const R=!i(h, c); const N=!u(w, f); return f=w, c=h, R&&N?d():R?y():N?g():v;
  } return function(h, R) {
    return s?P(h, R):S(h, R);
  };
} function ut(e, r) {
  const t=r.initMapStateToProps; const n=r.initMapDispatchToProps; const o=r.initMergeProps; const u=X(r, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']); const i=t(e, u); const a=n(e, u); const s=o(e, u); const f=u.pure?ot:nt; return f(i, a, s, e, u);
} function ge(e, r, t) {
  for (let n=r.length-1; n>=0; n--) {
    const o=r[n](e); if (o) {
      return o;
    }
  } return function(u, i) {
    throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${i.wrappedComponentName}.`);
  };
} function at(e, r) {
  return e===r;
} function it(e) {
  const r=e===void 0?{}:e; const t=r.connectHOC; const n=t===void 0?zr:t; const o=r.mapStateToPropsFactories; const u=o===void 0?Qr:o; const i=r.mapDispatchToPropsFactories; const a=i===void 0?Yr:i; const s=r.mergePropsFactories; const f=s===void 0?tt:s; const c=r.selectorFactory; const p=c===void 0?ut:c; return function(v, S, d, y) {
    y===void 0&&(y={}); const g=y; const P=g.pure; const w=P===void 0?!0:P; const h=g.areStatesEqual; const R=h===void 0?at:h; const N=g.areOwnPropsEqual; const A=N===void 0?be:N; const D=g.areStatePropsEqual; const fe=D===void 0?be:D; const K=g.areMergedPropsEqual; const U=K===void 0?be:K; const q=X(g, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']); const W=ge(v, u, 'mapStateToProps'); const C=ge(S, a, 'mapDispatchToProps'); const I=ge(d, f, 'mergeProps'); return n(p, j({ methodName: 'connect', getDisplayName: function(k) {
      return `Connect(${k})`;
    }, shouldHandleStateChanges: !!v, initMapStateToProps: W, initMapDispatchToProps: C, initMergeProps: I, pure: w, areStatesEqual: R, areOwnPropsEqual: A, areStatePropsEqual: fe, areMergedPropsEqual: U }, q));
  };
} const Rt=it(); function rr() {
  const e=b.useContext(M); return e;
} function tr(e) {
  e===void 0&&(e=M); const r=e===M?rr:function() {
    return b.useContext(e);
  }; return function() {
    const n=r(); const o=n.store; return o;
  };
} const st=tr(); function ct(e) {
  e===void 0&&(e=M); const r=e===M?st:tr(e); return function() {
    const n=r(); return n.dispatch;
  };
} const xt=ct(); const ft=function(r, t) {
  return r===t;
}; function pt(e, r, t, n) {
  const o=b.useReducer((S) => {
    return S+1;
  }, 0); const u=o[1]; const i=b.useMemo(() => {
    return new Se(t, n);
  }, [t, n]); const a=b.useRef(); const s=b.useRef(); const f=b.useRef(); const c=b.useRef(); const p=t.getState(); let l; try {
    if (e!==s.current||p!==f.current||a.current) {
      const v=e(p); c.current===void 0||!r(v, c.current)?l=v:l=c.current;
    } else {
      l=c.current;
    }
  } catch (S) {
    throw a.current&&(S.message+=`
The error may be correlated with this previous error:
${a.current.stack}

`), S;
  } return Q(() => {
    s.current=e, f.current=p, c.current=l, a.current=void 0;
  }), Q(() => {
    function S() {
      try {
        const d=t.getState(); const y=s.current(d); if (r(y, c.current)) {
          return;
        } c.current=y, f.current=d;
      } catch (g) {
        a.current=g;
      }u();
    } return i.onStateChange=S, i.trySubscribe(), S(), function() {
      return i.tryUnsubscribe();
    };
  }, [t, i]), l;
} function lt(e) {
  e===void 0&&(e=M); const r=e===M?rr:function() {
    return b.useContext(e);
  }; return function(n, o) {
    o===void 0&&(o=ft); const u=r(); const i=u.store; const a=u.subscription; const s=pt(n, o, i, a); return b.useDebugValue(s), s;
  };
} const Nt=lt(); Pr(ir.unstable_batchedUpdates); function nr(e) {
  const r=function(n) {
    const o=n.dispatch; const u=n.getState; return function(i) {
      return function(a) {
        return typeof a=='function'?a(o, u, e):i(a);
      };
    };
  }; return r;
} const dt=nr(); dt.withExtraArgument=nr; const Z='NOT_FOUND'; function vt(e) {
  let r; return { get: function(n) {
    return r&&e(r.key, n)?r.value:Z;
  }, put: function(n, o) {
    r={ key: n, value: o };
  }, getEntries: function() {
    return r?[r]:[];
  }, clear: function() {
    r=void 0;
  } };
} function yt(e, r) {
  let t=[]; function n(a) {
    const s=t.findIndex((c) => {
      return r(a, c.key);
    }); if (s>-1) {
      const f=t[s]; return s>0&&(t.splice(s, 1), t.unshift(f)), f.value;
    } return Z;
  } function o(a, s) {
    n(a)===Z&&(t.unshift({ key: a, value: s }), t.length>e&&t.pop());
  } function u() {
    return t;
  } function i() {
    t=[];
  } return { get: n, put: o, getEntries: u, clear: i };
} const ht=function(r, t) {
  return r===t;
}; function mt(e) {
  return function(t, n) {
    if (t===null||n===null||t.length!==n.length) {
      return !1;
    } for (let o=t.length, u=0; u<o; u++) {
      if (!e(t[u], n[u])) {
        return !1;
      }
    } return !0;
  };
} function bt(e, r) {
  const t=typeof r=='object'?r:{ equalityCheck: r }; const n=t.equalityCheck; const o=n===void 0?ht:n; const u=t.maxSize; const i=u===void 0?1:u; const a=t.resultEqualityCheck; const s=mt(o); const f=i===1?vt(s):yt(i, s); function c() {
    let p=f.get(arguments); if (p===Z) {
      if (p=e.apply(null, arguments), a) {
        const l=f.getEntries(); const v=l.find((S) => {
          return a(S.value, p);
        }); v&&(p=v.value);
      }f.put(arguments, p);
    } return p;
  } return c.clearCache=function() {
    return f.clear();
  }, c;
} function gt(e) {
  const r=Array.isArray(e[0])?e[0]:e; if (!r.every((n) => {
    return typeof n=='function';
  })) {
    const t=r.map((n) => {
      return typeof n=='function'?`function ${n.name||'unnamed'}()`:typeof n;
    }).join(', '); throw new Error(`createSelector expects all input-selectors to be functions, but received the following types: [${t}]`);
  } return r;
} function St(e) {
  for (var r=arguments.length, t=new Array(r>1?r-1:0), n=1; n<r; n++) {
    t[n-1]=arguments[n];
  } const o=function() {
    for (var i=arguments.length, a=new Array(i), s=0; s<i; s++) {
      a[s]=arguments[s];
    } let f=0; let c; let p={ memoizeOptions: void 0 }; let l=a.pop(); if (typeof l=='object'&&(p=l, l=a.pop()), typeof l!='function') {
      throw new Error(`createSelector expects an output function after the inputs, but received: [${typeof l}]`);
    } const v=p; const S=v.memoizeOptions; const d=S===void 0?t:S; const y=Array.isArray(d)?d:[d]; const g=gt(a); const P=e.apply(void 0, [function() {
      return f++, l.apply(null, arguments);
    }].concat(y)); const w=e(function() {
      for (var R=[], N=g.length, A=0; A<N; A++) {
        R.push(g[A].apply(null, arguments));
      } return c=P.apply(null, R), c;
    }); return Object.assign(w, { resultFunc: l, memoizedResultFunc: P, dependencies: g, lastResult: function() {
      return c;
    }, recomputations: function() {
      return f;
    }, resetRecomputations: function() {
      return f=0;
    } }), w;
  }; return o;
} const Mt=St(bt); export { Et as P, M as R, j as _, X as a, Rt as b, lr as c, wt as d, Ot as e, vr as f, Mt as g, We as h, fr as i, St as j, bt as k, xt as l, Ct as m, gr as p, dt as t, Nt as u };
