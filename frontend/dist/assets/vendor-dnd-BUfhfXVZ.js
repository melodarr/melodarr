import { g as Pe, j as we, r as g } from './vendor-react-Bo0aVqlV.js';
import { c as Ne } from './vendor-state-CM5LZqsW.js';

const ae=g.createContext({ dragDropManager: void 0 }); function c(t, e, ...r) {
  if (Re()&&e===void 0) {
    throw new Error('invariant requires an error message argument');
  } if (!t) {
    let n; if (e===void 0) {
      n=new Error('Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.');
    } else {
      let i=0; n=new Error(e.replace(/%s/g, () => {
        return r[i++];
      })), n.name='Invariant Violation';
    } throw n.framesToPop=1, n;
  }
} function Re() {
  return typeof process<'u'&&!0;
} function xe(t, e, r) {
  return e.split('.').reduce((n, i) => (n&&n[i]?n[i]:r||null), t);
} function Me(t, e) {
  return t.filter((r) => r!==e);
} function ce(t) {
  return typeof t=='object';
} function _e(t, e) {
  const r=new Map(); const
    n=(s) => {
      r.set(s, r.has(s)?r.get(s)+1:1);
    }; t.forEach(n), e.forEach(n); const i=[]; return r.forEach((s, o) => {
    s===1&&i.push(o);
  }), i;
} function Le(t, e) {
  return t.filter((r) => e.indexOf(r)>-1);
} const B='dnd-core/INIT_COORDS'; const N='dnd-core/BEGIN_DRAG'; const V='dnd-core/PUBLISH_DRAG_SOURCE'; const R='dnd-core/HOVER'; const x='dnd-core/DROP'; const
  M='dnd-core/END_DRAG'; function J(t, e) {
  return { type: B, payload: { sourceClientOffset: e||null, clientOffset: t||null } };
} const He={ type: B, payload: { clientOffset: null, sourceClientOffset: null } }; function Ae(t) {
  return function(r=[], n={ publishSource: !0 }) {
    const { publishSource: i=!0, clientOffset: s, getSourceClientOffset: o }=n; const a=t.getMonitor(); const d=t.getRegistry(); t.dispatch(J(s)), ke(r, a, d); const l=Fe(r, a); if (l==null) {
      t.dispatch(He); return;
    }let f=null; if (s) {
      if (!o) {
        throw new Error('getSourceClientOffset must be defined');
      } je(o), f=o(l);
    }t.dispatch(J(s, f)); const h=d.getSource(l).beginDrag(a, l); if (h==null) {
      return;
    } Ue(h), d.pinSource(l); const u=d.getSourceType(l); return { type: N, payload: { itemType: u, item: h, sourceId: l, clientOffset: s||null, sourceClientOffset: f||null, isSourcePublic: !!i } };
  };
} function ke(t, e, r) {
  c(!e.isDragging(), 'Cannot call beginDrag while dragging.'), t.forEach((n) => {
    c(r.getSource(n), 'Expected sourceIds to be registered.');
  });
} function je(t) {
  c(typeof t=='function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
} function Ue(t) {
  c(ce(t), 'Item must be an object.');
} function Fe(t, e) {
  let r=null; for (let n=t.length-1; n>=0; n--) {
    if (e.canDragSource(t[n])) {
      r=t[n]; break;
    }
  } return r;
} function qe(t, e, r) {
  return e in t?Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }):t[e]=r, t;
} function $e(t) {
  for (let e=1; e<arguments.length; e++) {
    var r=arguments[e]!=null?arguments[e]:{}; let n=Object.keys(r); typeof Object.getOwnPropertySymbols=='function'&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((i) => {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach((i) => {
      qe(t, i, r[i]);
    });
  } return t;
} function Ge(t) {
  return function(r={}) {
    const n=t.getMonitor(); const i=t.getRegistry(); Be(n), Ye(n).forEach((o, a) => {
      const d=Ve(o, a, i, n); const l={ type: x, payload: { dropResult: $e({}, r, d) } }; t.dispatch(l);
    });
  };
} function Be(t) {
  c(t.isDragging(), 'Cannot call drop while not dragging.'), c(!t.didDrop(), 'Cannot call drop twice during one drag operation.');
} function Ve(t, e, r, n) {
  const i=r.getTarget(t); let s=i?i.drop(n, t):void 0; return Xe(s), typeof s>'u'&&(s=e===0?{}:n.getDropResult()), s;
} function Xe(t) {
  c(typeof t>'u'||ce(t), 'Drop result must either be an object or undefined.');
} function Ye(t) {
  const e=t.getTargetIds().filter(t.canDropOnTarget, t); return e.reverse(), e;
} function We(t) {
  return function() {
    const r=t.getMonitor(); const n=t.getRegistry(); ze(r); const i=r.getSourceId(); return i!=null&&(n.getSource(i, !0).endDrag(r, i), n.unpinSource()), { type: M };
  };
} function ze(t) {
  c(t.isDragging(), 'Cannot call endDrag while not dragging.');
} function U(t, e) {
  return e===null?t===null:Array.isArray(t)?t.some((r) => r===e):t===e;
} function Qe(t) {
  return function(r, { clientOffset: n }={}) {
    Je(r); const i=r.slice(0); const s=t.getMonitor(); const o=t.getRegistry(); const a=s.getItemType(); return Ke(i, o, a), Ze(i, s, o), et(i, s, o), { type: R, payload: { targetIds: i, clientOffset: n||null } };
  };
} function Je(t) {
  c(Array.isArray(t), 'Expected targetIds to be an array.');
} function Ze(t, e, r) {
  c(e.isDragging(), 'Cannot call hover while not dragging.'), c(!e.didDrop(), 'Cannot call hover after drop.'); for (let n=0; n<t.length; n++) {
    const i=t[n]; c(t.lastIndexOf(i)===n, 'Expected targetIds to be unique in the passed array.'); const s=r.getTarget(i); c(s, 'Expected targetIds to be registered.');
  }
} function Ke(t, e, r) {
  for (let n=t.length-1; n>=0; n--) {
    const i=t[n]; const s=e.getTargetType(i); U(s, r)||t.splice(n, 1);
  }
} function et(t, e, r) {
  t.forEach((n) => {
    r.getTarget(n).hover(e, n);
  });
} function tt(t) {
  return function() {
    if (t.getMonitor().isDragging()) {
      return { type: V };
    }
  };
} function rt(t) {
  return { beginDrag: Ae(t), publishDragSource: tt(t), hover: Qe(t), drop: Ge(t), endDrag: We(t) };
} class nt {
  receiveBackend(e) {
    this.backend=e;
  }getMonitor() {
    return this.monitor;
  }getBackend() {
    return this.backend;
  }getRegistry() {
    return this.monitor.registry;
  }getActions() {
    const e=this; const { dispatch: r }=this.store; function n(s) {
      return (...o) => {
        const a=s.apply(e, o); typeof a<'u'&&r(a);
      };
    } const i=rt(this); return Object.keys(i).reduce((s, o) => {
      const a=i[o]; return s[o]=n(a), s;
    }, {});
  }dispatch(e) {
    this.store.dispatch(e);
  }constructor(e, r) {
    this.isSetUp=!1, this.handleRefCountChange=() => {
      const n=this.store.getState().refCount>0; this.backend&&(n&&!this.isSetUp?(this.backend.setup(), this.isSetUp=!0):!n&&this.isSetUp&&(this.backend.teardown(), this.isSetUp=!1));
    }, this.store=e, this.monitor=r, e.subscribe(this.handleRefCountChange);
  }
} function it(t, e) {
  return { x: t.x+e.x, y: t.y+e.y };
} function ue(t, e) {
  return { x: t.x-e.x, y: t.y-e.y };
} function st(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n }=t; return !e||!r||!n?null:ue(it(e, n), r);
} function ot(t) {
  const { clientOffset: e, initialClientOffset: r }=t; return !e||!r?null:ue(e, r);
} const C=[]; const X=[]; C.__IS_NONE__=!0; X.__IS_ALL__=!0; function at(t, e) {
  return t===C?!1:t===X||typeof e>'u'?!0:Le(e, t).length>0;
} class ct {
  subscribeToStateChange(e, r={}) {
    const { handlerIds: n }=r; c(typeof e=='function', 'listener must be a function.'), c(typeof n>'u'||Array.isArray(n), 'handlerIds, when specified, must be an array of strings.'); let i=this.store.getState().stateId; const s=() => {
      const o=this.store.getState(); const a=o.stateId; try {
        a===i||a===i+1&&!at(o.dirtyHandlerIds, n)||e();
      } finally {
        i=a;
      }
    }; return this.store.subscribe(s);
  }subscribeToOffsetChange(e) {
    c(typeof e=='function', 'listener must be a function.'); let r=this.store.getState().dragOffset; const n=() => {
      const i=this.store.getState().dragOffset; i!==r&&(r=i, e());
    }; return this.store.subscribe(n);
  }canDragSource(e) {
    if (!e) {
      return !1;
    } const r=this.registry.getSource(e); return c(r, `Expected to find a valid source. sourceId=${e}`), this.isDragging()?!1:r.canDrag(this, e);
  }canDropOnTarget(e) {
    if (!e) {
      return !1;
    } const r=this.registry.getTarget(e); if (c(r, `Expected to find a valid target. targetId=${e}`), !this.isDragging()||this.didDrop()) {
      return !1;
    } const n=this.registry.getTargetType(e); const i=this.getItemType(); return U(n, i)&&r.canDrop(this, e);
  }isDragging() {
    return !!this.getItemType();
  }isDraggingSource(e) {
    if (!e) {
      return !1;
    } const r=this.registry.getSource(e, !0); if (c(r, `Expected to find a valid source. sourceId=${e}`), !this.isDragging()||!this.isSourcePublic()) {
      return !1;
    } const n=this.registry.getSourceType(e); const i=this.getItemType(); return n!==i?!1:r.isDragging(this, e);
  }isOverTarget(e, r={ shallow: !1 }) {
    if (!e) {
      return !1;
    } const { shallow: n }=r; if (!this.isDragging()) {
      return !1;
    } const i=this.registry.getTargetType(e); const s=this.getItemType(); if (s&&!U(i, s)) {
      return !1;
    } const o=this.getTargetIds(); if (!o.length) {
      return !1;
    } const a=o.indexOf(e); return n?a===o.length-1:a>-1;
  }getItemType() {
    return this.store.getState().dragOperation.itemType;
  }getItem() {
    return this.store.getState().dragOperation.item;
  }getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }isSourcePublic() {
    return !!this.store.getState().dragOperation.isSourcePublic;
  }getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }getSourceClientOffset() {
    return st(this.store.getState().dragOffset);
  }getDifferenceFromInitialOffset() {
    return ot(this.store.getState().dragOffset);
  }constructor(e, r) {
    this.store=e, this.registry=r;
  }
} const Z=typeof global<'u'?global:self; const de=Z.MutationObserver||Z.WebKitMutationObserver; function le(t) {
  return function() {
    const r=setTimeout(i, 0); const n=setInterval(i, 50); function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
} function ut(t) {
  let e=1; const r=new de(t); const n=document.createTextNode(''); return r.observe(n, { characterData: !0 }), function() {
    e=-e, n.data=e;
  };
} const dt=typeof de=='function'?ut:le; class lt {
  enqueueTask(e) {
    const { queue: r, requestFlush: n }=this; r.length||(n(), this.flushing=!0), r[r.length]=e;
  }constructor() {
    this.queue=[], this.pendingErrors=[], this.flushing=!1, this.index=0, this.capacity=1024, this.flush=() => {
      const { queue: e }=this; for (;this.index<e.length;) {
        const r=this.index; if (this.index++, e[r].call(), this.index>this.capacity) {
          for (let n=0, i=e.length-this.index; n<i; n++) {
            e[n]=e[n+this.index];
          }e.length-=this.index, this.index=0;
        }
      }e.length=0, this.index=0, this.flushing=!1;
    }, this.registerPendingError=(e) => {
      this.pendingErrors.push(e), this.requestErrorThrow();
    }, this.requestFlush=dt(this.flush), this.requestErrorThrow=le(() => {
      if (this.pendingErrors.length) {
        throw this.pendingErrors.shift();
      }
    });
  }
} class gt {
  call() {
    try {
      this.task&&this.task();
    } catch (e) {
      this.onError(e);
    } finally {
      this.task=null, this.release(this);
    }
  }constructor(e, r) {
    this.onError=e, this.release=r, this.task=null;
  }
} class ft {
  create(e) {
    const r=this.freeTasks; const n=r.length?r.pop():new gt(this.onError, (i) => r[r.length]=i); return n.task=e, n;
  }constructor(e) {
    this.onError=e, this.freeTasks=[];
  }
} const ge=new lt(); const
  ht=new ft(ge.registerPendingError); function pt(t) {
  ge.enqueueTask(ht.create(t));
} const Y='dnd-core/ADD_SOURCE'; const W='dnd-core/ADD_TARGET'; const z='dnd-core/REMOVE_SOURCE'; const
  _='dnd-core/REMOVE_TARGET'; function vt(t) {
  return { type: Y, payload: { sourceId: t } };
} function Dt(t) {
  return { type: W, payload: { targetId: t } };
} function mt(t) {
  return { type: z, payload: { sourceId: t } };
} function St(t) {
  return { type: _, payload: { targetId: t } };
} function Tt(t) {
  c(typeof t.canDrag=='function', 'Expected canDrag to be a function.'), c(typeof t.beginDrag=='function', 'Expected beginDrag to be a function.'), c(typeof t.endDrag=='function', 'Expected endDrag to be a function.');
} function Ot(t) {
  c(typeof t.canDrop=='function', 'Expected canDrop to be a function.'), c(typeof t.hover=='function', 'Expected hover to be a function.'), c(typeof t.drop=='function', 'Expected beginDrag to be a function.');
} function F(t, e) {
  if (e&&Array.isArray(t)) {
    t.forEach((r) => F(r, !1)); return;
  }c(typeof t=='string'||typeof t=='symbol', e?'Type can only be a string, a symbol, or an array of either.':'Type can only be a string or a symbol.');
} let D; (function(t) {
  t.SOURCE='SOURCE', t.TARGET='TARGET';
})(D||(D={})); let yt=0; function It() {
  return yt++;
} function Ct(t) {
  const e=It().toString(); switch (t) {
    case D.SOURCE:return `S${e}`; case D.TARGET:return `T${e}`; default:throw new Error(`Unknown Handler Role: ${t}`);
  }
} function K(t) {
  switch (t[0]) {
    case 'S':return D.SOURCE; case 'T':return D.TARGET; default:throw new Error(`Cannot parse handler ID: ${t}`);
  }
} function ee(t, e) {
  const r=t.entries(); let n=!1; do {
    const { done: i, value: [, s] }=r.next(); if (s===e) {
      return !0;
    } n=!!i;
  } while (!n); return !1;
} class Et {
  addSource(e, r) {
    F(e), Tt(r); const n=this.addHandler(D.SOURCE, e, r); return this.store.dispatch(vt(n)), n;
  }addTarget(e, r) {
    F(e, !0), Ot(r); const n=this.addHandler(D.TARGET, e, r); return this.store.dispatch(Dt(n)), n;
  }containsHandler(e) {
    return ee(this.dragSources, e)||ee(this.dropTargets, e);
  }getSource(e, r=!1) {
    return c(this.isSourceId(e), 'Expected a valid source ID.'), r&&e===this.pinnedSourceId?this.pinnedSource:this.dragSources.get(e);
  }getTarget(e) {
    return c(this.isTargetId(e), 'Expected a valid target ID.'), this.dropTargets.get(e);
  }getSourceType(e) {
    return c(this.isSourceId(e), 'Expected a valid source ID.'), this.types.get(e);
  }getTargetType(e) {
    return c(this.isTargetId(e), 'Expected a valid target ID.'), this.types.get(e);
  }isSourceId(e) {
    return K(e)===D.SOURCE;
  }isTargetId(e) {
    return K(e)===D.TARGET;
  }removeSource(e) {
    c(this.getSource(e), 'Expected an existing source.'), this.store.dispatch(mt(e)), pt(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }removeTarget(e) {
    c(this.getTarget(e), 'Expected an existing target.'), this.store.dispatch(St(e)), this.dropTargets.delete(e), this.types.delete(e);
  }pinSource(e) {
    const r=this.getSource(e); c(r, 'Expected an existing source.'), this.pinnedSourceId=e, this.pinnedSource=r;
  }unpinSource() {
    c(this.pinnedSource, 'No source is pinned at the time.'), this.pinnedSourceId=null, this.pinnedSource=null;
  }addHandler(e, r, n) {
    const i=Ct(e); return this.types.set(i, r), e===D.SOURCE?this.dragSources.set(i, n):e===D.TARGET&&this.dropTargets.set(i, n), i;
  }constructor(e) {
    this.types=new Map(), this.dragSources=new Map(), this.dropTargets=new Map(), this.pinnedSourceId=null, this.pinnedSource=null, this.store=e;
  }
} const bt=(t, e) => t===e; function wt(t, e) {
  return !t&&!e?!0:!t||!e?!1:t.x===e.x&&t.y===e.y;
} function Pt(t, e, r=bt) {
  if (t.length!==e.length) {
    return !1;
  } for (let n=0; n<t.length; ++n) {
    if (!r(t[n], e[n])) {
      return !1;
    }
  } return !0;
} function Nt(t=C, e) {
  switch (e.type) {
    case R:break; case Y:case W:case _:case z:return C; case N:case V:case M:case x:default:return X;
  } const { targetIds: r=[], prevTargetIds: n=[] }=e.payload; const i=_e(r, n); if (!(i.length>0||!Pt(r, n))) {
    return C;
  } const o=n[n.length-1]; const a=r[r.length-1]; return o!==a&&(o&&i.push(o), a&&i.push(a)), i;
} function Rt(t, e, r) {
  return e in t?Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }):t[e]=r, t;
} function xt(t) {
  for (let e=1; e<arguments.length; e++) {
    var r=arguments[e]!=null?arguments[e]:{}; let n=Object.keys(r); typeof Object.getOwnPropertySymbols=='function'&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((i) => {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach((i) => {
      Rt(t, i, r[i]);
    });
  } return t;
} const te={ initialSourceClientOffset: null, initialClientOffset: null, clientOffset: null }; function Mt(t=te, e) {
  const { payload: r }=e; switch (e.type) {
    case B:case N:return { initialSourceClientOffset: r.sourceClientOffset, initialClientOffset: r.clientOffset, clientOffset: r.clientOffset }; case R:return wt(t.clientOffset, r.clientOffset)?t:xt({}, t, { clientOffset: r.clientOffset }); case M:case x:return te; default:return t;
  }
} function _t(t, e, r) {
  return e in t?Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }):t[e]=r, t;
} function I(t) {
  for (let e=1; e<arguments.length; e++) {
    var r=arguments[e]!=null?arguments[e]:{}; let n=Object.keys(r); typeof Object.getOwnPropertySymbols=='function'&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((i) => {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach((i) => {
      _t(t, i, r[i]);
    });
  } return t;
} const Lt={ itemType: null, item: null, sourceId: null, targetIds: [], dropResult: null, didDrop: !1, isSourcePublic: null }; function Ht(t=Lt, e) {
  const { payload: r }=e; switch (e.type) {
    case N:return I({}, t, { itemType: r.itemType, item: r.item, sourceId: r.sourceId, isSourcePublic: r.isSourcePublic, dropResult: null, didDrop: !1 }); case V:return I({}, t, { isSourcePublic: !0 }); case R:return I({}, t, { targetIds: r.targetIds }); case _:return t.targetIds.indexOf(r.targetId)===-1?t:I({}, t, { targetIds: Me(t.targetIds, r.targetId) }); case x:return I({}, t, { dropResult: r.dropResult, didDrop: !0, targetIds: [] }); case M:return I({}, t, { itemType: null, item: null, sourceId: null, dropResult: null, didDrop: !1, isSourcePublic: null, targetIds: [] }); default:return t;
  }
} function At(t=0, e) {
  switch (e.type) {
    case Y:case W:return t+1; case z:case _:return t-1; default:return t;
  }
} function kt(t=0) {
  return t+1;
} function jt(t, e, r) {
  return e in t?Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }):t[e]=r, t;
} function Ut(t) {
  for (let e=1; e<arguments.length; e++) {
    var r=arguments[e]!=null?arguments[e]:{}; let n=Object.keys(r); typeof Object.getOwnPropertySymbols=='function'&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((i) => {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach((i) => {
      jt(t, i, r[i]);
    });
  } return t;
} function Ft(t={}, e) {
  return { dirtyHandlerIds: Nt(t.dirtyHandlerIds, { type: e.type, payload: Ut({}, e.payload, { prevTargetIds: xe(t, 'dragOperation.targetIds', []) }) }), dragOffset: Mt(t.dragOffset, e), refCount: At(t.refCount, e), dragOperation: Ht(t.dragOperation, e), stateId: kt(t.stateId) };
} function qt(t, e=void 0, r={}, n=!1) {
  const i=$t(n); const s=new ct(i, new Et(i)); const o=new nt(i, s); const a=t(o, e, r); return o.receiveBackend(a), o;
} function $t(t) {
  const e=typeof window<'u'&&window.__REDUX_DEVTOOLS_EXTENSION__; return Ne(Ft, t&&e&&e({ name: 'dnd-core', instanceId: 'dnd-core' }));
} function Gt(t, e) {
  if (t==null) {
    return {};
  } const r=Bt(t, e); let n; let i; if (Object.getOwnPropertySymbols) {
    const s=Object.getOwnPropertySymbols(t); for (i=0; i<s.length; i++) {
      n=s[i], !(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(t, n)&&(r[n]=t[n]);
    }
  } return r;
} function Bt(t, e) {
  if (t==null) {
    return {};
  } const r={}; const n=Object.keys(t); let i; let s; for (s=0; s<n.length; s++) {
    i=n[s], !(e.indexOf(i)>=0)&&(r[i]=t[i]);
  } return r;
}let re=0; const P=Symbol.for('__REACT_DND_CONTEXT_INSTANCE__'); const Hr=g.memo((e) => {
  const { children: r }=e; const n=Gt(e, ['children']); const [i, s]=Vt(n); return g.useEffect(() => {
    if (s) {
      const o=fe(); return ++re, () => {
        --re===0&&(o[P]=null);
      };
    }
  }, []), we.jsx(ae.Provider, { value: i, children: r });
}); function Vt(t) {
  if ('manager'in t) {
    return [{ dragDropManager: t.manager }, !1];
  } const e=Xt(t.backend, t.context, t.options, t.debugMode); const r=!t.context; return [e, r];
} function Xt(t, e=fe(), r, n) {
  const i=e; return i[P]||(i[P]={ dragDropManager: qt(t, e, r, n) }), i[P];
} function fe() {
  return typeof global<'u'?global:window;
} const Yt=function t(e, r) {
  if (e===r) {
    return !0;
  } if (e&&r&&typeof e=='object'&&typeof r=='object') {
    if (e.constructor!==r.constructor) {
      return !1;
    } let n; let i; let s; if (Array.isArray(e)) {
      if (n=e.length, n!=r.length) {
        return !1;
      } for (i=n; i--!==0;) {
        if (!t(e[i], r[i])) {
          return !1;
        }
      } return !0;
    } if (e.constructor===RegExp) {
      return e.source===r.source&&e.flags===r.flags;
    } if (e.valueOf!==Object.prototype.valueOf) {
      return e.valueOf()===r.valueOf();
    } if (e.toString!==Object.prototype.toString) {
      return e.toString()===r.toString();
    } if (s=Object.keys(e), n=s.length, n!==Object.keys(r).length) {
      return !1;
    } for (i=n; i--!==0;) {
      if (!Object.prototype.hasOwnProperty.call(r, s[i])) {
        return !1;
      }
    } for (i=n; i--!==0;) {
      const o=s[i]; if (!t(e[o], r[o])) {
        return !1;
      }
    } return !0;
  } return e!==e&&r!==r;
}; const Wt=Pe(Yt); const O=typeof window<'u'?g.useLayoutEffect:g.useEffect; function he(t, e, r) {
  const [n, i]=g.useState(() => e(t)); const s=g.useCallback(() => {
    const o=e(t); Wt(n, o)||(i(o), r&&r());
  }, [n, t, r]); return O(s), [n, s];
} function zt(t, e, r) {
  const [n, i]=he(t, e, r); return O(() => {
    const o=t.getHandlerId(); if (o!=null) {
      return t.subscribeToStateChange(i, { handlerIds: [o] });
    }
  }, [t, i]), n;
} function pe(t, e, r) {
  return zt(e, t||(() => ({})), () => r.reconnect());
} function ve(t, e) {
  const r=[]; return typeof t!='function'&&r.push(t), g.useMemo(() => (typeof t=='function'?t():t), r);
} function Qt(t) {
  return g.useMemo(() => t.hooks.dragSource(), [t]);
} function Jt(t) {
  return g.useMemo(() => t.hooks.dragPreview(), [t]);
}let L=!1; let H=!1; class Zt {
  receiveHandlerId(e) {
    this.sourceId=e;
  }getHandlerId() {
    return this.sourceId;
  }canDrag() {
    c(!L, 'You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor'); try {
      return L=!0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      L=!1;
    }
  }isDragging() {
    if (!this.sourceId) {
      return !1;
    } c(!H, 'You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor'); try {
      return H=!0, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      H=!1;
    }
  }subscribeToStateChange(e, r) {
    return this.internalMonitor.subscribeToStateChange(e, r);
  }isDraggingSource(e) {
    return this.internalMonitor.isDraggingSource(e);
  }isOverTarget(e, r) {
    return this.internalMonitor.isOverTarget(e, r);
  }getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }getSourceId() {
    return this.internalMonitor.getSourceId();
  }subscribeToOffsetChange(e) {
    return this.internalMonitor.subscribeToOffsetChange(e);
  }canDragSource(e) {
    return this.internalMonitor.canDragSource(e);
  }canDropOnTarget(e) {
    return this.internalMonitor.canDropOnTarget(e);
  }getItemType() {
    return this.internalMonitor.getItemType();
  }getItem() {
    return this.internalMonitor.getItem();
  }getDropResult() {
    return this.internalMonitor.getDropResult();
  }didDrop() {
    return this.internalMonitor.didDrop();
  }getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }constructor(e) {
    this.sourceId=null, this.internalMonitor=e.getMonitor();
  }
}let A=!1; class Kt {
  receiveHandlerId(e) {
    this.targetId=e;
  }getHandlerId() {
    return this.targetId;
  }subscribeToStateChange(e, r) {
    return this.internalMonitor.subscribeToStateChange(e, r);
  }canDrop() {
    if (!this.targetId) {
      return !1;
    } c(!A, 'You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor'); try {
      return A=!0, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      A=!1;
    }
  }isOver(e) {
    return this.targetId?this.internalMonitor.isOverTarget(this.targetId, e):!1;
  }getItemType() {
    return this.internalMonitor.getItemType();
  }getItem() {
    return this.internalMonitor.getItem();
  }getDropResult() {
    return this.internalMonitor.getDropResult();
  }didDrop() {
    return this.internalMonitor.didDrop();
  }getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }constructor(e) {
    this.targetId=null, this.internalMonitor=e.getMonitor();
  }
} function er(t, e, r) {
  const n=r.getRegistry(); const i=n.addTarget(t, e); return [i, () => n.removeTarget(i)];
} function tr(t, e, r) {
  const n=r.getRegistry(); const i=n.addSource(t, e); return [i, () => n.removeSource(i)];
} function q(t, e, r, n) {
  let i; if (i!==void 0) {
    return !!i;
  } if (t===e) {
    return !0;
  } if (typeof t!='object'||!t||typeof e!='object'||!e) {
    return !1;
  } const s=Object.keys(t); const o=Object.keys(e); if (s.length!==o.length) {
    return !1;
  } const a=Object.prototype.hasOwnProperty.bind(e); for (let d=0; d<s.length; d++) {
    const l=s[d]; if (!a(l)) {
      return !1;
    } const f=t[l]; const p=e[l]; if (i=void 0, i===!1||i===void 0&&f!==p) {
      return !1;
    }
  } return !0;
} function $(t) {
  return t!==null&&typeof t=='object'&&Object.prototype.hasOwnProperty.call(t, 'current');
} function rr(t) {
  if (typeof t.type=='string') {
    return;
  } const e=t.type.displayName||t.type.name||'the component'; throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${e} into a <div>, or turn it into a drag source or a drop target itself.`);
} function nr(t) {
  return (e=null, r=null) => {
    if (!g.isValidElement(e)) {
      const s=e; return t(s, r), s;
    } const n=e; return rr(n), ir(n, r?(s) => t(s, r):t);
  };
} function De(t) {
  const e={}; return Object.keys(t).forEach((r) => {
    const n=t[r]; if (r.endsWith('Ref')) {
      e[r]=t[r];
    } else {
      const i=nr(n); e[r]=() => i;
    }
  }), e;
} function ne(t, e) {
  typeof t=='function'?t(e):t.current=e;
} function ir(t, e) {
  const r=t.ref; return c(typeof r!='string', 'Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs'), r?g.cloneElement(t, { ref: (n) => {
    ne(r, n), ne(e, n);
  } }):g.cloneElement(t, { ref: e });
} class sr {
  receiveHandlerId(e) {
    this.handlerId!==e&&(this.handlerId=e, this.reconnect());
  } get connectTarget() {
    return this.dragSource;
  } get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  } set dragSourceOptions(e) {
    this.dragSourceOptionsInternal=e;
  } get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  } set dragPreviewOptions(e) {
    this.dragPreviewOptionsInternal=e;
  }reconnect() {
    const e=this.reconnectDragSource(); this.reconnectDragPreview(e);
  }reconnectDragSource() {
    const e=this.dragSource; const r=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange(); return r&&this.disconnectDragSource(), this.handlerId?e?(r&&(this.lastConnectedHandlerId=this.handlerId, this.lastConnectedDragSource=e, this.lastConnectedDragSourceOptions=this.dragSourceOptions, this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId, e, this.dragSourceOptions)), r):(this.lastConnectedDragSource=e, r):r;
  }reconnectDragPreview(e=!1) {
    const r=this.dragPreview; const n=e||this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange(); if (n&&this.disconnectDragPreview(), !!this.handlerId) {
      if (!r) {
        this.lastConnectedDragPreview=r; return;
      }n&&(this.lastConnectedHandlerId=this.handlerId, this.lastConnectedDragPreview=r, this.lastConnectedDragPreviewOptions=this.dragPreviewOptions, this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId, r, this.dragPreviewOptions));
    }
  }didHandlerIdChange() {
    return this.lastConnectedHandlerId!==this.handlerId;
  }didConnectedDragSourceChange() {
    return this.lastConnectedDragSource!==this.dragSource;
  }didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview!==this.dragPreview;
  }didDragSourceOptionsChange() {
    return !q(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }didDragPreviewOptionsChange() {
    return !q(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }disconnectDragSource() {
    this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe=void 0);
  }disconnectDragPreview() {
    this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe=void 0, this.dragPreviewNode=null, this.dragPreviewRef=null);
  } get dragSource() {
    return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current;
  } get dragPreview() {
    return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current;
  }clearDragSource() {
    this.dragSourceNode=null, this.dragSourceRef=null;
  }clearDragPreview() {
    this.dragPreviewNode=null, this.dragPreviewRef=null;
  }constructor(e) {
    this.hooks=De({ dragSource: (r, n) => {
      this.clearDragSource(), this.dragSourceOptions=n||null, $(r)?this.dragSourceRef=r:this.dragSourceNode=r, this.reconnectDragSource();
    }, dragPreview: (r, n) => {
      this.clearDragPreview(), this.dragPreviewOptions=n||null, $(r)?this.dragPreviewRef=r:this.dragPreviewNode=r, this.reconnectDragPreview();
    } }), this.handlerId=null, this.dragSourceRef=null, this.dragSourceOptionsInternal=null, this.dragPreviewRef=null, this.dragPreviewOptionsInternal=null, this.lastConnectedHandlerId=null, this.lastConnectedDragSource=null, this.lastConnectedDragSourceOptions=null, this.lastConnectedDragPreview=null, this.lastConnectedDragPreviewOptions=null, this.backend=e;
  }
} class or {
  get connectTarget() {
    return this.dropTarget;
  }reconnect() {
    const e=this.didHandlerIdChange()||this.didDropTargetChange()||this.didOptionsChange(); e&&this.disconnectDropTarget(); const r=this.dropTarget; if (this.handlerId) {
      if (!r) {
        this.lastConnectedDropTarget=r; return;
      }e&&(this.lastConnectedHandlerId=this.handlerId, this.lastConnectedDropTarget=r, this.lastConnectedDropTargetOptions=this.dropTargetOptions, this.unsubscribeDropTarget=this.backend.connectDropTarget(this.handlerId, r, this.dropTargetOptions));
    }
  }receiveHandlerId(e) {
    e!==this.handlerId&&(this.handlerId=e, this.reconnect());
  } get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  } set dropTargetOptions(e) {
    this.dropTargetOptionsInternal=e;
  }didHandlerIdChange() {
    return this.lastConnectedHandlerId!==this.handlerId;
  }didDropTargetChange() {
    return this.lastConnectedDropTarget!==this.dropTarget;
  }didOptionsChange() {
    return !q(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }disconnectDropTarget() {
    this.unsubscribeDropTarget&&(this.unsubscribeDropTarget(), this.unsubscribeDropTarget=void 0);
  } get dropTarget() {
    return this.dropTargetNode||this.dropTargetRef&&this.dropTargetRef.current;
  }clearDropTarget() {
    this.dropTargetRef=null, this.dropTargetNode=null;
  }constructor(e) {
    this.hooks=De({ dropTarget: (r, n) => {
      this.clearDropTarget(), this.dropTargetOptions=n, $(r)?this.dropTargetRef=r:this.dropTargetNode=r, this.reconnect();
    } }), this.handlerId=null, this.dropTargetRef=null, this.dropTargetOptionsInternal=null, this.lastConnectedHandlerId=null, this.lastConnectedDropTarget=null, this.lastConnectedDropTargetOptions=null, this.backend=e;
  }
} function y() {
  const { dragDropManager: t }=g.useContext(ae); return c(t!=null, 'Expected drag drop context'), t;
} function ar(t, e) {
  const r=y(); const n=g.useMemo(() => new sr(r.getBackend()), [r]); return O(() => (n.dragSourceOptions=t||null, n.reconnect(), () => n.disconnectDragSource()), [n, t]), O(() => (n.dragPreviewOptions=e||null, n.reconnect(), () => n.disconnectDragPreview()), [n, e]), n;
} function cr() {
  const t=y(); return g.useMemo(() => new Zt(t), [t]);
} class ur {
  beginDrag() {
    const e=this.spec; const r=this.monitor; let n=null; return typeof e.item=='object'?n=e.item:typeof e.item=='function'?n=e.item(r):n={}, n??null;
  }canDrag() {
    const e=this.spec; const r=this.monitor; return typeof e.canDrag=='boolean'?e.canDrag:typeof e.canDrag=='function'?e.canDrag(r):!0;
  }isDragging(e, r) {
    const n=this.spec; const i=this.monitor; const { isDragging: s }=n; return s?s(i):r===e.getSourceId();
  }endDrag() {
    const e=this.spec; const r=this.monitor; const n=this.connector; const { end: i }=e; i&&i(r.getItem(), r), n.reconnect();
  }constructor(e, r, n) {
    this.spec=e, this.monitor=r, this.connector=n;
  }
} function dr(t, e, r) {
  const n=g.useMemo(() => new ur(t, e, r), [e, r]); return g.useEffect(() => {
    n.spec=t;
  }, [t]), n;
} function lr(t) {
  return g.useMemo(() => {
    const e=t.type; return c(e!=null, 'spec.type must be defined'), e;
  }, [t]);
} function gr(t, e, r) {
  const n=y(); const i=dr(t, e, r); const s=lr(t); O(() => {
    if (s!=null) {
      const [a, d]=tr(s, i, n); return e.receiveHandlerId(a), r.receiveHandlerId(a), d;
    }
  }, [n, e, r, i, s]);
} function Ar(t, e) {
  const r=ve(t); c(!r.begin, 'useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)'); const n=cr(); const i=ar(r.options, r.previewOptions); return gr(r, n, i), [pe(r.collect, n, i), Qt(i), Jt(i)];
} function kr(t) {
  const r=y().getMonitor(); const [n, i]=he(r, t); return g.useEffect(() => r.subscribeToOffsetChange(i)), g.useEffect(() => r.subscribeToStateChange(i)), n;
} function fr(t) {
  return g.useMemo(() => t.hooks.dropTarget(), [t]);
} function hr(t) {
  const e=y(); const r=g.useMemo(() => new or(e.getBackend()), [e]); return O(() => (r.dropTargetOptions=t||null, r.reconnect(), () => r.disconnectDropTarget()), [t]), r;
} function pr() {
  const t=y(); return g.useMemo(() => new Kt(t), [t]);
} function vr(t) {
  const { accept: e }=t; return g.useMemo(() => (c(t.accept!=null, 'accept must be defined'), Array.isArray(e)?e:[e]), [e]);
} class Dr {
  canDrop() {
    const e=this.spec; const r=this.monitor; return e.canDrop?e.canDrop(r.getItem(), r):!0;
  }hover() {
    const e=this.spec; const r=this.monitor; e.hover&&e.hover(r.getItem(), r);
  }drop() {
    const e=this.spec; const r=this.monitor; if (e.drop) {
      return e.drop(r.getItem(), r);
    }
  }constructor(e, r) {
    this.spec=e, this.monitor=r;
  }
} function mr(t, e) {
  const r=g.useMemo(() => new Dr(t, e), [e]); return g.useEffect(() => {
    r.spec=t;
  }, [t]), r;
} function Sr(t, e, r) {
  const n=y(); const i=mr(t, e); const s=vr(t); O(() => {
    const [a, d]=er(s, i, n); return e.receiveHandlerId(a), r.receiveHandlerId(a), d;
  }, [n, e, i, r, s.map((o) => o.toString()).join('|')]);
} function jr(t, e) {
  const r=ve(t); const n=pr(); const i=hr(r.options); return Sr(r, n, i), [pe(r.collect, n, i), fr(i)];
} function me(t) {
  let e=null; return () => (e==null&&(e=t()), e);
} function Tr(t, e) {
  return t.filter((r) => r!==e);
} function Or(t, e) {
  const r=new Set(); const
    n=(s) => r.add(s); t.forEach(n), e.forEach(n); const i=[]; return r.forEach((s) => i.push(s)), i;
} class yr {
  enter(e) {
    const r=this.entered.length; const n=(i) => this.isNodeInDocument(i)&&(!i.contains||i.contains(e)); return this.entered=Or(this.entered.filter(n), [e]), r===0&&this.entered.length>0;
  }leave(e) {
    const r=this.entered.length; return this.entered=Tr(this.entered.filter(this.isNodeInDocument), e), r>0&&this.entered.length===0;
  }reset() {
    this.entered=[];
  }constructor(e) {
    this.entered=[], this.isNodeInDocument=e;
  }
} class Ir {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((e) => {
      Object.defineProperty(this.item, e, { configurable: !0, enumerable: !0, get() {
        return console.warn(`Browser doesn't allow reading "${e}" until the drop event.`), null;
      } });
    });
  }loadDataTransfer(e) {
    if (e) {
      const r={}; Object.keys(this.config.exposeProperties).forEach((n) => {
        const i=this.config.exposeProperties[n]; i!=null&&(r[n]={ value: i(e, this.config.matchesTypes), configurable: !0, enumerable: !0 });
      }), Object.defineProperties(this.item, r);
    }
  }canDrag() {
    return !0;
  }beginDrag() {
    return this.item;
  }isDragging(e, r) {
    return r===e.getSourceId();
  }endDrag() {}constructor(e) {
    this.config=e, this.item={}, this.initializeExposedProperties();
  }
} const Se='__NATIVE_FILE__'; const Te='__NATIVE_URL__'; const Oe='__NATIVE_TEXT__'; const ye='__NATIVE_HTML__'; const
  ie=Object.freeze(Object.defineProperty({ __proto__: null, FILE: Se, HTML: ye, TEXT: Oe, URL: Te }, Symbol.toStringTag, { value: 'Module' })); function k(t, e, r) {
  const n=e.reduce((i, s) => i||t.getData(s), ''); return n??r;
} const G={ [Se]: { exposeProperties: { files: (t) => Array.prototype.slice.call(t.files), items: (t) => t.items, dataTransfer: (t) => t }, matchesTypes: ['Files'] }, [ye]: { exposeProperties: { html: (t, e) => k(t, e, ''), dataTransfer: (t) => t }, matchesTypes: ['Html', 'text/html'] }, [Te]: { exposeProperties: { urls: (t, e) => k(t, e, '').split(`
`), dataTransfer: (t) => t }, matchesTypes: ['Url', 'text/uri-list'] }, [Oe]: { exposeProperties: { text: (t, e) => k(t, e, ''), dataTransfer: (t) => t }, matchesTypes: ['Text', 'text/plain'] } }; function Cr(t, e) {
  const r=G[t]; if (!r) {
    throw new Error(`native type ${t} has no configuration`);
  } const n=new Ir(r); return n.loadDataTransfer(e), n;
} function j(t) {
  if (!t) {
    return null;
  } const e=Array.prototype.slice.call(t.types||[]); return Object.keys(G).filter((r) => {
    const n=G[r]; return n?.matchesTypes?n.matchesTypes.some((i) => e.indexOf(i)>-1):!1;
  })[0]||null;
} const Er=me(() => (/firefox/i).test(navigator.userAgent)); const Ie=me(() => !!window.safari); class se {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: s, c3s: o }=this; let a=r.length-1; if (e===r[a]) {
      return n[a];
    } let d=0; let l=o.length-1; let f; for (;d<=l;) {
      f=Math.floor(0.5*(d+l)); const u=r[f]; if (u<e) {
        d=f+1;
      } else if (u>e) {
        l=f-1;
      } else {
        return n[f];
      }
    }a=Math.max(0, l); const p=e-r[a]; const h=p*p; return n[a]+i[a]*p+s[a]*h+o[a]*p*h;
  }constructor(e, r) {
    const { length: n }=e; const i=[]; for (let u=0; u<n; u++) {
      i.push(u);
    }i.sort((u, v) => (e[u]<e[v]?-1:1)); const s=[]; const o=[]; let a; let d; for (let u=0; u<n-1; u++) {
      a=e[u+1]-e[u], d=r[u+1]-r[u], s.push(a), o.push(d/a);
    } const l=[o[0]]; for (let u=0; u<s.length-1; u++) {
      const v=o[u]; const m=o[u+1]; if (v*m<=0) {
        l.push(0);
      } else {
        a=s[u]; const S=s[u+1]; const T=a+S; l.push(3*T/((T+S)/v+(T+a)/m));
      }
    }l.push(o[o.length-1]); const f=[]; const p=[]; let h; for (let u=0; u<l.length-1; u++) {
      h=o[u]; const v=l[u]; const m=1/s[u]; const S=v+l[u+1]-h-h; f.push((h-v-S)*m), p.push(S*m*m);
    } this.xs=e, this.ys=r, this.c1s=l, this.c2s=f, this.c3s=p;
  }
} const br=1; function Ce(t) {
  const e=t.nodeType===br?t:t.parentElement; if (!e) {
    return null;
  } const { top: r, left: n }=e.getBoundingClientRect(); return { x: n, y: r };
} function w(t) {
  return { x: t.clientX, y: t.clientY };
} function wr(t) {
  let e; return t.nodeName==='IMG'&&(Er()||!(!((e=document.documentElement)===null||e===void 0)&&e.contains(t)));
} function Pr(t, e, r, n) {
  let i=t?e.width:r; let s=t?e.height:n; return Ie()&&t&&(s/=window.devicePixelRatio, i/=window.devicePixelRatio), { dragPreviewWidth: i, dragPreviewHeight: s };
} function Nr(t, e, r, n, i) {
  const s=wr(e); const a=Ce(s?t:e); const d={ x: r.x-a.x, y: r.y-a.y }; const { offsetWidth: l, offsetHeight: f }=t; const { anchorX: p, anchorY: h }=n; const { dragPreviewWidth: u, dragPreviewHeight: v }=Pr(s, e, l, f); const m=() => {
    let Q=new se([0, 0.5, 1], [d.y, d.y/f*v, d.y+v-f]).interpolate(h); return Ie()&&s&&(Q+=(window.devicePixelRatio-1)*v), Q;
  }; const S=() => new se([0, 0.5, 1], [d.x, d.x/l*u, d.x+u-l]).interpolate(p); const { offsetX: T, offsetY: E }=i; const b=T===0||T; const Ee=E===0||E; return { x: b?T:S(), y: Ee?E:m() };
} class Rr {
  get window() {
    if (this.globalContext) {
      return this.globalContext;
    } if (typeof window<'u') {
      return window;
    }
  } get document() {
    let e; return !((e=this.globalContext)===null||e===void 0)&&e.document?this.globalContext.document:this.window?this.window.document:void 0;
  } get rootElement() {
    let e; return ((e=this.optionsArgs)===null||e===void 0?void 0:e.rootElement)||this.window;
  }constructor(e, r) {
    this.ownerDocument=null, this.globalContext=e, this.optionsArgs=r;
  }
} function xr(t, e, r) {
  return e in t?Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }):t[e]=r, t;
} function oe(t) {
  for (let e=1; e<arguments.length; e++) {
    var r=arguments[e]!=null?arguments[e]:{}; let n=Object.keys(r); typeof Object.getOwnPropertySymbols=='function'&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((i) => {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach((i) => {
      xr(t, i, r[i]);
    });
  } return t;
} class Mr {
  profile() {
    let e; let r; return { sourcePreviewNodes: this.sourcePreviewNodes.size, sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size, sourceNodeOptions: this.sourceNodeOptions.size, sourceNodes: this.sourceNodes.size, dragStartSourceIds: ((e=this.dragStartSourceIds)===null||e===void 0?void 0:e.length)||0, dropTargetIds: this.dropTargetIds.length, dragEnterTargetIds: this.dragEnterTargetIds.length, dragOverTargetIds: ((r=this.dragOverTargetIds)===null||r===void 0?void 0:r.length)||0 };
  } get window() {
    return this.options.window;
  } get document() {
    return this.options.document;
  } get rootElement() {
    return this.options.rootElement;
  }setup() {
    const e=this.rootElement; if (e!==void 0) {
      if (e.__isReactDndBackendSetUp) {
        throw new Error('Cannot have two HTML5 backends at the same time.');
      } e.__isReactDndBackendSetUp=!0, this.addEventListeners(e);
    }
  }teardown() {
    const e=this.rootElement; if (e!==void 0&&(e.__isReactDndBackendSetUp=!1, this.removeEventListeners(this.rootElement), this.clearCurrentDragSourceNode(), this.asyncEndDragFrameId)) {
      let r; (r=this.window)===null||r===void 0||r.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }connectDragPreview(e, r, n) {
    return this.sourcePreviewNodeOptions.set(e, n), this.sourcePreviewNodes.set(e, r), () => {
      this.sourcePreviewNodes.delete(e), this.sourcePreviewNodeOptions.delete(e);
    };
  }connectDragSource(e, r, n) {
    this.sourceNodes.set(e, r), this.sourceNodeOptions.set(e, n); const i=(o) => this.handleDragStart(o, e); const s=(o) => this.handleSelectStart(o); return r.setAttribute('draggable', 'true'), r.addEventListener('dragstart', i), r.addEventListener('selectstart', s), () => {
      this.sourceNodes.delete(e), this.sourceNodeOptions.delete(e), r.removeEventListener('dragstart', i), r.removeEventListener('selectstart', s), r.setAttribute('draggable', 'false');
    };
  }connectDropTarget(e, r) {
    const n=(o) => this.handleDragEnter(o, e); const i=(o) => this.handleDragOver(o, e); const s=(o) => this.handleDrop(o, e); return r.addEventListener('dragenter', n), r.addEventListener('dragover', i), r.addEventListener('drop', s), () => {
      r.removeEventListener('dragenter', n), r.removeEventListener('dragover', i), r.removeEventListener('drop', s);
    };
  }addEventListeners(e) {
    e.addEventListener&&(e.addEventListener('dragstart', this.handleTopDragStart), e.addEventListener('dragstart', this.handleTopDragStartCapture, !0), e.addEventListener('dragend', this.handleTopDragEndCapture, !0), e.addEventListener('dragenter', this.handleTopDragEnter), e.addEventListener('dragenter', this.handleTopDragEnterCapture, !0), e.addEventListener('dragleave', this.handleTopDragLeaveCapture, !0), e.addEventListener('dragover', this.handleTopDragOver), e.addEventListener('dragover', this.handleTopDragOverCapture, !0), e.addEventListener('drop', this.handleTopDrop), e.addEventListener('drop', this.handleTopDropCapture, !0));
  }removeEventListeners(e) {
    e.removeEventListener&&(e.removeEventListener('dragstart', this.handleTopDragStart), e.removeEventListener('dragstart', this.handleTopDragStartCapture, !0), e.removeEventListener('dragend', this.handleTopDragEndCapture, !0), e.removeEventListener('dragenter', this.handleTopDragEnter), e.removeEventListener('dragenter', this.handleTopDragEnterCapture, !0), e.removeEventListener('dragleave', this.handleTopDragLeaveCapture, !0), e.removeEventListener('dragover', this.handleTopDragOver), e.removeEventListener('dragover', this.handleTopDragOverCapture, !0), e.removeEventListener('drop', this.handleTopDrop), e.removeEventListener('drop', this.handleTopDropCapture, !0));
  }getCurrentSourceNodeOptions() {
    const e=this.monitor.getSourceId(); const r=this.sourceNodeOptions.get(e); return oe({ dropEffect: this.altKeyPressed?'copy':'move' }, r||{});
  }getCurrentDropEffect() {
    return this.isDraggingNativeItem()?'copy':this.getCurrentSourceNodeOptions().dropEffect;
  }getCurrentSourcePreviewNodeOptions() {
    const e=this.monitor.getSourceId(); const r=this.sourcePreviewNodeOptions.get(e); return oe({ anchorX: 0.5, anchorY: 0.5, captureDraggingState: !1 }, r||{});
  }isDraggingNativeItem() {
    const e=this.monitor.getItemType(); return Object.keys(ie).some((r) => ie[r]===e);
  }beginDragNativeItem(e, r) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource=Cr(e, r), this.currentNativeHandle=this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([this.currentNativeHandle]);
  }setCurrentDragSourceNode(e) {
    this.clearCurrentDragSourceNode(), this.currentDragSourceNode=e; const r=1e3; this.mouseMoveTimeoutTimer=setTimeout(() => {
      let n; return (n=this.rootElement)===null||n===void 0?void 0:n.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, !0);
    }, r);
  }clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      if (this.currentDragSourceNode=null, this.rootElement) {
        let e; (e=this.window)===null||e===void 0||e.clearTimeout(this.mouseMoveTimeoutTimer||void 0), this.rootElement.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, !0);
      } return this.mouseMoveTimeoutTimer=null, !0;
    } return !1;
  }handleDragStart(e, r) {
    e.defaultPrevented||(this.dragStartSourceIds||(this.dragStartSourceIds=[]), this.dragStartSourceIds.unshift(r));
  }handleDragEnter(e, r) {
    this.dragEnterTargetIds.unshift(r);
  }handleDragOver(e, r) {
    this.dragOverTargetIds===null&&(this.dragOverTargetIds=[]), this.dragOverTargetIds.unshift(r);
  }handleDrop(e, r) {
    this.dropTargetIds.unshift(r);
  }constructor(e, r, n) {
    this.sourcePreviewNodes=new Map(), this.sourcePreviewNodeOptions=new Map(), this.sourceNodes=new Map(), this.sourceNodeOptions=new Map(), this.dragStartSourceIds=null, this.dropTargetIds=[], this.dragEnterTargetIds=[], this.currentNativeSource=null, this.currentNativeHandle=null, this.currentDragSourceNode=null, this.altKeyPressed=!1, this.mouseMoveTimeoutTimer=null, this.asyncEndDragFrameId=null, this.dragOverTargetIds=null, this.lastClientOffset=null, this.hoverRafId=null, this.getSourceClientOffset=(i) => {
      const s=this.sourceNodes.get(i); return s&&Ce(s)||null;
    }, this.endDragNativeItem=() => {
      this.isDraggingNativeItem()&&(this.actions.endDrag(), this.currentNativeHandle&&this.registry.removeSource(this.currentNativeHandle), this.currentNativeHandle=null, this.currentNativeSource=null);
    }, this.isNodeInDocument=(i) => !!(i&&this.document&&this.document.body&&this.document.body.contains(i)), this.endDragIfSourceWasRemovedFromDOM=() => {
      const i=this.currentDragSourceNode; i==null||this.isNodeInDocument(i)||(this.clearCurrentDragSourceNode()&&this.monitor.isDragging()&&this.actions.endDrag(), this.cancelHover());
    }, this.scheduleHover=(i) => {
      this.hoverRafId===null&&typeof requestAnimationFrame<'u'&&(this.hoverRafId=requestAnimationFrame(() => {
        this.monitor.isDragging()&&this.actions.hover(i||[], { clientOffset: this.lastClientOffset }), this.hoverRafId=null;
      }));
    }, this.cancelHover=() => {
      this.hoverRafId!==null&&typeof cancelAnimationFrame<'u'&&(cancelAnimationFrame(this.hoverRafId), this.hoverRafId=null);
    }, this.handleTopDragStartCapture=() => {
      this.clearCurrentDragSourceNode(), this.dragStartSourceIds=[];
    }, this.handleTopDragStart=(i) => {
      if (i.defaultPrevented) {
        return;
      } const { dragStartSourceIds: s }=this; this.dragStartSourceIds=null; const o=w(i); this.monitor.isDragging()&&(this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(s||[], { publishSource: !1, getSourceClientOffset: this.getSourceClientOffset, clientOffset: o }); const { dataTransfer: a }=i; const d=j(a); if (this.monitor.isDragging()) {
        if (a&&typeof a.setDragImage=='function') {
          const f=this.monitor.getSourceId(); const p=this.sourceNodes.get(f); const h=this.sourcePreviewNodes.get(f)||p; if (h) {
            const { anchorX: u, anchorY: v, offsetX: m, offsetY: S }=this.getCurrentSourcePreviewNodeOptions(); const b=Nr(p, h, o, { anchorX: u, anchorY: v }, { offsetX: m, offsetY: S }); a.setDragImage(h, b.x, b.y);
          }
        } try {
          a?.setData('application/json', {});
        } catch {} this.setCurrentDragSourceNode(i.target); const { captureDraggingState: l }=this.getCurrentSourcePreviewNodeOptions(); l?this.actions.publishDragSource():setTimeout(() => this.actions.publishDragSource(), 0);
      } else if (d) {
        this.beginDragNativeItem(d);
      } else {
        if (a&&!a.types&&(i.target&&!i.target.hasAttribute||!i.target.hasAttribute('draggable'))) {
          return;
        } i.preventDefault();
      }
    }, this.handleTopDragEndCapture=() => {
      this.clearCurrentDragSourceNode()&&this.monitor.isDragging()&&this.actions.endDrag(), this.cancelHover();
    }, this.handleTopDragEnterCapture=(i) => {
      if (this.dragEnterTargetIds=[], this.isDraggingNativeItem()) {
        let s; (s=this.currentNativeSource)===null||s===void 0||s.loadDataTransfer(i.dataTransfer);
      } if (!this.enterLeaveCounter.enter(i.target)||this.monitor.isDragging()) {
        return;
      } const { dataTransfer: a }=i; const d=j(a); d&&this.beginDragNativeItem(d, a);
    }, this.handleTopDragEnter=(i) => {
      const { dragEnterTargetIds: s }=this; if (this.dragEnterTargetIds=[], !this.monitor.isDragging()) {
        return;
      } this.altKeyPressed=i.altKey, s.length>0&&this.actions.hover(s, { clientOffset: w(i) }), s.some((a) => this.monitor.canDropOnTarget(a))&&(i.preventDefault(), i.dataTransfer&&(i.dataTransfer.dropEffect=this.getCurrentDropEffect()));
    }, this.handleTopDragOverCapture=(i) => {
      if (this.dragOverTargetIds=[], this.isDraggingNativeItem()) {
        let s; (s=this.currentNativeSource)===null||s===void 0||s.loadDataTransfer(i.dataTransfer);
      }
    }, this.handleTopDragOver=(i) => {
      const { dragOverTargetIds: s }=this; if (this.dragOverTargetIds=[], !this.monitor.isDragging()) {
        i.preventDefault(), i.dataTransfer&&(i.dataTransfer.dropEffect='none'); return;
      } this.altKeyPressed=i.altKey, this.lastClientOffset=w(i), this.scheduleHover(s), (s||[]).some((a) => this.monitor.canDropOnTarget(a))?(i.preventDefault(), i.dataTransfer&&(i.dataTransfer.dropEffect=this.getCurrentDropEffect())):this.isDraggingNativeItem()?i.preventDefault():(i.preventDefault(), i.dataTransfer&&(i.dataTransfer.dropEffect='none'));
    }, this.handleTopDragLeaveCapture=(i) => {
      this.isDraggingNativeItem()&&i.preventDefault(), this.enterLeaveCounter.leave(i.target)&&(this.isDraggingNativeItem()&&setTimeout(() => this.endDragNativeItem(), 0), this.cancelHover());
    }, this.handleTopDropCapture=(i) => {
      if (this.dropTargetIds=[], this.isDraggingNativeItem()) {
        let s; i.preventDefault(), (s=this.currentNativeSource)===null||s===void 0||s.loadDataTransfer(i.dataTransfer);
      } else {
        j(i.dataTransfer)&&i.preventDefault();
      } this.enterLeaveCounter.reset();
    }, this.handleTopDrop=(i) => {
      const { dropTargetIds: s }=this; this.dropTargetIds=[], this.actions.hover(s, { clientOffset: w(i) }), this.actions.drop({ dropEffect: this.getCurrentDropEffect() }), this.isDraggingNativeItem()?this.endDragNativeItem():this.monitor.isDragging()&&this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart=(i) => {
      const s=i.target; typeof s.dragDrop=='function'&&(s.tagName==='INPUT'||s.tagName==='SELECT'||s.tagName==='TEXTAREA'||s.isContentEditable||(i.preventDefault(), s.dragDrop()));
    }, this.options=new Rr(r, n), this.actions=e.getActions(), this.monitor=e.getMonitor(), this.registry=e.getRegistry(), this.enterLeaveCounter=new yr(this.isNodeInDocument);
  }
} const Ur=function(e, r, n) {
  return new Mr(e, r, n);
}; export { Hr as D, Ur as H, Ar as a, jr as b, c as i, kr as u };
