window.PageCreative = function () {
    function X() {
        k.setListeners(!0);
        Accelerometer.start();
        J = !0;
        Y()
    }

    function Z() {
        k.setListeners(!1);
        Accelerometer.stop();
        J = !1
    }

    function aa() {
        k.setSize(Main.stage.width, Main.stage.height)
    }

    function Y() {
        J && requestAnimFrame(Y);
        k.update()
    }
    var ha = "#e91b00 #fd6000 #ff9500 #ffd200 #c4d000 #0ea5b4".split(" "),
        J, k, ba = function (a, b) {
            a.plane.setLabel(K[a.contentIndex]);
            if (v > 2 * L || 1 > D) {
                E.sort(function (a, b) {
                    return a.value - b.value
                });
                v = D = L;
                for (var c = E.length; c--;) E[c].plane.planeDiv.style.zIndex =
                    v++
            } else a.plane.planeDiv.style.zIndex = b == h.FORWARDS ? ++v : --D
        }, M = function (a, b) {
            return 0 < a ? a >= b ? a - b : 0 : a <= -b ? a + b : 0
        }, R = function (a, b, c) {
            N = !0;
            w = O = a;
            x = P = b;
            void 0 != c && (Q = F = c, p = !0)
        }, ia = function (a) {
            if (!(2 < a.touches.length)) {
                if (1 == a.touches.length) R(a.touches[0].pageX, a.touches[0].pageY);
                else if (2 == a.touches.length) {
                    var b = a.touches[0].pageX,
                        c = a.touches[0].pageY,
                        d = a.touches[1].pageX,
                        e = a.touches[1].pageY,
                        f = MathUtils.interpolatePointOnLine(b, c, d, e, 0.5);
                    R(f.x, f.y, Math.atan2(c - e, b - d))
                }
                y = a.touches;
                a.preventDefault()
            }
        },
        ja = function (a) {
            if (!(2 < a.touches.length)) {
                if (1 == a.touches.length) {
                    var b = a.touches[0].pageY;
                    w = a.touches[0].pageX;
                    x = b;
                    p = !1
                } else {
                    var c = a.touches[0].pageX,
                        d = a.touches[0].pageY,
                        e = a.touches[1].pageX,
                        f = a.touches[1].pageY,
                        b = MathUtils.interpolatePointOnLine(c, d, e, f, 0.5),
                        h = b.y,
                        c = Math.atan2(d - f, c - e);
                    w = b.x;
                    x = h;
                    void 0 != c ? (F = c, p = !0) : p = !1
                }
                y = a.touches;
                a.preventDefault()
            }
        }, ka = function (a) {
            y = a.touches;
            1 == a.touches.length ? R(a.touches[0].pageX, a.touches[0].pageY) : N = p = !1;
            a.preventDefault()
        }, la = function (a) {
            a.preventDefault();
            j = q = 1;
            z = !0
        }, ma = function (a) {
            a.preventDefault();
            j = a.scale
        }, na = function (a) {
            a.preventDefault();
            j = q = 1;
            z = !1
        }, oa = function (a) {
            "mousedown" == a.type && (a = S(a));
            T = !0;
            ca = U = a.touches[0].pageY;
            j = q = 1;
            z = !0;
            a.preventDefault()
        }, pa = function (a) {
            "mouseup" == a.type && (a = S(a));
            T = !1;
            j = q = 1;
            z = !1;
            a.preventDefault()
        }, qa = function (a) {
            "mousemove" == a.type && (a = S(a));
            T && (U = a.touches[0].pageY, j = 1 + 0.0085 * (ca - U), a.preventDefault())
        }, S = function (a) {
            var b = Main.mouseGlobalToLocal(a);
            a.touches = [{
                pageX: b.pageX,
                pageY: b.pageY
            }];
            return a
        }, G, ca, U =
            0,
        T = !1,
        y = [],
        j = 0,
        q = 0,
        da = 0,
        z = !1,
        A, V, W, g = 31,
        ea = 0.25,
        r = 0,
        B = 0,
        s, C, H = 0,
        n, K = [],
        l, E = [],
        L = 100,
        D, v, I = {
            numPlanes: 6,
            spacesAtBegin: "   ",
            carouselStartPos: -300
        }, fa = {
            numPlanes: 3,
            spacesAtBegin: "  ",
            carouselStartPos: 130
        }, p = !1,
        F = 0,
        Q = 0,
        t = 0,
        w = 0,
        O = 0,
        m = 0,
        N = !1,
        x = 0,
        P = 0,
        u = 0;
    k = {
        init: function (a, b) {
            if (Sys.isAndroid)
                for (var c in fa) I[c] = fa[c];
            A = I.numPlanes;
            l = a;
            l.alpha = 0;
            K = (I.spacesAtBegin + b).split(" ");
            G = window.innerWidth < window.innerHeight ? window.innerWidth / 320 : window.innerWidth / 480;
            var d = Math.round(0.8 * 12 * G);
            V = Math.round(110.4 *
                G);
            W = Math.round(0.8 * 39 * G);
            Sys.isPlayBook && (V = 112, W = 33, d = 10);
            n = new h(A, K.length, -228, 1500);
            n.onItemWrap = ba;
            var e = [],
                f = ha,
                f = f.splice(f.length - 2).concat(f);
            D = v = L;
            for (c = 0; c < A; c++) {
                var j = new ga(l);
                j.setup(e, [], W, V, f[c % f.length], d);
                var g = n.items[c];
                g.x = 0;
                g.y = 0;
                g.angleStartDrag = 0;
                g.plane = j;
                E[c] = g;
                ba(g, -1)
            }
            n.moveBy(I.carouselStartPos)
        },
        setSize: function (a, b) {
            r = Math.round(0.5 * a);
            B = Math.round(0.505 * b);
            void 0 == s && (s = r, C = Math.round(0.5 * b));
            for (var c = 0; c < A; c++) {
                var d = n.items[c].plane;
                d.x = r;
                d.y = B
            }
        },
        update: function () {
            1 >
                l.alpha && (l.alpha += 0.02, l.style.opacity = l.alpha);
            ea = z ? 0.5 : 0.035;
            da = 460 * (j - q);
            q = j;
            g += (da - g) * ea;
            70 < g && (g = 70); - 70 > g && (g = -70);
            n.moveBy(g);
            var a = 1500 - 1589.76,
                b = -228 + 138.24;
            if (p) t = MathUtils.angleDifference(Q, F) * (1 < y.length ? 1.35 : 1), Q = F;
            else {
                var c = M(Accelerometer.data.gravityX, 0.02),
                    d = M(Accelerometer.data.gravityY, 0.02) || 1E-4,
                    c = Math.atan2(-c, d);
                t += 0.0035 * MathUtils.angleDifference(H, c);
                t *= 0.97
            }
            H = MathUtils.wrapAngle(H + t);
            N ? (c = 1.25, 2 == y.length && (c = 0.85), m = (w - O) * c, u = (x - P) * c, O = w, P = x) : (m += 16.85 * M(Accelerometer.data.gravityX,
                0.02) * Sys.deviceScaleFactor, m += 0.0265 * (r - s), u += 0.0265 * (B - C), m *= 0.91, u *= 0.91);
            s += m;
            C += u;
            for (c = 0; c < A; c++) {
                var d = n.items[c],
                    e = d.value,
                    f = C;
                d.x = 0.5 * (s - r);
                d.y = 0.5 * (f - B);
                var f = e < b ? MathUtils.map(e, -228, b, -0.75, 1) : e > a ? MathUtils.map(e, a, 1500, 1, -0.85) : 1,
                    e = 240 / (240 + e),
                    h = r + (d.x + 0) * e,
                    k = B + (d.y + -6) * e;
                d.plane.setOpacity(f);
                d.plane.angle = H;
                d.plane.scale = e;
                d.plane.x = h >> 0;
                d.plane.y = k >> 0;
                d.plane.render()
            }
        },
        setListeners: function (a) {
            a = a ? "addEventListener" : "removeEventListener";
            "ongesturestart" in window ? (document[a]("gesturestart",
                la, !1), document[a]("gesturechange", ma, !1), document[a]("gestureend", na, !1), document[a]("touchstart", ia, !1), document[a]("touchend", ka, !1), document[a]("touchmove", ja, !1)) : (document[a](Sys.supports.touch ? "touchstart" : "mousedown", oa, !1), document[a](Sys.supports.touch ? "touchend" : "mouseup", pa, !1), document[a](Sys.supports.touch ? "touchmove" : "mousemove", qa, !1))
        }
    };
    var h = function (a, b, c, d) {
        this.items = [];
        this.numItems = a;
        this.numContent = b;
        this.minValue = c;
        this.maxValue = d;
        this.range = d - c;
        this.onItemWrap = function () {};
        this.setup()
    };
    h.FORWARDS = 1;
    h.BACKWARDS = -1;
    h.prototype.setup = function () {
        for (var a = this.range / this.numItems, b = 0, c = this.numItems; b < c; b++) this.items[b] = {
            value: this.minValue + b * a,
            index: b,
            contentIndex: b
        }
    };
    h.prototype.moveBy = function (a) {
        a > this.range && (a = this.range);
        a < -this.range && (a = -this.range);
        for (var b = 0, c = this.numItems; b < c; b++) {
            var d = this.items[b],
                e = d.value - a;
            e < this.minValue ? (e += this.range, d.contentIndex = this.wrap(d.contentIndex + this.numItems, this.numContent), d.value = e, this.onItemWrap(d, h.BACKWARDS)) :
                e > this.maxValue ? (e -= this.range, d.contentIndex = this.wrap(d.contentIndex - this.numItems, this.numContent), d.value = e, this.onItemWrap(d, h.FORWARDS)) : d.value = e
        }
    };
    h.prototype.wrap = function (a, b) {
        a >= b ? a -= b : 0 > a && (a += b);
        return a
    };
    var ga = function (a) {
        this.container = a
    };
    ga.prototype = {
        container: null,
        planeDiv: null,
        labelDiv: null,
        charsHolder: null,
        x: 0,
        y: 0,
        scale: 1,
        angle: 0,
        setup: function (a, b, c, d, e, f) {
            a = this.planeDiv = document.createElement("div");
            a.className = "zoom-plane";
            a.style.color = e;
            this.container.appendChild(a);
            this.createBG(2 *
                d, 2 * d, e, f);
            e = this.labelDiv = document.createElement("div");
            e.className = "label";
            e.style.fontSize = c + "px";
            e.style.width = 3 * d + "px";
            a.appendChild(e);
            e.innerHTML = "M";
            e.style.top = Math.round(-0.48 * e.offsetHeight) + "px";
            e.style.left = Math.round(1.5 * -d) + "px"
        },
        createBG: function (a, b, c, d) {
            var e = document.createElement("canvas");
            e.width = a;
            e.height = b;
            e.style.position = "absolute";
            e.style.left = Math.round(0.5 * -a) + "px";
            e.style.top = Math.round(0.5 * -b) + "px";
            var f = e.getContext("2d");
            f.strokeStyle = c;
            f.lineWidth = d;
            f.beginPath();
            f.arc(0.5 * a, 0.5 * b, 0.5 * a - Math.ceil(0.5 * d) - 1, 0, 2 * Math.PI, !0);
            f.stroke();
            this.planeDiv.appendChild(e)
        },
        setLabel: function (a) {
            this.labelDiv.innerHTML = a
        },
        setOpacity: function (a) {
            this.planeDiv.style.opacity = a
        },
        render: function () {
            Utils.transform(this.planeDiv, Sys.supports.translate3d ? "translate3d(" + this.x + "px," + this.y + "px,0px) scale(" + this.scale + ") rotate(" + this.angle + "rad)" : "translate(" + this.x + "px," + this.y + "px) scale(" + this.scale + ")")
        }
    };
    return {
        init: function () {
            var a = [],
                b = tk("creative").getElementsByClassName("pager");
            b.length && (b = b[0], Utils.fixLinkTemp(b), tk("creative").removeChild(b.parentNode), a.push(b.parentNode));
            b = tk("creative").getElementsByClassName("scroll");
            b.length && (b = b[0], Utils.fixLinkTemp(b), tk("creative").removeChild(b), a.push(b));
            var b = tk("creative"),
                c = tk("statement").textContent;
            b.innerHTML = "";
            k.init(b, c);
            for (var d in a) tk("creative").appendChild(a[d]);
            aa()
        },
        animIn: function () {
            X()
        },
        animOut: function () {
            Z()
        },
        resize: aa,
        play: X,
        pause: Z
    }
}();
