const Ne = (...n) => {
}, de = (n) => n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), te = (n) => n !== null && n?.constructor.name === "Object", he = (n) => typeof n == "string", A = (n, l) => {
  let g = n;
  const D = l.split(".");
  for (const k of D) {
    if (!te(g) || !(k in g))
      return "";
    g = g[k];
  }
  return `${g}`;
}, K = (n = "") => n.normalize("NFD").replace(/\p{Diacritic}/gu, ""), _ = (n, l) => {
  if (!n.length) return [];
  if (te(n[0])) {
    for (const g of n)
      if (!A(g, l))
        throw new Error("e03");
    return n;
  }
  return n.map((g) => ({
    [l]: he(g) ? g : JSON.stringify(g)
  }));
}, pe = (n) => n.split(/\s+/), De = async function(n, l) {
  const g = await fetch(
    n,
    l || {
      method: "GET"
    }
  );
  return Oe(g);
}, Oe = async function(n) {
  const l = await n.text(), g = l && JSON.parse(l);
  return n.ok ? g : Promise.reject(g && g.message || n.statusText);
}, fe = {
  get: De
}, Fe = (n = {}) => {
  const { hasDiacritics: l, tokenizer: g } = n;
  let D = {};
  const k = "\0";
  function I(c = "") {
    return c = `${c}`.trim(), l && (c = K(c)), (g || pe)(c.toLowerCase());
  }
  function R(c, C = "", T) {
    if (!c) return;
    let y;
    c = Array.isArray(c) ? c : [c];
    const p = he(c[0]);
    for (const L of c) {
      const v = I(p ? L : A(L, C));
      for (const w of v) {
        if (!w) continue;
        y = D;
        for (const S of w)
          y = y[S] || (y[S] = {});
        const d = p ? L : T && T(L) || JSON.stringify(L), B = y[k] ?? (y[k] = {});
        B[d] = L;
      }
    }
  }
  function i(c) {
    let C = D, T = {};
    for (const p of c)
      if (C = C?.[p], typeof C > "u") return {};
    const y = [{ node: C, prefix: c }];
    for (; y.length; ) {
      const { node: p, prefix: L } = y.pop();
      for (const v in p)
        if (v === k) {
          const w = p[k];
          for (const d in w)
            T[d] = w[d];
        } else
          y.push({ node: p[v], prefix: L + v });
    }
    return T;
  }
  const q = (c, C) => {
    const T = {};
    for (const y in c)
      y in C && (T[y] = c[y]);
    return T;
  };
  function F(c, C) {
    const T = I(c), y = T.length <= 20 ? T.length : 20;
    let p = i(T[0]);
    for (let v = 1; v < y && (p = q(p, i(T[v])), !!Object.keys(p).length); v++)
      ;
    p = Object.values(p);
    const L = p.length;
    return C && L > C && (p.length = C), {
      suggestions: p,
      count: L
    };
  }
  function W() {
    D = {};
  }
  return {
    add: R,
    clear: W,
    search: F
  };
}, He = (n) => {
  if (!n.input) throw new Error("e01");
  if (!te(n.source)) throw new Error("e02");
  const l = document.createElement("div"), g = n.preventSubmit || !1, D = n.minLength || 1, k = n.hint !== !1, I = n.autoSelect || !1, R = n.tokenizer || pe, i = n.templates, q = Array.isArray(n.source.keys) ? n.source.keys : ["label"], F = n.source.groupKey || "", W = (e) => A(e, q[0]), c = n.display || W, C = n.source.identity || W, T = n.onSubmit || Ne, y = n.source.transform || ((e) => e), p = n.source.local || null, L = typeof n.source.remote?.url, v = L === "function" || L === "string" && n.source.remote.wildcard ? n.source.remote : null, w = n.source.prefetch?.url ? { when: "onInit", done: !1, ...n.source.prefetch } : null, d = {
    wrapper: "typeahead-standalone",
    input: "tt-input",
    hint: "tt-hint",
    highlight: "tt-highlight",
    hide: "tt-hide",
    show: "tt-show",
    list: "tt-list",
    selected: "tt-selected",
    header: "tt-header",
    footer: "tt-footer",
    loader: "tt-loader",
    suggestion: "tt-suggestion",
    group: "tt-group",
    empty: "tt-empty",
    notFound: "tt-notFound",
    ...n.classNames || {}
  };
  if (!p && !w && !v) throw new Error("e02");
  const B = Fe({ hasDiacritics: n.diacritics, tokenizer: R }), S = document.createElement("div");
  S.className = d.wrapper;
  const o = {
    query: "",
    hits: [],
    // suggestions
    count: 0,
    limit: n.limit || 5,
    wrapper: S
  };
  let j = {}, z = {}, f, Q, H = !1, P = "";
  i && (i.header = typeof i.header == "function" ? i.header : void 0, i.footer = typeof i.footer == "function" ? i.footer : void 0, i.notFound = typeof i.notFound == "function" ? i.notFound : void 0, i.group = typeof i.group == "function" ? i.group : void 0, i.suggestion = typeof i.suggestion == "function" ? i.suggestion : void 0, i.loader = typeof i.loader == "function" ? i.loader : void 0, i.empty = typeof i.empty == "function" ? i.empty : void 0);
  const M = (e = []) => {
    ee(_(e, q[0]));
  };
  p && M(p);
  const a = n.input;
  a.classList.add(d.input);
  const ne = window.getComputedStyle(a), V = a.parentNode, me = [...V.children].indexOf(a);
  V.removeChild(a), S.appendChild(a), V.insertBefore(S, V.children[me]);
  const J = a.cloneNode();
  k && ke(J), l.classList.add(d.list, d.hide), l.setAttribute("aria-label", "menu-options"), l.setAttribute("role", "listbox"), l.style.position = "absolute", l.style.width = `${a.offsetWidth}px`, l.style.marginTop = `${a.offsetHeight + parseInt(ne.marginTop)}px`, S.appendChild(l), w && w.when === "onInit" && oe();
  function oe() {
    if (!w || w.done) return;
    let e = [];
    fe.get(typeof w.url == "function" ? w.url() : w.url, w?.requestOptions).then(
      (t) => {
        e = y(t), e = _(e, q[0]), ee(e);
      },
      (t) => {
        console.error("e04", t);
      }
    ).finally(() => {
      typeof w.process == "function" && w.process(e);
    }), w.done = !0;
  }
  const U = () => {
    l.classList.remove(d.hide);
  }, ge = () => {
    l.classList.add(d.hide);
  }, ye = () => !l.classList.contains(d.hide), re = () => Q && clearTimeout(Q), N = () => {
    o.hits = [], J.value = "", P = "", ge();
  }, se = () => {
    a.dispatchEvent(
      new InputEvent("input", {
        bubbles: !0,
        inputType: "insertCompositionText",
        data: a.value
      })
    );
  }, X = (e = !1) => {
    if (!o.hits.length && o.query) {
      N(), Y();
      const t = i?.notFound?.(o);
      if (!t) return !0;
      const r = (h) => {
        const m = document.createElement("div");
        m.classList.add(d.notFound), O(m, h), l.appendChild(m);
      };
      return v ? (j[JSON.stringify(o.query)] || e && !H) && r(t) : r(t), U(), !0;
    }
  }, Y = () => {
    for (; l.firstChild; )
      l.firstChild.remove();
  }, ie = () => {
    if (!i?.loader)
      return;
    if (!H) {
      const t = l.querySelector(`.${d.loader}`);
      t && l.removeChild(t);
      return;
    }
    const e = document.createElement("div");
    e.classList.add(d.loader), O(e, i.loader()), i?.footer ? l.insertBefore(e, l.querySelector(`.${d.footer}`)) : l.appendChild(e);
  }, G = () => {
    if (X()) return;
    Y();
    const e = (u) => {
      const s = document.createElement("div");
      return s.classList.add(d.suggestion), s.setAttribute("role", "option"), s.setAttribute("aria-selected", "false"), s.setAttribute("aria-label", c(u)), i?.suggestion ? O(s, i.suggestion(u, o)) : s.textContent = A(u, q[0]), s;
    }, t = (u) => {
      const s = document.createElement("div");
      return s.classList.add(d.group), s.setAttribute("role", "group"), s.setAttribute("aria-label", u), i?.group ? O(s, i.group(u, o)) : s.textContent = u || "", s;
    }, r = document.createDocumentFragment(), h = [];
    if (i?.header) {
      const u = document.createElement("div");
      u.classList.add(d.header), u.setAttribute("role", "presentation"), O(u, i.header(o)) && r.appendChild(u);
    }
    for (const [u, s] of o.hits.entries()) {
      if (u === o.limit) break;
      const b = A(s, F);
      if (b && !h.includes(b)) {
        h.push(b);
        const x = t(b);
        r.appendChild(x);
      }
      const E = e(s);
      E.addEventListener("click", (x) => {
        N(), f = s, a.value = c(s, x), se();
      }), s === f && (E.classList.add(d.selected), E.setAttribute("aria-selected", "true")), r.appendChild(E), n.highlight !== !1 && Le(E, o.query);
    }
    if (i?.footer) {
      const u = document.createElement("div");
      u.classList.add(d.footer), u.setAttribute("role", "presentation"), O(u, i.footer(o)) && r.appendChild(u);
    }
    l.appendChild(r), k && qe(f || o.hits[0]), ((u) => {
      if (u === null) return;
      const s = u.getBoundingClientRect(), b = s.top < 0, E = s.bottom > (window.innerHeight || document.documentElement.clientHeight), x = s.left < 0, $ = s.right > (window.innerWidth || document.documentElement.clientWidth);
      b ? window.scrollBy({ top: s.top - 10, behavior: "smooth" }) : E && window.scrollBy({
        top: s.bottom - (window.innerHeight || document.documentElement.clientHeight) + 10,
        behavior: "smooth"
      }), x ? window.scrollBy({ left: s.left - 10, behavior: "smooth" }) : $ && window.scrollBy({
        left: s.right - (window.innerWidth || document.documentElement.clientWidth) + 10,
        behavior: "smooth"
      });
    })(l.querySelector(`.${d.selected}`)), U();
  }, we = (e) => {
    typeof e.inputType > "u" || e.inputType === "insertCompositionText" && !e.isComposing || (P = a.value, le());
  }, ve = (e) => {
    const t = o.hits.length >= o.limit ? o.limit : o.hits.length;
    if (f === o.hits[0]) {
      f = void 0, a.value = P;
      return;
    }
    if (!f)
      f = o.hits[t - 1];
    else
      for (let r = t - 1; r > 0; r--)
        if (f === o.hits[r] || r === 1) {
          f = o.hits[r - 1];
          break;
        }
    a.value = c(f, e);
  }, be = (e) => {
    const t = o.hits.length >= o.limit ? o.limit : o.hits.length;
    if (!f) {
      f = o.hits[0], a.value = c(f, e);
      return;
    }
    if (f === o.hits[t - 1]) {
      f = void 0, a.value = P;
      return;
    }
    for (let r = 0; r < t - 1; r++)
      if (f === o.hits[r]) {
        f = o.hits[r + 1];
        break;
      }
    a.value = c(f, e);
  }, Ee = (e) => {
    if (e.key === "Escape" || !a.value.length && !o.hits.length)
      return N();
    if (o.hits.length && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.key === "ArrowDown" ? be(e) : ve(e), G(), e.preventDefault(), e.stopPropagation();
      return;
    }
    const t = function(r = !1) {
      if (!f && r && o.hits.length && (f = o.hits[0]), f)
        return N(), a.value = c(f, e), se(), f;
    };
    if (e.key === "Enter") {
      g && e.preventDefault(), T(e, t());
      return;
    }
    e.key === "Tab" && ye() && t(!0);
  }, xe = () => {
    w?.when === "onFocus" && oe(), le();
  }, le = () => {
    re();
    const e = a.value.replace(/\s{2,}/g, " ").trim();
    if (i?.empty && !e.length) {
      const t = i.empty(o);
      if (o.query = "", Array.isArray(t) && t.length)
        return o.hits = _(t, q[0]), G();
      if (N(), Y(), t) {
        const r = document.createElement("div");
        r.classList.add(d.empty), O(r, `${t}`), l.appendChild(r);
      }
      return U();
    }
    if (e.length >= D) {
      o.query = e, Z();
      const t = JSON.stringify(o.query);
      v && o.hits.length < o.limit && z[t]?.length && Z(z[t]), G(), Q = setTimeout(() => {
        o.hits.length < o.limit && !H && ae();
      }, v?.debounce || 200);
    } else
      o.query = "", N();
  }, ce = (e = "") => (n.diacritics && (e = K(e)), e.toLowerCase()), Z = (e) => {
    let { suggestions: t, count: r } = B.search(o.query, o.limit);
    if (e?.length) {
      e.push(...t);
      const h = {};
      for (const m of e)
        h[C(m)] = m;
      t = Object.values(h), r = t.length;
    }
    Ce(t), F && Te(t), o.hits = t, o.count = r, f = void 0, I && o.hits.length && (f = o.hits[0]);
  }, ae = () => {
    if (!v) return;
    H = !0;
    const e = o.query, t = JSON.stringify(e);
    if (j[t] || !o.query.length) {
      H = !1, X(!0);
      return;
    }
    ie();
    let r = [];
    fe.get(
      typeof v.url == "function" ? v.url(e) : v.url.replace(v.wildcard, e),
      v.requestOptions
    ).then(
      (h) => {
        r = y(h), r = _(r, q[0]), ee(r);
      },
      (h) => {
        console.error("e05", h);
      }
    ).finally(() => {
      j[t] = !0, z[t] = r || [], H = !1, ie(), r.length && o.query.length && (Z(r), G()), o.query.length && e !== o.query && ae(), X(!0);
    });
  };
  function ee(e) {
    if (e.length)
      for (const t of q)
        B.add(e, t, C);
  }
  const Ce = (e) => {
    const t = o.query.toLowerCase();
    e.sort((r, h) => {
      const m = A(r, q[0]).toLowerCase(), u = A(h, q[0]).toLowerCase(), s = m.startsWith(t), b = u.startsWith(t);
      return s && b ? m.length - u.length : s ? -1 : b ? 1 : 0;
    });
  }, Te = (e) => {
    e.sort((t, r) => {
      const h = A(t, F), m = A(r, F);
      return !h && !m ? 0 : h ? m ? h < m ? -1 : h > m ? 1 : 0 : 1 : -1;
    });
  }, Le = (e, t) => {
    if (!t) return;
    const h = ((s) => {
      const b = R(s.trim()).map((E) => de(E)).sort((E, x) => x.length - E.length);
      return new RegExp(`(${b.join("|")})`, "i");
    })(t), m = (s) => {
      let b = h.exec(s.data);
      if (n.diacritics && !b && (b = h.exec(K(s.data))), b) {
        const E = document.createElement("span");
        E.className = d.highlight;
        const x = s.splitText(b.index);
        return x.splitText(b[0].length), E.appendChild(x.cloneNode(!0)), s.parentNode?.replaceChild(E, x), !0;
      }
      return !1;
    }, u = (s, b) => {
      let x;
      for (let $ = 0; $ < s.childNodes.length; $++)
        x = s.childNodes[$], x.nodeType === 3 ? $ += b(x) ? 1 : 0 : u(x, b);
    };
    u(e, m);
  };
  function ke(e) {
    ["id", "name", "placeholder", "required", "aria-label"].forEach((t) => e.removeAttribute(t)), e.setAttribute("readonly", "true"), e.setAttribute("aria-hidden", "true"), e.style.marginTop = `-${a.offsetHeight + parseInt(ne.marginBottom)}px`, e.tabIndex = -1, e.className = d.hint, a.after(e);
  }
  const qe = (e) => {
    const t = a.value;
    if (!t || c(e) === t || // if input string is exactly the same as selectedItem
    ce(c(e)).indexOf(
      ce(t).replace(/\s{2,}/g, " ").trimStart()
    ) !== 0)
      J.value = "";
    else {
      const r = c(e), h = new RegExp(de(o.query), "i");
      let m = h.exec(r);
      n.diacritics && !m && (m = h.exec(K(r))), m && (J.value = t.replace(/\s?$/, "") + r.substring(m[0].length));
    }
  }, O = (e, t) => {
    const r = document.createElement("template");
    return r.innerHTML = t, e.appendChild(r.content), t;
  }, Se = () => {
    setTimeout(() => {
      document.activeElement !== a && N();
    }, 50);
  };
  l.addEventListener("mousedown", function(e) {
    e.stopPropagation(), e.preventDefault();
  });
  const ue = (e) => {
    N(), B.clear(), p && !e && M(p), j = {}, z = {}, w && (w.done = !1);
  }, Ae = () => {
    re(), ue(), S.replaceWith(a.cloneNode());
  };
  return a.addEventListener("keydown", Ee), a.addEventListener("input", we), a.addEventListener("blur", Se), a.addEventListener("focus", xe), {
    addToIndex: M,
    reset: ue,
    destroy: Ae
    // trie, // trie exposed only for local tests
  };
};
export {
  He as default
};
