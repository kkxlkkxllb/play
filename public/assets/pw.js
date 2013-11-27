window.PageWork = function () {
    function Q() {
        E = Main.stage.width - r * (p + t) - t;
        Utils.transform2(k, E - 0.75 * p, 0);
        setTimeout(function () {
            Utils.transform2(k, 0, 0);
            Utils.transition(k, "transform", "2500ms cubic-bezier(0.35,0,0.105,1)")
        }, 50);
        for (var a = r; a--;) {
            var b = f[a];
            b.el.style.opacity = 0;
            Utils.transform2(b.el, 1.05 * b.x, b.y, 0.0175);
            var d = 740 * (1 - a / (r - 1));
            setTimeout(Utils.delegate(this, function (a) {
                a.el.style.opacity = 1;
                Utils.transform2(a.el, a.x, a.y, 1);
                Utils.transition(a.el, "all", "740ms ease-in-out")
            }, b), d)
        }
        G = setTimeout(R,
            2600)
    }

    function R() {
        Utils.resetTransition(k);
        g.activate(!0);
        v(!1)
    }

    function y() {
        if (!z && (m.style.width = Main.stage.width + "px", m.style.height = Main.stage.height + "px", A = 0.5 * Main.stage.height, k.style.top = A + "px", g.resize(), -1 != h)) {
            var a = w(h);
            g.slideTo(a.scrollX, 0, 1, "linear");
            for (var b = n.length; b--;) {
                var d = n[b];
                Utils.resetTransition(d.el);
                Utils.transform2(d.el, d.x + a.othersOff * (d.index > h ? 1 : -1), 0)
            }
            if (q == B) {
                var F = c.el.style[Utils.transitionName];
                Utils.resetTransition(c.el);
                a = H();
                Utils.transform2(c.el, a.x, a.y -
                    3, a.scale, a.angle);
                setTimeout(function () {
                    "0ms" != F && (c.el.style[Utils.transitionName] = F)
                }, 0);
                l.resize()
            }
        }
    }

    function v(a) {
        (z = a) ? I = Main.stage.width : I != Main.stage.width && y()
    }

    function J() {
        g.activate(!1);
        g.pause()
    }

    function K() {
        q == B ? C() : q == S && (u.stop(), Preloader.hide(), C())
    }

    function T(a) {
        a = a.currentTarget._index;
        if (q != L && h != a && !z) {
            var b = f[a];
            if (!b.wip && Sys.isAndroid && 4 > Sys.androidVersion) Utils.resetTransition(b.el), b.el.style.opacity = 0.85, window.location.href = b.url;
            else {
                c && c.wip && (c.wip.style.opacity = 0, Utils.transition(c.wip,
                    "opacity", "150ms ease-in-out"));
                if (b.wip) {
                    b.wip.style.visibility = "visible";
                    b.wip.style.opacity = 0.9;
                    Utils.transition(b.wip, "opacity", "250ms ease-out");
                    M(a);
                    var d = MathUtils.clamp(-w(a).scrollX, g.minX, g.maxX);
                    g.slideTo(-d, 0, 650, "cubic-bezier(0.35,0,0,1)")
                } else U(a);
                h = a;
                c = b
            }
        }
    }

    function M(a) {
        var b = f[a];
        Utils.resetTransition(b.el);
        Utils.transform2(b.el, b.x, b.y, 0.93);
        Utils.transition(b.el, "transform", "75ms ease-out");
        setTimeout(function () {
            Utils.transform2(b.el, b.x, b.y, 1);
            Utils.transition(b.el, "transform",
                "275ms ease-out")
        }, 80)
    }

    function U(a) {
        var b = f[a],
            d = w(a);
        g.slideTo(d.scrollX, 0, 650, "cubic-bezier(0.35,0,0,1)");
        g.activate(!1);
        M(a);
        q = L;
        setTimeout(function () {
            setTimeout(function () {
                V(a)
            }, 185)
        }, 80);
        n = [];
        0 < a && n.push(f[a - 1]);
        a < f.length - 1 && n.push(f[a + 1]);
        setTimeout(function () {
            for (var a = n.length; a--;) {
                var e = n[a];
                Utils.transform2(e.el, e.x + (e.x > b.x ? d.othersOff : -d.othersOff), 0);
                Utils.transition(e.el, "transform", "400ms cubic-bezier(0.69,0,0.45,1)")
            }
        }, 350)
    }

    function V(a) {
        v(!0);
        N(a, !0, 525);
        setTimeout(function () {
            Preloader.show(!1,
                500, {
                    offsetY: 0.12 * s,
                    colors: ["#FFFFFF"]
                });
            setTimeout(function () {
                u.load(f[a].url)
            }, 650)
        }, 100)
    }

    function W(a, b) {
        Preloader.hide();
        l = a;
        l.init();
        var d = l.getElements();
        d.closeBTN.style.opacity = 0;
        d.closeBTN.href = "javascript:void(0)";
        d.closeClickProxy.callback = C;
        d.textEl.parentNode.style.backgroundColor = "rgba(0,0,0,0.0)";
        l.setTextMaskColor("rgba(0,0,0,0)");
        Sys.supports.touch || (d.imgsEl.style[Utils.vendorPrefix + "user-select"] = d.textEl.style[Utils.vendorPrefix + "user-select"] = "none", d.textEl.style.cursor = "default");
        var c = D ? 0.01 : 1;
        setTimeout(function () {
            O(h, !1, 350);
            X(600)
        }, 350 * c);
        setTimeout(function () {
            Y(400 * c, d)
        }, (Sys.isIOS ? 700 : 750) * c);
        setTimeout(Z, 1500 * c);
        P(!1)
    }

    function Y(a, b) {
        Utils.resetTransition(m);
        m.style.visibility = "visible";
        m.style.opacity = 1;
        var d = 20 * Sys.deviceScaleFactor2,
            f = b.imgsEl.parentNode;
        f.style.opacity = 0;
        Utils.transform2(f, 0, d);
        Utils.transform2(f, 0, 0.5 * d, 0.95);
        setTimeout(function () {
            f.style.opacity = 1;
            Utils.transform2(f, 0, 0);
            Utils.transition(f, "all", a + "ms cubic-bezier(0.1,0,0,1)")
        }, 0);
        var e = b.textEl.parentNode;
        e.style.opacity = 0;
        Utils.transform2(e, 0, d);
        setTimeout(function () {
            e.style.opacity = 1;
            Utils.transform2(e, 0, 0);
            Utils.transition(e, "all", a + "ms cubic-bezier(0,0,0,1)");
            Sys.supports.translate3d && l.setTextMaskColor(getComputedStyle(c.inner).backgroundColor)
        }, 0);
        setTimeout(function () {
            b.closeBTN.style.opacity = 1;
            Utils.transition(b.closeBTN, "opacity", "500ms ease-in-out")
        }, 450)
    }

    function X(a) {
        var b = H();
        Utils.transform2(c.el, c.x, c.y + 0.39 * (b.y - c.y), 0.33, 0.4 * Math.PI);
        Utils.transition(c.el, "transform", 0.33 * a + "ms cubic-bezier(0.75,0,1,1)");
        setTimeout(function () {
            Sys.supports.translate3d ? c.el.style[Utils.vendorPrefix + "transform"] = "translate3d(" + b.x + "px," + b.y + "px,-15px) scale(" + b.scale + ") rotate(" + 0.5 * Math.PI + "rad)" : Utils.transform2(c.el, b.x, b.y, b.scale, 0.5 * Math.PI);
            Utils.transition(c.el, "transform", 0.95 * a * (1 - 0.33) + "ms cubic-bezier(0.25,0,0.25,1)")
        }, 0.33 * a + 1);
        Sys.supports.translate3d && (c.inner.style[Utils.transformName] = "rotateY(-180deg) rotateX(0deg)", Utils.transition(c.inner, "transform", 0.999 * a + "ms cubic-bezier(0.35,0,0.09,1)"))
    }

    function Z() {
        q =
            B;
        v(!1)
    }

    function C() {
        l && l.close();
        m.style.opacity = 0;
        Utils.transition(m, "opacity", "250ms ease-in-out");
        setTimeout(function () {
            m.style.visibility = "hidden"
        }, 250);
        N(h, !1, 0);
        P(!0);
        setTimeout(function () {
            Utils.transform2(c.inner, 0, 0);
            Utils.transform2(c.el, c.x, c.y, 1, 0)
        }, 250);
        setTimeout(function () {
            O(h, !0, 550)
        }, 450);
        setTimeout(function () {
            for (var a = n.length; a--;) {
                var b = n[a];
                Utils.transform2(b.el, b.x, b.y);
                Utils.transition(b.el, "transform", "500ms cubic-bezier(0.025,0,0,1)")
            }
        }, 575);
        setTimeout(function () {
            g.activate(!0);
            0 != h && h != r - 1 || g.slideTo(0, 0, 570);
            h = -1;
            c = null;
            q = x
        }, 800)
    }

    function P(a) {
        for (var b = f.length; b--;) f[b] != c && (f[b].el.style.visibility = a ? "visible" : "hidden")
    }

    function N(a, b, d) {
        a = f[a].inner.getElementsByTagName("span")[0];
        Utils.transform2(a, 0, 0.11 * s * (b ? -1 : 0));
        Utils.transition(a, "transform", d + "ms cubic-bezier(0.3,0,0.1,1)")
    }

    function O(a, b, d) {
        void 0 == d && (d = 300);
        a = f[a].inner.getElementsByTagName("span")[0];
        a.style.opacity = b ? 1 : 0;
        Utils.transition(a, "opacity", d + "ms ease-in-out")
    }

    function w(a) {
        var b = t;
        return {
            scrollX: f[a].x -
                0.5 * (Main.stage.width - p - b) - 0.5 * (p + b),
            othersOff: 0.5 * (Main.stage.width - (p + t))
        }
    }

    function H() {
        var a = Main.stage.width / (s - 38),
            b = 0.61 * Main.stage.height - A + 0.5 * p * a;
        return {
            x: Math.round(c.y - g.contentX + 0.5 * Main.stage.width),
            y: Math.round(b),
            scale: a,
            angle: -0.5 * Math.PI
        }
    }
    var t = 16,
        G, f = [],
        r, p, s, k, A = 0,
        E, g, n = [],
        u, m, l, h = -1,
        c, D, z = !1,
        I, x = "default",
        S = "loading",
        L = "transition",
        B = "project",
        q = x;
    return {
        init: function (a) {
            D = -1 != window.location.search.indexOf("noanim") || !Utils.transitionName;
            a = play(a);
            k = play("projects");
            k.style.top = k.style.left =
                "0px";
            k.style.position = "absolute";
            var b = k.children[0];
            p = b.offsetWidth;
            s = b.offsetHeight;
            for (var b = Math.round(p / 2), d = Math.round(s / 2), c = r = k.children.length; c--;) {
                var e = k.children[c];
                e.style.position = "absolute";
                e.style.left = "0px";
                e.style.top = "0px";
                e.style.width = e.style.height = "2px";
                e._index = c;
                e.addEventListener(Sys.supports.touch ? "touchstart" : "mousedown", Utils.preventDefault);
                e.style[Utils.vendorPrefix + "transform-style"] = "preserve-3d";
                Sys.supports.touch || (e.style.cursor = "pointer", e.style[Utils.vendorPrefix +
                    "user-select"] = "none");
                // var h = e.firstChild;
                var h = e.children[0];
                h.style.position = "absolute";
                h.style.left = -b + "px";
                h.style.top = -d + "px";
                var n = t + c * (p + t) + b;
                Utils.transform2(e, n, 0);
                var l = e.getElementsByClassName("wip")[0];
                l && (l.style.left = 0.5 * -l.offsetWidth + "px", l.style.top = 0.25 * s - 0.5 * l.offsetHeight + "px", l.style.opacity = 0);
                f[c] = {
                    el: e,
                    x: n,
                    y: 0,
                    index: c,
                    inner: h,
                    clickProxy: new ClickProxy(e, T, this),
                    wip: l,
                    url: ''//e.getElementsByTagName("a")[0].href
                }
            }
            k.style.width = f[r - 1].x + b + t + "px";
            k.style.height = "2px";
            a.style[Utils.vendorPrefix + "perspective"] =
                800;
            k.style[Utils.vendorPrefix + "transform-style"] = "preserve-3d";
            g = new SPZ.ScrollPane;
            g.init(k, !0, !1, {
                handle: document,
                moveThresh: 0
            });
            m = document.createElement("div");
            m.style.position = "relative";
            m.style.left = m.style.top = "0px";
            m.style.visibility = "hidden";
            a.appendChild(m);
            u = new PageLoader(m, W);
            q = x;
            y()
        },
        animIn: function () {
            Microsite.dispatcher.on(Events.MENU_TAP_ACTIVE, K);
            if (!D) {
                v(!0);
                var a = f[0].x,
                    b = 0.5 * Main.stage.height + 0.25 * s + 4;
                initScale = 0.35;
                Sys.supports.translate3d || (b = 0.5 * Main.stage.height + s);
                for (var c =
                    r; c--;) {
                    var h = f[c],
                        e = a + 0.4 * c * p * initScale;
                    h.el.style.zIndex = r - c;
                    Utils.transform2(h.el, e, b, initScale)
                }
                g.activate(!1);
                a = 1.15 * -w(0).scrollX;
                Utils.transform2(k, a, 0);
                setTimeout(Q, 0)
            }
        },
        animOut: function () {
            clearTimeout(G);
            J();
            u.isLoading && u.stop();
            g.remove();
            for (var a in f) f[a].clickProxy.remove(), Sys.supports.touch || f[a].el.removeEventListener("mousedown", Utils.preventDefault);
            Microsite.dispatcher.off(Events.MENU_TAP_ACTIVE, K)
        },
        resize: y,
        play: function () {
            q == x && (g.activate(!0), g.play())
        },
        pause: J
    }
}();