function ls(i, t) {
  return i < t ? -1 : i > t ? 1 : i >= t ? 0 : NaN;
}
function us(i) {
  let t = i, e = i;
  function s(n, h, a, r) {
    for (a == null && (a = 0), r == null && (r = n.length); a < r; ) {
      const o = a + r >>> 1;
      e(n[o], h) < 0 ? a = o + 1 : r = o;
    }
    return a;
  }
  return i.length === 1 && (t = (n, h) => i(n) - h, e = function(n) {
    return (h, a) => ls(n(h), a);
  }(i)), { left: s, center: function(n, h, a, r) {
    a == null && (a = 0), r == null && (r = n.length);
    const o = s(n, h, a, r - 1);
    return o > a && t(n[o - 1], h) > -t(n[o], h) ? o - 1 : o;
  }, right: function(n, h, a, r) {
    for (a == null && (a = 0), r == null && (r = n.length); a < r; ) {
      const o = a + r >>> 1;
      e(n[o], h) > 0 ? r = o : a = o + 1;
    }
    return a;
  } };
}
const Js = us(ls).right;
us(function(i) {
  return i === null ? NaN : +i;
}).center;
const cs = Js;
function et(i, t) {
  let e, s;
  if (t === void 0)
    for (const n of i)
      n != null && (e === void 0 ? n >= n && (e = s = n) : (e > n && (e = n), s < n && (s = n)));
  else {
    let n = -1;
    for (let h of i)
      (h = t(h, ++n, i)) != null && (e === void 0 ? h >= h && (e = s = h) : (e > h && (e = h), s < h && (s = h)));
  }
  return [e, s];
}
var Yi = Math.sqrt(50), Vi = Math.sqrt(10), Ti = Math.sqrt(2);
function xe(i, t, e) {
  var s = (t - i) / Math.max(0, e), n = Math.floor(Math.log(s) / Math.LN10), h = s / Math.pow(10, n);
  return n >= 0 ? (h >= Yi ? 10 : h >= Vi ? 5 : h >= Ti ? 2 : 1) * Math.pow(10, n) : -Math.pow(10, -n) / (h >= Yi ? 10 : h >= Vi ? 5 : h >= Ti ? 2 : 1);
}
function q(i, t) {
  let e;
  if (t === void 0)
    for (const s of i)
      s != null && (e < s || e === void 0 && s >= s) && (e = s);
  else {
    let s = -1;
    for (let n of i)
      (n = t(n, ++s, i)) != null && (e < n || e === void 0 && n >= n) && (e = n);
  }
  return e;
}
function ut(i, t) {
  let e;
  if (t === void 0)
    for (const s of i)
      s != null && (e > s || e === void 0 && s >= s) && (e = s);
  else {
    let s = -1;
    for (let n of i)
      (n = t(n, ++s, i)) != null && (e > n || e === void 0 && n >= n) && (e = n);
  }
  return e;
}
function ds(i, t, e) {
  i = +i, t = +t, e = (n = arguments.length) < 2 ? (t = i, i = 0, 1) : n < 3 ? 1 : +e;
  for (var s = -1, n = 0 | Math.max(0, Math.ceil((t - i) / e)), h = new Array(n); ++s < n; )
    h[s] = i + s * e;
  return h;
}
var wi = Array.prototype.slice;
function _s(i) {
  return i;
}
var Mi = 1, Pi = 2, Di = 3, Ct = 4, ve = 1e-6;
function $s(i) {
  return "translate(" + (i + 0.5) + ",0)";
}
function tn(i) {
  return "translate(0," + (i + 0.5) + ")";
}
function en(i) {
  return function(t) {
    return +i(t);
  };
}
function sn(i) {
  var t = Math.max(0, i.bandwidth() - 1) / 2;
  return i.round() && (t = Math.round(t)), function(e) {
    return +i(e) + t;
  };
}
function nn() {
  return !this.__axis;
}
function gs(i, t) {
  var e = [], s = null, n = null, h = 6, a = 6, r = 3, o = i === Mi || i === Ct ? -1 : 1, l = i === Ct || i === Pi ? "x" : "y", u = i === Mi || i === Di ? $s : tn;
  function c(d) {
    var g = s ?? (t.ticks ? t.ticks.apply(t, e) : t.domain()), p = n ?? (t.tickFormat ? t.tickFormat.apply(t, e) : _s), f = Math.max(h, 0) + r, A = t.range(), m = +A[0] + 0.5, y = +A[A.length - 1] + 0.5, b = (t.bandwidth ? sn : en)(t.copy()), k = d.selection ? d.selection() : d, w = k.selectAll(".domain").data([null]), v = k.selectAll(".tick").data(g, t).order(), M = v.exit(), j = v.enter().append("g").attr("class", "tick"), O = v.select("line"), z = v.select("text");
    w = w.merge(w.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), v = v.merge(j), O = O.merge(j.append("line").attr("stroke", "currentColor").attr(l + "2", o * h)), z = z.merge(j.append("text").attr("fill", "currentColor").attr(l, o * f).attr("dy", i === Mi ? "0em" : i === Di ? "0.71em" : "0.32em")), d !== k && (w = w.transition(d), v = v.transition(d), O = O.transition(d), z = z.transition(d), M = M.transition(d).attr("opacity", ve).attr("transform", function(F) {
      return isFinite(F = b(F)) ? u(F) : this.getAttribute("transform");
    }), j.attr("opacity", ve).attr("transform", function(F) {
      var S = this.parentNode.__axis;
      return u(S && isFinite(S = S(F)) ? S : b(F));
    })), M.remove(), w.attr("d", i === Ct || i == Pi ? a ? "M" + o * a + "," + m + "H0.5V" + y + "H" + o * a : "M0.5," + m + "V" + y : a ? "M" + m + "," + o * a + "V0.5H" + y + "V" + o * a : "M" + m + ",0.5H" + y), v.attr("opacity", 1).attr("transform", function(F) {
      return u(b(F));
    }), O.attr(l + "2", o * h), z.attr(l, o * f).text(p), k.filter(nn).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", i === Pi ? "start" : i === Ct ? "end" : "middle"), k.each(function() {
      this.__axis = b;
    });
  }
  return c.scale = function(d) {
    return arguments.length ? (t = d, c) : t;
  }, c.ticks = function() {
    return e = wi.call(arguments), c;
  }, c.tickArguments = function(d) {
    return arguments.length ? (e = d == null ? [] : wi.call(d), c) : e.slice();
  }, c.tickValues = function(d) {
    return arguments.length ? (s = d == null ? null : wi.call(d), c) : s && s.slice();
  }, c.tickFormat = function(d) {
    return arguments.length ? (n = d, c) : n;
  }, c.tickSize = function(d) {
    return arguments.length ? (h = a = +d, c) : h;
  }, c.tickSizeInner = function(d) {
    return arguments.length ? (h = +d, c) : h;
  }, c.tickSizeOuter = function(d) {
    return arguments.length ? (a = +d, c) : a;
  }, c.tickPadding = function(d) {
    return arguments.length ? (r = +d, c) : r;
  }, c;
}
function Dt(i) {
  return gs(Di, i);
}
function qt(i) {
  return gs(Ct, i);
}
var be = {}, Ri = {};
function ke(i) {
  return new Function("d", "return {" + i.map(function(t, e) {
    return JSON.stringify(t) + ": d[" + e + '] || ""';
  }).join(",") + "}");
}
function Se(i) {
  var t = /* @__PURE__ */ Object.create(null), e = [];
  return i.forEach(function(s) {
    for (var n in s)
      n in t || e.push(t[n] = n);
  }), e;
}
function H(i, t) {
  var e = i + "", s = e.length;
  return s < t ? new Array(t - s + 1).join(0) + e : e;
}
function rn(i) {
  var t, e = i.getUTCHours(), s = i.getUTCMinutes(), n = i.getUTCSeconds(), h = i.getUTCMilliseconds();
  return isNaN(i) ? "Invalid Date" : ((t = i.getUTCFullYear()) < 0 ? "-" + H(-t, 6) : t > 9999 ? "+" + H(t, 6) : H(t, 4)) + "-" + H(i.getUTCMonth() + 1, 2) + "-" + H(i.getUTCDate(), 2) + (h ? "T" + H(e, 2) + ":" + H(s, 2) + ":" + H(n, 2) + "." + H(h, 3) + "Z" : n ? "T" + H(e, 2) + ":" + H(s, 2) + ":" + H(n, 2) + "Z" : s || e ? "T" + H(e, 2) + ":" + H(s, 2) + "Z" : "");
}
function fs(i) {
  var t = new RegExp('["' + i + `
\r]`), e = i.charCodeAt(0);
  function s(r, o) {
    var l, u = [], c = r.length, d = 0, g = 0, p = c <= 0, f = !1;
    function A() {
      if (p)
        return Ri;
      if (f)
        return f = !1, be;
      var y, b, k = d;
      if (r.charCodeAt(k) === 34) {
        for (; d++ < c && r.charCodeAt(d) !== 34 || r.charCodeAt(++d) === 34; )
          ;
        return (y = d) >= c ? p = !0 : (b = r.charCodeAt(d++)) === 10 ? f = !0 : b === 13 && (f = !0, r.charCodeAt(d) === 10 && ++d), r.slice(k + 1, y - 1).replace(/""/g, '"');
      }
      for (; d < c; ) {
        if ((b = r.charCodeAt(y = d++)) === 10)
          f = !0;
        else if (b === 13)
          f = !0, r.charCodeAt(d) === 10 && ++d;
        else if (b !== e)
          continue;
        return r.slice(k, y);
      }
      return p = !0, r.slice(k, c);
    }
    for (r.charCodeAt(c - 1) === 10 && --c, r.charCodeAt(c - 1) === 13 && --c; (l = A()) !== Ri; ) {
      for (var m = []; l !== be && l !== Ri; )
        m.push(l), l = A();
      o && (m = o(m, g++)) == null || u.push(m);
    }
    return u;
  }
  function n(r, o) {
    return r.map(function(l) {
      return o.map(function(u) {
        return a(l[u]);
      }).join(i);
    });
  }
  function h(r) {
    return r.map(a).join(i);
  }
  function a(r) {
    return r == null ? "" : r instanceof Date ? rn(r) : t.test(r += "") ? '"' + r.replace(/"/g, '""') + '"' : r;
  }
  return { parse: function(r, o) {
    var l, u, c = s(r, function(d, g) {
      if (l)
        return l(d, g - 1);
      u = d, l = o ? function(p, f) {
        var A = ke(p);
        return function(m, y) {
          return f(A(m), y, p);
        };
      }(d, o) : ke(d);
    });
    return c.columns = u || [], c;
  }, parseRows: s, format: function(r, o) {
    return o == null && (o = Se(r)), [o.map(a).join(i)].concat(n(r, o)).join(`
`);
  }, formatBody: function(r, o) {
    return o == null && (o = Se(r)), n(r, o).join(`
`);
  }, formatRows: function(r) {
    return r.map(h).join(`
`);
  }, formatRow: h, formatValue: a };
}
var hn = fs(",").parse, an = fs("	").parse;
function on(i) {
  if (!i.ok)
    throw new Error(i.status + " " + i.statusText);
  return i.text();
}
function ps(i) {
  return function(t, e, s) {
    return arguments.length === 2 && typeof e == "function" && (s = e, e = void 0), function(n, h) {
      return fetch(n, h).then(on);
    }(t, e).then(function(n) {
      return i(n, s);
    });
  };
}
var xt = ps(hn), vt = ps(an);
function ln(i) {
  if (!i.ok)
    throw new Error(i.status + " " + i.statusText);
  if (i.status !== 204 && i.status !== 205)
    return i.json();
}
function ms(i, t) {
  return fetch(i, t).then(ln);
}
function ri(i, t) {
  if ((e = (i = t ? i.toExponential(t - 1) : i.toExponential()).indexOf("e")) < 0)
    return null;
  var e, s = i.slice(0, e);
  return [s.length > 1 ? s[0] + s.slice(2) : s, +i.slice(e + 1)];
}
function St(i) {
  return (i = ri(Math.abs(i))) ? i[1] : NaN;
}
var As, un = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function hi(i) {
  if (!(t = un.exec(i)))
    throw new Error("invalid format: " + i);
  var t;
  return new qi({ fill: t[1], align: t[2], sign: t[3], symbol: t[4], zero: t[5], width: t[6], comma: t[7], precision: t[8] && t[8].slice(1), trim: t[9], type: t[10] });
}
function qi(i) {
  this.fill = i.fill === void 0 ? " " : i.fill + "", this.align = i.align === void 0 ? ">" : i.align + "", this.sign = i.sign === void 0 ? "-" : i.sign + "", this.symbol = i.symbol === void 0 ? "" : i.symbol + "", this.zero = !!i.zero, this.width = i.width === void 0 ? void 0 : +i.width, this.comma = !!i.comma, this.precision = i.precision === void 0 ? void 0 : +i.precision, this.trim = !!i.trim, this.type = i.type === void 0 ? "" : i.type + "";
}
function we(i, t) {
  var e = ri(i, t);
  if (!e)
    return i + "";
  var s = e[0], n = e[1];
  return n < 0 ? "0." + new Array(-n).join("0") + s : s.length > n + 1 ? s.slice(0, n + 1) + "." + s.slice(n + 1) : s + new Array(n - s.length + 2).join("0");
}
hi.prototype = qi.prototype, qi.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type;
};
const Me = { "%": function(i, t) {
  return (100 * i).toFixed(t);
}, b: function(i) {
  return Math.round(i).toString(2);
}, c: function(i) {
  return i + "";
}, d: function(i) {
  return Math.abs(i = Math.round(i)) >= 1e21 ? i.toLocaleString("en").replace(/,/g, "") : i.toString(10);
}, e: function(i, t) {
  return i.toExponential(t);
}, f: function(i, t) {
  return i.toFixed(t);
}, g: function(i, t) {
  return i.toPrecision(t);
}, o: function(i) {
  return Math.round(i).toString(8);
}, p: function(i, t) {
  return we(100 * i, t);
}, r: we, s: function(i, t) {
  var e = ri(i, t);
  if (!e)
    return i + "";
  var s = e[0], n = e[1], h = n - (As = 3 * Math.max(-8, Math.min(8, Math.floor(n / 3)))) + 1, a = s.length;
  return h === a ? s : h > a ? s + new Array(h - a + 1).join("0") : h > 0 ? s.slice(0, h) + "." + s.slice(h) : "0." + new Array(1 - h).join("0") + ri(i, Math.max(0, t + h - 1))[0];
}, X: function(i) {
  return Math.round(i).toString(16).toUpperCase();
}, x: function(i) {
  return Math.round(i).toString(16);
} };
function Pe(i) {
  return i;
}
var zi, ht, ys, Re = Array.prototype.map, ze = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function cn(i) {
  var t, e, s = i.grouping === void 0 || i.thousands === void 0 ? Pe : (t = Re.call(i.grouping, Number), e = i.thousands + "", function(d, g) {
    for (var p = d.length, f = [], A = 0, m = t[0], y = 0; p > 0 && m > 0 && (y + m + 1 > g && (m = Math.max(1, g - y)), f.push(d.substring(p -= m, p + m)), !((y += m + 1) > g)); )
      m = t[A = (A + 1) % t.length];
    return f.reverse().join(e);
  }), n = i.currency === void 0 ? "" : i.currency[0] + "", h = i.currency === void 0 ? "" : i.currency[1] + "", a = i.decimal === void 0 ? "." : i.decimal + "", r = i.numerals === void 0 ? Pe : function(d) {
    return function(g) {
      return g.replace(/[0-9]/g, function(p) {
        return d[+p];
      });
    };
  }(Re.call(i.numerals, String)), o = i.percent === void 0 ? "%" : i.percent + "", l = i.minus === void 0 ? "-" : i.minus + "", u = i.nan === void 0 ? "NaN" : i.nan + "";
  function c(d) {
    var g = (d = hi(d)).fill, p = d.align, f = d.sign, A = d.symbol, m = d.zero, y = d.width, b = d.comma, k = d.precision, w = d.trim, v = d.type;
    v === "n" ? (b = !0, v = "g") : Me[v] || (k === void 0 && (k = 12), w = !0, v = "g"), (m || g === "0" && p === "=") && (m = !0, g = "0", p = "=");
    var M = A === "$" ? n : A === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "", j = A === "$" ? h : /[%p]/.test(v) ? o : "", O = Me[v], z = /[defgprs%]/.test(v);
    function F(S) {
      var W, C, I, E = M, G = j;
      if (v === "c")
        G = O(S) + G, S = "";
      else {
        var J = (S = +S) < 0 || 1 / S < 0;
        if (S = isNaN(S) ? u : O(Math.abs(S), k), w && (S = function($) {
          t:
            for (var lt, zt = $.length, tt = 1, it = -1; tt < zt; ++tt)
              switch ($[tt]) {
                case ".":
                  it = lt = tt;
                  break;
                case "0":
                  it === 0 && (it = tt), lt = tt;
                  break;
                default:
                  if (!+$[tt])
                    break t;
                  it > 0 && (it = 0);
              }
          return it > 0 ? $.slice(0, it) + $.slice(lt + 1) : $;
        }(S)), J && +S == 0 && f !== "+" && (J = !1), E = (J ? f === "(" ? f : l : f === "-" || f === "(" ? "" : f) + E, G = (v === "s" ? ze[8 + As / 3] : "") + G + (J && f === "(" ? ")" : ""), z) {
          for (W = -1, C = S.length; ++W < C; )
            if (48 > (I = S.charCodeAt(W)) || I > 57) {
              G = (I === 46 ? a + S.slice(W + 1) : S.slice(W)) + G, S = S.slice(0, W);
              break;
            }
        }
      }
      b && !m && (S = s(S, 1 / 0));
      var _ = E.length + S.length + G.length, L = _ < y ? new Array(y - _ + 1).join(g) : "";
      switch (b && m && (S = s(L + S, L.length ? y - G.length : 1 / 0), L = ""), p) {
        case "<":
          S = E + S + G + L;
          break;
        case "=":
          S = E + L + S + G;
          break;
        case "^":
          S = L.slice(0, _ = L.length >> 1) + E + S + G + L.slice(_);
          break;
        default:
          S = L + E + S + G;
      }
      return r(S);
    }
    return k = k === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k)), F.toString = function() {
      return d + "";
    }, F;
  }
  return { format: c, formatPrefix: function(d, g) {
    var p = c(((d = hi(d)).type = "f", d)), f = 3 * Math.max(-8, Math.min(8, Math.floor(St(g) / 3))), A = Math.pow(10, -f), m = ze[8 + f / 3];
    return function(y) {
      return p(A * y) + m;
    };
  } };
}
function se(i, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(i);
      break;
    default:
      this.range(t).domain(i);
  }
  return this;
}
zi = cn({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""], minus: "-" }), ht = zi.format, ys = zi.formatPrefix;
const Fe = Symbol("implicit");
function Ai() {
  var i = /* @__PURE__ */ new Map(), t = [], e = [], s = Fe;
  function n(h) {
    var a = h + "", r = i.get(a);
    if (!r) {
      if (s !== Fe)
        return s;
      i.set(a, r = t.push(h));
    }
    return e[(r - 1) % e.length];
  }
  return n.domain = function(h) {
    if (!arguments.length)
      return t.slice();
    t = [], i = /* @__PURE__ */ new Map();
    for (const a of h) {
      const r = a + "";
      i.has(r) || i.set(r, t.push(a));
    }
    return n;
  }, n.range = function(h) {
    return arguments.length ? (e = Array.from(h), n) : e.slice();
  }, n.unknown = function(h) {
    return arguments.length ? (s = h, n) : s;
  }, n.copy = function() {
    return Ai(t, e).unknown(s);
  }, se.apply(n, arguments), n;
}
function Ht() {
  var i, t, e = Ai().unknown(void 0), s = e.domain, n = e.range, h = 0, a = 1, r = !1, o = 0, l = 0, u = 0.5;
  function c() {
    var d = s().length, g = a < h, p = g ? a : h, f = g ? h : a;
    i = (f - p) / Math.max(1, d - o + 2 * l), r && (i = Math.floor(i)), p += (f - p - i * (d - o)) * u, t = i * (1 - o), r && (p = Math.round(p), t = Math.round(t));
    var A = ds(d).map(function(m) {
      return p + i * m;
    });
    return n(g ? A.reverse() : A);
  }
  return delete e.unknown, e.domain = function(d) {
    return arguments.length ? (s(d), c()) : s();
  }, e.range = function(d) {
    return arguments.length ? ([h, a] = d, h = +h, a = +a, c()) : [h, a];
  }, e.rangeRound = function(d) {
    return [h, a] = d, h = +h, a = +a, r = !0, c();
  }, e.bandwidth = function() {
    return t;
  }, e.step = function() {
    return i;
  }, e.round = function(d) {
    return arguments.length ? (r = !!d, c()) : r;
  }, e.padding = function(d) {
    return arguments.length ? (o = Math.min(1, l = +d), c()) : o;
  }, e.paddingInner = function(d) {
    return arguments.length ? (o = Math.min(1, d), c()) : o;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (l = +d, c()) : l;
  }, e.align = function(d) {
    return arguments.length ? (u = Math.max(0, Math.min(1, d)), c()) : u;
  }, e.copy = function() {
    return Ht(s(), [h, a]).round(r).paddingInner(o).paddingOuter(l).align(u);
  }, se.apply(c(), arguments);
}
function xs(i) {
  var t = i.copy;
  return i.padding = i.paddingOuter, delete i.paddingInner, delete i.paddingOuter, i.copy = function() {
    return xs(t());
  }, i;
}
function We() {
  return xs(Ht.apply(null, arguments).paddingInner(1));
}
function Fi(i, t, e) {
  i.prototype = t.prototype = e, e.constructor = i;
}
function je(i, t) {
  var e = Object.create(i.prototype);
  for (var s in t)
    e[s] = t[s];
  return e;
}
function Lt() {
}
var Et = 0.7, Xt = 1 / Et, Rt = "\\s*([+-]?\\d+)\\s*", Yt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", rt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", dn = /^#([0-9a-f]{3,8})$/, gn = new RegExp("^rgb\\(" + [Rt, Rt, Rt] + "\\)$"), fn = new RegExp("^rgb\\(" + [rt, rt, rt] + "\\)$"), pn = new RegExp("^rgba\\(" + [Rt, Rt, Rt, Yt] + "\\)$"), mn = new RegExp("^rgba\\(" + [rt, rt, rt, Yt] + "\\)$"), An = new RegExp("^hsl\\(" + [Yt, rt, rt] + "\\)$"), yn = new RegExp("^hsla\\(" + [Yt, rt, rt, Yt] + "\\)$"), Oe = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
function Ce() {
  return this.rgb().formatHex();
}
function Ee() {
  return this.rgb().formatRgb();
}
function Vt(i) {
  var t, e;
  return i = (i + "").trim().toLowerCase(), (t = dn.exec(i)) ? (e = t[1].length, t = parseInt(t[1], 16), e === 6 ? Ie(t) : e === 3 ? new U(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, (15 & t) << 4 | 15 & t, 1) : e === 8 ? Kt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : e === 4 ? Kt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = gn.exec(i)) ? new U(t[1], t[2], t[3], 1) : (t = fn.exec(i)) ? new U(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, 1) : (t = pn.exec(i)) ? Kt(t[1], t[2], t[3], t[4]) : (t = mn.exec(i)) ? Kt(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = An.exec(i)) ? Ze(t[1], t[2] / 100, t[3] / 100, 1) : (t = yn.exec(i)) ? Ze(t[1], t[2] / 100, t[3] / 100, t[4]) : Oe.hasOwnProperty(i) ? Ie(Oe[i]) : i === "transparent" ? new U(NaN, NaN, NaN, 0) : null;
}
function Ie(i) {
  return new U(i >> 16 & 255, i >> 8 & 255, 255 & i, 1);
}
function Kt(i, t, e, s) {
  return s <= 0 && (i = t = e = NaN), new U(i, t, e, s);
}
function Hi(i, t, e, s) {
  return arguments.length === 1 ? function(n) {
    return n instanceof Lt || (n = Vt(n)), n ? new U((n = n.rgb()).r, n.g, n.b, n.opacity) : new U();
  }(i) : new U(i, t, e, s ?? 1);
}
function U(i, t, e, s) {
  this.r = +i, this.g = +t, this.b = +e, this.opacity = +s;
}
function Ge() {
  return "#" + Wi(this.r) + Wi(this.g) + Wi(this.b);
}
function Le() {
  var i = this.opacity;
  return ((i = isNaN(i) ? 1 : Math.max(0, Math.min(1, i))) === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (i === 1 ? ")" : ", " + i + ")");
}
function Wi(i) {
  return ((i = Math.max(0, Math.min(255, Math.round(i) || 0))) < 16 ? "0" : "") + i.toString(16);
}
function Ze(i, t, e, s) {
  return s <= 0 ? i = t = e = NaN : e <= 0 || e >= 1 ? i = t = NaN : t <= 0 && (i = NaN), new nt(i, t, e, s);
}
function Be(i) {
  if (i instanceof nt)
    return new nt(i.h, i.s, i.l, i.opacity);
  if (i instanceof Lt || (i = Vt(i)), !i)
    return new nt();
  if (i instanceof nt)
    return i;
  var t = (i = i.rgb()).r / 255, e = i.g / 255, s = i.b / 255, n = Math.min(t, e, s), h = Math.max(t, e, s), a = NaN, r = h - n, o = (h + n) / 2;
  return r ? (a = t === h ? (e - s) / r + 6 * (e < s) : e === h ? (s - t) / r + 2 : (t - e) / r + 4, r /= o < 0.5 ? h + n : 2 - h - n, a *= 60) : r = o > 0 && o < 1 ? 0 : a, new nt(a, r, o, i.opacity);
}
function nt(i, t, e, s) {
  this.h = +i, this.s = +t, this.l = +e, this.opacity = +s;
}
function ji(i, t, e) {
  return 255 * (i < 60 ? t + (e - t) * i / 60 : i < 180 ? e : i < 240 ? t + (e - t) * (240 - i) / 60 : t);
}
Fi(Lt, Vt, { copy: function(i) {
  return Object.assign(new this.constructor(), this, i);
}, displayable: function() {
  return this.rgb().displayable();
}, hex: Ce, formatHex: Ce, formatHsl: function() {
  return Be(this).formatHsl();
}, formatRgb: Ee, toString: Ee }), Fi(U, Hi, je(Lt, { brighter: function(i) {
  return i = i == null ? Xt : Math.pow(Xt, i), new U(this.r * i, this.g * i, this.b * i, this.opacity);
}, darker: function(i) {
  return i = i == null ? Et : Math.pow(Et, i), new U(this.r * i, this.g * i, this.b * i, this.opacity);
}, rgb: function() {
  return this;
}, displayable: function() {
  return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
}, hex: Ge, formatHex: Ge, formatRgb: Le, toString: Le })), Fi(nt, function(i, t, e, s) {
  return arguments.length === 1 ? Be(i) : new nt(i, t, e, s ?? 1);
}, je(Lt, { brighter: function(i) {
  return i = i == null ? Xt : Math.pow(Xt, i), new nt(this.h, this.s, this.l * i, this.opacity);
}, darker: function(i) {
  return i = i == null ? Et : Math.pow(Et, i), new nt(this.h, this.s, this.l * i, this.opacity);
}, rgb: function() {
  var i = this.h % 360 + 360 * (this.h < 0), t = isNaN(i) || isNaN(this.s) ? 0 : this.s, e = this.l, s = e + (e < 0.5 ? e : 1 - e) * t, n = 2 * e - s;
  return new U(ji(i >= 240 ? i - 240 : i + 120, n, s), ji(i, n, s), ji(i < 120 ? i + 240 : i - 120, n, s), this.opacity);
}, displayable: function() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
}, formatHsl: function() {
  var i = this.opacity;
  return ((i = isNaN(i) ? 1 : Math.max(0, Math.min(1, i))) === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (i === 1 ? ")" : ", " + i + ")");
} }));
const ne = (i) => () => i;
function xn(i) {
  return (i = +i) == 1 ? vs : function(t, e) {
    return e - t ? function(s, n, h) {
      return s = Math.pow(s, h), n = Math.pow(n, h) - s, h = 1 / h, function(a) {
        return Math.pow(s + a * n, h);
      };
    }(t, e, i) : ne(isNaN(t) ? e : t);
  };
}
function vs(i, t) {
  var e = t - i;
  return e ? function(s, n) {
    return function(h) {
      return s + h * n;
    };
  }(i, e) : ne(isNaN(i) ? t : i);
}
const Ye = function i(t) {
  var e = xn(t);
  function s(n, h) {
    var a = e((n = Hi(n)).r, (h = Hi(h)).r), r = e(n.g, h.g), o = e(n.b, h.b), l = vs(n.opacity, h.opacity);
    return function(u) {
      return n.r = a(u), n.g = r(u), n.b = o(u), n.opacity = l(u), n + "";
    };
  }
  return s.gamma = i, s;
}(1);
function vn(i, t) {
  t || (t = []);
  var e, s = i ? Math.min(t.length, i.length) : 0, n = t.slice();
  return function(h) {
    for (e = 0; e < s; ++e)
      n[e] = i[e] * (1 - h) + t[e] * h;
    return n;
  };
}
function bn(i, t) {
  var e, s = t ? t.length : 0, n = i ? Math.min(s, i.length) : 0, h = new Array(n), a = new Array(s);
  for (e = 0; e < n; ++e)
    h[e] = re(i[e], t[e]);
  for (; e < s; ++e)
    a[e] = t[e];
  return function(r) {
    for (e = 0; e < n; ++e)
      a[e] = h[e](r);
    return a;
  };
}
function kn(i, t) {
  var e = /* @__PURE__ */ new Date();
  return i = +i, t = +t, function(s) {
    return e.setTime(i * (1 - s) + t * s), e;
  };
}
function ai(i, t) {
  return i = +i, t = +t, function(e) {
    return i * (1 - e) + t * e;
  };
}
function Sn(i, t) {
  var e, s = {}, n = {};
  for (e in i !== null && typeof i == "object" || (i = {}), t !== null && typeof t == "object" || (t = {}), t)
    e in i ? s[e] = re(i[e], t[e]) : n[e] = t[e];
  return function(h) {
    for (e in s)
      n[e] = s[e](h);
    return n;
  };
}
var Ni = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Oi = new RegExp(Ni.source, "g");
function wn(i, t) {
  var e, s, n, h = Ni.lastIndex = Oi.lastIndex = 0, a = -1, r = [], o = [];
  for (i += "", t += ""; (e = Ni.exec(i)) && (s = Oi.exec(t)); )
    (n = s.index) > h && (n = t.slice(h, n), r[a] ? r[a] += n : r[++a] = n), (e = e[0]) === (s = s[0]) ? r[a] ? r[a] += s : r[++a] = s : (r[++a] = null, o.push({ i: a, x: ai(e, s) })), h = Oi.lastIndex;
  return h < t.length && (n = t.slice(h), r[a] ? r[a] += n : r[++a] = n), r.length < 2 ? o[0] ? function(l) {
    return function(u) {
      return l(u) + "";
    };
  }(o[0].x) : function(l) {
    return function() {
      return l;
    };
  }(t) : (t = o.length, function(l) {
    for (var u, c = 0; c < t; ++c)
      r[(u = o[c]).i] = u.x(l);
    return r.join("");
  });
}
function re(i, t) {
  var e, s = typeof t;
  return t == null || s === "boolean" ? ne(t) : (s === "number" ? ai : s === "string" ? (e = Vt(t)) ? (t = e, Ye) : wn : t instanceof Vt ? Ye : t instanceof Date ? kn : function(n) {
    return ArrayBuffer.isView(n) && !(n instanceof DataView);
  }(t) ? vn : Array.isArray(t) ? bn : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Sn : ai)(i, t);
}
function Mn(i, t) {
  return i = +i, t = +t, function(e) {
    return Math.round(i * (1 - e) + t * e);
  };
}
function Pn(i) {
  return +i;
}
var Ve = [0, 1];
function wt(i) {
  return i;
}
function Xi(i, t) {
  return (t -= i = +i) ? function(e) {
    return (e - i) / t;
  } : function(e) {
    return function() {
      return e;
    };
  }(isNaN(t) ? NaN : 0.5);
}
function Rn(i, t, e) {
  var s = i[0], n = i[1], h = t[0], a = t[1];
  return n < s ? (s = Xi(n, s), h = e(a, h)) : (s = Xi(s, n), h = e(h, a)), function(r) {
    return h(s(r));
  };
}
function zn(i, t, e) {
  var s = Math.min(i.length, t.length) - 1, n = new Array(s), h = new Array(s), a = -1;
  for (i[s] < i[0] && (i = i.slice().reverse(), t = t.slice().reverse()); ++a < s; )
    n[a] = Xi(i[a], i[a + 1]), h[a] = e(t[a], t[a + 1]);
  return function(r) {
    var o = cs(i, r, 1, s) - 1;
    return h[o](n[o](r));
  };
}
function Fn() {
  var i, t, e, s, n, h, a = Ve, r = Ve, o = re, l = wt;
  function u() {
    var d = Math.min(a.length, r.length);
    return l !== wt && (l = function(g, p) {
      var f;
      return g > p && (f = g, g = p, p = f), function(A) {
        return Math.max(g, Math.min(p, A));
      };
    }(a[0], a[d - 1])), s = d > 2 ? zn : Rn, n = h = null, c;
  }
  function c(d) {
    return d == null || isNaN(d = +d) ? e : (n || (n = s(a.map(i), r, o)))(i(l(d)));
  }
  return c.invert = function(d) {
    return l(t((h || (h = s(r, a.map(i), ai)))(d)));
  }, c.domain = function(d) {
    return arguments.length ? (a = Array.from(d, Pn), u()) : a.slice();
  }, c.range = function(d) {
    return arguments.length ? (r = Array.from(d), u()) : r.slice();
  }, c.rangeRound = function(d) {
    return r = Array.from(d), o = Mn, u();
  }, c.clamp = function(d) {
    return arguments.length ? (l = !!d || wt, u()) : l !== wt;
  }, c.interpolate = function(d) {
    return arguments.length ? (o = d, u()) : o;
  }, c.unknown = function(d) {
    return arguments.length ? (e = d, c) : e;
  }, function(d, g) {
    return i = d, t = g, u();
  };
}
function Wn(i, t, e, s) {
  var n, h = function(r, o, l) {
    var u = Math.abs(o - r) / Math.max(0, l), c = Math.pow(10, Math.floor(Math.log(u) / Math.LN10)), d = u / c;
    return d >= Yi ? c *= 10 : d >= Vi ? c *= 5 : d >= Ti && (c *= 2), o < r ? -c : c;
  }(i, t, e);
  switch ((s = hi(s ?? ",f")).type) {
    case "s":
      var a = Math.max(Math.abs(i), Math.abs(t));
      return s.precision != null || isNaN(n = function(r, o) {
        return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(St(o) / 3))) - St(Math.abs(r)));
      }(h, a)) || (s.precision = n), ys(s, a);
    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      s.precision != null || isNaN(n = function(r, o) {
        return r = Math.abs(r), o = Math.abs(o) - r, Math.max(0, St(o) - St(r)) + 1;
      }(h, Math.max(Math.abs(i), Math.abs(t)))) || (s.precision = n - (s.type === "e"));
      break;
    case "f":
    case "%":
      s.precision != null || isNaN(n = function(r) {
        return Math.max(0, -St(Math.abs(r)));
      }(h)) || (s.precision = n - 2 * (s.type === "%"));
  }
  return ht(s);
}
function jn(i) {
  var t = i.domain;
  return i.ticks = function(e) {
    var s = t();
    return function(n, h, a) {
      var r, o, l, u, c = -1;
      if (a = +a, (n = +n) == (h = +h) && a > 0)
        return [n];
      if ((r = h < n) && (o = n, n = h, h = o), (u = xe(n, h, a)) === 0 || !isFinite(u))
        return [];
      if (u > 0) {
        let d = Math.round(n / u), g = Math.round(h / u);
        for (d * u < n && ++d, g * u > h && --g, l = new Array(o = g - d + 1); ++c < o; )
          l[c] = (d + c) * u;
      } else {
        u = -u;
        let d = Math.round(n * u), g = Math.round(h * u);
        for (d / u < n && ++d, g / u > h && --g, l = new Array(o = g - d + 1); ++c < o; )
          l[c] = (d + c) / u;
      }
      return r && l.reverse(), l;
    }(s[0], s[s.length - 1], e ?? 10);
  }, i.tickFormat = function(e, s) {
    var n = t();
    return Wn(n[0], n[n.length - 1], e ?? 10, s);
  }, i.nice = function(e) {
    e == null && (e = 10);
    var s, n, h = t(), a = 0, r = h.length - 1, o = h[a], l = h[r], u = 10;
    for (l < o && (n = o, o = l, l = n, n = a, a = r, r = n); u-- > 0; ) {
      if ((n = xe(o, l, e)) === s)
        return h[a] = o, h[r] = l, t(h);
      if (n > 0)
        o = Math.floor(o / n) * n, l = Math.ceil(l / n) * n;
      else {
        if (!(n < 0))
          break;
        o = Math.ceil(o * n) / n, l = Math.floor(l * n) / n;
      }
      s = n;
    }
    return i;
  }, i;
}
function Z() {
  var i = Fn()(wt, wt);
  return i.copy = function() {
    return t = i, Z().domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
    var t;
  }, se.apply(i, arguments), jn(i);
}
var Ki = "http://www.w3.org/1999/xhtml";
const Te = { svg: "http://www.w3.org/2000/svg", xhtml: Ki, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
function bs(i) {
  var t = i += "", e = t.indexOf(":");
  return e >= 0 && (t = i.slice(0, e)) !== "xmlns" && (i = i.slice(e + 1)), Te.hasOwnProperty(t) ? { space: Te[t], local: i } : i;
}
function On(i) {
  return function() {
    var t = this.ownerDocument, e = this.namespaceURI;
    return e === Ki && t.documentElement.namespaceURI === Ki ? t.createElement(i) : t.createElementNS(e, i);
  };
}
function Cn(i) {
  return function() {
    return this.ownerDocument.createElementNS(i.space, i.local);
  };
}
function De(i) {
  var t = bs(i);
  return (t.local ? Cn : On)(t);
}
function En() {
}
function qe(i) {
  return i == null ? En : function() {
    return this.querySelector(i);
  };
}
function In() {
  return [];
}
function He(i) {
  return new Array(i.length);
}
function oi(i, t) {
  this.ownerDocument = i.ownerDocument, this.namespaceURI = i.namespaceURI, this._next = null, this._parent = i, this.__data__ = t;
}
oi.prototype = { constructor: oi, appendChild: function(i) {
  return this._parent.insertBefore(i, this._next);
}, insertBefore: function(i, t) {
  return this._parent.insertBefore(i, t);
}, querySelector: function(i) {
  return this._parent.querySelector(i);
}, querySelectorAll: function(i) {
  return this._parent.querySelectorAll(i);
} };
var Ne = "$";
function Gn(i, t, e, s, n, h) {
  for (var a, r = 0, o = t.length, l = h.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = h[r], s[r] = a) : e[r] = new oi(i, h[r]);
  for (; r < o; ++r)
    (a = t[r]) && (n[r] = a);
}
function Ln(i, t, e, s, n, h, a) {
  var r, o, l, u = {}, c = t.length, d = h.length, g = new Array(c);
  for (r = 0; r < c; ++r)
    (o = t[r]) && (g[r] = l = Ne + a.call(o, o.__data__, r, t), l in u ? n[r] = o : u[l] = o);
  for (r = 0; r < d; ++r)
    (o = u[l = Ne + a.call(i, h[r], r, h)]) ? (s[r] = o, o.__data__ = h[r], u[l] = null) : e[r] = new oi(i, h[r]);
  for (r = 0; r < c; ++r)
    (o = t[r]) && u[g[r]] === o && (n[r] = o);
}
function Zn(i, t) {
  return i < t ? -1 : i > t ? 1 : i >= t ? 0 : NaN;
}
function Bn(i) {
  return function() {
    this.removeAttribute(i);
  };
}
function Yn(i) {
  return function() {
    this.removeAttributeNS(i.space, i.local);
  };
}
function Vn(i, t) {
  return function() {
    this.setAttribute(i, t);
  };
}
function Tn(i, t) {
  return function() {
    this.setAttributeNS(i.space, i.local, t);
  };
}
function Dn(i, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttribute(i) : this.setAttribute(i, e);
  };
}
function qn(i, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? this.removeAttributeNS(i.space, i.local) : this.setAttributeNS(i.space, i.local, e);
  };
}
function ks(i) {
  return i.ownerDocument && i.ownerDocument.defaultView || i.document && i || i.defaultView;
}
function Hn(i) {
  return function() {
    this.style.removeProperty(i);
  };
}
function Nn(i, t, e) {
  return function() {
    this.style.setProperty(i, t, e);
  };
}
function Xn(i, t, e) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(i) : this.style.setProperty(i, s, e);
  };
}
function Kn(i) {
  return function() {
    delete this[i];
  };
}
function Qn(i, t) {
  return function() {
    this[i] = t;
  };
}
function Un(i, t) {
  return function() {
    var e = t.apply(this, arguments);
    e == null ? delete this[i] : this[i] = e;
  };
}
function Ss(i) {
  return i.trim().split(/^|\s+/);
}
function he(i) {
  return i.classList || new ws(i);
}
function ws(i) {
  this._node = i, this._names = Ss(i.getAttribute("class") || "");
}
function Ms(i, t) {
  for (var e = he(i), s = -1, n = t.length; ++s < n; )
    e.add(t[s]);
}
function Ps(i, t) {
  for (var e = he(i), s = -1, n = t.length; ++s < n; )
    e.remove(t[s]);
}
function Jn(i) {
  return function() {
    Ms(this, i);
  };
}
function _n(i) {
  return function() {
    Ps(this, i);
  };
}
function $n(i, t) {
  return function() {
    (t.apply(this, arguments) ? Ms : Ps)(this, i);
  };
}
function tr() {
  this.textContent = "";
}
function ir(i) {
  return function() {
    this.textContent = i;
  };
}
function er(i) {
  return function() {
    var t = i.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function sr() {
  this.innerHTML = "";
}
function nr(i) {
  return function() {
    this.innerHTML = i;
  };
}
function rr(i) {
  return function() {
    var t = i.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ar() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function or() {
  return null;
}
function lr() {
  var i = this.parentNode;
  i && i.removeChild(this);
}
function ur() {
  var i = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(i, this.nextSibling) : i;
}
function cr() {
  var i = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(i, this.nextSibling) : i;
}
ws.prototype = { add: function(i) {
  this._names.indexOf(i) < 0 && (this._names.push(i), this._node.setAttribute("class", this._names.join(" ")));
}, remove: function(i) {
  var t = this._names.indexOf(i);
  t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
}, contains: function(i) {
  return this._names.indexOf(i) >= 0;
} };
var Rs = {}, ti = null;
typeof document < "u" && ("onmouseenter" in document.documentElement || (Rs = { mouseenter: "mouseover", mouseleave: "mouseout" }));
function dr(i, t, e) {
  return i = zs(i, t, e), function(s) {
    var n = s.relatedTarget;
    n && (n === this || 8 & n.compareDocumentPosition(this)) || i.call(this, s);
  };
}
function zs(i, t, e) {
  return function(s) {
    var n = ti;
    ti = s;
    try {
      i.call(this, this.__data__, t, e);
    } finally {
      ti = n;
    }
  };
}
function gr(i) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var e, s = 0, n = -1, h = t.length; s < h; ++s)
        e = t[s], i.type && e.type !== i.type || e.name !== i.name ? t[++n] = e : this.removeEventListener(e.type, e.listener, e.capture);
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function fr(i, t, e) {
  var s = Rs.hasOwnProperty(i.type) ? dr : zs;
  return function(n, h, a) {
    var r, o = this.__on, l = s(t, h, a);
    if (o) {
      for (var u = 0, c = o.length; u < c; ++u)
        if ((r = o[u]).type === i.type && r.name === i.name)
          return this.removeEventListener(r.type, r.listener, r.capture), this.addEventListener(r.type, r.listener = l, r.capture = e), void (r.value = t);
    }
    this.addEventListener(i.type, l, e), r = { type: i.type, name: i.name, value: t, listener: l, capture: e }, o ? o.push(r) : this.__on = [r];
  };
}
function Fs(i, t, e) {
  var s = ks(i), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, e) : (n = s.document.createEvent("Event"), e ? (n.initEvent(t, e.bubbles, e.cancelable), n.detail = e.detail) : n.initEvent(t, !1, !1)), i.dispatchEvent(n);
}
function pr(i, t) {
  return function() {
    return Fs(this, i, t);
  };
}
function mr(i, t) {
  return function() {
    return Fs(this, i, t.apply(this, arguments));
  };
}
var Ws = [null];
function K(i, t) {
  this._groups = i, this._parents = t;
}
function x(i) {
  return typeof i == "string" ? new K([[document.querySelector(i)]], [document.documentElement]) : new K([[i]], Ws);
}
function Ar() {
  for (var i, t = ti; i = t.sourceEvent; )
    t = i;
  return t;
}
function bt(i) {
  var t = Ar();
  return t.changedTouches && (t = t.changedTouches[0]), function(e, s) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var h = n.createSVGPoint();
      return h.x = s.clientX, h.y = s.clientY, [(h = h.matrixTransform(e.getScreenCTM().inverse())).x, h.y];
    }
    var a = e.getBoundingClientRect();
    return [s.clientX - a.left - e.clientLeft, s.clientY - a.top - e.clientTop];
  }(i, t);
}
function P(i) {
  return typeof i == "string" ? new K([document.querySelectorAll(i)], [document.documentElement]) : new K([i ?? []], Ws);
}
function Ci(i, t, e) {
  if (i && i.length) {
    const [s, n] = t, h = Math.PI / 180 * e, a = Math.cos(h), r = Math.sin(h);
    for (const o of i) {
      const [l, u] = o;
      o[0] = (l - s) * a - (u - n) * r + s, o[1] = (l - s) * r + (u - n) * a + n;
    }
  }
}
function yr(i, t) {
  return i[0] === t[0] && i[1] === t[1];
}
function xr(i, t, e, s = 1) {
  const n = e, h = Math.max(t, 0.1), a = i[0] && i[0][0] && typeof i[0][0] == "number" ? [i] : i, r = [0, 0];
  if (n)
    for (const l of a)
      Ci(l, r, n);
  const o = function(l, u, c) {
    const d = [];
    for (const y of l) {
      const b = [...y];
      yr(b[0], b[b.length - 1]) || b.push([b[0][0], b[0][1]]), b.length > 2 && d.push(b);
    }
    const g = [];
    u = Math.max(u, 0.1);
    const p = [];
    for (const y of d)
      for (let b = 0; b < y.length - 1; b++) {
        const k = y[b], w = y[b + 1];
        if (k[1] !== w[1]) {
          const v = Math.min(k[1], w[1]);
          p.push({ ymin: v, ymax: Math.max(k[1], w[1]), x: v === k[1] ? k[0] : w[0], islope: (w[0] - k[0]) / (w[1] - k[1]) });
        }
      }
    if (p.sort((y, b) => y.ymin < b.ymin ? -1 : y.ymin > b.ymin ? 1 : y.x < b.x ? -1 : y.x > b.x ? 1 : y.ymax === b.ymax ? 0 : (y.ymax - b.ymax) / Math.abs(y.ymax - b.ymax)), !p.length)
      return g;
    let f = [], A = p[0].ymin, m = 0;
    for (; f.length || p.length; ) {
      if (p.length) {
        let y = -1;
        for (let b = 0; b < p.length && !(p[b].ymin > A); b++)
          y = b;
        p.splice(0, y + 1).forEach((b) => {
          f.push({ s: A, edge: b });
        });
      }
      if (f = f.filter((y) => !(y.edge.ymax <= A)), f.sort((y, b) => y.edge.x === b.edge.x ? 0 : (y.edge.x - b.edge.x) / Math.abs(y.edge.x - b.edge.x)), (c !== 1 || m % u == 0) && f.length > 1)
        for (let y = 0; y < f.length; y += 2) {
          const b = y + 1;
          if (b >= f.length)
            break;
          const k = f[y].edge, w = f[b].edge;
          g.push([[Math.round(k.x), A], [Math.round(w.x), A]]);
        }
      A += c, f.forEach((y) => {
        y.edge.x = y.edge.x + c * y.edge.islope;
      }), m++;
    }
    return g;
  }(a, h, s);
  if (n) {
    for (const l of a)
      Ci(l, r, -n);
    (function(l, u, c) {
      const d = [];
      l.forEach((g) => d.push(...g)), Ci(d, u, c);
    })(o, r, -n);
  }
  return o;
}
function Nt(i, t) {
  var e;
  const s = t.hachureAngle + 90;
  let n = t.hachureGap;
  n < 0 && (n = 4 * t.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let h = 1;
  return t.roughness >= 1 && (((e = t.randomizer) === null || e === void 0 ? void 0 : e.next()) || Math.random()) > 0.7 && (h = n), xr(i, n, s, h || 1);
}
K.prototype = { constructor: K, select: function(i) {
  typeof i != "function" && (i = qe(i));
  for (var t = this._groups, e = t.length, s = new Array(e), n = 0; n < e; ++n)
    for (var h, a, r = t[n], o = r.length, l = s[n] = new Array(o), u = 0; u < o; ++u)
      (h = r[u]) && (a = i.call(h, h.__data__, u, r)) && ("__data__" in h && (a.__data__ = h.__data__), l[u] = a);
  return new K(s, this._parents);
}, selectAll: function(i) {
  typeof i != "function" && (i = function(u) {
    return u == null ? In : function() {
      return this.querySelectorAll(u);
    };
  }(i));
  for (var t = this._groups, e = t.length, s = [], n = [], h = 0; h < e; ++h)
    for (var a, r = t[h], o = r.length, l = 0; l < o; ++l)
      (a = r[l]) && (s.push(i.call(a, a.__data__, l, r)), n.push(a));
  return new K(s, n);
}, filter: function(i) {
  typeof i != "function" && (i = function(u) {
    return function() {
      return this.matches(u);
    };
  }(i));
  for (var t = this._groups, e = t.length, s = new Array(e), n = 0; n < e; ++n)
    for (var h, a = t[n], r = a.length, o = s[n] = [], l = 0; l < r; ++l)
      (h = a[l]) && i.call(h, h.__data__, l, a) && o.push(h);
  return new K(s, this._parents);
}, data: function(i, t) {
  if (!i)
    return g = new Array(this.size()), l = -1, this.each(function(w) {
      g[++l] = w;
    }), g;
  var e = t ? Ln : Gn, s = this._parents, n = this._groups;
  typeof i != "function" && (i = function(w) {
    return function() {
      return w;
    };
  }(i));
  for (var h = n.length, a = new Array(h), r = new Array(h), o = new Array(h), l = 0; l < h; ++l) {
    var u = s[l], c = n[l], d = c.length, g = i.call(u, u && u.__data__, l, s), p = g.length, f = r[l] = new Array(p), A = a[l] = new Array(p);
    e(u, c, f, A, o[l] = new Array(d), g, t);
    for (var m, y, b = 0, k = 0; b < p; ++b)
      if (m = f[b]) {
        for (b >= k && (k = b + 1); !(y = A[k]) && ++k < p; )
          ;
        m._next = y || null;
      }
  }
  return (a = new K(a, s))._enter = r, a._exit = o, a;
}, enter: function() {
  return new K(this._enter || this._groups.map(He), this._parents);
}, exit: function() {
  return new K(this._exit || this._groups.map(He), this._parents);
}, join: function(i, t, e) {
  var s = this.enter(), n = this, h = this.exit();
  return s = typeof i == "function" ? i(s) : s.append(i + ""), t != null && (n = t(n)), e == null ? h.remove() : e(h), s && n ? s.merge(n).order() : n;
}, merge: function(i) {
  for (var t = this._groups, e = i._groups, s = t.length, n = e.length, h = Math.min(s, n), a = new Array(s), r = 0; r < h; ++r)
    for (var o, l = t[r], u = e[r], c = l.length, d = a[r] = new Array(c), g = 0; g < c; ++g)
      (o = l[g] || u[g]) && (d[g] = o);
  for (; r < s; ++r)
    a[r] = t[r];
  return new K(a, this._parents);
}, order: function() {
  for (var i = this._groups, t = -1, e = i.length; ++t < e; )
    for (var s, n = i[t], h = n.length - 1, a = n[h]; --h >= 0; )
      (s = n[h]) && (a && 4 ^ s.compareDocumentPosition(a) && a.parentNode.insertBefore(s, a), a = s);
  return this;
}, sort: function(i) {
  function t(c, d) {
    return c && d ? i(c.__data__, d.__data__) : !c - !d;
  }
  i || (i = Zn);
  for (var e = this._groups, s = e.length, n = new Array(s), h = 0; h < s; ++h) {
    for (var a, r = e[h], o = r.length, l = n[h] = new Array(o), u = 0; u < o; ++u)
      (a = r[u]) && (l[u] = a);
    l.sort(t);
  }
  return new K(n, this._parents).order();
}, call: function() {
  var i = arguments[0];
  return arguments[0] = this, i.apply(null, arguments), this;
}, nodes: function() {
  var i = new Array(this.size()), t = -1;
  return this.each(function() {
    i[++t] = this;
  }), i;
}, node: function() {
  for (var i = this._groups, t = 0, e = i.length; t < e; ++t)
    for (var s = i[t], n = 0, h = s.length; n < h; ++n) {
      var a = s[n];
      if (a)
        return a;
    }
  return null;
}, size: function() {
  var i = 0;
  return this.each(function() {
    ++i;
  }), i;
}, empty: function() {
  return !this.node();
}, each: function(i) {
  for (var t = this._groups, e = 0, s = t.length; e < s; ++e)
    for (var n, h = t[e], a = 0, r = h.length; a < r; ++a)
      (n = h[a]) && i.call(n, n.__data__, a, h);
  return this;
}, attr: function(i, t) {
  var e = bs(i);
  if (arguments.length < 2) {
    var s = this.node();
    return e.local ? s.getAttributeNS(e.space, e.local) : s.getAttribute(e);
  }
  return this.each((t == null ? e.local ? Yn : Bn : typeof t == "function" ? e.local ? qn : Dn : e.local ? Tn : Vn)(e, t));
}, style: function(i, t, e) {
  return arguments.length > 1 ? this.each((t == null ? Hn : typeof t == "function" ? Xn : Nn)(i, t, e ?? "")) : function(s, n) {
    return s.style.getPropertyValue(n) || ks(s).getComputedStyle(s, null).getPropertyValue(n);
  }(this.node(), i);
}, property: function(i, t) {
  return arguments.length > 1 ? this.each((t == null ? Kn : typeof t == "function" ? Un : Qn)(i, t)) : this.node()[i];
}, classed: function(i, t) {
  var e = Ss(i + "");
  if (arguments.length < 2) {
    for (var s = he(this.node()), n = -1, h = e.length; ++n < h; )
      if (!s.contains(e[n]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? $n : t ? Jn : _n)(e, t));
}, text: function(i) {
  return arguments.length ? this.each(i == null ? tr : (typeof i == "function" ? er : ir)(i)) : this.node().textContent;
}, html: function(i) {
  return arguments.length ? this.each(i == null ? sr : (typeof i == "function" ? rr : nr)(i)) : this.node().innerHTML;
}, raise: function() {
  return this.each(hr);
}, lower: function() {
  return this.each(ar);
}, append: function(i) {
  var t = typeof i == "function" ? i : De(i);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}, insert: function(i, t) {
  var e = typeof i == "function" ? i : De(i), s = t == null ? or : typeof t == "function" ? t : qe(t);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), s.apply(this, arguments) || null);
  });
}, remove: function() {
  return this.each(lr);
}, clone: function(i) {
  return this.select(i ? cr : ur);
}, datum: function(i) {
  return arguments.length ? this.property("__data__", i) : this.node().__data__;
}, on: function(i, t, e) {
  var s, n, h = function(c) {
    return c.trim().split(/^|\s+/).map(function(d) {
      var g = "", p = d.indexOf(".");
      return p >= 0 && (g = d.slice(p + 1), d = d.slice(0, p)), { type: d, name: g };
    });
  }(i + ""), a = h.length;
  if (!(arguments.length < 2)) {
    for (r = t ? fr : gr, e == null && (e = !1), s = 0; s < a; ++s)
      this.each(r(h[s], t, e));
    return this;
  }
  var r = this.node().__on;
  if (r) {
    for (var o, l = 0, u = r.length; l < u; ++l)
      for (s = 0, o = r[l]; s < a; ++s)
        if ((n = h[s]).type === o.type && n.name === o.name)
          return o.value;
  }
}, dispatch: function(i, t) {
  return this.each((typeof t == "function" ? mr : pr)(i, t));
} };
class ae {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, e) {
    return this._fillPolygons(t, e);
  }
  _fillPolygons(t, e) {
    const s = Nt(t, e);
    return { type: "fillSketch", ops: this.renderLines(s, e) };
  }
  renderLines(t, e) {
    const s = [];
    for (const n of t)
      s.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], e));
    return s;
  }
}
function yi(i) {
  const t = i[0], e = i[1];
  return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2));
}
class vr extends ae {
  fillPolygons(t, e) {
    let s = e.hachureGap;
    s < 0 && (s = 4 * e.strokeWidth), s = Math.max(s, 0.1);
    const n = Nt(t, Object.assign({}, e, { hachureGap: s })), h = Math.PI / 180 * e.hachureAngle, a = [], r = 0.5 * s * Math.cos(h), o = 0.5 * s * Math.sin(h);
    for (const [l, u] of n)
      yi([l, u]) && a.push([[l[0] - r, l[1] + o], [...u]], [[l[0] + r, l[1] - o], [...u]]);
    return { type: "fillSketch", ops: this.renderLines(a, e) };
  }
}
class br extends ae {
  fillPolygons(t, e) {
    const s = this._fillPolygons(t, e), n = Object.assign({}, e, { hachureAngle: e.hachureAngle + 90 }), h = this._fillPolygons(t, n);
    return s.ops = s.ops.concat(h.ops), s;
  }
}
class kr {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, e) {
    const s = Nt(t, e = Object.assign({}, e, { hachureAngle: 0 }));
    return this.dotsOnLines(s, e);
  }
  dotsOnLines(t, e) {
    const s = [];
    let n = e.hachureGap;
    n < 0 && (n = 4 * e.strokeWidth), n = Math.max(n, 0.1);
    let h = e.fillWeight;
    h < 0 && (h = e.strokeWidth / 2);
    const a = n / 4;
    for (const r of t) {
      const o = yi(r), l = o / n, u = Math.ceil(l) - 1, c = o - u * n, d = (r[0][0] + r[1][0]) / 2 - n / 4, g = Math.min(r[0][1], r[1][1]);
      for (let p = 0; p < u; p++) {
        const f = g + c + p * n, A = d - a + 2 * Math.random() * a, m = f - a + 2 * Math.random() * a, y = this.helper.ellipse(A, m, h, h, e);
        s.push(...y.ops);
      }
    }
    return { type: "fillSketch", ops: s };
  }
}
let Sr = class {
  constructor(i) {
    this.helper = i;
  }
  fillPolygons(i, t) {
    const e = Nt(i, t);
    return { type: "fillSketch", ops: this.dashedLine(e, t) };
  }
  dashedLine(i, t) {
    const e = t.dashOffset < 0 ? t.hachureGap < 0 ? 4 * t.strokeWidth : t.hachureGap : t.dashOffset, s = t.dashGap < 0 ? t.hachureGap < 0 ? 4 * t.strokeWidth : t.hachureGap : t.dashGap, n = [];
    return i.forEach((h) => {
      const a = yi(h), r = Math.floor(a / (e + s)), o = (a + s - r * (e + s)) / 2;
      let l = h[0], u = h[1];
      l[0] > u[0] && (l = h[1], u = h[0]);
      const c = Math.atan((u[1] - l[1]) / (u[0] - l[0]));
      for (let d = 0; d < r; d++) {
        const g = d * (e + s), p = g + e, f = [l[0] + g * Math.cos(c) + o * Math.cos(c), l[1] + g * Math.sin(c) + o * Math.sin(c)], A = [l[0] + p * Math.cos(c) + o * Math.cos(c), l[1] + p * Math.sin(c) + o * Math.sin(c)];
        n.push(...this.helper.doubleLineOps(f[0], f[1], A[0], A[1], t));
      }
    }), n;
  }
};
class wr {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, e) {
    const s = e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap, n = e.zigzagOffset < 0 ? s : e.zigzagOffset, h = Nt(t, e = Object.assign({}, e, { hachureGap: s + n }));
    return { type: "fillSketch", ops: this.zigzagLines(h, n, e) };
  }
  zigzagLines(t, e, s) {
    const n = [];
    return t.forEach((h) => {
      const a = yi(h), r = Math.round(a / (2 * e));
      let o = h[0], l = h[1];
      o[0] > l[0] && (o = h[1], l = h[0]);
      const u = Math.atan((l[1] - o[1]) / (l[0] - o[0]));
      for (let c = 0; c < r; c++) {
        const d = 2 * c * e, g = 2 * (c + 1) * e, p = Math.sqrt(2 * Math.pow(e, 2)), f = [o[0] + d * Math.cos(u), o[1] + d * Math.sin(u)], A = [o[0] + g * Math.cos(u), o[1] + g * Math.sin(u)], m = [f[0] + p * Math.cos(u + Math.PI / 4), f[1] + p * Math.sin(u + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(f[0], f[1], m[0], m[1], s), ...this.helper.doubleLineOps(m[0], m[1], A[0], A[1], s));
      }
    }), n;
  }
}
const N = {};
class Mr {
  constructor(t) {
    this.seed = t;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const Pr = 0, Ei = 1, Xe = 2, Qt = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Ii(i, t) {
  return i.type === t;
}
function oe(i) {
  const t = [], e = function(a) {
    const r = new Array();
    for (; a !== ""; )
      if (a.match(/^([ \t\r\n,]+)/))
        a = a.substr(RegExp.$1.length);
      else if (a.match(/^([aAcChHlLmMqQsStTvVzZ])/))
        r[r.length] = { type: Pr, text: RegExp.$1 }, a = a.substr(RegExp.$1.length);
      else {
        if (!a.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))
          return [];
        r[r.length] = { type: Ei, text: `${parseFloat(RegExp.$1)}` }, a = a.substr(RegExp.$1.length);
      }
    return r[r.length] = { type: Xe, text: "" }, r;
  }(i);
  let s = "BOD", n = 0, h = e[n];
  for (; !Ii(h, Xe); ) {
    let a = 0;
    const r = [];
    if (s === "BOD") {
      if (h.text !== "M" && h.text !== "m")
        return oe("M0,0" + i);
      n++, a = Qt[h.text], s = h.text;
    } else
      Ii(h, Ei) ? a = Qt[s] : (n++, a = Qt[h.text], s = h.text);
    if (!(n + a < e.length))
      throw new Error("Path data ended short");
    for (let o = n; o < n + a; o++) {
      const l = e[o];
      if (!Ii(l, Ei))
        throw new Error("Param not a number: " + s + "," + l.text);
      r[r.length] = +l.text;
    }
    if (typeof Qt[s] != "number")
      throw new Error("Bad segment: " + s);
    {
      const o = { key: s, data: r };
      t.push(o), n += a, h = e[n], s === "M" && (s = "L"), s === "m" && (s = "l");
    }
  }
  return t;
}
function js(i) {
  let t = 0, e = 0, s = 0, n = 0;
  const h = [];
  for (const { key: a, data: r } of i)
    switch (a) {
      case "M":
        h.push({ key: "M", data: [...r] }), [t, e] = r, [s, n] = r;
        break;
      case "m":
        t += r[0], e += r[1], h.push({ key: "M", data: [t, e] }), s = t, n = e;
        break;
      case "L":
        h.push({ key: "L", data: [...r] }), [t, e] = r;
        break;
      case "l":
        t += r[0], e += r[1], h.push({ key: "L", data: [t, e] });
        break;
      case "C":
        h.push({ key: "C", data: [...r] }), t = r[4], e = r[5];
        break;
      case "c": {
        const o = r.map((l, u) => u % 2 ? l + e : l + t);
        h.push({ key: "C", data: o }), t = o[4], e = o[5];
        break;
      }
      case "Q":
        h.push({ key: "Q", data: [...r] }), t = r[2], e = r[3];
        break;
      case "q": {
        const o = r.map((l, u) => u % 2 ? l + e : l + t);
        h.push({ key: "Q", data: o }), t = o[2], e = o[3];
        break;
      }
      case "A":
        h.push({ key: "A", data: [...r] }), t = r[5], e = r[6];
        break;
      case "a":
        t += r[5], e += r[6], h.push({ key: "A", data: [r[0], r[1], r[2], r[3], r[4], t, e] });
        break;
      case "H":
        h.push({ key: "H", data: [...r] }), t = r[0];
        break;
      case "h":
        t += r[0], h.push({ key: "H", data: [t] });
        break;
      case "V":
        h.push({ key: "V", data: [...r] }), e = r[0];
        break;
      case "v":
        e += r[0], h.push({ key: "V", data: [e] });
        break;
      case "S":
        h.push({ key: "S", data: [...r] }), t = r[2], e = r[3];
        break;
      case "s": {
        const o = r.map((l, u) => u % 2 ? l + e : l + t);
        h.push({ key: "S", data: o }), t = o[2], e = o[3];
        break;
      }
      case "T":
        h.push({ key: "T", data: [...r] }), t = r[0], e = r[1];
        break;
      case "t":
        t += r[0], e += r[1], h.push({ key: "T", data: [t, e] });
        break;
      case "Z":
      case "z":
        h.push({ key: "Z", data: [] }), t = s, e = n;
    }
  return h;
}
function Os(i) {
  const t = [];
  let e = "", s = 0, n = 0, h = 0, a = 0, r = 0, o = 0;
  for (const { key: l, data: u } of i) {
    switch (l) {
      case "M":
        t.push({ key: "M", data: [...u] }), [s, n] = u, [h, a] = u;
        break;
      case "C":
        t.push({ key: "C", data: [...u] }), s = u[4], n = u[5], r = u[2], o = u[3];
        break;
      case "L":
        t.push({ key: "L", data: [...u] }), [s, n] = u;
        break;
      case "H":
        s = u[0], t.push({ key: "L", data: [s, n] });
        break;
      case "V":
        n = u[0], t.push({ key: "L", data: [s, n] });
        break;
      case "S": {
        let c = 0, d = 0;
        e === "C" || e === "S" ? (c = s + (s - r), d = n + (n - o)) : (c = s, d = n), t.push({ key: "C", data: [c, d, ...u] }), r = u[0], o = u[1], s = u[2], n = u[3];
        break;
      }
      case "T": {
        const [c, d] = u;
        let g = 0, p = 0;
        e === "Q" || e === "T" ? (g = s + (s - r), p = n + (n - o)) : (g = s, p = n);
        const f = s + 2 * (g - s) / 3, A = n + 2 * (p - n) / 3, m = c + 2 * (g - c) / 3, y = d + 2 * (p - d) / 3;
        t.push({ key: "C", data: [f, A, m, y, c, d] }), r = g, o = p, s = c, n = d;
        break;
      }
      case "Q": {
        const [c, d, g, p] = u, f = s + 2 * (c - s) / 3, A = n + 2 * (d - n) / 3, m = g + 2 * (c - g) / 3, y = p + 2 * (d - p) / 3;
        t.push({ key: "C", data: [f, A, m, y, g, p] }), r = c, o = d, s = g, n = p;
        break;
      }
      case "A": {
        const c = Math.abs(u[0]), d = Math.abs(u[1]), g = u[2], p = u[3], f = u[4], A = u[5], m = u[6];
        c === 0 || d === 0 ? (t.push({ key: "C", data: [s, n, A, m, A, m] }), s = A, n = m) : s === A && n === m || (Cs(s, n, A, m, c, d, g, p, f).forEach(function(y) {
          t.push({ key: "C", data: y });
        }), s = A, n = m);
        break;
      }
      case "Z":
        t.push({ key: "Z", data: [] }), s = h, n = a;
    }
    e = l;
  }
  return t;
}
function Wt(i, t, e) {
  return [i * Math.cos(e) - t * Math.sin(e), i * Math.sin(e) + t * Math.cos(e)];
}
function Cs(i, t, e, s, n, h, a, r, o, l) {
  const u = (c = a, Math.PI * c / 180);
  var c;
  let d = [], g = 0, p = 0, f = 0, A = 0;
  if (l)
    [g, p, f, A] = l;
  else {
    [i, t] = Wt(i, t, -u), [e, s] = Wt(e, s, -u);
    const W = (i - e) / 2, C = (t - s) / 2;
    let I = W * W / (n * n) + C * C / (h * h);
    I > 1 && (I = Math.sqrt(I), n *= I, h *= I);
    const E = n * n, G = h * h, J = E * G - E * C * C - G * W * W, _ = E * C * C + G * W * W, L = (r === o ? -1 : 1) * Math.sqrt(Math.abs(J / _));
    f = L * n * C / h + (i + e) / 2, A = L * -h * W / n + (t + s) / 2, g = Math.asin(parseFloat(((t - A) / h).toFixed(9))), p = Math.asin(parseFloat(((s - A) / h).toFixed(9))), i < f && (g = Math.PI - g), e < f && (p = Math.PI - p), g < 0 && (g = 2 * Math.PI + g), p < 0 && (p = 2 * Math.PI + p), o && g > p && (g -= 2 * Math.PI), !o && p > g && (p -= 2 * Math.PI);
  }
  let m = p - g;
  if (Math.abs(m) > 120 * Math.PI / 180) {
    const W = p, C = e, I = s;
    p = o && p > g ? g + 120 * Math.PI / 180 * 1 : g + 120 * Math.PI / 180 * -1, d = Cs(e = f + n * Math.cos(p), s = A + h * Math.sin(p), C, I, n, h, a, 0, o, [p, W, f, A]);
  }
  m = p - g;
  const y = Math.cos(g), b = Math.sin(g), k = Math.cos(p), w = Math.sin(p), v = Math.tan(m / 4), M = 4 / 3 * n * v, j = 4 / 3 * h * v, O = [i, t], z = [i + M * b, t - j * y], F = [e + M * w, s - j * k], S = [e, s];
  if (z[0] = 2 * O[0] - z[0], z[1] = 2 * O[1] - z[1], l)
    return [z, F, S].concat(d);
  {
    d = [z, F, S].concat(d);
    const W = [];
    for (let C = 0; C < d.length; C += 3) {
      const I = Wt(d[C][0], d[C][1], u), E = Wt(d[C + 1][0], d[C + 1][1], u), G = Wt(d[C + 2][0], d[C + 2][1], u);
      W.push([I[0], I[1], E[0], E[1], G[0], G[1]]);
    }
    return W;
  }
}
const Rr = { randOffset: function(i, t) {
  return R(i, t);
}, randOffsetWithRange: function(i, t, e) {
  return li(i, t, e);
}, ellipse: function(i, t, e, s, n) {
  return Qi(i, t, n, Is(e, s, n)).opset;
}, doubleLineOps: function(i, t, e, s, n) {
  return ct(i, t, e, s, n, !0);
} };
function Es(i, t, e, s, n) {
  return { type: "path", ops: ct(i, t, e, s, n) };
}
function Ut(i, t, e) {
  const s = (i || []).length;
  if (s > 2) {
    const n = [];
    for (let h = 0; h < s - 1; h++)
      n.push(...ct(i[h][0], i[h][1], i[h + 1][0], i[h + 1][1], e));
    return t && n.push(...ct(i[s - 1][0], i[s - 1][1], i[0][0], i[0][1], e)), { type: "path", ops: n };
  }
  return s === 2 ? Es(i[0][0], i[0][1], i[1][0], i[1][1], e) : { type: "path", ops: [] };
}
function Ke(i, t) {
  if (i.length) {
    const e = typeof i[0][0] == "number" ? [i] : i, s = Jt(e[0], 1 * (1 + 0.2 * t.roughness), t), n = t.disableMultiStroke ? [] : Jt(e[0], 1.5 * (1 + 0.22 * t.roughness), Je(t));
    for (let h = 1; h < e.length; h++) {
      const a = e[h];
      if (a.length) {
        const r = Jt(a, 1 * (1 + 0.2 * t.roughness), t), o = t.disableMultiStroke ? [] : Jt(a, 1.5 * (1 + 0.22 * t.roughness), Je(t));
        for (const l of r)
          l.op !== "move" && s.push(l);
        for (const l of o)
          l.op !== "move" && n.push(l);
      }
    }
    return { type: "path", ops: s.concat(n) };
  }
  return { type: "path", ops: [] };
}
function Is(i, t, e) {
  const s = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(i / 2, 2) + Math.pow(t / 2, 2)) / 2)), n = Math.ceil(Math.max(e.curveStepCount, e.curveStepCount / Math.sqrt(200) * s)), h = 2 * Math.PI / n;
  let a = Math.abs(i / 2), r = Math.abs(t / 2);
  const o = 1 - e.curveFitting;
  return a += R(a * o, e), r += R(r * o, e), { increment: h, rx: a, ry: r };
}
function Qi(i, t, e, s) {
  const [n, h] = _e(s.increment, i, t, s.rx, s.ry, 1, s.increment * li(0.1, li(0.4, 1, e), e), e);
  let a = ui(n, null, e);
  if (!e.disableMultiStroke && e.roughness !== 0) {
    const [r] = _e(s.increment, i, t, s.rx, s.ry, 1.5, 0, e), o = ui(r, null, e);
    a = a.concat(o);
  }
  return { estimatedPoints: h, opset: { type: "path", ops: a } };
}
function Qe(i, t, e, s, n, h, a, r, o) {
  const l = i, u = t;
  let c = Math.abs(e / 2), d = Math.abs(s / 2);
  c += R(0.01 * c, o), d += R(0.01 * d, o);
  let g = n, p = h;
  for (; g < 0; )
    g += 2 * Math.PI, p += 2 * Math.PI;
  p - g > 2 * Math.PI && (g = 0, p = 2 * Math.PI);
  const f = 2 * Math.PI / o.curveStepCount, A = Math.min(f / 2, (p - g) / 2), m = $e(A, l, u, c, d, g, p, 1, o);
  if (!o.disableMultiStroke) {
    const y = $e(A, l, u, c, d, g, p, 1.5, o);
    m.push(...y);
  }
  return a && (r ? m.push(...ct(l, u, l + c * Math.cos(g), u + d * Math.sin(g), o), ...ct(l, u, l + c * Math.cos(p), u + d * Math.sin(p), o)) : m.push({ op: "lineTo", data: [l, u] }, { op: "lineTo", data: [l + c * Math.cos(g), u + d * Math.sin(g)] })), { type: "path", ops: m };
}
function Ue(i, t) {
  const e = Os(js(oe(i))), s = [];
  let n = [0, 0], h = [0, 0];
  for (const { key: a, data: r } of e)
    switch (a) {
      case "M":
        h = [r[0], r[1]], n = [r[0], r[1]];
        break;
      case "L":
        s.push(...ct(h[0], h[1], r[0], r[1], t)), h = [r[0], r[1]];
        break;
      case "C": {
        const [o, l, u, c, d, g] = r;
        s.push(...zr(o, l, u, c, d, g, h, t)), h = [d, g];
        break;
      }
      case "Z":
        s.push(...ct(h[0], h[1], n[0], n[1], t)), h = [n[0], n[1]];
    }
  return { type: "path", ops: s };
}
function Gi(i, t) {
  const e = [];
  for (const s of i)
    if (s.length) {
      const n = t.maxRandomnessOffset || 0, h = s.length;
      if (h > 2) {
        e.push({ op: "move", data: [s[0][0] + R(n, t), s[0][1] + R(n, t)] });
        for (let a = 1; a < h; a++)
          e.push({ op: "lineTo", data: [s[a][0] + R(n, t), s[a][1] + R(n, t)] });
      }
    }
  return { type: "fillPath", ops: e };
}
function kt(i, t) {
  return function(e, s) {
    let n = e.fillStyle || "hachure";
    if (!N[n])
      switch (n) {
        case "zigzag":
          N[n] || (N[n] = new vr(s));
          break;
        case "cross-hatch":
          N[n] || (N[n] = new br(s));
          break;
        case "dots":
          N[n] || (N[n] = new kr(s));
          break;
        case "dashed":
          N[n] || (N[n] = new Sr(s));
          break;
        case "zigzag-line":
          N[n] || (N[n] = new wr(s));
          break;
        default:
          n = "hachure", N[n] || (N[n] = new ae(s));
      }
    return N[n];
  }(t, Rr).fillPolygons(i, t);
}
function Je(i) {
  const t = Object.assign({}, i);
  return t.randomizer = void 0, i.seed && (t.seed = i.seed + 1), t;
}
function Gs(i) {
  return i.randomizer || (i.randomizer = new Mr(i.seed || 0)), i.randomizer.next();
}
function li(i, t, e, s = 1) {
  return e.roughness * s * (Gs(e) * (t - i) + i);
}
function R(i, t, e = 1) {
  return li(-i, i, t, e);
}
function ct(i, t, e, s, n, h = !1) {
  const a = h ? n.disableMultiStrokeFill : n.disableMultiStroke, r = Ui(i, t, e, s, n, !0, !1);
  if (a)
    return r;
  const o = Ui(i, t, e, s, n, !0, !0);
  return r.concat(o);
}
function Ui(i, t, e, s, n, h, a) {
  const r = Math.pow(i - e, 2) + Math.pow(t - s, 2), o = Math.sqrt(r);
  let l = 1;
  l = o < 200 ? 1 : o > 500 ? 0.4 : -16668e-7 * o + 1.233334;
  let u = n.maxRandomnessOffset || 0;
  u * u * 100 > r && (u = o / 10);
  const c = u / 2, d = 0.2 + 0.2 * Gs(n);
  let g = n.bowing * n.maxRandomnessOffset * (s - t) / 200, p = n.bowing * n.maxRandomnessOffset * (i - e) / 200;
  g = R(g, n, l), p = R(p, n, l);
  const f = [], A = () => R(c, n, l), m = () => R(u, n, l), y = n.preserveVertices;
  return h && (a ? f.push({ op: "move", data: [i + (y ? 0 : A()), t + (y ? 0 : A())] }) : f.push({ op: "move", data: [i + (y ? 0 : R(u, n, l)), t + (y ? 0 : R(u, n, l))] })), a ? f.push({ op: "bcurveTo", data: [g + i + (e - i) * d + A(), p + t + (s - t) * d + A(), g + i + 2 * (e - i) * d + A(), p + t + 2 * (s - t) * d + A(), e + (y ? 0 : A()), s + (y ? 0 : A())] }) : f.push({ op: "bcurveTo", data: [g + i + (e - i) * d + m(), p + t + (s - t) * d + m(), g + i + 2 * (e - i) * d + m(), p + t + 2 * (s - t) * d + m(), e + (y ? 0 : m()), s + (y ? 0 : m())] }), f;
}
function Jt(i, t, e) {
  if (!i.length)
    return [];
  const s = [];
  s.push([i[0][0] + R(t, e), i[0][1] + R(t, e)]), s.push([i[0][0] + R(t, e), i[0][1] + R(t, e)]);
  for (let n = 1; n < i.length; n++)
    s.push([i[n][0] + R(t, e), i[n][1] + R(t, e)]), n === i.length - 1 && s.push([i[n][0] + R(t, e), i[n][1] + R(t, e)]);
  return ui(s, null, e);
}
function ui(i, t, e) {
  const s = i.length, n = [];
  if (s > 3) {
    const h = [], a = 1 - e.curveTightness;
    n.push({ op: "move", data: [i[1][0], i[1][1]] });
    for (let r = 1; r + 2 < s; r++) {
      const o = i[r];
      h[0] = [o[0], o[1]], h[1] = [o[0] + (a * i[r + 1][0] - a * i[r - 1][0]) / 6, o[1] + (a * i[r + 1][1] - a * i[r - 1][1]) / 6], h[2] = [i[r + 1][0] + (a * i[r][0] - a * i[r + 2][0]) / 6, i[r + 1][1] + (a * i[r][1] - a * i[r + 2][1]) / 6], h[3] = [i[r + 1][0], i[r + 1][1]], n.push({ op: "bcurveTo", data: [h[1][0], h[1][1], h[2][0], h[2][1], h[3][0], h[3][1]] });
    }
    if (t && t.length === 2) {
      const r = e.maxRandomnessOffset;
      n.push({ op: "lineTo", data: [t[0] + R(r, e), t[1] + R(r, e)] });
    }
  } else
    s === 3 ? (n.push({ op: "move", data: [i[1][0], i[1][1]] }), n.push({ op: "bcurveTo", data: [i[1][0], i[1][1], i[2][0], i[2][1], i[2][0], i[2][1]] })) : s === 2 && n.push(...Ui(i[0][0], i[0][1], i[1][0], i[1][1], e, !0, !0));
  return n;
}
function _e(i, t, e, s, n, h, a, r) {
  const o = [], l = [];
  if (r.roughness === 0) {
    i /= 4, l.push([t + s * Math.cos(-i), e + n * Math.sin(-i)]);
    for (let u = 0; u <= 2 * Math.PI; u += i) {
      const c = [t + s * Math.cos(u), e + n * Math.sin(u)];
      o.push(c), l.push(c);
    }
    l.push([t + s * Math.cos(0), e + n * Math.sin(0)]), l.push([t + s * Math.cos(i), e + n * Math.sin(i)]);
  } else {
    const u = R(0.5, r) - Math.PI / 2;
    l.push([R(h, r) + t + 0.9 * s * Math.cos(u - i), R(h, r) + e + 0.9 * n * Math.sin(u - i)]);
    const c = 2 * Math.PI + u - 0.01;
    for (let d = u; d < c; d += i) {
      const g = [R(h, r) + t + s * Math.cos(d), R(h, r) + e + n * Math.sin(d)];
      o.push(g), l.push(g);
    }
    l.push([R(h, r) + t + s * Math.cos(u + 2 * Math.PI + 0.5 * a), R(h, r) + e + n * Math.sin(u + 2 * Math.PI + 0.5 * a)]), l.push([R(h, r) + t + 0.98 * s * Math.cos(u + a), R(h, r) + e + 0.98 * n * Math.sin(u + a)]), l.push([R(h, r) + t + 0.9 * s * Math.cos(u + 0.5 * a), R(h, r) + e + 0.9 * n * Math.sin(u + 0.5 * a)]);
  }
  return [l, o];
}
function $e(i, t, e, s, n, h, a, r, o) {
  const l = h + R(0.1, o), u = [];
  u.push([R(r, o) + t + 0.9 * s * Math.cos(l - i), R(r, o) + e + 0.9 * n * Math.sin(l - i)]);
  for (let c = l; c <= a; c += i)
    u.push([R(r, o) + t + s * Math.cos(c), R(r, o) + e + n * Math.sin(c)]);
  return u.push([t + s * Math.cos(a), e + n * Math.sin(a)]), u.push([t + s * Math.cos(a), e + n * Math.sin(a)]), ui(u, null, o);
}
function zr(i, t, e, s, n, h, a, r) {
  const o = [], l = [r.maxRandomnessOffset || 1, (r.maxRandomnessOffset || 1) + 0.3];
  let u = [0, 0];
  const c = r.disableMultiStroke ? 1 : 2, d = r.preserveVertices;
  for (let g = 0; g < c; g++)
    g === 0 ? o.push({ op: "move", data: [a[0], a[1]] }) : o.push({ op: "move", data: [a[0] + (d ? 0 : R(l[0], r)), a[1] + (d ? 0 : R(l[0], r))] }), u = d ? [n, h] : [n + R(l[g], r), h + R(l[g], r)], o.push({ op: "bcurveTo", data: [i + R(l[g], r), t + R(l[g], r), e + R(l[g], r), s + R(l[g], r), u[0], u[1]] });
  return o;
}
function jt(i) {
  return [...i];
}
function ts(i, t = 0) {
  const e = i.length;
  if (e < 3)
    throw new Error("A curve must have at least three points.");
  const s = [];
  if (e === 3)
    s.push(jt(i[0]), jt(i[1]), jt(i[2]), jt(i[2]));
  else {
    const n = [];
    n.push(i[0], i[0]);
    for (let r = 1; r < i.length; r++)
      n.push(i[r]), r === i.length - 1 && n.push(i[r]);
    const h = [], a = 1 - t;
    s.push(jt(n[0]));
    for (let r = 1; r + 2 < n.length; r++) {
      const o = n[r];
      h[0] = [o[0], o[1]], h[1] = [o[0] + (a * n[r + 1][0] - a * n[r - 1][0]) / 6, o[1] + (a * n[r + 1][1] - a * n[r - 1][1]) / 6], h[2] = [n[r + 1][0] + (a * n[r][0] - a * n[r + 2][0]) / 6, n[r + 1][1] + (a * n[r][1] - a * n[r + 2][1]) / 6], h[3] = [n[r + 1][0], n[r + 1][1]], s.push(h[1], h[2], h[3]);
    }
  }
  return s;
}
function ii(i, t) {
  return Math.pow(i[0] - t[0], 2) + Math.pow(i[1] - t[1], 2);
}
function Fr(i, t, e) {
  const s = ii(t, e);
  if (s === 0)
    return ii(i, t);
  let n = ((i[0] - t[0]) * (e[0] - t[0]) + (i[1] - t[1]) * (e[1] - t[1])) / s;
  return n = Math.max(0, Math.min(1, n)), ii(i, pt(t, e, n));
}
function pt(i, t, e) {
  return [i[0] + (t[0] - i[0]) * e, i[1] + (t[1] - i[1]) * e];
}
function Ji(i, t, e, s) {
  const n = s || [];
  if (function(r, o) {
    const l = r[o + 0], u = r[o + 1], c = r[o + 2], d = r[o + 3];
    let g = 3 * u[0] - 2 * l[0] - d[0];
    g *= g;
    let p = 3 * u[1] - 2 * l[1] - d[1];
    p *= p;
    let f = 3 * c[0] - 2 * d[0] - l[0];
    f *= f;
    let A = 3 * c[1] - 2 * d[1] - l[1];
    return A *= A, g < f && (g = f), p < A && (p = A), g + p;
  }(i, t) < e) {
    const r = i[t + 0];
    n.length ? (h = n[n.length - 1], a = r, Math.sqrt(ii(h, a)) > 1 && n.push(r)) : n.push(r), n.push(i[t + 3]);
  } else {
    const o = i[t + 0], l = i[t + 1], u = i[t + 2], c = i[t + 3], d = pt(o, l, 0.5), g = pt(l, u, 0.5), p = pt(u, c, 0.5), f = pt(d, g, 0.5), A = pt(g, p, 0.5), m = pt(f, A, 0.5);
    Ji([o, d, f, m], 0, e, n), Ji([m, A, p, c], 0, e, n);
  }
  var h, a;
  return n;
}
function Wr(i, t) {
  return ci(i, 0, i.length, t);
}
function ci(i, t, e, s, n) {
  const h = n || [], a = i[t], r = i[e - 1];
  let o = 0, l = 1;
  for (let u = t + 1; u < e - 1; ++u) {
    const c = Fr(i[u], a, r);
    c > o && (o = c, l = u);
  }
  return Math.sqrt(o) > s ? (ci(i, t, l + 1, s, h), ci(i, l, e, s, h)) : (h.length || h.push(a), h.push(r)), h;
}
function Li(i, t = 0.15, e) {
  const s = [], n = (i.length - 1) / 3;
  for (let h = 0; h < n; h++)
    Ji(i, 3 * h, t, s);
  return e && e > 0 ? ci(s, 0, s.length, e) : s;
}
const Q = "none";
class jr {
  constructor(t) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: !1, disableMultiStrokeFill: !1, preserveVertices: !1, fillShapeRoughnessGain: 0.8 }, this.config = t || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(t) {
    return t ? Object.assign({}, this.defaultOptions, t) : this.defaultOptions;
  }
  _d(t, e, s) {
    return { shape: t, sets: e || [], options: s || this.defaultOptions };
  }
  line(t, e, s, n, h) {
    const a = this._o(h);
    return this._d("line", [Es(t, e, s, n, a)], a);
  }
  rectangle(t, e, s, n, h) {
    const a = this._o(h), r = [], o = function(l, u, c, d, g) {
      return function(p, f) {
        return Ut(p, !0, f);
      }([[l, u], [l + c, u], [l + c, u + d], [l, u + d]], g);
    }(t, e, s, n, a);
    if (a.fill) {
      const l = [[t, e], [t + s, e], [t + s, e + n], [t, e + n]];
      a.fillStyle === "solid" ? r.push(Gi([l], a)) : r.push(kt([l], a));
    }
    return a.stroke !== Q && r.push(o), this._d("rectangle", r, a);
  }
  ellipse(t, e, s, n, h) {
    const a = this._o(h), r = [], o = Is(s, n, a), l = Qi(t, e, a, o);
    if (a.fill)
      if (a.fillStyle === "solid") {
        const u = Qi(t, e, a, o).opset;
        u.type = "fillPath", r.push(u);
      } else
        r.push(kt([l.estimatedPoints], a));
    return a.stroke !== Q && r.push(l.opset), this._d("ellipse", r, a);
  }
  circle(t, e, s, n) {
    const h = this.ellipse(t, e, s, s, n);
    return h.shape = "circle", h;
  }
  linearPath(t, e) {
    const s = this._o(e);
    return this._d("linearPath", [Ut(t, !1, s)], s);
  }
  arc(t, e, s, n, h, a, r = !1, o) {
    const l = this._o(o), u = [], c = Qe(t, e, s, n, h, a, r, !0, l);
    if (r && l.fill)
      if (l.fillStyle === "solid") {
        const d = Object.assign({}, l);
        d.disableMultiStroke = !0;
        const g = Qe(t, e, s, n, h, a, !0, !1, d);
        g.type = "fillPath", u.push(g);
      } else
        u.push(function(d, g, p, f, A, m, y) {
          const b = d, k = g;
          let w = Math.abs(p / 2), v = Math.abs(f / 2);
          w += R(0.01 * w, y), v += R(0.01 * v, y);
          let M = A, j = m;
          for (; M < 0; )
            M += 2 * Math.PI, j += 2 * Math.PI;
          j - M > 2 * Math.PI && (M = 0, j = 2 * Math.PI);
          const O = (j - M) / y.curveStepCount, z = [];
          for (let F = M; F <= j; F += O)
            z.push([b + w * Math.cos(F), k + v * Math.sin(F)]);
          return z.push([b + w * Math.cos(j), k + v * Math.sin(j)]), z.push([b, k]), kt([z], y);
        }(t, e, s, n, h, a, l));
    return l.stroke !== Q && u.push(c), this._d("arc", u, l);
  }
  curve(t, e) {
    const s = this._o(e), n = [], h = Ke(t, s);
    if (s.fill && s.fill !== Q)
      if (s.fillStyle === "solid") {
        const a = Ke(t, Object.assign(Object.assign({}, s), { disableMultiStroke: !0, roughness: s.roughness ? s.roughness + s.fillShapeRoughnessGain : 0 }));
        n.push({ type: "fillPath", ops: this._mergedShape(a.ops) });
      } else {
        const a = [], r = t;
        if (r.length) {
          const o = typeof r[0][0] == "number" ? [r] : r;
          for (const l of o)
            l.length < 3 ? a.push(...l) : l.length === 3 ? a.push(...Li(ts([l[0], l[0], l[1], l[2]]), 10, (1 + s.roughness) / 2)) : a.push(...Li(ts(l), 10, (1 + s.roughness) / 2));
        }
        a.length && n.push(kt([a], s));
      }
    return s.stroke !== Q && n.push(h), this._d("curve", n, s);
  }
  polygon(t, e) {
    const s = this._o(e), n = [], h = Ut(t, !0, s);
    return s.fill && (s.fillStyle === "solid" ? n.push(Gi([t], s)) : n.push(kt([t], s))), s.stroke !== Q && n.push(h), this._d("polygon", n, s);
  }
  path(t, e) {
    const s = this._o(e), n = [];
    if (!t)
      return this._d("path", n, s);
    t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const h = s.fill && s.fill !== "transparent" && s.fill !== Q, a = s.stroke !== Q, r = !!(s.simplification && s.simplification < 1), o = function(u, c, d) {
      const g = Os(js(oe(u))), p = [];
      let f = [], A = [0, 0], m = [];
      const y = () => {
        m.length >= 4 && f.push(...Li(m, 1)), m = [];
      }, b = () => {
        y(), f.length && (p.push(f), f = []);
      };
      for (const { key: w, data: v } of g)
        switch (w) {
          case "M":
            b(), A = [v[0], v[1]], f.push(A);
            break;
          case "L":
            y(), f.push([v[0], v[1]]);
            break;
          case "C":
            if (!m.length) {
              const M = f.length ? f[f.length - 1] : A;
              m.push([M[0], M[1]]);
            }
            m.push([v[0], v[1]]), m.push([v[2], v[3]]), m.push([v[4], v[5]]);
            break;
          case "Z":
            y(), f.push([A[0], A[1]]);
        }
      if (b(), !d)
        return p;
      const k = [];
      for (const w of p) {
        const v = Wr(w, d);
        v.length && k.push(v);
      }
      return k;
    }(t, 0, r ? 4 - 4 * (s.simplification || 1) : (1 + s.roughness) / 2), l = Ue(t, s);
    if (h)
      if (s.fillStyle === "solid")
        if (o.length === 1) {
          const u = Ue(t, Object.assign(Object.assign({}, s), { disableMultiStroke: !0, roughness: s.roughness ? s.roughness + s.fillShapeRoughnessGain : 0 }));
          n.push({ type: "fillPath", ops: this._mergedShape(u.ops) });
        } else
          n.push(Gi(o, s));
      else
        n.push(kt(o, s));
    return a && (r ? o.forEach((u) => {
      n.push(Ut(u, !1, s));
    }) : n.push(l)), this._d("path", n, s);
  }
  opsToPath(t, e) {
    let s = "";
    for (const n of t.ops) {
      const h = typeof e == "number" && e >= 0 ? n.data.map((a) => +a.toFixed(e)) : n.data;
      switch (n.op) {
        case "move":
          s += `M${h[0]} ${h[1]} `;
          break;
        case "bcurveTo":
          s += `C${h[0]} ${h[1]}, ${h[2]} ${h[3]}, ${h[4]} ${h[5]} `;
          break;
        case "lineTo":
          s += `L${h[0]} ${h[1]} `;
      }
    }
    return s.trim();
  }
  toPaths(t) {
    const e = t.sets || [], s = t.options || this.defaultOptions, n = [];
    for (const h of e) {
      let a = null;
      switch (h.type) {
        case "path":
          a = { d: this.opsToPath(h), stroke: s.stroke, strokeWidth: s.strokeWidth, fill: Q };
          break;
        case "fillPath":
          a = { d: this.opsToPath(h), stroke: Q, strokeWidth: 0, fill: s.fill || Q };
          break;
        case "fillSketch":
          a = this.fillSketch(h, s);
      }
      a && n.push(a);
    }
    return n;
  }
  fillSketch(t, e) {
    let s = e.fillWeight;
    return s < 0 && (s = e.strokeWidth / 2), { d: this.opsToPath(t), stroke: e.fill || Q, strokeWidth: s, fill: Q };
  }
  _mergedShape(t) {
    return t.filter((e, s) => s === 0 || e.op !== "move");
  }
}
const _t = "http://www.w3.org/2000/svg";
class Or {
  constructor(t, e) {
    this.svg = t, this.gen = new jr(e);
  }
  draw(t) {
    const e = t.sets || [], s = t.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, h = n.createElementNS(_t, "g"), a = t.options.fixedDecimalPlaceDigits;
    for (const r of e) {
      let o = null;
      switch (r.type) {
        case "path":
          o = n.createElementNS(_t, "path"), o.setAttribute("d", this.opsToPath(r, a)), o.setAttribute("stroke", s.stroke), o.setAttribute("stroke-width", s.strokeWidth + ""), o.setAttribute("fill", "none"), s.strokeLineDash && o.setAttribute("stroke-dasharray", s.strokeLineDash.join(" ").trim()), s.strokeLineDashOffset && o.setAttribute("stroke-dashoffset", `${s.strokeLineDashOffset}`);
          break;
        case "fillPath":
          o = n.createElementNS(_t, "path"), o.setAttribute("d", this.opsToPath(r, a)), o.setAttribute("stroke", "none"), o.setAttribute("stroke-width", "0"), o.setAttribute("fill", s.fill || ""), t.shape !== "curve" && t.shape !== "polygon" || o.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          o = this.fillSketch(n, r, s);
      }
      o && h.appendChild(o);
    }
    return h;
  }
  fillSketch(t, e, s) {
    let n = s.fillWeight;
    n < 0 && (n = s.strokeWidth / 2);
    const h = t.createElementNS(_t, "path");
    return h.setAttribute("d", this.opsToPath(e, s.fixedDecimalPlaceDigits)), h.setAttribute("stroke", s.fill || ""), h.setAttribute("stroke-width", n + ""), h.setAttribute("fill", "none"), s.fillLineDash && h.setAttribute("stroke-dasharray", s.fillLineDash.join(" ").trim()), s.fillLineDashOffset && h.setAttribute("stroke-dashoffset", `${s.fillLineDashOffset}`), h;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(t, e) {
    return this.gen.opsToPath(t, e);
  }
  line(t, e, s, n, h) {
    const a = this.gen.line(t, e, s, n, h);
    return this.draw(a);
  }
  rectangle(t, e, s, n, h) {
    const a = this.gen.rectangle(t, e, s, n, h);
    return this.draw(a);
  }
  ellipse(t, e, s, n, h) {
    const a = this.gen.ellipse(t, e, s, n, h);
    return this.draw(a);
  }
  circle(t, e, s, n) {
    const h = this.gen.circle(t, e, s, n);
    return this.draw(h);
  }
  linearPath(t, e) {
    const s = this.gen.linearPath(t, e);
    return this.draw(s);
  }
  polygon(t, e) {
    const s = this.gen.polygon(t, e);
    return this.draw(s);
  }
  arc(t, e, s, n, h, a, r = !1, o) {
    const l = this.gen.arc(t, e, s, n, h, a, r, o);
    return this.draw(l);
  }
  curve(t, e) {
    const s = this.gen.curve(t, e);
    return this.draw(s);
  }
  path(t, e) {
    const s = this.gen.path(t, e);
    return this.draw(s);
  }
}
var Y = (i, t) => new Or(i, t);
class ot {
  constructor(t) {
    this.el = t.element, this.element = t.element, this.title = t.title, this.titleFontSize = t.titleFontSize || "17px", this.font = t.font || 0, this.fillStyle = t.fillStyle, this.tooltipFontSize = t.tooltipFontSize || "0.95rem", this.bowing = t.bowing || 0, this.simplification = t.simplification || 0.2, this.interactive = t.interactive !== !1, this.dataFormat = typeof t.data == "object" ? "object" : "file";
  }
  setSvg() {
    this.svg = x(this.el).append("svg").attr("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right}
       ${this.height + this.margin.top + this.margin.bottom}`).append("g").attr("id", this.roughId).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }
  resolveFont() {
    this.font === 0 || this.font === void 0 || this.font.toString().toLowerCase() === "gaegu" ? (this.svg.append("defs").append("style").attr("type", "text/css").text(`@font-face {
    font-family: 'gaeguregular';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
         url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}`), this.fontFamily = "gaeguregular") : this.font === 1 || this.font.toString().toLowerCase() === "indie flower" ? (((t) => {
      t.append("defs").append("style").attr("type", "text/css").text(`@font-face {
    font-family: 'indie_flowerregular';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
         url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
	}`);
    })(this.svg), this.fontFamily = "indie_flowerregular") : this.fontFamily = this.font;
  }
}
const at = ({ roughness: i, ceiling: t = 20, defaultValue: e = 1 }) => i === void 0 || typeof i != "number" ? e : i > t ? t : i;
class sh extends ot {
  constructor(t) {
    super(t), this.data = t.data, this.margin = t.margin || { top: 20, right: 10, bottom: 20, left: 20 }, this.color = t.color || "red", this.highlight = t.highlight || "coral", this.roughness = at({ roughness: t.roughness }), this.stroke = t.stroke || "black", this.strokeWidth = t.strokeWidth || 1, this.axisStrokeWidth = t.axisStrokeWidth || 0.5, this.axisRoughness = t.axisRoughness || 0.5, this.innerStrokeWidth = t.innerStrokeWidth || 1, this.fillWeight = t.fillWeight || 0.5, this.axisFontSize = t.axisFontSize, this.labels = this.dataFormat === "object" ? "labels" : t.labels, this.values = this.dataFormat === "object" ? "values" : t.values, this.xValueFormat = t.xValueFormat, this.yValueFormat = t.yValueFormat, this.padding = t.padding || 0.1, this.xLabel = t.xLabel || "", this.yLabel = t.yLabel || "", this.labelFontSize = t.labelFontSize || "1rem", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove(), x(this.el).select(".tooltip").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.color = t.color || this.color, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle, this.title = t.title || this.title;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  addScales() {
    const t = this;
    this.xScale = Ht().rangeRound([0, this.width]).padding(this.padding).domain(this.dataFormat === "file" ? this.data.map((e) => e[t.labels]) : this.data[t.labels]), this.yScale = Z().rangeRound([this.height, 0]).domain(this.dataFormat === "file" ? [0, q(this.data, (e) => +e[t.values])] : [0, q(this.data[t.values])]);
  }
  addLabels() {
    this.xLabel !== "" && this.svg.append("text").attr("x", this.width / 2).attr("y", this.height + this.margin.bottom / 2).attr("dx", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.xLabel), this.yLabel !== "" && this.svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - this.margin.left / 1.4).attr("x", 0 - this.height / 2).attr("dy", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.yLabel);
  }
  addAxes() {
    const t = Dt(this.xScale).tickSize(0).tickFormat((s) => this.xValueFormat ? ht(this.xValueFormat)(s) : s), e = qt(this.yScale).tickSize(0).tickFormat((s) => this.yValueFormat ? ht(this.yValueFormat)(s) : s);
    this.svg.append("g").attr("transform", "translate(0," + this.height + ")").call(t).attr("class", `xAxis${this.graphClass}`).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.8, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.9), this.svg.append("g").call(e).attr("class", `yAxis${this.graphClass}`).selectAll("text").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.9), P("path.domain").attr("stroke", "transparent");
  }
  makeAxesRough(t, e) {
    const s = `xAxis${this.graphClass}`, n = `yAxis${this.graphClass}`, h = `rough-${s}`, a = `rough-${n}`;
    x(`.${s}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { fillStyle: "hachure" });
      u.setAttribute("class", h), t.appendChild(u);
    }), P(`.${h}`).attr("transform", `translate(0, ${this.height})`), x(`.${n}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { fillStyle: "hachure" });
      u.setAttribute("class", a), t.appendChild(u);
    });
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 5)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    P(this.interactionG).data(this.dataFormat === "file" ? this.data : this.data.values).append("rect").attr("x", (s, n) => this.dataFormat === "file" ? this.xScale(s[this.labels]) : this.xScale(this.data[this.labels][n])).attr("y", (s, n) => this.dataFormat === "file" ? this.yScale(+s[this.values]) : this.yScale(this.data[this.values][n])).attr("width", this.xScale.bandwidth()).attr("height", (s, n) => this.dataFormat === "file" ? this.height - this.yScale(+s[this.values]) : this.height - this.yScale(this.data[this.values][n])).attr("fill", "transparent");
    const t = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none"), e = this;
    P(this.interactionG).on("mouseover", function() {
      t.style("opacity", 1), x(this).select("path").style("stroke", e.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth + 1.2);
    }), P(this.interactionG).on("mouseout", function() {
      t.style("opacity", 0), x(this).select("path").style("stroke", e.color), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth);
    }), P(this.interactionG).on("mousemove", function(s) {
      const n = x(this).attr("attrX"), h = x(this).attr("attrY"), a = bt(this);
      t.html(`<b>${n}</b>: ${h}`).style("opacity", 0.95).style("transform", `translate(${a[0] + 10 + e.margin.left}px, 
              ${a[1] - 10 - (e.height + e.margin.top + e.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.axisStrokeWidth, roughness: this.axisRoughness } }), this.rc = Y(this.roughSvg, { options: { fill: this.color, stroke: this.stroke === "none" ? void 0 : this.stroke, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.values.forEach((t, e) => {
      const s = this.rc.rectangle(this.xScale(this.data[this.labels][e]), this.yScale(+t), this.xScale.bandwidth(), this.height - this.yScale(+t), { simplification: this.simplification, fillWeight: this.fillWeight }), n = this.roughSvg.appendChild(s);
      n.setAttribute("class", this.graphClass), n.setAttribute("attrX", this.data[this.labels][e]), n.setAttribute("attrY", +t);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.forEach((t) => {
      const e = this.rc.rectangle(this.xScale(t[this.labels]), this.yScale(+t[this.values]), this.xScale.bandwidth(), this.height - this.yScale(+t[this.values]), { simplification: this.simplification, fillWeight: this.fillWeight }), s = this.roughSvg.appendChild(e);
      s.setAttribute("class", this.graphClass), s.setAttribute("attrX", t[this.labels]), s.setAttribute("attrY", +t[this.values]);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
}
class nh extends ot {
  constructor(t) {
    super(t), this.margin = t.margin || { top: 50, right: 20, bottom: 50, left: 100 }, this.color = t.color || "red", this.highlight = t.highlight || "coral", this.roughness = at({ roughness: t.roughness }), this.stroke = t.stroke || "black", this.strokeWidth = t.strokeWidth || 1, this.axisStrokeWidth = t.axisStrokeWidth || 0.5, this.axisRoughness = t.axisRoughness || 0.5, this.innerStrokeWidth = t.innerStrokeWidth || 1, this.fillWeight = t.fillWeight || 0.5, this.axisFontSize = t.axisFontSize, this.labels = this.dataFormat === "object" ? "labels" : t.labels, this.values = this.dataFormat === "object" ? "values" : t.values, this.xValueFormat = t.xValueFormat, this.yValueFormat = t.yValueFormat, this.padding = t.padding || 0.1, this.xLabel = t.xLabel || "", this.yLabel = t.yLabel || "", this.labelFontSize = t.labelFontSize || "1rem", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.color = t.color || this.color, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  addScales() {
    const t = this;
    this.yScale = Ht().rangeRound([0, this.height]).padding(this.padding).domain(this.dataFormat === "file" ? this.data.map((e) => e[t.labels]) : this.data[t.labels]), this.xScale = Z().rangeRound([0, this.width]).domain(this.dataFormat === "file" ? [0, q(this.data, (e) => +e[t.values])] : [0, q(this.data[t.values])]);
  }
  addLabels() {
    this.xLabel !== "" && this.svg.append("text").attr("x", this.width / 2).attr("y", this.height + this.margin.bottom / 2.4).attr("dx", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.xLabel), this.yLabel !== "" && this.svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - this.margin.left / 1.5).attr("x", 0 - this.height / 2).attr("dy", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.yLabel);
  }
  addAxes() {
    const t = Dt(this.xScale).tickSize(0).tickFormat((s) => this.xValueFormat ? ht(this.xValueFormat)(s) : s), e = qt(this.yScale).tickSize(0).tickFormat((s) => this.yValueFormat ? ht(this.yValueFormat)(s) : s);
    this.svg.append("g").attr("transform", `translate(0, ${this.height})`).call(t).attr("class", `xAxis${this.graphClass}`).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.85), this.svg.append("g").call(e).attr("class", `yAxis${this.graphClass}`).selectAll("text").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.85), P("path.domain").attr("stroke", "transparent");
  }
  makeAxesRough(t, e) {
    const s = `xAxis${this.graphClass}`, n = `yAxis${this.graphClass}`, h = `rough-${s}`, a = `rough-${n}`;
    x(`.${s}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", h), t.appendChild(u);
    }), P(`.${h}`).attr("transform", `translate(0, ${this.height})`), x(`.${n}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", a), t.appendChild(u);
    });
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 5)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    P(this.interactionG).data(this.dataFormat === "file" ? this.data : this.data.values).append("rect").attr("x", 0).attr("y", (s, n) => this.dataFormat === "file" ? this.yScale(s[this.labels]) : this.yScale(this.data[this.labels][n])).attr("width", (s, n) => this.dataFormat === "file" ? this.xScale(+s[this.values]) : this.xScale(this.data[this.values][n])).attr("height", this.yScale.bandwidth()).attr("fill", "transparent");
    const t = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none"), e = this;
    P(this.interactionG).on("mouseover", function() {
      t.style("opacity", 1), x(this).select("path").style("stroke", e.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth + 1.2);
    }), P(this.interactionG).on("mouseout", function() {
      t.style("opacity", 0), x(this).select("path").style("stroke", e.color), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth);
    }), P(this.interactionG).on("mousemove", function(s) {
      const n = x(this).attr("attrX"), h = x(this).attr("attrY"), a = bt(this);
      t.html(`<b>${n}</b>: ${h}`).style("opacity", 0.95).style("transform", `translate(${a[0] + e.margin.left}px, 
              ${a[1] - (e.height + e.margin.top + e.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.axisStrokeWidth, roughness: this.axisRoughness } }), this.rc = Y(this.roughSvg, { options: { fill: this.color, stroke: this.stroke === "none" ? void 0 : this.stroke, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.values.forEach((t, e) => {
      const s = this.rc.rectangle(0, this.yScale(this.data[this.labels][e]), this.xScale(t), this.yScale.bandwidth(), { simplification: this.simplification, fillWeight: this.fillWeight }), n = this.roughSvg.appendChild(s);
      n.setAttribute("class", this.graphClass), n.setAttribute("attrX", this.data[this.labels][e]), n.setAttribute("attrY", +t);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.forEach((t) => {
      const e = this.rc.rectangle(0, this.yScale(t[this.labels]), this.xScale(+t[this.values]), this.yScale.bandwidth(), { simplification: this.simplification, fillWeight: this.fillWeight }), s = this.roughSvg.appendChild(e);
      s.setAttribute("class", this.graphClass), s.setAttribute("attrX", t[this.labels]), s.setAttribute("attrY", +t[this.values]);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
}
var _i = Math.PI, $i = 2 * _i, mt = 1e-6, Cr = $i - mt;
function te() {
  this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
}
function le() {
  return new te();
}
function B(i) {
  return function() {
    return i;
  };
}
te.prototype = le.prototype = { constructor: te, moveTo: function(i, t) {
  this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +t);
}, closePath: function() {
  this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
}, lineTo: function(i, t) {
  this._ += "L" + (this._x1 = +i) + "," + (this._y1 = +t);
}, quadraticCurveTo: function(i, t, e, s) {
  this._ += "Q" + +i + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +s);
}, bezierCurveTo: function(i, t, e, s, n, h) {
  this._ += "C" + +i + "," + +t + "," + +e + "," + +s + "," + (this._x1 = +n) + "," + (this._y1 = +h);
}, arcTo: function(i, t, e, s, n) {
  i = +i, t = +t, e = +e, s = +s, n = +n;
  var h = this._x1, a = this._y1, r = e - i, o = s - t, l = h - i, u = a - t, c = l * l + u * u;
  if (n < 0)
    throw new Error("negative radius: " + n);
  if (this._x1 === null)
    this._ += "M" + (this._x1 = i) + "," + (this._y1 = t);
  else if (c > mt)
    if (Math.abs(u * r - o * l) > mt && n) {
      var d = e - h, g = s - a, p = r * r + o * o, f = d * d + g * g, A = Math.sqrt(p), m = Math.sqrt(c), y = n * Math.tan((_i - Math.acos((p + c - f) / (2 * A * m))) / 2), b = y / m, k = y / A;
      Math.abs(b - 1) > mt && (this._ += "L" + (i + b * l) + "," + (t + b * u)), this._ += "A" + n + "," + n + ",0,0," + +(u * d > l * g) + "," + (this._x1 = i + k * r) + "," + (this._y1 = t + k * o);
    } else
      this._ += "L" + (this._x1 = i) + "," + (this._y1 = t);
}, arc: function(i, t, e, s, n, h) {
  i = +i, t = +t, h = !!h;
  var a = (e = +e) * Math.cos(s), r = e * Math.sin(s), o = i + a, l = t + r, u = 1 ^ h, c = h ? s - n : n - s;
  if (e < 0)
    throw new Error("negative radius: " + e);
  this._x1 === null ? this._ += "M" + o + "," + l : (Math.abs(this._x1 - o) > mt || Math.abs(this._y1 - l) > mt) && (this._ += "L" + o + "," + l), e && (c < 0 && (c = c % $i + $i), c > Cr ? this._ += "A" + e + "," + e + ",0,1," + u + "," + (i - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + u + "," + (this._x1 = o) + "," + (this._y1 = l) : c > mt && (this._ += "A" + e + "," + e + ",0," + +(c >= _i) + "," + u + "," + (this._x1 = i + e * Math.cos(n)) + "," + (this._y1 = t + e * Math.sin(n))));
}, rect: function(i, t, e, s) {
  this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +s + "h" + -e + "Z";
}, toString: function() {
  return this._;
} };
var is = Math.abs, V = Math.atan2, ft = Math.cos, Er = Math.max, Zi = Math.min, st = Math.sin, Mt = Math.sqrt, X = 1e-12, Zt = Math.PI, di = Zt / 2, ei = 2 * Zt;
function es(i) {
  return i >= 1 ? di : i <= -1 ? -di : Math.asin(i);
}
function Ir(i) {
  return i.innerRadius;
}
function Gr(i) {
  return i.outerRadius;
}
function Lr(i) {
  return i.startAngle;
}
function Zr(i) {
  return i.endAngle;
}
function Br(i) {
  return i && i.padAngle;
}
function $t(i, t, e, s, n, h, a) {
  var r = i - e, o = t - s, l = (a ? h : -h) / Mt(r * r + o * o), u = l * o, c = -l * r, d = i + u, g = t + c, p = e + u, f = s + c, A = (d + p) / 2, m = (g + f) / 2, y = p - d, b = f - g, k = y * y + b * b, w = n - h, v = d * f - p * g, M = (b < 0 ? -1 : 1) * Mt(Er(0, w * w * k - v * v)), j = (v * b - y * M) / k, O = (-v * y - b * M) / k, z = (v * b + y * M) / k, F = (-v * y + b * M) / k, S = j - A, W = O - m, C = z - A, I = F - m;
  return S * S + W * W > C * C + I * I && (j = z, O = F), { cx: j, cy: O, x01: -u, y01: -c, x11: j * (n / w - 1), y11: O * (n / w - 1) };
}
function gi() {
  var i = Ir, t = Gr, e = B(0), s = null, n = Lr, h = Zr, a = Br, r = null;
  function o() {
    var l, u, c = +i.apply(this, arguments), d = +t.apply(this, arguments), g = n.apply(this, arguments) - di, p = h.apply(this, arguments) - di, f = is(p - g), A = p > g;
    if (r || (r = l = le()), d < c && (u = d, d = c, c = u), d > X)
      if (f > ei - X)
        r.moveTo(d * ft(g), d * st(g)), r.arc(0, 0, d, g, p, !A), c > X && (r.moveTo(c * ft(p), c * st(p)), r.arc(0, 0, c, p, g, A));
      else {
        var m, y, b = g, k = p, w = g, v = p, M = f, j = f, O = a.apply(this, arguments) / 2, z = O > X && (s ? +s.apply(this, arguments) : Mt(c * c + d * d)), F = Zi(is(d - c) / 2, +e.apply(this, arguments)), S = F, W = F;
        if (z > X) {
          var C = es(z / c * st(O)), I = es(z / d * st(O));
          (M -= 2 * C) > X ? (w += C *= A ? 1 : -1, v -= C) : (M = 0, w = v = (g + p) / 2), (j -= 2 * I) > X ? (b += I *= A ? 1 : -1, k -= I) : (j = 0, b = k = (g + p) / 2);
        }
        var E = d * ft(b), G = d * st(b), J = c * ft(v), _ = c * st(v);
        if (F > X) {
          var L, $ = d * ft(k), lt = d * st(k), zt = c * ft(w), tt = c * st(w);
          if (f < Zt && (L = function(gt, Si, Xs, Ks, ge, fe, Qs, Us) {
            var pe = Xs - gt, me = Ks - Si, Ae = Qs - ge, ye = Us - fe, Ft = ye * pe - Ae * me;
            if (!(Ft * Ft < X))
              return [gt + (Ft = (Ae * (Si - fe) - ye * (gt - ge)) / Ft) * pe, Si + Ft * me];
          }(E, G, zt, tt, $, lt, J, _))) {
            var it = E - L[0], vi = G - L[1], bi = $ - L[0], ki = lt - L[1], ce = 1 / st(function(gt) {
              return gt > 1 ? 0 : gt < -1 ? Zt : Math.acos(gt);
            }((it * bi + vi * ki) / (Mt(it * it + vi * vi) * Mt(bi * bi + ki * ki))) / 2), de = Mt(L[0] * L[0] + L[1] * L[1]);
            S = Zi(F, (c - de) / (ce - 1)), W = Zi(F, (d - de) / (ce + 1));
          }
        }
        j > X ? W > X ? (m = $t(zt, tt, E, G, d, W, A), y = $t($, lt, J, _, d, W, A), r.moveTo(m.cx + m.x01, m.cy + m.y01), W < F ? r.arc(m.cx, m.cy, W, V(m.y01, m.x01), V(y.y01, y.x01), !A) : (r.arc(m.cx, m.cy, W, V(m.y01, m.x01), V(m.y11, m.x11), !A), r.arc(0, 0, d, V(m.cy + m.y11, m.cx + m.x11), V(y.cy + y.y11, y.cx + y.x11), !A), r.arc(y.cx, y.cy, W, V(y.y11, y.x11), V(y.y01, y.x01), !A))) : (r.moveTo(E, G), r.arc(0, 0, d, b, k, !A)) : r.moveTo(E, G), c > X && M > X ? S > X ? (m = $t(J, _, $, lt, c, -S, A), y = $t(E, G, zt, tt, c, -S, A), r.lineTo(m.cx + m.x01, m.cy + m.y01), S < F ? r.arc(m.cx, m.cy, S, V(m.y01, m.x01), V(y.y01, y.x01), !A) : (r.arc(m.cx, m.cy, S, V(m.y01, m.x01), V(m.y11, m.x11), !A), r.arc(0, 0, c, V(m.cy + m.y11, m.cx + m.x11), V(y.cy + y.y11, y.cx + y.x11), A), r.arc(y.cx, y.cy, S, V(y.y11, y.x11), V(y.y01, y.x01), !A))) : r.arc(0, 0, c, v, w, A) : r.lineTo(J, _);
      }
    else
      r.moveTo(0, 0);
    if (r.closePath(), l)
      return r = null, l + "" || null;
  }
  return o.centroid = function() {
    var l = (+i.apply(this, arguments) + +t.apply(this, arguments)) / 2, u = (+n.apply(this, arguments) + +h.apply(this, arguments)) / 2 - Zt / 2;
    return [ft(u) * l, st(u) * l];
  }, o.innerRadius = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : B(+l), o) : i;
  }, o.outerRadius = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : B(+l), o) : t;
  }, o.cornerRadius = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : B(+l), o) : e;
  }, o.padRadius = function(l) {
    return arguments.length ? (s = l == null ? null : typeof l == "function" ? l : B(+l), o) : s;
  }, o.startAngle = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : B(+l), o) : n;
  }, o.endAngle = function(l) {
    return arguments.length ? (h = typeof l == "function" ? l : B(+l), o) : h;
  }, o.padAngle = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : B(+l), o) : a;
  }, o.context = function(l) {
    return arguments.length ? (r = l ?? null, o) : r;
  }, o;
}
function Ls(i) {
  this._context = i;
}
function Yr(i) {
  return new Ls(i);
}
function Vr(i) {
  return i[0];
}
function Tr(i) {
  return i[1];
}
function Dr(i, t) {
  return t < i ? -1 : t > i ? 1 : t >= i ? 0 : NaN;
}
function qr(i) {
  return i;
}
function fi() {
  var i = qr, t = Dr, e = null, s = B(0), n = B(ei), h = B(0);
  function a(r) {
    var o, l, u, c, d, g = r.length, p = 0, f = new Array(g), A = new Array(g), m = +s.apply(this, arguments), y = Math.min(ei, Math.max(-ei, n.apply(this, arguments) - m)), b = Math.min(Math.abs(y) / g, h.apply(this, arguments)), k = b * (y < 0 ? -1 : 1);
    for (o = 0; o < g; ++o)
      (d = A[f[o] = o] = +i(r[o], o, r)) > 0 && (p += d);
    for (t != null ? f.sort(function(w, v) {
      return t(A[w], A[v]);
    }) : e != null && f.sort(function(w, v) {
      return e(r[w], r[v]);
    }), o = 0, u = p ? (y - g * k) / p : 0; o < g; ++o, m = c)
      l = f[o], c = m + ((d = A[l]) > 0 ? d * u : 0) + k, A[l] = { data: r[l], index: o, value: d, startAngle: m, endAngle: c, padAngle: b };
    return A;
  }
  return a.value = function(r) {
    return arguments.length ? (i = typeof r == "function" ? r : B(+r), a) : i;
  }, a.sortValues = function(r) {
    return arguments.length ? (t = r, e = null, a) : t;
  }, a.sort = function(r) {
    return arguments.length ? (e = r, t = null, a) : e;
  }, a.startAngle = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : B(+r), a) : s;
  }, a.endAngle = function(r) {
    return arguments.length ? (n = typeof r == "function" ? r : B(+r), a) : n;
  }, a.padAngle = function(r) {
    return arguments.length ? (h = typeof r == "function" ? r : B(+r), a) : h;
  }, a;
}
Ls.prototype = { areaStart: function() {
  this._line = 0;
}, areaEnd: function() {
  this._line = NaN;
}, lineStart: function() {
  this._point = 0;
}, lineEnd: function() {
  (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
}, point: function(i, t) {
  switch (i = +i, t = +t, this._point) {
    case 0:
      this._point = 1, this._line ? this._context.lineTo(i, t) : this._context.moveTo(i, t);
      break;
    case 1:
      this._point = 2;
    default:
      this._context.lineTo(i, t);
  }
} };
const yt = ["coral", "skyblue", "#66c2a5", "tan", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "coral", "skyblue", "tan", "orange"], dt = (i, t, e, s, n) => {
  i.svg.append("svg").attr("x", i.legendPosition === "left" ? 5 : i.width - (e + 2)).attr("y", 0);
  const h = n === void 0 ? 5 - i.margin.left : n, a = i.rc.rectangle(i.legendPosition === "left" ? h : i.width + i.margin.right - 2 - e, -i.margin.top / 3, e, s, { fill: "white", fillWeight: 0.1, strokeWidth: 0.75, roughness: 2 }), r = i.roughSvg.appendChild(a), o = "rough" + i.el.substring(1, i.el.length);
  r.setAttribute("class", o), t.forEach((l, u) => {
    const c = x("." + o).append("g").attr("transform", `translate(
        ${i.legendPosition === "left" ? 5 : i.width - (e + 2)},
        0)`);
    c.append("rect").style("fill", i.colors[u]).attr("width", 20).attr("height", 8).attr("x", i.legendPosition === "left" ? h : i.margin.right + 5).attr("y", 6 + 11 * u - i.margin.top / 3), c.append("text").style("font-size", ".8rem").style("font-family", i.fontFamily).attr("x", i.legendPosition === "left" ? h + 25 : i.margin.right + 30).attr("y", 6 + 11 * u + 8 - i.margin.top / 3).text(l.text);
  });
};
class rh extends ot {
  constructor(t) {
    super(t), this.margin = t.margin || { top: 50, right: 20, bottom: 10, left: 20 }, this.colors = t.colors || yt, this.highlight = t.highlight, this.roughness = at({ roughness: t.roughness, ceiling: 30 }), this.strokeWidth = t.strokeWidth || 0.75, this.innerStrokeWidth = t.innerStrokeWidth || 0.75, this.fillWeight = t.fillWeight || 0.85, this.labels = this.dataFormat === "object" ? "labels" : t.labels, this.values = this.dataFormat === "object" ? "values" : t.values, this.labels !== void 0 && this.values !== void 0 ? (this.legend = t.legend !== !1, this.legendPosition = t.legendPosition || "right", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this))) : console.log(`Error for ${this.el}: Must include labels and values when        instantiating Donut chart. Skipping chart.`);
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.radius = Math.min(this.width, this.height) / 2, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".json") ? () => {
      ms(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 3).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    P(this.interactionG).append("g").attr("transform", `translate(${this.width / 2}, ${this.height / 2})`).data(this.dataFormat === "object" ? this.makePie(this.data[this.values]) : this.makePie(this.data)).append("path").attr("d", this.makeArc).attr("stroke-width", "0px").attr("fill", "transparent");
    const t = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none"), e = this;
    let s;
    P(this.interactionG).on("mouseover", function() {
      t.style("opacity", 1), s = x(this).selectAll("path").style("stroke"), e.highlight === void 0 ? x(this).selectAll("path").style("opacity", 0.5) : x(this).selectAll("path").style("stroke", e.highlight);
    }), P(this.interactionG).on("mouseout", function() {
      t.style("opacity", 0), x(this).selectAll("path").style("stroke", s), x(this).selectAll("path").style("opacity", 1);
    }), P(this.interactionG).on("mousemove", function(n) {
      const h = x(this).attr("attrX"), a = x(this).attr("attrY"), r = bt(this);
      t.html(`<b>${h}</b>: ${a}`).style("opacity", 0.95).style("transform", `translate(${r[0] + e.margin.left}px, 
              ${r[1] - (e.height + e.margin.top + e.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth } }), this.rc = Y(this.roughSvg, { options: { fill: this.color, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle, fillWeight: this.fillWeight } });
  }
  drawFromObject() {
    this.initRoughObjects(), this.makePie = fi(), this.makeArc = gi().innerRadius(0).outerRadius(this.radius), this.arcs = this.makePie(this.data[this.values]), this.arcs.forEach((h, a) => {
      if (h.value !== 0) {
        const r = this.rc.arc(this.width / 2, this.height / 2, 2 * this.radius, 2 * this.radius, h.startAngle - Math.PI / 2, h.endAngle - Math.PI / 2, !0, { fill: this.colors[a], stroke: this.colors[a] });
        r.setAttribute("class", this.graphClass);
        const o = this.roughSvg.appendChild(r);
        o.setAttribute("attrY", this.data[this.values][a]), o.setAttribute("attrX", this.data[this.labels][a]);
      }
    });
    const t = this.rc.circle(this.width / 2, this.height / 2, this.radius, { fill: "white", strokeWidth: 0.05, fillWeight: 10, fillStyle: "solid" });
    this.roughSvg.appendChild(t), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth);
    const e = this.data.labels.map((h, a) => ({ color: this.colors[a], text: h })), s = 6 * e.reduce((h, a) => h > a.text.length ? h : a.text.length, 0) + 35, n = 11 * e.length + 8;
    this.legend === !0 && dt(this, e, s, n), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.initRoughObjects(), this.makePie = fi().value((a) => a[this.values]).sort(null);
    const t = [];
    this.makeArc = gi().innerRadius(0).outerRadius(this.radius), this.arcs = this.makePie(this.data), this.arcs.forEach((a, r) => {
      if (a.value !== 0) {
        const o = this.rc.arc(this.width / 2, this.height / 2, 2 * this.radius, 2 * this.radius, a.startAngle - Math.PI / 2, a.endAngle - Math.PI / 2, !0, { fill: this.colors[r], stroke: this.colors[r] });
        o.setAttribute("class", this.graphClass);
        const l = this.roughSvg.appendChild(o);
        l.setAttribute("attrY", a.data[this.values]), l.setAttribute("attrX", a.data[this.labels]);
      }
      t.push(a.data[this.labels]);
    });
    const e = this.rc.circle(this.width / 2, this.height / 2, this.radius, { fill: "white", strokeWidth: 0.05, fillWeight: 10, fillStyle: "solid" });
    this.roughSvg.appendChild(e), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth);
    const s = t.map((a, r) => ({ color: this.colors[r], text: a })), n = 6 * s.reduce((a, r) => a > r.text.length ? a : r.text.length, 0) + 35, h = 11 * s.length + 8;
    this.legend === !0 && dt(this, s, n, h), this.interactive === !0 && this.addInteraction();
  }
}
class hh extends ot {
  constructor(t) {
    super(t), this.margin = t.margin || { top: 50, right: 20, bottom: 50, left: 100 }, this.roughness = at({ roughness: t.roughness, defaultValue: 2.2 }), this.axisStrokeWidth = t.axisStrokeWidth || 0.5, this.axisRoughness = t.axisRoughness || 0.5, this.stroke = t.stroke || "black", this.fillWeight = t.fillWeight || 0.5, this.colors = t.colors, this.strokeWidth = t.strokeWidth || 1, this.axisFontSize = t.axisFontSize, this.x = t.x, this.y = this.dataFormat === "object" ? "y" : t.y, this.xValueFormat = t.xValueFormat, this.yValueFormat = t.yValueFormat, this.legend = t.legend !== !1, this.legendPosition = t.legendPosition || "right", this.circle = t.circle !== !1, this.circleRadius = t.circleRadius || 10, this.circleRoughness = at({ roughness: t.circleRoughness, defaultValue: 2 }), this.xLabel = t.xLabel || "", this.yLabel = t.yLabel || "", this.labelFontSize = t.labelFontSize || "1rem", this.dataFormat === "file" && (this.dataSources = [], this.yKeys = Object.keys(t).filter((e) => /y/.test(e)), this.yKeys.map((e, s) => {
      e !== "yLabel" && this.dataSources.push(t[e]);
    })), this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  addScales() {
    let t, e;
    if (this.dataFormat !== "file")
      t = ((h) => {
        const a = Object.keys(h).map((l) => et(h[l])), r = ut(a, (l) => l[0]), o = q(a, (l) => l[1]);
        return [r, o];
      })(this.data);
    else {
      const h = this.dataSources.map((o) => et(this.data, (l) => +l[o])), a = ut(h, (o) => o[0]), r = q(h, (o) => o[1]);
      t = [a, r];
    }
    if (this.x === void 0) {
      const h = q(Object.keys(this.data).map((a) => this.data[a].length));
      e = this.dataFormat === "file" ? [0, this.data.length] : [0, h];
    } else
      e = et(this.x);
    const s = t, n = s[1] - s[0];
    this.xScale = this.x === void 0 ? We().range([0, this.width]).domain([...Array(e[1]).keys()]) : We().range([0, this.width]).domain(this.x), this.yScale = Z().range([this.height, 0]).domain([0, s[1] + 0.05 * n]);
  }
  addLabels() {
    this.xLabel !== "" && this.svg.append("text").attr("x", this.width / 2).attr("y", this.height + this.margin.bottom / 1.3).attr("dx", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.xLabel), this.yLabel !== "" && this.svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - this.margin.left / 2).attr("x", 0 - this.height / 2).attr("dy", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.yLabel);
  }
  addAxes() {
    const t = Dt(this.xScale).tickSize(0).tickFormat((s) => this.xValueFormat ? ht(this.xValueFormat)(s) : s), e = qt(this.yScale).tickSize(0).tickFormat((s) => this.yValueFormat ? ht(this.yValueFormat)(s) : s);
    this.svg.append("g").attr("transform", "translate(0," + this.height + ")").call(t).attr("class", `xAxis${this.graphClass}`).selectAll("text").attr("transform", "translate(-10, 0)rotate(-45)").style("text-anchor", "end").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize), this.svg.append("g").call(e).attr("class", `yAxis${this.graphClass}`).selectAll("text").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize), P("path.domain").attr("stroke", "transparent"), P("g.tick").style("opacity", 1);
  }
  makeAxesRough(t, e) {
    const s = `xAxis${this.graphClass}`, n = `yAxis${this.graphClass}`, h = `rough-${s}`, a = `rough-${n}`;
    x(`.${s}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", h), t.appendChild(u);
    }), P(`.${h}`).attr("transform", `translate(0, ${this.height})`), x(`.${n}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", a), t.appendChild(u);
    });
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(20, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    const t = this;
    this.chartScreen = this.svg.append("g").attr("pointer-events", "all"), this.dataSources.map((e, s) => {
      const n = (this.dataFormat === "file" ? this.data : this.data[e]).map((o, l) => this.x === void 0 ? [this.xScale(l), this.yScale(o[e])] : [this.xScale(this.x[l]), this.yScale(+o[e])]), h = n.filter((o) => o[0] !== void 0), a = function() {
        var o = Vr, l = Tr, u = B(!0), c = null, d = Yr, g = null;
        function p(f) {
          var A, m, y, b = f.length, k = !1;
          for (c == null && (g = d(y = le())), A = 0; A <= b; ++A)
            !(A < b && u(m = f[A], A, f)) === k && ((k = !k) ? g.lineStart() : g.lineEnd()), k && g.point(+o(m, A, f), +l(m, A, f));
          if (y)
            return g = null, y + "" || null;
        }
        return p.x = function(f) {
          return arguments.length ? (o = typeof f == "function" ? f : B(+f), p) : o;
        }, p.y = function(f) {
          return arguments.length ? (l = typeof f == "function" ? f : B(+f), p) : l;
        }, p.defined = function(f) {
          return arguments.length ? (u = typeof f == "function" ? f : B(!!f), p) : u;
        }, p.curve = function(f) {
          return arguments.length ? (d = f, c != null && (g = d(c)), p) : d;
        }, p.context = function(f) {
          return arguments.length ? (f == null ? c = g = null : g = d(c = f), p) : c;
        }, p;
      }().x((o) => o[0]).y((o) => o[1]);
      this.svg.append("path").datum(h).attr("fill", "none").attr("stroke", "blue").attr("stroke-width", 1.5).attr("d", a).attr("visibility", "hidden");
      const r = e + "class";
      this.svg.append("g").attr("class", r + "text").append("text").style("font-size", this.tooltipFontSize).style("opacity", 0).style("font-family", this.fontFamily).attr("text-anchor", "middle").attr("alignment-baseline", "middle");
    }), this.chartScreen.append("rect").attr("width", this.width).attr("height", this.height).attr("fill", "none").on("mousemove", function(e) {
      const s = bt(this)[0], n = t.xScale.domain(), h = t.xScale.range(), a = ds(h[0], h[1] + 1, t.xScale.step()), r = cs(a, s), o = n[r];
      t.dataSources.map((l, u) => {
        const c = t.dataFormat === "file" ? t.x === void 0 ? t.data[o] : t.data[r] : t.data[l][r], d = "." + l + "classtext";
        t.dataFormat === "file" ? x(d).selectAll("text").style("opacity", 1).html(t.x === void 0 ? `(${r},${c[l]})` : `(${t.x[r]}, ${c[l]})`).attr("x", t.x === void 0 ? t.xScale(r) : t.xScale(t.x[r])).attr("y", t.yScale(c[l]) - 6) : x(d).selectAll("text").style("opacity", 1).html(t.x === void 0 ? `(${r}, ${c})` : `(${t.x[r]}, ${c})`).attr("x", t.x === void 0 ? t.xScale(r) : t.xScale(t.x[r])).attr("y", t.yScale(c));
      });
    }).on("mouseout", () => {
      t.dataSources.map((e) => {
        x("." + e + "classtext").selectAll("text").style("opacity", 0);
      });
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.axisStrokeWidth, roughness: this.axisRoughness } }), this.rc = Y(this.roughSvg, { options: { stroke: this.stroke === "none" ? void 0 : this.stroke, strokeWidth: this.strokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    const t = this;
    this.colors === void 0 && (this.colors = yt), this.dataSources = Object.keys(this.data), this.initRoughObjects(), this.addScales(), this.dataSources.map((h, a) => {
      const r = this.data[h].map((u, c) => this.x === void 0 ? [this.xScale(c), this.yScale(+u)] : [this.xScale(this.x[c]), this.yScale(u)]), o = r.filter((u) => u[0] !== void 0), l = this.rc.curve(o, { stroke: t.colors.length === 1 ? t.colors[0] : t.colors[a], roughness: t.roughness, bowing: t.bowing });
      this.roughSvg.appendChild(l).setAttribute("class", this.graphClass), this.circle === !0 && r.forEach((u, c) => {
        const d = this.rc.circle(u[0], u[1], this.circleRadius, { stroke: this.colors[a], fill: this.colors[a], fillStyle: "solid", strokeWidth: 1, roughness: this.circleRoughness });
        this.roughSvg.appendChild(d);
      });
    });
    const e = this.dataSources.map((h, a) => ({ color: this.colors[a], text: h })), s = 6 * e.reduce((h, a) => h > a.text.length ? h : a.text.length, 0) + 35, n = 11 * e.length + 8;
    this.legend === !0 && dt(this, e, s, n, 2), this.addAxes(), this.addLabels(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.colors === void 0 && (this.colors = yt), this.initRoughObjects(), this.addScales(), this.dataSources.map((n, h) => {
      const a = this.data.map((l, u) => this.x === void 0 ? [this.xScale(u), this.yScale(l[n])] : [this.xScale(this.x[u]), this.yScale(+l[n])]), r = a.filter((l) => l[0] !== void 0), o = this.rc.curve(r, { stroke: this.colors[h], strokeWidth: this.strokeWidth, roughness: 1, bowing: 10 });
      this.roughSvg.appendChild(o), this.circle === !0 && r.forEach((l, u) => {
        const c = this.rc.circle(l[0], l[1], this.circleRadius, { stroke: this.colors[h], fill: this.colors[h], fillStyle: "solid", strokeWidth: 1, roughness: this.circleRoughness });
        this.roughSvg.appendChild(c);
      });
    });
    const t = this.dataSources.map((n, h) => ({ color: this.colors[h], text: n })), e = 6 * t.reduce((n, h) => n > h.text.length ? n : h.text.length, 0) + 35, s = 11 * t.length + 8;
    this.legend === !0 && dt(this, t, e, s, 2), this.addAxes(), this.addLabels(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.interactive === !0 && this.addInteraction();
  }
}
function Zs(i, t) {
  var e, s = 1;
  function n() {
    var h, a, r = e.length, o = 0, l = 0;
    for (h = 0; h < r; ++h)
      o += (a = e[h]).x, l += a.y;
    for (o = (o / r - i) * s, l = (l / r - t) * s, h = 0; h < r; ++h)
      (a = e[h]).x -= o, a.y -= l;
  }
  return i == null && (i = 0), t == null && (t = 0), n.initialize = function(h) {
    e = h;
  }, n.x = function(h) {
    return arguments.length ? (i = +h, n) : i;
  }, n.y = function(h) {
    return arguments.length ? (t = +h, n) : t;
  }, n.strength = function(h) {
    return arguments.length ? (s = +h, n) : s;
  }, n;
}
function ss(i, t, e, s) {
  if (isNaN(t) || isNaN(e))
    return i;
  var n, h, a, r, o, l, u, c, d, g = i._root, p = { data: s }, f = i._x0, A = i._y0, m = i._x1, y = i._y1;
  if (!g)
    return i._root = p, i;
  for (; g.length; )
    if ((l = t >= (h = (f + m) / 2)) ? f = h : m = h, (u = e >= (a = (A + y) / 2)) ? A = a : y = a, n = g, !(g = g[c = u << 1 | l]))
      return n[c] = p, i;
  if (r = +i._x.call(null, g.data), o = +i._y.call(null, g.data), t === r && e === o)
    return p.next = g, n ? n[c] = p : i._root = p, i;
  do
    n = n ? n[c] = new Array(4) : i._root = new Array(4), (l = t >= (h = (f + m) / 2)) ? f = h : m = h, (u = e >= (a = (A + y) / 2)) ? A = a : y = a;
  while ((c = u << 1 | l) == (d = (o >= a) << 1 | r >= h));
  return n[d] = g, n[c] = p, i;
}
function T(i, t, e, s, n) {
  this.node = i, this.x0 = t, this.y0 = e, this.x1 = s, this.y1 = n;
}
function Hr(i) {
  return i[0];
}
function Nr(i) {
  return i[1];
}
function Bs(i, t, e) {
  var s = new ue(t ?? Hr, e ?? Nr, NaN, NaN, NaN, NaN);
  return i == null ? s : s.addAll(i);
}
function ue(i, t, e, s, n, h) {
  this._x = i, this._y = t, this._x0 = e, this._y0 = s, this._x1 = n, this._y1 = h, this._root = void 0;
}
function ns(i) {
  for (var t = { data: i.data }, e = t; i = i.next; )
    e = e.next = { data: i.data };
  return t;
}
var D = Bs.prototype = ue.prototype;
function Bt(i) {
  return function() {
    return i;
  };
}
function pi(i) {
  return 1e-6 * (i() - 0.5);
}
function Xr(i) {
  return i.x + i.vx;
}
function Kr(i) {
  return i.y + i.vy;
}
function Ys(i) {
  var t, e, s, n = 1, h = 1;
  function a() {
    for (var l, u, c, d, g, p, f, A = t.length, m = 0; m < h; ++m)
      for (u = Bs(t, Xr, Kr).visitAfter(r), l = 0; l < A; ++l)
        c = t[l], p = e[c.index], f = p * p, d = c.x + c.vx, g = c.y + c.vy, u.visit(y);
    function y(b, k, w, v, M) {
      var j = b.data, O = b.r, z = p + O;
      if (!j)
        return k > d + z || v < d - z || w > g + z || M < g - z;
      if (j.index > c.index) {
        var F = d - j.x - j.vx, S = g - j.y - j.vy, W = F * F + S * S;
        W < z * z && (F === 0 && (W += (F = pi(s)) * F), S === 0 && (W += (S = pi(s)) * S), W = (z - (W = Math.sqrt(W))) / W * n, c.vx += (F *= W) * (z = (O *= O) / (f + O)), c.vy += (S *= W) * z, j.vx -= F * (z = 1 - z), j.vy -= S * z);
      }
    }
  }
  function r(l) {
    if (l.data)
      return l.r = e[l.data.index];
    for (var u = l.r = 0; u < 4; ++u)
      l[u] && l[u].r > l.r && (l.r = l[u].r);
  }
  function o() {
    if (t) {
      var l, u, c = t.length;
      for (e = new Array(c), l = 0; l < c; ++l)
        u = t[l], e[u.index] = +i(u, l, t);
    }
  }
  return typeof i != "function" && (i = Bt(i == null ? 1 : +i)), a.initialize = function(l, u) {
    t = l, s = u, o();
  }, a.iterations = function(l) {
    return arguments.length ? (h = +l, a) : h;
  }, a.strength = function(l) {
    return arguments.length ? (n = +l, a) : n;
  }, a.radius = function(l) {
    return arguments.length ? (i = typeof l == "function" ? l : Bt(+l), o(), a) : i;
  }, a;
}
function Qr(i) {
  return i.index;
}
function rs(i, t) {
  var e = i.get(t);
  if (!e)
    throw new Error("node not found: " + t);
  return e;
}
D.copy = function() {
  var i, t, e = new ue(this._x, this._y, this._x0, this._y0, this._x1, this._y1), s = this._root;
  if (!s)
    return e;
  if (!s.length)
    return e._root = ns(s), e;
  for (i = [{ source: s, target: e._root = new Array(4) }]; s = i.pop(); )
    for (var n = 0; n < 4; ++n)
      (t = s.source[n]) && (t.length ? i.push({ source: t, target: s.target[n] = new Array(4) }) : s.target[n] = ns(t));
  return e;
}, D.add = function(i) {
  const t = +this._x.call(null, i), e = +this._y.call(null, i);
  return ss(this.cover(t, e), t, e, i);
}, D.addAll = function(i) {
  var t, e, s, n, h = i.length, a = new Array(h), r = new Array(h), o = 1 / 0, l = 1 / 0, u = -1 / 0, c = -1 / 0;
  for (e = 0; e < h; ++e)
    isNaN(s = +this._x.call(null, t = i[e])) || isNaN(n = +this._y.call(null, t)) || (a[e] = s, r[e] = n, s < o && (o = s), s > u && (u = s), n < l && (l = n), n > c && (c = n));
  if (o > u || l > c)
    return this;
  for (this.cover(o, l).cover(u, c), e = 0; e < h; ++e)
    ss(this, a[e], r[e], i[e]);
  return this;
}, D.cover = function(i, t) {
  if (isNaN(i = +i) || isNaN(t = +t))
    return this;
  var e = this._x0, s = this._y0, n = this._x1, h = this._y1;
  if (isNaN(e))
    n = (e = Math.floor(i)) + 1, h = (s = Math.floor(t)) + 1;
  else {
    for (var a, r, o = n - e || 1, l = this._root; e > i || i >= n || s > t || t >= h; )
      switch (r = (t < s) << 1 | i < e, (a = new Array(4))[r] = l, l = a, o *= 2, r) {
        case 0:
          n = e + o, h = s + o;
          break;
        case 1:
          e = n - o, h = s + o;
          break;
        case 2:
          n = e + o, s = h - o;
          break;
        case 3:
          e = n - o, s = h - o;
      }
    this._root && this._root.length && (this._root = l);
  }
  return this._x0 = e, this._y0 = s, this._x1 = n, this._y1 = h, this;
}, D.data = function() {
  var i = [];
  return this.visit(function(t) {
    if (!t.length)
      do
        i.push(t.data);
      while (t = t.next);
  }), i;
}, D.extent = function(i) {
  return arguments.length ? this.cover(+i[0][0], +i[0][1]).cover(+i[1][0], +i[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}, D.find = function(i, t, e) {
  var s, n, h, a, r, o, l, u = this._x0, c = this._y0, d = this._x1, g = this._y1, p = [], f = this._root;
  for (f && p.push(new T(f, u, c, d, g)), e == null ? e = 1 / 0 : (u = i - e, c = t - e, d = i + e, g = t + e, e *= e); o = p.pop(); )
    if (!(!(f = o.node) || (n = o.x0) > d || (h = o.y0) > g || (a = o.x1) < u || (r = o.y1) < c))
      if (f.length) {
        var A = (n + a) / 2, m = (h + r) / 2;
        p.push(new T(f[3], A, m, a, r), new T(f[2], n, m, A, r), new T(f[1], A, h, a, m), new T(f[0], n, h, A, m)), (l = (t >= m) << 1 | i >= A) && (o = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - l], p[p.length - 1 - l] = o);
      } else {
        var y = i - +this._x.call(null, f.data), b = t - +this._y.call(null, f.data), k = y * y + b * b;
        if (k < e) {
          var w = Math.sqrt(e = k);
          u = i - w, c = t - w, d = i + w, g = t + w, s = f.data;
        }
      }
  return s;
}, D.remove = function(i) {
  if (isNaN(h = +this._x.call(null, i)) || isNaN(a = +this._y.call(null, i)))
    return this;
  var t, e, s, n, h, a, r, o, l, u, c, d, g = this._root, p = this._x0, f = this._y0, A = this._x1, m = this._y1;
  if (!g)
    return this;
  if (g.length)
    for (; ; ) {
      if ((l = h >= (r = (p + A) / 2)) ? p = r : A = r, (u = a >= (o = (f + m) / 2)) ? f = o : m = o, t = g, !(g = g[c = u << 1 | l]))
        return this;
      if (!g.length)
        break;
      (t[c + 1 & 3] || t[c + 2 & 3] || t[c + 3 & 3]) && (e = t, d = c);
    }
  for (; g.data !== i; )
    if (s = g, !(g = g.next))
      return this;
  return (n = g.next) && delete g.next, s ? (n ? s.next = n : delete s.next, this) : t ? (n ? t[c] = n : delete t[c], (g = t[0] || t[1] || t[2] || t[3]) && g === (t[3] || t[2] || t[1] || t[0]) && !g.length && (e ? e[d] = g : this._root = g), this) : (this._root = n, this);
}, D.removeAll = function(i) {
  for (var t = 0, e = i.length; t < e; ++t)
    this.remove(i[t]);
  return this;
}, D.root = function() {
  return this._root;
}, D.size = function() {
  var i = 0;
  return this.visit(function(t) {
    if (!t.length)
      do
        ++i;
      while (t = t.next);
  }), i;
}, D.visit = function(i) {
  var t, e, s, n, h, a, r = [], o = this._root;
  for (o && r.push(new T(o, this._x0, this._y0, this._x1, this._y1)); t = r.pop(); )
    if (!i(o = t.node, s = t.x0, n = t.y0, h = t.x1, a = t.y1) && o.length) {
      var l = (s + h) / 2, u = (n + a) / 2;
      (e = o[3]) && r.push(new T(e, l, u, h, a)), (e = o[2]) && r.push(new T(e, s, u, l, a)), (e = o[1]) && r.push(new T(e, l, n, h, u)), (e = o[0]) && r.push(new T(e, s, n, l, u));
    }
  return this;
}, D.visitAfter = function(i) {
  var t, e = [], s = [];
  for (this._root && e.push(new T(this._root, this._x0, this._y0, this._x1, this._y1)); t = e.pop(); ) {
    var n = t.node;
    if (n.length) {
      var h, a = t.x0, r = t.y0, o = t.x1, l = t.y1, u = (a + o) / 2, c = (r + l) / 2;
      (h = n[0]) && e.push(new T(h, a, r, u, c)), (h = n[1]) && e.push(new T(h, u, r, o, c)), (h = n[2]) && e.push(new T(h, a, c, u, l)), (h = n[3]) && e.push(new T(h, u, c, o, l));
    }
    s.push(t);
  }
  for (; t = s.pop(); )
    i(t.node, t.x0, t.y0, t.x1, t.y1);
  return this;
}, D.x = function(i) {
  return arguments.length ? (this._x = i, this) : this._x;
}, D.y = function(i) {
  return arguments.length ? (this._y = i, this) : this._y;
};
var Ur = { value: () => {
} };
function Vs() {
  for (var i, t = 0, e = arguments.length, s = {}; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in s || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    s[i] = [];
  }
  return new si(s);
}
function si(i) {
  this._ = i;
}
function Jr(i, t) {
  for (var e, s = 0, n = i.length; s < n; ++s)
    if ((e = i[s]).name === t)
      return e.value;
}
function hs(i, t, e) {
  for (var s = 0, n = i.length; s < n; ++s)
    if (i[s].name === t) {
      i[s] = Ur, i = i.slice(0, s).concat(i.slice(s + 1));
      break;
    }
  return e != null && i.push({ name: t, value: e }), i;
}
si.prototype = Vs.prototype = { constructor: si, on: function(i, t) {
  var e, s, n = this._, h = (s = n, (i + "").trim().split(/^|\s+/).map(function(o) {
    var l = "", u = o.indexOf(".");
    if (u >= 0 && (l = o.slice(u + 1), o = o.slice(0, u)), o && !s.hasOwnProperty(o))
      throw new Error("unknown type: " + o);
    return { type: o, name: l };
  })), a = -1, r = h.length;
  if (!(arguments.length < 2)) {
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++a < r; )
      if (e = (i = h[a]).type)
        n[e] = hs(n[e], i.name, t);
      else if (t == null)
        for (e in n)
          n[e] = hs(n[e], i.name, null);
    return this;
  }
  for (; ++a < r; )
    if ((e = (i = h[a]).type) && (e = Jr(n[e], i.name)))
      return e;
}, copy: function() {
  var i = {}, t = this._;
  for (var e in t)
    i[e] = t[e].slice();
  return new si(i);
}, call: function(i, t) {
  if ((e = arguments.length - 2) > 0)
    for (var e, s, n = new Array(e), h = 0; h < e; ++h)
      n[h] = arguments[h + 2];
  if (!this._.hasOwnProperty(i))
    throw new Error("unknown type: " + i);
  for (h = 0, e = (s = this._[i]).length; h < e; ++h)
    s[h].value.apply(t, n);
}, apply: function(i, t, e) {
  if (!this._.hasOwnProperty(i))
    throw new Error("unknown type: " + i);
  for (var s = this._[i], n = 0, h = s.length; n < h; ++n)
    s[n].value.apply(t, e);
} };
var ni, It, Pt = 0, Gt = 0, Ot = 0, Ts = 1e3, mi = 0, At = 0, xi = 0, Tt = typeof performance == "object" && performance.now ? performance : Date, Ds = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(i) {
  setTimeout(i, 17);
};
function qs() {
  return At || (Ds(_r), At = Tt.now() + xi);
}
function _r() {
  At = 0;
}
function ie() {
  this._call = this._time = this._next = null;
}
function Hs(i, t, e) {
  var s = new ie();
  return s.restart(i, t, e), s;
}
function as() {
  At = (mi = Tt.now()) + xi, Pt = Gt = 0;
  try {
    (function() {
      qs(), ++Pt;
      for (var i, t = ni; t; )
        (i = At - t._time) >= 0 && t._call.call(void 0, i), t = t._next;
      --Pt;
    })();
  } finally {
    Pt = 0, function() {
      for (var i, t, e = ni, s = 1 / 0; e; )
        e._call ? (s > e._time && (s = e._time), i = e, e = e._next) : (t = e._next, e._next = null, e = i ? i._next = t : ni = t);
      It = i, ee(s);
    }(), At = 0;
  }
}
function $r() {
  var i = Tt.now(), t = i - mi;
  t > Ts && (xi -= t, mi = i);
}
function ee(i) {
  Pt || (Gt && (Gt = clearTimeout(Gt)), i - At > 24 ? (i < 1 / 0 && (Gt = setTimeout(as, i - Tt.now() - xi)), Ot && (Ot = clearInterval(Ot))) : (Ot || (mi = Tt.now(), Ot = setInterval($r, Ts)), Pt = 1, Ds(as)));
}
ie.prototype = Hs.prototype = { constructor: ie, restart: function(i, t, e) {
  if (typeof i != "function")
    throw new TypeError("callback is not a function");
  e = (e == null ? qs() : +e) + (t == null ? 0 : +t), this._next || It === this || (It ? It._next = this : ni = this, It = this), this._call = i, this._time = e, ee();
}, stop: function() {
  this._call && (this._call = null, this._time = 1 / 0, ee());
} };
const th = 1664525, ih = 1013904223, os = 4294967296;
var eh = Math.PI * (3 - Math.sqrt(5));
function Ns(i) {
  var t, e = 1, s = 1e-3, n = 1 - Math.pow(s, 1 / 300), h = 0, a = 0.6, r = /* @__PURE__ */ new Map(), o = Hs(c), l = Vs("tick", "end"), u = function() {
    let f = 1;
    return () => (f = (th * f + ih) % os) / os;
  }();
  function c() {
    d(), l.call("tick", t), e < s && (o.stop(), l.call("end", t));
  }
  function d(f) {
    var A, m, y = i.length;
    f === void 0 && (f = 1);
    for (var b = 0; b < f; ++b)
      for (e += (h - e) * n, r.forEach(function(k) {
        k(e);
      }), A = 0; A < y; ++A)
        (m = i[A]).fx == null ? m.x += m.vx *= a : (m.x = m.fx, m.vx = 0), m.fy == null ? m.y += m.vy *= a : (m.y = m.fy, m.vy = 0);
    return t;
  }
  function g() {
    for (var f, A = 0, m = i.length; A < m; ++A) {
      if ((f = i[A]).index = A, f.fx != null && (f.x = f.fx), f.fy != null && (f.y = f.fy), isNaN(f.x) || isNaN(f.y)) {
        var y = 10 * Math.sqrt(0.5 + A), b = A * eh;
        f.x = y * Math.cos(b), f.y = y * Math.sin(b);
      }
      (isNaN(f.vx) || isNaN(f.vy)) && (f.vx = f.vy = 0);
    }
  }
  function p(f) {
    return f.initialize && f.initialize(i, u), f;
  }
  return i == null && (i = []), g(), t = { tick: d, restart: function() {
    return o.restart(c), t;
  }, stop: function() {
    return o.stop(), t;
  }, nodes: function(f) {
    return arguments.length ? (i = f, g(), r.forEach(p), t) : i;
  }, alpha: function(f) {
    return arguments.length ? (e = +f, t) : e;
  }, alphaMin: function(f) {
    return arguments.length ? (s = +f, t) : s;
  }, alphaDecay: function(f) {
    return arguments.length ? (n = +f, t) : +n;
  }, alphaTarget: function(f) {
    return arguments.length ? (h = +f, t) : h;
  }, velocityDecay: function(f) {
    return arguments.length ? (a = 1 - f, t) : 1 - a;
  }, randomSource: function(f) {
    return arguments.length ? (u = f, r.forEach(p), t) : u;
  }, force: function(f, A) {
    return arguments.length > 1 ? (A == null ? r.delete(f) : r.set(f, p(A)), t) : r.get(f);
  }, find: function(f, A, m) {
    var y, b, k, w, v, M = 0, j = i.length;
    for (m == null ? m = 1 / 0 : m *= m, M = 0; M < j; ++M)
      (k = (y = f - (w = i[M]).x) * y + (b = A - w.y) * b) < m && (v = w, m = k);
    return v;
  }, on: function(f, A) {
    return arguments.length > 1 ? (l.on(f, A), t) : l.on(f);
  } };
}
class ah extends ot {
  constructor(t) {
    super(t), this.data = t.data, this.links = t.links, this.margin = t.margin || { top: 50, right: 20, bottom: 10, left: 20 }, this.colors = t.colors || yt, this.highlight = t.highlight, this.roughness = at({ roughness: t.roughness, ceiling: 30, defaultValue: 0 }), this.strokeWidth = t.strokeWidth || 0.75, this.innerStrokeWidth = t.innerStrokeWidth || 0.75, this.fillWeight = t.fillWeight || 0.85, this.color = t.color || "skyblue", this.collision = t.collision || 1.4, this.radiusExtent = t.radiusExtent || [5, 20], this.radius = t.radius || "radius", this.textCallback = t.textCallback || ((e) => ""), this.colorCallback = t.colorCallback || ((e) => this.color), this.roughnessExtent = t.roughnessExtent || [0, 10], this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.legend = t.legend || !1, this.legendPosition = t.legendPosition || "right", this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data, t.links), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data, t.links), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.collision = t.collision || this.collision, this.color = t.color || this.color, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle, this.title = t.title || this.title, this.textCallback = t.textCallback || ((h) => "");
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t, e) {
    return () => {
      this.data = t, this.links = e, this.drawFromObject();
    };
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 3).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    const t = this;
    let e;
    P(".nodeGroup").on("mouseover", function(s) {
      x(this).raise(), e = x(this).selectAll("path").style("stroke"), t.highlight === void 0 ? x(this).selectAll("path:nth-child(1)").style("opacity", 0.4) : x(this).selectAll("path:nth-child(1)").style("stroke", t.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", t.strokeWidth + 1.2), x(this).select(".node-text").attr("opacity", 1);
    }).on("mouseleave", function(s) {
      x(this).selectAll("path:nth-child(1)").style("opacity", 1), x(this).selectAll("path:nth-child(1)").style("stroke", e), x(this).selectAll("path:nth-child(2)").style("stroke-width", t.innerStrokeWidth), x(this).select(".node-text").attr("opacity", 0);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth } }), this.rc = Y(this.roughSvg, { options: { strokeWidth: this.innerStrokeWidth, fill: this.color, stroke: this.stroke === "none" ? void 0 : this.stroke, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    const t = this;
    let e, s;
    if (typeof this.radius == "number")
      e = Z().domain([0, 1]).range([this.extent[0], this.radiusExtent[1]]);
    else {
      const r = ut(this.data, (l) => +l[this.radius]), o = q(this.data, (l) => +l[this.radius]);
      e = Z().domain([r, o]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    }
    if (typeof this.roughness == "number")
      s = Z().domain([0, 1]).range([this.roughnessExtent[0], this.roughnessExtent[1]]);
    else {
      const r = ut(this.data, (l) => +l[this.radius]), o = q(this.data, (l) => +l[this.radius]);
      s = Z().domain([r, o]).range([this.roughnessExtent[0], this.roughnessExtent[1]]);
    }
    this.initRoughObjects();
    const n = this.svg.selectAll(".link").data(this.links).enter().append("line").attr("class", "link"), h = this.svg.selectAll(".nodeGroup").data(this.data).enter().append("g").attr("class", "nodeGroup");
    h.each(function(r, o) {
      const l = typeof t.radius == "number" ? t.radius : e(r[t.radius]), u = typeof t.roughness == "number" ? t.roughness : s(r[t.roughness]), c = t.rc.circle(0, 0, l, { fill: t.colorCallback(r), simplification: t.simplification, fillWeight: t.fillWeight, roughness: u });
      this.appendChild(c), c.setAttribute("class", t.graphClass + "_node"), x(this).append("circle").attr("class", "node-circle").attr("r", 0.5 * l).attr("fill", "transparent").attr("stroke-width", 0).attr("stroke", "none"), x(this).append("text").attr("class", "node-text").attr("x", 0).attr("y", -10).attr("text-anchor", "middle").style("pointer-events", "none").attr("stroke", "black").attr("fill", "white").attr("stroke-linejoin", "fill").attr("paint-order", "stroke fill").attr("stroke-width", "5px").attr("opacity", 0).text((d) => t.textCallback(d));
    });
    const a = Ns(this.data);
    if (a.alpha(1).restart(), a.force("collide", Ys().radius((r) => r.radius * this.collision)).force("center", Zs(this.width / 2, this.height / 2)).force("link", function(r) {
      var o, l, u, c, d, g, p = Qr, f = function(v) {
        return 1 / Math.min(c[v.source.index], c[v.target.index]);
      }, A = Bt(30), m = 1;
      function y(v) {
        for (var M = 0, j = r.length; M < m; ++M)
          for (var O, z, F, S, W, C, I, E = 0; E < j; ++E)
            z = (O = r[E]).source, S = (F = O.target).x + F.vx - z.x - z.vx || pi(g), W = F.y + F.vy - z.y - z.vy || pi(g), S *= C = ((C = Math.sqrt(S * S + W * W)) - l[E]) / C * v * o[E], W *= C, F.vx -= S * (I = d[E]), F.vy -= W * I, z.vx += S * (I = 1 - I), z.vy += W * I;
      }
      function b() {
        if (u) {
          var v, M, j = u.length, O = r.length, z = new Map(u.map((F, S) => [p(F, S, u), F]));
          for (v = 0, c = new Array(j); v < O; ++v)
            (M = r[v]).index = v, typeof M.source != "object" && (M.source = rs(z, M.source)), typeof M.target != "object" && (M.target = rs(z, M.target)), c[M.source.index] = (c[M.source.index] || 0) + 1, c[M.target.index] = (c[M.target.index] || 0) + 1;
          for (v = 0, d = new Array(O); v < O; ++v)
            M = r[v], d[v] = c[M.source.index] / (c[M.source.index] + c[M.target.index]);
          o = new Array(O), k(), l = new Array(O), w();
        }
      }
      function k() {
        if (u)
          for (var v = 0, M = r.length; v < M; ++v)
            o[v] = +f(r[v], v, r);
      }
      function w() {
        if (u)
          for (var v = 0, M = r.length; v < M; ++v)
            l[v] = +A(r[v], v, r);
      }
      return r == null && (r = []), y.initialize = function(v, M) {
        u = v, g = M, b();
      }, y.links = function(v) {
        return arguments.length ? (r = v, b(), y) : r;
      }, y.id = function(v) {
        return arguments.length ? (p = v, y) : p;
      }, y.iterations = function(v) {
        return arguments.length ? (m = +v, y) : m;
      }, y.strength = function(v) {
        return arguments.length ? (f = typeof v == "function" ? v : Bt(+v), k(), y) : f;
      }, y.distance = function(v) {
        return arguments.length ? (A = typeof v == "function" ? v : Bt(+v), w(), y) : A;
      }, y;
    }(this.links).distance(100)), a.on("tick", () => {
      h.attr("transform", (r) => `translate(${r.x}, ${r.y})`), n.attr("x1", (r) => r.source.x).attr("y1", (r) => r.source.y).attr("x2", (r) => r.target.x).attr("y2", (r) => r.target.y);
    }), P(".nodeGroup").selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction(), this.legend) {
      const r = this.legend;
      this.colors = this.legend.map((u) => u.color);
      const o = 6 * r.reduce((u, c) => u > c.text.length ? u : c.text.length, 0) + 35, l = 11 * r.length + 8;
      dt(this, r, o, l);
    }
  }
}
class oh extends ot {
  constructor(t) {
    super(t), this.data = t.data, this.margin = t.margin || { top: 50, right: 20, bottom: 10, left: 20 }, this.colors = t.colors || yt, this.highlight = t.highlight, this.roughness = at({ roughness: t.roughness, ceiling: 30, defaultValue: 0 }), this.strokeWidth = t.strokeWidth || 0.75, this.innerStrokeWidth = t.innerStrokeWidth || 0.75, this.fillWeight = t.fillWeight || 0.85, this.color = t.color || "pink", this.collision = t.collision || 1, this.radiusExtent = t.radiusExtent || [5, 20], this.radius = t.radius || "radius", this.roughnessExtent = t.roughnessExtent || [0, 10], this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.textCallback = t.textCallback || ((e) => ""), this.colorCallback = t.colorCallback || ((e) => this.color), this.legend = t.legend || !1, this.legendPosition = t.legendPosition || "right", this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.collision = t.collision || this.collision, this.color = t.color || this.color, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle, this.title = t.title || this.title, this.textCallback = t.textCallback || ((h) => "");
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t) {
    return () => {
      this.data = t, this.drawFromObject();
    };
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 3).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    const t = this;
    let e;
    P(".nodeGroup").on("mouseover", function(s) {
      e = x(this).selectAll("path").style("stroke"), x(this).raise(), t.highlight === void 0 ? x(this).selectAll("path:nth-child(1)").style("opacity", 0.4) : x(this).selectAll("path:nth-child(1)").style("stroke", t.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", t.strokeWidth + 1.2), x(this).select(".node-text").attr("opacity", 1), x(this).select(".node-text").raise();
    }).on("mouseleave", function(s) {
      x(this).selectAll("path:nth-child(1)").style("opacity", 1), x(this).selectAll("path:nth-child(1)").style("stroke", e), x(this).selectAll("path:nth-child(2)").style("stroke-width", t.strokeWidth), x(this).select(".node-text").attr("opacity", 0);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth } }), this.rc = Y(this.roughSvg, { options: { strokeWidth: this.innerStrokeWidth, fill: this.color, stroke: this.stroke === "none" ? void 0 : this.stroke, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    const t = this;
    let e, s;
    if (typeof this.radius == "number")
      e = Z().domain([0, 1]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    else {
      const r = ut(this.data, (l) => +l[this.radius]), o = q(this.data, (l) => +l[this.radius]);
      e = Z().domain([r, o]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    }
    if (typeof this.roughness == "number")
      s = Z().domain([0, 1]).range([this.roughnessExtent[0], this.roughnessExtent[1]]);
    else {
      const r = ut(this.data, (l) => +l[this.radius]), o = q(this.data, (l) => +l[this.radius]);
      s = Z().domain([r, o]).range([this.roughnessExtent[0], this.roughnessExtent[1]]);
    }
    this.initRoughObjects();
    let n = this.svg.selectAll(".nodeGroup").data(this.data), h = n.enter().append("g").attr("class", "nodeGroup");
    n = n.merge(h), n.each(function(r, o) {
      const l = typeof t.radius == "number" ? t.radius : e(r[t.radius]), u = typeof t.roughness == "number" ? t.roughness : s(r[t.roughness]), c = t.rc.circle(0, 0, l, { fill: t.colorCallback(r), simplification: t.simplification, fillWeight: t.fillWeight, roughness: u });
      this.appendChild(c).setAttribute("class", t.graphClass + "_node"), x(this).append("circle").attr("class", "node-circle").attr("r", 0.5 * l).attr("fill", "transparent").attr("stroke-width", 0).attr("stroke", "none"), x(this).append("text").attr("class", "node-text").attr("x", 0).attr("y", -10).attr("text-anchor", "middle").style("pointer-events", "none").attr("stroke", "black").attr("fill", "white").attr("stroke-linejoin", "fill").attr("paint-order", "stroke fill").attr("stroke-width", "5px").attr("opacity", 0).text((d) => t.textCallback(d));
    });
    const a = Ns(this.data);
    if (a.alpha(1).restart(), a.force("collide", Ys().radius((r) => r.radius * this.collision * 1.2)).force("center", Zs(this.width / 2, this.height / 2)), a.on("tick", () => {
      n.attr("transform", (r) => `translate(${r.x}, ${r.y})`), n.attr("attrX", (r) => +r.x), n.attr("attrY", (r) => +r.y);
    }), P(".nodeGroup").selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction(), this.legend) {
      const r = this.legend;
      this.colors = this.legend.map((u) => u.color);
      const o = 6 * r.reduce((u, c) => u > c.text.length ? u : c.text.length, 0) + 35, l = 11 * r.length + 8;
      dt(this, r, o, l);
    }
  }
}
class lh extends ot {
  constructor(t) {
    super(t), this.data = t.data, this.margin = t.margin || { top: 50, right: 20, bottom: 10, left: 20 }, this.colors = t.colors || yt, this.highlight = t.highlight, this.roughness = at({ roughness: t.roughness, ceiling: 30, defaultValue: 0 }), this.strokeWidth = t.strokeWidth || 0.75, this.innerStrokeWidth = t.innerStrokeWidth || 0.75, this.fillWeight = t.fillWeight || 0.85, this.labels = this.dataFormat === "object" ? "labels" : t.labels, this.values = this.dataFormat === "object" ? "values" : t.values, this.labels !== void 0 && this.values !== void 0 ? (this.legend = t.legend !== !1, this.legendPosition = t.legendPosition || "right", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title)) : console.log(`Error for ${this.el}: Must include labels and values when        instantiating Donut chart. Skipping chart.`);
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.radius = Math.min(this.width, this.height) / 2, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".json") ? () => {
      ms(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 3).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    P(this.interactionG).append("g").attr("transform", `translate(${this.width / 2}, ${this.height / 2})`).data(this.dataFormat === "object" ? this.makePie(this.data[this.values]) : this.makePie(this.data)).append("path").attr("d", this.makeArc).attr("stroke-width", "0px").attr("fill", "transparent");
    const t = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none"), e = this;
    let s;
    P(this.interactionG).on("mouseover", function() {
      t.style("opacity", 1), s = x(this).selectAll("path").style("stroke"), e.highlight === void 0 ? x(this).selectAll("path").style("opacity", 0.5) : x(this).selectAll("path").style("stroke", e.highlight);
    }), P(this.interactionG).on("mouseout", function() {
      t.style("opacity", 0), x(this).selectAll("path").style("stroke", s), x(this).selectAll("path").style("opacity", 1);
    }), P(this.interactionG).on("mousemove", function(n) {
      const h = x(this).attr("attrX"), a = x(this).attr("attrY"), r = bt(this);
      t.html(`<b>${h}</b>: ${a}`).style("opacity", 0.95).style("transform", `translate(${r[0] + e.margin.left}px, 
              ${r[1] - (e.height + e.margin.top + e.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth } }), this.rc = Y(this.roughSvg, { options: { fill: this.color, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    this.initRoughObjects(), this.makePie = fi(), this.makeArc = gi().innerRadius(0).outerRadius(this.radius), this.arcs = this.makePie(this.data[this.values]), this.arcs.forEach((n, h) => {
      if (n.value !== 0) {
        const a = this.rc.arc(this.width / 2, this.height / 2, 2 * this.radius, 2 * this.radius, n.startAngle - Math.PI / 2, n.endAngle - Math.PI / 2, !0, { fill: this.colors[h], stroke: this.colors[h] });
        a.setAttribute("class", this.graphClass);
        const r = this.roughSvg.appendChild(a);
        r.setAttribute("attrY", this.data[this.values][h]), r.setAttribute("attrX", this.data[this.labels][h]);
      }
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth);
    const t = this.data.labels.map((n, h) => ({ color: this.colors[h], text: n })), e = 6 * t.reduce((n, h) => n > h.text.length ? n : h.text.length, 0) + 35, s = 11 * t.length + 8;
    this.legend === !0 && dt(this, t, e, s), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.initRoughObjects(), this.makePie = fi().value((h) => h[this.values]).sort(null);
    const t = [];
    this.makeArc = gi().innerRadius(0).outerRadius(this.radius), this.arcs = this.makePie(this.data), this.arcs.forEach((h, a) => {
      if (h.value !== 0) {
        const r = this.rc.arc(this.width / 2, this.height / 2, 2 * this.radius, 2 * this.radius, h.startAngle - Math.PI / 2, h.endAngle - Math.PI / 2, !0, { fill: this.colors[a], stroke: this.colors[a] });
        r.setAttribute("class", this.graphClass);
        const o = this.roughSvg.appendChild(r);
        o.setAttribute("attrY", h.data[this.values]), o.setAttribute("attrX", h.data[this.labels]);
      }
      t.push(h.data[this.labels]);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth);
    const e = t.map((h, a) => ({ color: this.colors[a], text: h })), s = 6 * e.reduce((h, a) => h > a.text.length ? h : a.text.length, 0) + 35, n = 11 * e.length + 8;
    this.legend === !0 && dt(this, e, s, n), this.interactive === !0 && this.addInteraction();
  }
}
const Bi = ["pink", "skyblue", "coral", "gold", "teal", "darkgreen", "brown", "slateblue", "orange"];
class uh extends ot {
  constructor(t) {
    super(t), this.margin = t.margin || { top: 50, right: 20, bottom: 50, left: 100 }, this.colorVar = t.colorVar, this.roughness = at({ roughness: t.roughness }), this.highlight = t.highlight, this.highlightLabel = t.highlightLabel || "xy", this.radiusExtent = t.radiusExtent || [5, 20], this.radius = t.radius || 20, this.axisStrokeWidth = t.axisStrokeWidth || 0.4, this.axisRoughness = t.axisRoughness || 0.9, this.curbZero = t.curbZero === !0, this.innerStrokeWidth = t.innerStrokeWidth || 1, this.stroke = t.stroke || "black", this.fillWeight = t.fillWeight || 0.85, this.colors = t.colors || Bi, this.strokeWidth = t.strokeWidth || 1, this.axisFontSize = t.axisFontSize, this.x = this.dataFormat === "object" ? "x" : t.x, this.y = this.dataFormat === "object" ? "y" : t.y, this.xValueFormat = t.xValueFormat, this.yValueFormat = t.yValueFormat, this.xLabel = t.xLabel || "", this.yLabel = t.yLabel || "", this.labelFontSize = t.labelFontSize || "1rem", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.radiusScale, this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart();
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle, this.colors = t.colors || this.colors;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  addScaleLine() {
    let t, e;
    if (this.dataFormat !== "file")
      t = allDataExtent(this.data);
    else {
      const h = this.dataSources.map((o) => et(this.data, (l) => +l[o])), a = ut(h, (o) => o[0]), r = q(h, (o) => o[1]);
      t = [a, r];
    }
    if (this.x === void 0) {
      const h = q(Object.keys(this.data).map((a) => this.data[a].length));
      e = this.dataFormat === "file" ? [0, this.data.length] : [0, h];
    } else
      e = et(this.x);
    const s = t, n = s[1] - s[0];
    this.xScale = this.x === void 0 ? scalePoint().range([0, this.width]).domain([...Array(e[1]).keys()]) : scalePoint().range([0, this.width]).domain(this.x), this.yScale = Z().range([this.height, 0]).domain([0, s[1] + 0.05 * n]);
  }
  addScales() {
    const t = this.dataFormat === "file" ? et(this.data, (a) => +a[this.x]) : et(this.data[this.x]), e = t[1] - t[0], s = this.dataFormat === "file" ? et(this.data, (a) => +a[this.y]) : et(this.data[this.y]), n = s[1] - s[0], h = this.dataFormat === "file" ? et(this.data, (a) => a[this.colorVar]) : [1, 1];
    if (this.dataFormat === "file") {
      const a = et(this.data, (o) => +o[this.radius]), r = Math.min(this.width, this.height) / 2 / 2;
      this.radiusScale = Z().range([8, r]).domain(a);
    } else
      this.radiusScale = Z().domain([0, 20]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    this.curbZero === !0 && (s[0] > 0 && (s[0] = 0), t[0] > 0 && (t[0] = 0)), this.xScale = Z().range([0, this.width]).domain([t[0] - 0.05 * e, t[1] + 0.05 * e]), this.yScale = Z().range([this.height, 0]).domain([s[0] - 0.05 * n, s[1] + 0.05 * n]), this.colorScale = Ai().range(this.colors).domain(h);
  }
  addLabels() {
    this.xLabel !== "" && this.svg.append("text").attr("x", this.width / 2).attr("y", this.height + this.margin.bottom / 1.3).attr("dx", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.xLabel), this.yLabel !== "" && this.svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - this.margin.left / 2).attr("x", 0 - this.height / 2).attr("dy", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.yLabel);
  }
  addAxes() {
    const t = Dt(this.xScale).tickSize(0).tickFormat((s) => this.xValueFormat ? ht(this.xValueFormat)(s) : s), e = qt(this.yScale).tickSize(0).tickFormat((s) => this.yValueFormat ? ht(this.yValueFormat)(s) : s);
    this.svg.append("g").attr("transform", "translate(0," + this.height + ")").call(t).attr("class", `xAxis${this.graphClass}`).selectAll("text").attr("transform", "translate(-10, 0)rotate(-45)").style("text-anchor", "end").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize), this.svg.append("g").call(e).attr("class", `yAxis${this.graphClass}`).selectAll("text").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize), P("path.domain").attr("stroke", "transparent"), P("g.tick").style("opacity", 1);
  }
  makeAxesRough(t, e) {
    const s = `xAxis${this.graphClass}`, n = `yAxis${this.graphClass}`, h = `rough-${s}`, a = `rough-${n}`;
    x(`.${s}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", h), t.appendChild(u);
    }), P(`.${h}`).attr("transform", `translate(0, ${this.height})`), x(`.${n}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { stroke: "black", fillStyle: "hachure" });
      u.setAttribute("class", a), t.appendChild(u);
    });
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(20, Math.min(this.width, this.height) / 4)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    const t = P(this.interactionG).data(this.dataFormat === "file" ? this.data : this.data.x).append("circle").attr("cx", (h, a) => this.dataFormat === "file" ? this.xScale(+h[this.x]) : this.xScale(+this.data[this.x][a])).attr("cy", (h, a) => this.dataFormat === "file" ? this.yScale(+h[this.y]) : this.yScale(+this.data[this.y][a]));
    this.dataFormat === "file" ? t.attr("r", (h) => typeof this.radius == "number" ? 0.7 * this.radius : 0.6 * this.radiusScale(+h[this.radius])).attr("fill", "transparent") : t.attr("r", (h, a) => {
      const r = this.data[this.radius][a];
      return typeof this.radius == "number" ? 0.7 * this.radius : this.radiusScale(r);
    }).attr("fill", "transparent");
    let e = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none");
    const s = this;
    let n;
    P(this.interactionG).on("mouseover", function() {
      e.style("opacity", 1), n = x(this).selectAll("path").style("stroke"), s.highlight === void 0 ? x(this).selectAll("path:nth-child(1)").style("opacity", 0.4) : x(this).selectAll("path:nth-child(1)").style("stroke", s.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", s.strokeWidth + 1.2);
    }), P(this.interactionG).on("mouseout", function() {
      e.style("opacity", 0), x(this).selectAll("path").style("opacity", 1), x(this).selectAll("path:nth-child(1)").style("stroke", n), x(this).selectAll("path:nth-child(2)").style("stroke", s.stroke), x(this).selectAll("path:nth-child(2)").style("stroke-width", s.strokeWidth);
    }), P(this.interactionG).on("mousemove", function(h) {
      const a = x(this).attr("attrX"), r = x(this).attr("attrY"), o = x(this).attr("attrHighlightLabel"), l = bt(this);
      e.html(s.highlightLabel === "xy" ? `<b>x</b>: ${a} <br><b>y</b>: ${r}` : `<b>${o}</b>`).attr("class", function(u) {
      }).style("transform", `translate(${l[0] + s.margin.left}px, 
          ${l[1] - (s.height + s.margin.top + s.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.axisStrokeWidth, roughness: this.axisRoughness } }), this.rc = Y(this.roughSvg, { options: { stroke: this.stroke === "none" ? void 0 : this.stroke, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  drawFromObject() {
    const t = this;
    let e;
    if (this.radiusScale = Z().domain([0, 20]).range([this.radiusExtent[0], this.radiusExtent[1]]), typeof this.radius == "number")
      e = Z().domain([0, 1]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    else {
      const s = ut(this.data[this.radius]), n = q(this.data[this.radius]);
      e = Z().domain([s, n]).range([this.radiusExtent[0], this.radiusExtent[1]]);
    }
    typeof this.colors == "string" && (this.colors = this.colors), this.colors === void 0 && (this.colors = Bi[0]), this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.x.forEach((s, n) => {
      const h = typeof t.radius == "number" ? t.radius : e(+this.data[t.radius][n]), a = this.rc.circle(this.xScale(+s), this.yScale(+this.data[this.y][n]), h, { fill: typeof this.colors == "string" ? this.colors : this.colors.length === 1 ? this.colors[0] : this.colors[n], simplification: this.simplification, fillWeight: this.fillWeight }), r = this.roughSvg.appendChild(a);
      r.setAttribute("class", this.graphClass), r.setAttribute("attrX", s), r.setAttribute("attrY", this.data[this.y][n]), r.setAttribute("attrHighlightLabel", this.data[this.highlightLabel]);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.colors === void 0 && (this.colors = Bi), this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.data.forEach((t, e) => {
      const s = this.rc.circle(this.xScale(+t[this.x]), this.yScale(+t[this.y]), typeof this.radius == "number" ? this.radius : this.radiusScale(+t[this.radius]), { fill: this.colorVar === void 0 ? this.colors[0] : this.colorScale(t[this.colorVar]), simplification: this.simplification, fillWeight: this.fillWeight }), n = this.roughSvg.appendChild(s);
      n.setAttribute("class", this.graphClass), n.setAttribute("attrX", t[this.x]), n.setAttribute("attrY", t[this.y]), n.setAttribute("attrHighlightLabel", t[this.highlightLabel]);
    }), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
}
class ch extends ot {
  constructor(t) {
    super(t), this.data = t.data, this.margin = t.margin || { top: 50, right: 20, bottom: 70, left: 100 }, this.color = t.color || "red", this.highlight = t.highlight || "coral", this.roughness = at({ roughness: t.roughness }), this.stroke = t.stroke || "black", this.strokeWidth = t.strokeWidth || 1, this.axisStrokeWidth = t.axisStrokeWidth || 0.5, this.axisRoughness = t.axisRoughness || 0.5, this.innerStrokeWidth = t.innerStrokeWidth || 1, this.fillWeight = t.fillWeight || 0.5, this.axisFontSize = t.axisFontSize, this.labels = t.labels, this.values = t.values, this.stackColorMapping = {}, this.padding = t.padding || 0.1, this.xLabel = t.xLabel || "", this.yLabel = t.yLabel || "", this.labelFontSize = t.labelFontSize || "1rem", this.responsive = !0, this.boundRedraw = this.redraw.bind(this, t), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title), window.addEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler() {
    this.responsive && this.boundRedraw();
  }
  remove() {
    x(this.el).select("svg").remove();
  }
  redraw(t) {
    this.remove(), this.initChartValues(t), this.resolveFont(), this.drawChart = this.resolveData(t.data), this.drawChart(), t.title !== "undefined" && this.setTitle(t.title);
  }
  initChartValues(t) {
    this.roughness = t.roughness || this.roughness, this.stroke = t.stroke || this.stroke, this.strokeWidth = t.strokeWidth || this.strokeWidth, this.axisStrokeWidth = t.axisStrokeWidth || this.axisStrokeWidth, this.axisRoughness = t.axisRoughness || this.axisRoughness, this.innerStrokeWidth = t.innerStrokeWidth || this.innerStrokeWidth, this.fillWeight = t.fillWeight || this.fillWeight, this.fillStyle = t.fillStyle || this.fillStyle;
    const e = x(this.el).node().getBoundingClientRect(), s = e.width, n = e.height;
    this.width = s - this.margin.left - this.margin.right, this.height = n - this.margin.top - this.margin.bottom, this.roughId = this.el + "_svg", this.graphClass = this.el.substring(1, this.el.length), this.interactionG = "g." + this.graphClass, this.setSvg();
  }
  getTotal(t) {
    for (let e = 0; e < t.length; e++) {
      let s = 0;
      for (let n = 0; n < t.columns.length; ++n)
        t.columns[n] !== this.labels && (s += t[e][t.columns[n]] = +t[e][t.columns[n]]);
      t[e].total = s;
    }
    return t;
  }
  updateColorMapping(t) {
    this.stackColorMapping[t] || (this.stackColorMapping[t] = yt[Object.keys(this.stackColorMapping).length]);
  }
  resolveData(t) {
    return typeof t != "string" ? () => {
      this.data = t, t = t.map((e) => (Object.keys(e).includes("total") && (e.total = 0), e));
      for (let e = 0; e < t.length; ++e) {
        let s = 0;
        Object.keys(t[e]).forEach((n) => {
          n !== this.labels && n !== "total" && (this.updateColorMapping(n), s += t[e][n]);
        }), t[e].total = s;
      }
      this.drawFromObject();
    } : t.includes(".csv") ? () => {
      xt(t).then((e) => {
        this.getTotal(e), this.data = e, this.drawFromFile();
      });
    } : t.includes(".tsv") ? () => {
      vt(t).then((e) => {
        this.getTotal(e), this.data = e, this.drawFromFile();
      });
    } : void 0;
  }
  addScales() {
    this.xScale = Ht().rangeRound([0, this.width]).padding(this.padding).domain(this.data.map((e) => e[this.labels])), this.yScale = Z().rangeRound([this.height, 0]).domain([0, q(this.data, (e) => e.total)]).nice();
    const t = this.dataFormat === "object" ? this.data.map((e) => e[this.labels]) : this.data.columns;
    this.zScale = Ai().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]).domain(t);
  }
  addLabels() {
    this.xLabel !== "" && this.svg.append("text").attr("x", this.width / 2).attr("y", this.height + this.margin.bottom / 2).attr("dx", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.xLabel), this.yLabel !== "" && this.svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - this.margin.left / 1.4).attr("x", 0 - this.height / 2).attr("dy", "1em").attr("class", "labelText").style("text-anchor", "middle").style("font-family", this.fontFamily).style("font-size", this.labelFontSize).text(this.yLabel);
  }
  addAxes() {
    const t = Dt(this.xScale).tickSize(0);
    this.svg.append("g").attr("transform", "translate(0," + this.height + ")").call(t).attr("class", `xAxis${this.graphClass}`).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.8, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.9);
    const e = qt(this.yScale).tickSize(0);
    this.svg.append("g").call(e).attr("class", `yAxis${this.graphClass}`).selectAll("text").style("font-family", this.fontFamily).style("font-size", this.axisFontSize === void 0 ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` : this.axisFontSize).style("opacity", 0.9), P("path.domain").attr("stroke", "transparent");
  }
  makeAxesRough(t, e) {
    const s = `xAxis${this.graphClass}`, n = `yAxis${this.graphClass}`, h = `rough-${s}`, a = `rough-${n}`;
    x(`.${s}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { fillStyle: "hachure" });
      u.setAttribute("class", h), t.appendChild(u);
    }), P(`.${h}`).attr("transform", `translate(0, ${this.height})`), x(`.${n}`).selectAll("path.domain").each(function(r, o) {
      const l = x(this).node().getAttribute("d"), u = e.path(l, { fillStyle: "hachure" });
      u.setAttribute("class", a), t.appendChild(u);
    });
  }
  setTitle(t) {
    this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr("class", "title").attr("text-anchor", "middle").style("font-size", this.titleFontSize === void 0 ? `${Math.min(40, Math.min(this.width, this.height) / 5)}px` : this.titleFontSize).style("font-family", this.fontFamily).style("opacity", 0.8).text(t);
  }
  addInteraction() {
    P(this.interactionG).each(function(n, h) {
      const a = this.attributes;
      x(this).append("rect").attr("x", a.x.value).attr("y", a.y.value).attr("width", a.width.value).attr("height", a.height.value).attr("fill", "transparent");
    });
    const t = x(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style("position", "absolute").style("background-color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style("font-family", this.fontFamily).style("font-size", this.tooltipFontSize).style("pointer-events", "none"), e = this;
    let s;
    P(this.interactionG).on("mouseover", function() {
      t.style("opacity", 1), s = x(this).selectAll("path").style("stroke"), x(this).select("path").style("stroke", e.highlight), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth + 1.2);
    }), P(this.interactionG).on("mouseout", function() {
      t.style("opacity", 0), x(this).select("path").style("stroke", s), x(this).selectAll("path:nth-child(2)").style("stroke-width", e.strokeWidth);
    }), P(this.interactionG).on("mousemove", function(n) {
      const h = x(this).attr("attrX"), a = x(this).attr("attrY"), r = bt(this);
      t.html(`<b>${h}</b>: ${a}`).style("opacity", 0.95).attr("class", function(o) {
      }).style("transform", `translate(${r[0] + e.margin.left}px, 
          ${r[1] - (e.height + e.margin.top + e.margin.bottom / 2)}px)`);
    });
  }
  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId), this.rcAxis = Y(this.roughSvg, { options: { strokeWidth: this.axisStrokeWidth, roughness: this.axisRoughness } }), this.rc = Y(this.roughSvg, { options: { stroke: this.stroke === "none" ? void 0 : this.stroke, strokeWidth: this.innerStrokeWidth, roughness: this.roughness, bowing: this.bowing, fillStyle: this.fillStyle } });
  }
  stacking() {
    this.data.forEach((t) => {
      const e = Object.keys(t);
      let s = 0;
      e.forEach((n, h) => {
        if (h > 0 && n !== "total") {
          s += parseInt(t[n], 10);
          const a = this.xScale(t[this.labels]), r = this.yScale(s), o = this.xScale.bandwidth(), l = this.height - this.yScale(+t[n]), u = this.rc.rectangle(a, r, o, l, { fill: this.stackColorMapping[n] || this.colors[h], stroke: this.stackColorMapping[n] || this.colors[h], simplification: this.simplification, fillWeight: this.fillWeight }), c = this.roughSvg.appendChild(u);
          c.setAttribute("class", this.graphClass), c.setAttribute("attrX", t[this.labels]), c.setAttribute("keyY", n), c.setAttribute("attrY", +t[n]), c.setAttribute("x", a), c.setAttribute("y", r), c.setAttribute("width", o), c.setAttribute("height", l);
        }
      });
    });
  }
  drawFromObject() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.stacking(), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
  drawFromFile() {
    this.initRoughObjects(), this.addScales(), this.addAxes(), this.makeAxesRough(this.roughSvg, this.rcAxis), this.addLabels(), this.stacking(), P(this.interactionG).selectAll("path:nth-child(2)").style("stroke-width", this.strokeWidth), this.interactive === !0 && this.addInteraction();
  }
}
export {
  sh as Bar,
  nh as BarH,
  rh as Donut,
  oh as Force,
  hh as Line,
  ah as Network,
  lh as Pie,
  uh as Scatter,
  ch as StackedBar
};
