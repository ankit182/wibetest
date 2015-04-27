if (!window['YT']) {
    var YT = {
        loading: 0,
        loaded: 0
    };
}
if (!window['YTConfig']) {
    var YTConfig = {
        'host': 'http://www.youtube.com'
    };
}
if (!YT.loading) {
    YT.loading = 1;
    (function() {
        var l = [];
        YT.ready = function(f) {
            if (YT.loaded) {
                f();
            } else {
                l.push(f);
            }
        };
        window.onYTReady = function() {
            YT.loaded = 1;
            for (var i = 0; i < l.length; i++) {
                try {
                    l[i]();
                } catch (e) {}
            }
        };
        YT.setConfig = function(c) {
            for (var k in c) {
                if (c.hasOwnProperty(k)) {
                    YTConfig[k] = c[k];
                }
            }
        };

    })();
}
(function() {
    var g, h = this;

    function l(a) {
        a = a.split(".");
        for (var b = h, c; c = a.shift();)
            if (null != b[c]) b = b[c];
            else return null;
        return b
    }

    function aa() {}

    function m(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function n(a) {
        return "string" == typeof a
    }

    function ba(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    var p = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ca = 0;

    function da(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ea(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
        return q.apply(null, arguments)
    }

    function r(a, b) {
        var c = a.split("."),
            d = h;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d[e] ? d = d[e] : d = d[e] = {} : d[e] = b
    }

    function t(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.I = b.prototype;
        a.prototype = new c;
        a.base = function(a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    }
    Function.prototype.bind = Function.prototype.bind || function(a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return q.apply(null, c)
        }
        return q(this, a)
    };
    var fa = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function u(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var v = Array.prototype,
        ga = v.indexOf ? function(a, b, c) {
            return v.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        w = v.forEach ? function(a, b, c) {
            v.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        };

    function ha(a, b) {
        var c;
        t: {
            c = a.length;
            for (var d = n(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    c = e;
                    break t
                }
            c = -1
        }
        return 0 > c ? null : n(a) ? a.charAt(c) : a[c]
    }

    function ia(a) {
        return v.concat.apply(v, arguments)
    }

    function ja(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function ka(a, b, c) {
        return 2 >= arguments.length ? v.slice.call(a, b) : v.slice.call(a, b, c)
    };

    function la(a) {
        var b = x,
            c;
        for (c in b)
            if (a.call(void 0, b[c], c, b)) return c
    };
    var y;
    t: {
        var ma = h.navigator;
        if (ma) {
            var na = ma.userAgent;
            if (na) {
                y = na;
                break t
            }
        }
        y = ""
    };
    var oa = -1 != y.indexOf("Opera") || -1 != y.indexOf("OPR"),
        z = -1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE"),
        A = -1 != y.indexOf("Gecko") && -1 == y.toLowerCase().indexOf("webkit") && !(-1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE")),
        pa = -1 != y.toLowerCase().indexOf("webkit");

    function qa() {
        var a = h.document;
        return a ? a.documentMode : void 0
    }
    var B = function() {
            var a = "",
                b;
            if (oa && h.opera) return a = h.opera.version, "function" == m(a) ? a() : a;
            A ? b = /rv\:([^\);]+)(\)|;)/ : z ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : pa && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(y)) ? a[1] : "");
            return z && (b = qa(), b > parseFloat(a)) ? String(b) : a
        }(),
        ra = {};

    function sa(a) {
        if (!ra[a]) {
            for (var b = 0, c = fa(String(B)).split("."), d = fa(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var k = c[f] || "",
                    s = d[f] || "",
                    mb = RegExp("(\\d*)(\\D*)", "g"),
                    nb = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var K = mb.exec(k) || ["", "", ""],
                        L = nb.exec(s) || ["", "", ""];
                    if (0 == K[0].length && 0 == L[0].length) break;
                    b = u(0 == K[1].length ? 0 : parseInt(K[1], 10), 0 == L[1].length ? 0 : parseInt(L[1], 10)) || u(0 == K[2].length, 0 == L[2].length) || u(K[2], L[2])
                } while (0 == b)
            }
            ra[a] = 0 <= b
        }
    }
    var ta = h.document,
        ua = ta && z ? qa() || ("CSS1Compat" == ta.compatMode ? parseInt(B, 10) : 5) : void 0;
    var C;
    if (!(C = !A && !z)) {
        var D;
        if (D = z) D = z && 9 <= ua;
        C = D
    }
    C || A && sa("1.9.1");
    z && sa("9");

    function va(a) {
        var b, c, d, e;
        b = document;
        if (b.querySelectorAll && b.querySelector && a) return b.querySelectorAll("" + (a ? "." + a : ""));
        if (a && b.getElementsByClassName) {
            var f = b.getElementsByClassName(a);
            return f
        }
        f = b.getElementsByTagName("*");
        if (a) {
            e = {};
            for (c = d = 0; b = f[c]; c++) {
                var k = b.className,
                    s;
                if (s = "function" == typeof k.split) s = 0 <= ga(k.split(/\s+/), a);
                s && (e[d++] = b)
            }
            e.length = d;
            return e
        }
        return f
    }

    function wa(a, b) {
        for (var c = 0; a;) {
            if (b(a)) return a;
            a = a.parentNode;
            c++
        }
        return null
    };

    function xa(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }

    function ya() {}

    function E(a, b, c) {
        switch (typeof b) {
            case "string":
                za(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if ("array" == m(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), E(a, b[f], c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), za(e, c), c.push(":"), E(a, f, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }
    var F = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Aa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function za(a, b) {
        b.push('"', a.replace(Aa, function(a) {
            if (a in F) return F[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return F[a] = e + b.toString(16)
        }), '"')
    };

    function G() {
        this.j = this.j;
        this.o = this.o
    }
    G.prototype.j = !1;
    G.prototype.dispose = function() {
        this.j || (this.j = !0, this.H())
    };
    G.prototype.H = function() {
        if (this.o)
            for (; this.o.length;) this.o.shift()()
    };

    function H() {
        G.call(this);
        this.d = [];
        this.g = {}
    }
    t(H, G);
    g = H.prototype;
    g.O = 1;
    g.B = 0;
    g.subscribe = function(a, b, c) {
        var d = this.g[a];
        d || (d = this.g[a] = []);
        var e = this.O;
        this.d[e] = a;
        this.d[e + 1] = b;
        this.d[e + 2] = c;
        this.O = e + 3;
        d.push(e);
        return e
    };

    function Ba(a, b, c) {
        var d = I;
        if (a = d.g[a]) {
            var e = d.d;
            (a = ha(a, function(a) {
                return e[a + 1] == b && e[a + 2] == c
            })) && Ca(d, a)
        }
    }

    function Ca(a, b) {
        if (0 != a.B) a.k || (a.k = []), a.k.push(b);
        else {
            var c = a.d[b];
            if (c) {
                if (c = a.g[c]) {
                    var d = ga(c, b);
                    0 <= d && v.splice.call(c, d, 1)
                }
                delete a.d[b];
                delete a.d[b + 1];
                delete a.d[b + 2]
            }
        }
    }
    g.R = function(a, b) {
        var c = this.g[a];
        if (c) {
            this.B++;
            for (var d = ka(arguments, 1), e = 0, f = c.length; e < f; e++) {
                var k = c[e];
                this.d[k + 1].apply(this.d[k + 2], d)
            }
            this.B--;
            if (this.k && 0 == this.B)
                for (; c = this.k.pop();) Ca(this, c);
            return 0 != e
        }
        return !1
    };
    g.H = function() {
        H.I.H.call(this);
        delete this.d;
        delete this.g;
        delete this.k
    };
    var Da = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Ea(a) {
        if (Fa) {
            Fa = !1;
            var b = h.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Ea(c)[3] || null) ? decodeURI(c) : c) && c != b.hostname) throw Fa = !0, Error();
            }
        }
        return a.match(Da)
    }
    var Fa = pa;

    function Ga(a, b, c) {
        if ("array" == m(b))
            for (var d = 0; d < b.length; d++) Ga(a, String(b[d]), c);
        else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }
    var Ha = /#|$/;
    var Ia = {};

    function Ja(a) {
        return Ia[a] || (Ia[a] = String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        }))
    };
    var Ka = l("yt.dom.getNextId_");
    if (!Ka) {
        Ka = function() {
            return ++La
        };
        r("yt.dom.getNextId_", Ka);
        var La = 0
    };
    var J = window.yt && window.yt.config_ || {};
    r("yt.config_", J);
    r("yt.tokens_", window.yt && window.yt.tokens_ || {});
    r("yt.msgs_", window.yt && window.yt.msgs_ || {});

    function Ma(a) {
        var b = arguments;
        if (1 < b.length) {
            var c = b[0];
            J[c] = b[1]
        } else
            for (c in b = b[0], b) J[c] = b[c]
    }

    function Na(a) {
        "function" == m(a) && (a = Oa(a));
        return window.setInterval(a, 250)
    }

    function Oa(a) {
        return a && window.yterr ? function() {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                var c = b;
                if (window && window.yterr) {
                    var d = l("yt.www.errors.log");
                    d ? d(c, void 0) : (d = ("ERRORS" in J ? J.ERRORS : void 0) || [], d.push([c, void 0]), Ma("ERRORS", d))
                }
                throw b;
            }
        } : a
    };

    function Pa(a) {
        if (a = a || window.event) {
            for (var b in a) b in Qa || (this[b] = a[b]);
            (b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if (b = a.relatedTarget) try {
                b = b.nodeName ? b : null
            } catch (c) {
                b = null
            } else "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);
            this.relatedTarget = b;
            this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" == this.type ?
                this.keyCode : 0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            "MozMousePixelScroll" == this.type ? (this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0, this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail) : window.opera ? (this.wheelDeltaX = 0, this.wheelDeltaY = a.detail) : 0 == a.wheelDelta % 120 ? "WebkitTransform" in document.documentElement.style ? window.chrome && 0 == navigator.platform.indexOf("Mac") ? (this.wheelDeltaX = a.wheelDeltaX / -30, this.wheelDeltaY = a.wheelDeltaY / -30) : (this.wheelDeltaX =
                a.wheelDeltaX / -1.2, this.wheelDeltaY = a.wheelDeltaY / -1.2) : (this.wheelDeltaX = 0, this.wheelDeltaY = a.wheelDelta / -1.6) : (this.wheelDeltaX = a.wheelDeltaX / -3, this.wheelDeltaY = a.wheelDeltaY / -3)
        }
    }
    g = Pa.prototype;
    g.type = "";
    g.target = null;
    g.relatedTarget = null;
    g.currentTarget = null;
    g.data = null;
    g.keyCode = 0;
    g.charCode = 0;
    g.altKey = !1;
    g.ctrlKey = !1;
    g.shiftKey = !1;
    g.clientX = 0;
    g.clientY = 0;
    g.wheelDeltaX = 0;
    g.wheelDeltaY = 0;
    var Qa = {
        stopImmediatePropagation: 1,
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        scale: 1,
        rotation: 1
    };
    var x = l("yt.events.listeners_") || {};
    r("yt.events.listeners_", x);
    var Ra = l("yt.events.counter_") || {
        count: 0
    };
    r("yt.events.counter_", Ra);

    function Sa(a, b, c) {
        return la(function(d) {
            return d[0] == a && d[1] == b && d[2] == c && 0 == d[4]
        })
    }

    function Ta(a, b, c) {
        if (a && (a.addEventListener || a.attachEvent)) {
            var d = Sa(a, b, c);
            if (!d) {
                var d = ++Ra.count + "",
                    e = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document),
                    f;
                f = e ? function(d) {
                    d = new Pa(d);
                    if (!wa(d.relatedTarget, function(b) {
                        return b == a
                    })) return d.currentTarget = a, d.type = b, c.call(a, d)
                } : function(b) {
                    b = new Pa(b);
                    b.currentTarget = a;
                    return c.call(a, b)
                };
                f = Oa(f);
                x[d] = [a, b, c, f, !1];
                a.addEventListener ? "mouseenter" == b && e ? a.addEventListener("mouseover", f, !1) : "mouseleave" == b && e ? a.addEventListener("mouseout",
                    f, !1) : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style ? a.addEventListener("MozMousePixelScroll", f, !1) : a.addEventListener(b, f, !1) : a.attachEvent("on" + b, f)
            }
        }
    }

    function Ua(a) {
        a && ("string" == typeof a && (a = [a]), w(a, function(a) {
            if (a in x) {
                var c = x[a],
                    d = c[0],
                    e = c[1],
                    f = c[3],
                    c = c[4];
                d.removeEventListener ? d.removeEventListener(e, f, c) : d.detachEvent && d.detachEvent("on" + e, f);
                delete x[a]
            }
        }))
    };

    function Va(a) {
        var b = [],
            c;
        for (c in a) Ga(c, a[c], b);
        b[0] = "";
        return b.join("")
    };
    var M = {},
        Wa = [],
        I = new H,
        Xa = {};

    function Ya() {
        w(Wa, function(a) {
            a()
        })
    }

    function Za(a) {
        var b = ja(document.getElementsByTagName("yt:" + a));
        a = "yt-" + a;
        var c = document;
        a = c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : va(a);
        a = ja(a);
        return ia(b, a)
    }

    function N(a, b) {
        return "yt:" == a.tagName.toLowerCase().substr(0, 3) ? a.getAttribute(b) : a ? a.dataset ? a.dataset[Ja(b)] : a.getAttribute("data-" + b) : null
    }

    function $a(a, b) {
        I.R.apply(I, arguments)
    };

    function O(a, b, c) {
        this.g = b;
        this.o = this.d = null;
        this.G = this[p] || (this[p] = ++ca);
        this.j = 0;
        this.F = !1;
        this.D = [];
        this.k = null;
        this.L = c;
        this.M = {};
        b = document;
        if (a = n(a) ? b.getElementById(a) : a)
            if ("iframe" != a.tagName.toLowerCase() && (b = ab(this, a), this.o = a, (c = a.parentNode) && c.replaceChild(b, a), a = b), this.d = a, this.d.id || (b = a = this.d, b = b[p] || (b[p] = ++ca), a.id = "widget" + b), M[this.d.id] = this, window.postMessage) {
                this.k = new H;
                bb(this);
                a = P(this.g, "events");
                for (var d in a) a.hasOwnProperty(d) && this.addEventListener(d, a[d]);
                for (var e in Xa) cb(this,
                    e)
            }
    }
    g = O.prototype;
    g.Y = function(a, b) {
        this.d.width = a;
        this.d.height = b;
        return this
    };
    g.X = function() {
        return this.d
    };
    g.P = function(a) {
        this.v(a.event, a)
    };
    g.addEventListener = function(a, b) {
        var c = b;
        "string" == typeof b && (c = function() {
            window[b].apply(window, arguments)
        });
        this.k.subscribe(a, c);
        db(this, a);
        return this
    };

    function cb(a, b) {
        var c = b.split(".");
        if (2 != !c.length) {
            var d = c[1];
            a.L == c[0] && db(a, d)
        }
    }
    g.destroy = function() {
        this.d.id && (M[this.d.id] = null);
        var a = this.k;
        a && "function" == typeof a.dispose && a.dispose();
        if (this.o) {
            var a = this.d,
                b = a.parentNode;
            b && b.replaceChild(this.o, a)
        } else(a = this.d) && a.parentNode && a.parentNode.removeChild(a);
        Q && (Q[this.G] = null);
        this.g = null;
        var a = this.d,
            c;
        for (c in x) x[c][0] == a && Ua(c);
        this.o = this.d = null
    };
    g.C = function() {
        return {}
    };

    function R(a, b, c) {
        c = c || [];
        c = Array.prototype.slice.call(c);
        b = {
            event: "command",
            func: b,
            args: c
        };
        a.F ? a.J(b) : a.D.push(b)
    }
    g.v = function(a, b) {
        if (!this.k.j) {
            var c = {
                target: this,
                data: b
            };
            this.k.R(a, c);
            $a(this.L + "." + a, c)
        }
    };

    function ab(a, b) {
        for (var c = document.createElement("iframe"), d = b.attributes, e = 0, f = d.length; e < f; e++) {
            var k = d[e].value;
            null != k && "" != k && "null" != k && c.setAttribute(d[e].name, k)
        }
        c.setAttribute("frameBorder", 0);
        c.setAttribute("allowfullscreen", 1);
        c.setAttribute("title", "YouTube " + P(a.g, "title"));
        (d = P(a.g, "width")) && c.setAttribute("width", d);
        (d = P(a.g, "height")) && c.setAttribute("height", d);
        var s = a.C();
        s.enablejsapi = window.postMessage ? 1 : 0;
        window.location.host && (s.origin = window.location.protocol + "//" + window.location.host);
        window.location.href && w(["debugjs", "debugcss"], function(a) {
            var b;
            b = window.location.href;
            var c = b.search(Ha),
                d;
            i: {
                d = 0;
                for (var e = a.length; 0 <= (d = b.indexOf(a, d)) && d < c;) {
                    var f = b.charCodeAt(d - 1);
                    if (38 == f || 63 == f)
                        if (f = b.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f) break i;
                    d += e + 1
                }
                d = -1
            }
            if (0 > d) b = null;
            else {
                e = b.indexOf("&", d);
                if (0 > e || e > c) e = c;
                d += a.length + 1;
                b = decodeURIComponent(b.substr(d, e - d).replace(/\+/g, " "))
            }
            null === b || (s[a] = b)
        });
        c.src = P(a.g, "host") + a.K() + "?" + Va(s);
        return c
    }
    g.N = function() {
        this.d && this.d.contentWindow ? this.J({
            event: "listening"
        }) : window.clearInterval(this.j)
    };

    function bb(a) {
        eb(a.g, a, a.G);
        a.j = Na(q(a.N, a));
        Ta(a.d, "load", q(function() {
            window.clearInterval(this.j);
            this.j = Na(q(this.N, this))
        }, a))
    }

    function db(a, b) {
        a.M[b] || (a.M[b] = !0, R(a, "addEventListener", [b]))
    }
    g.J = function(a) {
        a.id = this.G;
        var b = [];
        E(new ya, a, b);
        a = b.join("");
        var b = this.g,
            c, d = Ea(this.d.src);
        c = d[1];
        var e = d[2],
            f = d[3],
            d = d[4],
            k = "";
        c && (k += c + ":");
        f && (k += "//", e && (k += e + "@"), k += f, d && (k += ":" + d));
        c = k;
        b = 0 == c.indexOf("https:") ? [c] : b.d ? [c.replace("http:", "https:")] : b.j ? [c] : [c, c.replace("http:", "https:")];
        for (c = 0; c < b.length; c++) this.d.contentWindow.postMessage(a, b[c])
    };
    var fb = "StopIteration" in h ? h.StopIteration : Error("StopIteration");

    function gb() {}
    gb.prototype.next = function() {
        throw fb;
    };
    gb.prototype.g = function() {
        return this
    };
    var hb, ib, jb, kb, lb, ob, pb;
    pb = ob = lb = kb = jb = ib = hb = !1;
    var S = y;
    S && (-1 != S.indexOf("Firefox") ? hb = !0 : -1 != S.indexOf("Camino") ? ib = !0 : -1 != S.indexOf("iPhone") || -1 != S.indexOf("iPod") ? jb = !0 : -1 != S.indexOf("iPad") ? kb = !0 : -1 != S.indexOf("Chrome") ? ob = !0 : -1 != S.indexOf("Android") ? lb = !0 : -1 != S.indexOf("Safari") && (pb = !0));
    var qb = hb,
        rb = ib,
        sb = jb,
        tb = kb,
        ub = lb,
        vb = ob,
        wb = pb;
    var xb = "corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com prod.google.com sandbox.google.com docs.google.com drive.google.com mail.google.com plus.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),
        yb = "";

    function zb() {}
    new zb;
    new zb;
    var T = y,
        T = T.toLowerCase();
    if (-1 != T.indexOf("android") && !T.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/)) {
        var Ab = {
                cupcake: 1.5,
                donut: 1.6,
                eclair: 2,
                froyo: 2.2,
                gingerbread: 2.3,
                honeycomb: 3,
                "ice cream sandwich": 4,
                jellybean: 4.1
            },
            Bb = [],
            Cb = 0,
            Db;
        for (Db in Ab) Bb[Cb++] = Db;
        T.match("(" + Bb.join("|") + ")")
    };
    var Eb = l("yt.net.ping.workerUrl_") || null;
    r("yt.net.ping.workerUrl_", Eb);
    var U = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
    q(U.clearResourceTimings || U.webkitClearResourceTimings || U.mozClearResourceTimings || U.msClearResourceTimings || U.oClearResourceTimings || aa, U);
    var Fb;
    var Gb = y,
        Hb = Gb.match(/\((iPad|iPhone|iPod)( Simulator)?;/);
    if (!Hb || 2 > Hb.length) Fb = void 0;
    else {
        var Ib = Gb.match(/\((iPad|iPhone|iPod)( Simulator)?; (U; )?CPU (iPhone )?OS (\d_\d)[_ ]/);
        Fb = Ib && 6 == Ib.length ? Number(Ib[5].replace("_", ".")) : 0
    }
    0 <= Fb && 0 <= y.search("Safari") && y.search("Version");

    function V(a) {
        return (a = a.exec(y)) ? a[1] : ""
    }(function() {
        if (qb) return V(/Firefox\/([0-9.]+)/);
        if (z || oa) return B;
        if (vb) return V(/Chrome\/([0-9.]+)/);
        if (wb) return V(/Version\/([0-9.]+)/);
        if (sb || tb) {
            var a;
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(y)) return a[1] + "." + a[2]
        } else {
            if (ub) return (a = V(/Android\s+([0-9.]+)/)) ? a : V(/Version\/([0-9.]+)/);
            if (rb) return V(/Camino\/([0-9.]+)/)
        }
        return ""
    })();

    function Jb() {};

    function Kb() {}
    t(Kb, Jb);

    function W(a) {
        this.d = a
    }
    t(W, Kb);
    W.prototype.isAvailable = function() {
        if (!this.d) return !1;
        try {
            return this.d.setItem("__sak", "1"), this.d.removeItem("__sak"), !0
        } catch (a) {
            return !1
        }
    };
    W.prototype.g = function(a) {
        var b = 0,
            c = this.d,
            d = new gb;
        d.next = function() {
            if (b >= c.length) throw fb;
            var d;
            d = c.key(b++);
            if (a) return d;
            d = c.getItem(d);
            if (!n(d)) throw "Storage mechanism: Invalid value was encountered";
            return d
        };
        return d
    };
    W.prototype.key = function(a) {
        return this.d.key(a)
    };

    function Lb() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.d = a
    }
    t(Lb, W);

    function Mb() {
        var a = null;
        try {
            a = window.sessionStorage || null
        } catch (b) {}
        this.d = a
    }
    t(Mb, W);
    (new Lb).isAvailable();
    (new Mb).isAvailable();

    function Nb(a) {
        return (0 == a.search("cue") || 0 == a.search("load")) && "loadModule" != a
    }

    function Ob(a) {
        return 0 == a.search("get") || 0 == a.search("is")
    };

    function X(a) {
        this.g = a || {};
        this.defaults = {};
        this.defaults.host = "http://www.youtube.com";
        this.defaults.title = "";
        this.j = this.d = !1;
        a = document.getElementById("www-widgetapi-script");
        if (this.d = !!("https:" == document.location.protocol || a && 0 == a.src.indexOf("https:"))) {
            a = [this.g, window.YTConfig || {},
                this.defaults
            ];
            for (var b = 0; b < a.length; b++) a[b].host && (a[b].host = a[b].host.replace("http://", "https://"))
        }
    }
    var Q = null;

    function P(a, b) {
        for (var c = [a.g, window.YTConfig || {},
            a.defaults
        ], d = 0; d < c.length; d++) {
            var e = c[d][b];
            if (void 0 != e) return e
        }
        return null
    }

    function eb(a, b, c) {
        Q || (Q = {}, Ta(window, "message", q(a.k, a)));
        Q[c] = b
    }
    X.prototype.k = function(a) {
        var b;
        (b = a.origin == P(this, "host")) || ((b = a.origin) && b == yb ? b = !0 : (new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*(" + xb.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i")).test(b) ? (yb = b, b = !0) : b = !1);
        if (b) {
            var c;
            try {
                c = xa(a.data)
            } catch (d) {
                return
            }
            this.j = !0;
            this.d || 0 != a.origin.indexOf("https:") || (this.d = !0);
            if (a = Q[c.id]) a.F = !0, a.F && (w(a.D, a.J, a), a.D.length = 0), a.P(c)
        }
    };

    function Pb(a) {
        X.call(this, a);
        this.defaults.title = "video player";
        this.defaults.videoId = "";
        this.defaults.width = 640;
        this.defaults.height = 360
    }
    t(Pb, X);

    function Y(a, b) {
        var c = new Pb(b);
        O.call(this, a, c, "player");
        this.A = {};
        this.t = {}
    }
    t(Y, O);

    function Qb(a) {
        if ("iframe" != a.tagName.toLowerCase()) {
            var b = N(a, "videoid");
            if (b) {
                var c = N(a, "width"),
                    d = N(a, "height");
                new Y(a, {
                    videoId: b,
                    width: c,
                    height: d
                })
            }
        }
    }
    g = Y.prototype;
    g.K = function() {
        return "/embed/" + P(this.g, "videoId")
    };
    g.C = function() {
        var a;
        if (P(this.g, "playerVars")) {
            a = P(this.g, "playerVars");
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            a = b
        } else a = {};
        return a
    };
    g.P = function(a) {
        var b = a.event;
        a = a.info;
        switch (b) {
            case "apiInfoDelivery":
                if (ba(a))
                    for (var c in a) this.t[c] = a[c];
                break;
            case "infoDelivery":
                Rb(this, a);
                break;
            case "initialDelivery":
                window.clearInterval(this.j);
                this.A = {};
                this.t = {};
                Sb(this, a.apiInterface);
                Rb(this, a);
                break;
            default:
                this.v(b, a)
        }
    };

    function Rb(a, b) {
        if (ba(b))
            for (var c in b) a.A[c] = b[c]
    }

    function Sb(a, b) {
        w(b, function(a) {
            this[a] || (Nb(a) ? this[a] = function() {
                this.A = {};
                this.t = {};
                R(this, a, arguments);
                return this
            } : Ob(a) ? this[a] = function() {
                var b = 0;
                0 == a.search("get") ? b = 3 : 0 == a.search("is") && (b = 2);
                return this.A[a.charAt(b).toLowerCase() + a.substr(b + 1)]
            } : this[a] = function() {
                R(this, a, arguments);
                return this
            })
        }, a)
    }
    g.aa = function() {
        var a = this.d.cloneNode(!1),
            b = this.A.videoData,
            c = P(this.g, "host");
        a.src = b && b.video_id ? c + "/embed/" + b.video_id : a.src;
        b = document.createElement("div");
        b.appendChild(a);
        return b.innerHTML
    };
    g.$ = function(a) {
        return this.t.namespaces ? a ? this.t[a].options || [] : this.t.namespaces || [] : []
    };
    g.Z = function(a, b) {
        if (this.t.namespaces && a && b) return this.t[a][b]
    };

    function Tb(a) {
        X.call(this, a);
        this.defaults.title = "Thumbnail";
        this.defaults.videoId = "";
        this.defaults.width = 120;
        this.defaults.height = 68
    }
    t(Tb, X);

    function Z(a, b) {
        var c = new Tb(b);
        O.call(this, a, c, "thumbnail")
    }
    t(Z, O);

    function Ub(a) {
        if ("iframe" != a.tagName.toLowerCase()) {
            var b = N(a, "videoid");
            if (b) {
                b = {
                    videoId: b,
                    events: {}
                };
                b.width = N(a, "width");
                b.height = N(a, "height");
                b.thumbWidth = N(a, "thumb-width");
                b.thumbHeight = N(a, "thumb-height");
                b.thumbAlign = N(a, "thumb-align");
                var c = N(a, "onclick");
                c && (b.events.onClick = c);
                new Z(a, b)
            }
        }
    }
    Z.prototype.K = function() {
        return "/embed/" + P(this.g, "videoId")
    };
    Z.prototype.C = function() {
        return {
            player: 0,
            thumb_width: P(this.g, "thumbWidth"),
            thumb_height: P(this.g, "thumbHeight"),
            thumb_align: P(this.g, "thumbAlign")
        }
    };
    Z.prototype.v = function(a, b) {
        Z.I.v.call(this, a, b ? b.info : void 0)
    };

    function Vb(a) {
        X.call(this, a);
        this.defaults.host = "https://www.youtube.com";
        this.defaults.title = "upload widget";
        this.defaults.width = 640;
        this.defaults.height = .67 * P(this, "width")
    }
    t(Vb, X);

    function $(a, b) {
        var c = new Vb(b);
        O.call(this, a, c, "upload")
    }
    t($, O);
    g = $.prototype;
    g.K = function() {
        return "/upload_embed"
    };
    g.C = function() {
        var a = {},
            b = P(this.g, "webcamOnly");
        null != b && (a.webcam_only = b);
        return a
    };
    g.v = function(a, b) {
        $.I.v.call(this, a, b);
        "onApiReady" == a && R(this, "hostWindowReady")
    };
    g.S = function(a) {
        R(this, "setVideoDescription", arguments)
    };
    g.U = function(a) {
        R(this, "setVideoKeywords", arguments)
    };
    g.V = function(a) {
        R(this, "setVideoPrivacy", arguments)
    };
    g.T = function(a) {
        R(this, "setVideoDraftPrivacy", arguments)
    };
    g.W = function(a) {
        R(this, "setVideoTitle", arguments)
    };
    r("YT.PlayerState.UNSTARTED", -1);
    r("YT.PlayerState.ENDED", 0);
    r("YT.PlayerState.PLAYING", 1);
    r("YT.PlayerState.PAUSED", 2);
    r("YT.PlayerState.BUFFERING", 3);
    r("YT.PlayerState.CUED", 5);
    r("YT.UploadWidgetEvent.API_READY", "onApiReady");
    r("YT.UploadWidgetEvent.UPLOAD_SUCCESS", "onUploadSuccess");
    r("YT.UploadWidgetEvent.PROCESSING_COMPLETE", "onProcessingComplete");
    r("YT.UploadWidgetEvent.STATE_CHANGE", "onStateChange");
    r("YT.UploadWidgetState.IDLE", 0);
    r("YT.UploadWidgetState.PENDING", 1);
    r("YT.UploadWidgetState.ERROR", 2);
    r("YT.UploadWidgetState.PLAYBACK", 3);
    r("YT.UploadWidgetState.RECORDING", 4);
    r("YT.UploadWidgetState.STOPPED", 5);
    r("YT.get", function(a) {
        return M[a]
    });
    r("YT.scan", Ya);
    r("YT.subscribe", function(a, b, c) {
        I.subscribe(a, b, c);
        Xa[a] = !0;
        for (var d in M) cb(M[d], a)
    });
    r("YT.unsubscribe", function(a, b, c) {
        Ba(a, b, c)
    });
    r("YT.Player", Y);
    r("YT.Thumbnail", Z);
    r("YT.UploadWidget", $);
    O.prototype.destroy = O.prototype.destroy;
    O.prototype.setSize = O.prototype.Y;
    O.prototype.getIframe = O.prototype.X;
    O.prototype.addEventListener = O.prototype.addEventListener;
    Y.prototype.getVideoEmbedCode = Y.prototype.aa;
    Y.prototype.getOptions = Y.prototype.$;
    Y.prototype.getOption = Y.prototype.Z;
    $.prototype.setVideoDescription = $.prototype.S;
    $.prototype.setVideoKeywords = $.prototype.U;
    $.prototype.setVideoPrivacy = $.prototype.V;
    $.prototype.setVideoTitle = $.prototype.W;
    $.prototype.setVideoDraftPrivacy = $.prototype.T;
    Wa.push(function() {
        var a = Za("player");
        w(a, Qb)
    });
    Wa.push(function() {
        var a = Za("thumbnail");
        w(a, Ub)
    });
    YTConfig.parsetags && "onload" != YTConfig.parsetags || Ya();
    var Wb = l("onYTReady");
    Wb && Wb();
    var Xb = l("onYouTubeIframeAPIReady");
    Xb && Xb();
    var Yb = l("onYouTubePlayerAPIReady");
    Yb && Yb();
})();

var api_load_flag = document.createElement("div");
api_load_flag.id = "YT-API-load";
api_load_flag.innerHTML = "1";
$("body").api_load_flag;
