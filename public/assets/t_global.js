var isTouch = "ontouchstart" in window,
    Events = {
        DOWN: isTouch ? "touchstart" : "mousedown",
        UP: isTouch ? "touchend" : "mouseup",
        MOVE: isTouch ? "touchmove" : "mousemove",
        NAVIGATE: "navigate",
        NTLB_ANIM_IN: "ntlbAnimIn",
        NTLB_ANIM_OUT: "ntlbAnimOut",
        SIMULATOR_ROTATE: "simulatorRotate",
        MENU_OPEN: "menuOpen",
        MENU_CLOSE: "menuClose",
        MENU_TAP_ACTIVE: "menuTapActive"
    }, Microsite = function () {
        function b() {
            clearTimeout(B);
            g.abort();
            var a = s.getElementsByTagName("img"),
                b;
            for (b in a) a[b].onload = a[b].onerror = null
        }

        function c() {
            var a = s.getElementsByTagName("img");
            if (a.length) {
                var b =
                    0,
                    c;
                for (c in a) a[c].onload = a[c].onerror = function (c) {
                    ++b == a.length && (f = !1, h(), e())
                }
            } else f = !1, h(), e()
        }

        function h() {
            s.innerHTML += "<style>" + k("style", g.responseText) + "</style>";
            var a = k("title", g.responseText);
            document.title = a;
            l = n;
            r && m && history.pushState({
                url: l
            }, a, l);
            r = !0;
            for (var a = s.getElementsByTagName("script"), b = 0; b < a.length; b++) eval.call(null, a[b].text);
            p = window["Page" + (x.charAt(0).toUpperCase() + x.substr(1))];
            p.init(x)
        }

        function e() {
            setTimeout(function () {
                Sys.isAndroid && 4 <= Sys.androidVersion &&
                    Main.resize();
                s.style.visibility = "visible";
                s.style.opacity = 1;
                void 0 != p.animIn ? p.animIn() : (Utils.transition(s, "opacity", "400ms ease-in-out"), y.style.visibility = "visible");
                t.onAnimIn()
            }, 125)
        }
        function k(a, b) {
            var c = b.indexOf("<" + a),
                c = b.indexOf(">", c),
                g = b.lastIndexOf("</" + a + ">");
            return b.slice(c + 1, g)
        }
        var g, q = new EventDispatcher,
            f = !1,
            l = window.location.href,
            n = l,
            r = !0,
            m = void 0 !== history.pushState,
            p, s, y, x, B, t = {
                onAnimIn: function () {}
            };
        return {
            init: function () {
                s = play("page-holder");
                s.style.visibility = "hidden";
                s.style.opacity = 0;
                g = new XMLHttpRequest;
                g.onreadystatechange = function (a) {
                    4 == this.readyState && (0 == this.status || 200 == this.status ? (s.innerHTML = k("body", g.responseText), y = s.getElementsByClassName("page")[0], x = y.id, y.parentNode.removeChild(y), s.innerHTML = "", s.appendChild(y), c()) : (alert("There was an error loading the page, please try again later."), location.reload()))
                };
                y = document.body.getElementsByClassName("page")[0];
                x = y.id;
                p = window["Page" + (x.charAt(0).toUpperCase() + x.substr(1))];
                p.init(x);
                if (m) {
                    try {
                        history.replaceState({
                            url: l
                        }, document.title, l)
                    } catch (b) {
                        m = !1
                    }
                    window.addEventListener("popstate", function (b) {
                        b.state && (r = !1, a(b.state.url))
                    }, !1)
                }
            },
            animIn: e,
            getPage: function () {
                return p
            },
            getPageURL: function () {
                return n
            },
            changeLinks: function (a) {
                a = a.getElementsByTagName("a");
                for (var b = a.length; b--;) {
                    var c = a[b],
                        g = c.href;
                    "external" != c.rel && -1 == g.indexOf("javascript:") && -1 == g.indexOf("#") && (c.href = "javascript:Microsite.navigate('" + g + "')")
                }
            },
            dispatcher: q,
            callbacks: t
        }
    }(),

    Main = function () {
        function a() {
            document.removeEventListener("DOMContentLoaded", a, !1);
            document.body.style.visibility = "visible";
        }

        function b() {
            window.removeEventListener("load", b, !1);
            f = p.el = play("main");
            r = play("page-holder");
            if (Sys.isMobile) {
                var a = document.createElement("div");
                a.style.position = "relative";
                a.style.width = "1px";
                a.style.height = "20%";
                document.body.appendChild(a)
            }
            g();
            Microsite.dispatcher.on(Events.MENU_OPEN, e);
            Microsite.dispatcher.on(Events.MENU_CLOSE, e);
            Microsite.init();
            if (!Sys.isMobile) Microsite.dispatcher.on(Events.SIMULATOR_ROTATE, d);
            window.addEventListener("resize", d, !1);
            document.body.addEventListener("orientationchange", d, !1);
            d(null);
            Sys.isAndroid && (document.body.style["overflow-x"] = "hidden", document.body.style["overflow-y"] = "visible");
            Sys.isIPhone ?
                setTimeout(c, 250) : c()
        }

        function c() {
            document.body.style.visibility = "visible";
            setTimeout(Microsite.animIn, 400)
        }

        function e(a) {
            Microsite.getPage()[a.type == Events.MENU_OPEN ? "pause" : "play"]()
        }

        function d(a) {
            k();
            if (Sys.isMobile) {
                a = window.innerWidth;
                var b = window.innerHeight;
                f.style.height = b + "px";
                r.style.height =
                    b + "px";
                4 <= Sys.androidVersion && (f.style.width = a + "px", r.style.width = a + "px")
            }
            document.getElementsByTagName("html")[0].className = p.isPortrait ? "portrait" : "landscape";
            Microsite.getPage().resize();
        }

        function k() {
            p.width = Sys.isMobile ? window.innerWidth : f.offsetWidth;
            p.height = Sys.isMobile ? window.innerHeight : f.offsetHeight;
            p.isPortrait = p.height > p.width
        }

        function g() {
            document.body.style["-ms-touch-action"] = "none";
            Sys.isMobile ? (document.addEventListener("touchmove", function (a) {
                    a.preventDefault()
                }, !1),
                document.addEventListener("touchstart", function (a) {
                    if (Sys.isIOS && a.touches[0].pageY > 0.5 * Main.stage.height) {
                        var b = (new Date).getTime();
                        500 > b - lastTapTime && a.preventDefault();
                        lastTapTime = b
                    }
                }, !1)) : (document.addEventListener("mousedown", function (a) {
                hasTouchMoved = !1;
                startTouchX = a.pageX;
                startTouchY = a.pageY
            }, !1), document.addEventListener("click", function (a) {
                (hasTouchMoved = 5 < Math.abs(a.pageX - startTouchX) || 5 < Math.abs(a.pageY - startTouchY)) && a.preventDefault()
            }, !1))
        }

        var f, l, n, r, m = !1,
            p = {
                x: 0,
                y: 0,
                width: 768,
                height: 1024,
                isPortrait: !0,
                el: null
            }, s = {
                isSimulatorActive: !1
            };
        startTouchY = startTouchX = 0;
        hasTouchMoved = !1;
        lastTapTime = 0;
        return {
            stage: p,
            state: s,
            init: function () {
                Utils.transformName && 240 < screen.height && (!Sys.isIEMobile || void 0 !== window.navigator.msPointerEnabled) && (document.getElementsByTagName("html")[0].className = "", document.body.style.overflow = "hidden", document.body.style.visibility = "hidden", document.addEventListener("DOMContentLoaded",
                    a, !1), window.addEventListener("load", b, !1))
            },
            resize: d,
            updateStageSize: k,
            mouseGlobalToLocal: function (a) {
                return m ? Simulator.mouseGlobalToLocal(a) : a
            }
        }
    }(),

    Sys = function () {
        var a = navigator.userAgent,
            b = a.match(/iPhone/i),
            c = a.match(/iPad/i),
            h = a.match(/iPod/i),
            h = b || c || h,
            e = /Android/.test(a),
            d = /WebKit/.test(a),
            k = /Chrome/.test(a),
            g = /webOS|TouchPad/.test(a),
            q = /BlackBerry|RIM/.test(a),
            f = -1;
        e && (f = a.split("Android")[1], f = parseFloat(f.substring(0, f.indexOf(";"))));
        var l = -1;
        h && (l = parseFloat(a.match(/os ([\d_]*)/i)[1].replace("_", ".")));
        var n = window.innerWidth < window.innerHeight ? window.innerWidth / 768 : window.innerWidth / 1024;
        1 < n && (n = 1);
        var r = {
            touch: "ontouchstart" in window,
            multiTouch: "ongesturestart" in window || q && d,
            multipleTransforms: d && !e,
            translate3d: d && !e || 4 <= f,
            hdVideo: (!m || c || h && 4 <= l) && !e
        }, m = r.touch || /Mobile|Tablet/i.test(a),
            p = (a = /MSIE/.test(a)) && m;
        return {
            isMobile: m,
            isIOS: h,
            isAndroid: e,
            isIPad: c,
            isIPhone: b,
            isWebOS: g,
            isBB: q,
            isPlayBook: q && /PlayBook/i.test(navigator.userAgent),
            isIE: a,
            isIEMobile: p,
            isWebKit: d,
            isChrome: k,
            isOnline: -1 != location.href.indexOf("http"),
            supports: r,
            androidVersion: f,
            iOSVersion: l,
            hasIssuesWith: {
                resetTransition: !1
            },
            deviceScaleFactor: n,
            deviceScaleFactor2: 0.7 > n ? 0.7 : n,
            devicePixelRatio: window.devicePixelRatio || 1
        }
    }(),
        Simulator = function () {
        function a() {
            var a = window.innerHeight,
                b = Math.round(0.5 * window.innerWidth) + f,
                c = Math.round(0.5 * a) + l,
                g = p ? d : e;
            m = MathUtils.clamp(a - (p ? q : 1.3 * q), 400, g) / g;
            t.style.left =
                b + "px";
            t.style.top = c + "px";
            Utils.resetTransition(t);
            Utils.transform(t, "scale(" + m + ")")
        }

        function b(a, b) {
            var c = a ? k : g,
                d = a ? g : k,
                e = a ? 1 : -1;
            w.style.width = c + "px";
            w.style.height = d + "px";
            w.style.left = 1 + Math.round(0.5 * -c) + "px";
            w.style.top = e + Math.round(0.5 * -d) + "px";
            Utils.rotate(w, b)
        }

        function c(a, b) {
            var c = a ? n : r;
            v.style.width = c + "px";
            v.style.top = Math.round(0.5 * (a ? d : e)) + 1 + "px";
            v.style.left = Math.round(0.5 * -c) + "px";
            v.style.backgroundPosition = (a ? 0 : -n) + "px 0px";
            b && (Utils.resetTransition(v), v.style.opacity = 0, setTimeout(function () {
                v.style.opacity =
                    1;
                Utils.transition(v, "opacity", "650ms ease-in-out")
            }, 650))
        }

        function h() {
            setTimeout(function () {
                s = !1
            }, 150);
            Utils.resetTransition(w);
            Utils.resetTransition(u);
            Utils.resetTransition(t)
        }
        var e = 996,
            d = 1276,
            k = 768,
            g = 1024,
            q = 100,
            f = 0,
            l = -2,
            n = 996,
            r = 2272 - n,
            m = 1,
            p = !0,
            s = !1,
            y = 0,
            x = 0,
            B, t, u, v, w, z;
        return {
            init: function () {
                (B = $("awards-container")) && AwardsOverlay.init();
                Sys.isOnline || (q = -100);
                u = $("device");
                v = $("device-reflection");
                w = $("main");
                w.style.position = "absolute";
                w.style.overflow = "hidden";
                Utils.setTransformOrigin(w, "50% 50%");
                u.style.display = "block";
                u.style.position = "absolute";
                u.style.left = Math.round(0.5 * -e) + "px";
                u.style.top = Math.round(0.5 * -d) + "px";
                u.style.width = e + "px";
                u.style.height = d + "px";
                u.addEventListener("mousedown", function (a) {
                    a.preventDefault()
                }, !1);
                Utils.setSelectable(u, !1);
                u.style[Utils.vendorPrefix + "user-select"] = "none";
                Utils.setTransformOrigin(u, "50% 50%");
                t = document.createElement("div");
                t.style.position = "absolute";
                t.style.width = "1px";
                t.style.height = "1px";
                t.style.left = "0px";
                t.style.top = "0px";
                t.appendChild(v);
                t.appendChild(u);
                t.appendChild(w);
                Utils.setTransformOrigin(t, "0% 0%");
                document.body.appendChild(t);
                z = $("toggle-orientation-btn");
                z.style.display = "block";
                z.href = "javascript:void(0)";
                z.addEventListener("click", function () {
                    Simulator.toggleOrientation()
                });
                z.style[Utils.vendorPrefix + "user-select"] = "none";
                window.addEventListener("resize", a, !1);
                a();
                b(p, 0);
                c(p, !1);
                u.style.opacity = 0;
                v.style.opacity = 0;
                z.style.opacity = 0
            },
            animIn: function () {
                u.style.opacity = 1;
                Utils.transition(u, "opacity", "350ms ease-out");
                v.style.opacity =
                    1;
                Utils.transition(v, "opacity", "350ms ease-out");
                Utils.transform(t, "scale(" + 0.88 * m + ")");
                setTimeout(function () {
                    Utils.transform(t, "scale(" + m + ")" + (Sys.supports.translate3d ? " translateZ(0)" : ""));
                    Utils.transition(t, "transform", "1250ms cubic-bezier(0, 0.9, 0, 1)")
                }, 0);
                setTimeout(function () {
                    z.style.opacity = 1;
                    Utils.transition(z, "opacity", "750ms ease-in-out")
                }, 1750)
            },
            resize: a,
            toggleOrientation: function () {
                s || (p = !p, b(p, Math.PI * (p ? -0.5 : 0.5)), c(p, !0), x = 0, y = p ? 0 : 0.5 * -Math.PI, setTimeout(function () {
                    a();
                    Utils.transform(w,
                        "rotate(" + x + "rad)");
                    Utils.transform(u, "rotate(" + y + "rad)");
                    Utils.transition(u, "transform", "750ms cubic-bezier(0.430, 0.000, 0.145, 1.000)");
                    Utils.transition(w, "transform", "750ms cubic-bezier(0.430, 0.000, 0.145, 1.000)");
                    Utils.transition(t, "transform", "750ms cubic-bezier(0.430, 0.000, 0.145, 1.000)");
                    s = !0;
                    setTimeout(h, 751)
                }, 0), Microsite.dispatcher.fire(Events.SIMULATOR_ROTATE))
            },
            mouseGlobalToLocal: function (a) {
                var b = t.offsetLeft,
                    c = t.offsetTop;
                if (!p)
                    var d = 0.5 * (g - k) * m,
                b = b - d, c = c + d;
                b = a.pageX - b;
                a = a.pageY -
                    c;
                var c = b + 0.5 * k,
                    d = a + 0.5 * g,
                    e = Math.abs(1 - 1 / m),
                    d = d + a * e;
                return {
                    pageX: Math.round(c + b * e),
                    pageY: Math.round(d)
                }
            }
        }
    }(),
    Utils = function () {
        var a, b, c, h, e, d = function (a, c) {
                a.style[b] = c
            };
        (function (d) {
            for (var g = [
                ["transform", "", "transition", "transform-origin"],
                ["WebkitTransform",
                    "-webkit-", "WebkitTransition", "WebkitTransformOrigin"
                ],
                ["MozTransform", "-moz-", "MozTransition", "MozTransformOrigin"],
                ["OTransform", "-o-", "OTransition", "OTransformOrigin"],
                ["msTransform", "-ms-", "msTransition", "msTransformOrigin"]
            ], e = g.length; e--;)
                if ("undefined" != typeof d.style[g[e][0]]) {
                    var f = g[e];
                    b = f[0];
                    a = f[1];
                    c = "undefined" != typeof d.style[g[e][2]] ? f[2] : "";
                    h = f[3];
                    break
                }
        })(document.documentElement);
        e = Sys.hasIssuesWith.resetTransition ? "all 0.0001ms linear" : "";
        return {
            rotate: function (a, b) {
                Sys.supports.translate3d ?
                    d(a, "rotate(" + b + "rad) translateZ(0)") : d(a, "rotate(" + b + "rad)")
            },
            transform: d,
            transform2: function (a, c, d, e, h) {
                c = Sys.supports.translate3d ? "translate3d(" + c + "px," + d + "px,0px)" : "translate(" + c + "px," + d + "px)";
                void 0 != e && (c += " scale(" + e + ")");
                void 0 != h && (c += " rotate(" + h + "rad)");
                a.style[b] = c
            },
            transition: function (b, d, e, h, l) {
                "transform" == d && (d = a + "transform");
                b.style[c] = d + " " + e;
                void 0 !== l && (b.style[a + "transition-delay"] = l + "ms")
            },
            translate: function (a, b, c, e) {
                Sys.supports.translate3d ? d(a, "translate3d(" + b + "," + c + "," + (void 0 !=
                    e ? e : "0px") + ")") : d(a, "translate(" + b + "," + c + ")")
            },
            resetTransition: function (b) {
                b.style[c] = e;
                b.style[a + "transition-delay"] = "0"
            },
            setTransformOrigin: function (a, b) {
                a.style[h] = b
            },
            smoothEdge: function (a) {
                Sys.isIPad && (a.style.WebkitBoxShadow = "0px 0px 1px " + getComputedStyle(a).backgroundColor)
            },
            vendorPrefix: a,
            transformName: b,
            transitionName: c,
            setSelectable: function (a, b, c) {
                a.onselectstart = b ? null : function () {
                    return !1
                };
                a.style.cursor = b ? "auto" : "default"
            },
            delegate: function (a, b) {
                var c = Array.prototype.slice.call(arguments);
                c.splice(0, 2);
                return function () {
                    b.apply(a, c.length ? c : Array.prototype.slice.call(arguments))
                }
            },
            addClass: function (a, b) {
                a.className = a.className ? a.className + (" " + b) : b;
                return a
            },
            fixLinkTemp: function (a) {
                a = a.getElementsByTagName("a");
                for (var b = a.length; b--;) {
                    var c = a[b],
                        e = c.href;
                    c.href = "javascript:void(0)"; - 1 == e.indexOf("#") && (c._href = e, c.addEventListener(Sys.supports.touch ? "touchend" : "click", function (a) {
                        Microsite.navigate(a.target._href)
                    }, !1), c.addEventListener(Sys.supports.touch ? "touchstart" : "mousedown",
                        function (a) {
                            a.target.style.opacity = 0.1;
                            setTimeout(function () {
                                a.target.style.opacity = 1;
                                Utils.transition(a.target, "opacity", "250ms ease-in-out")
                            }, 0)
                        }, !1))
                }
            },
            tappify: function (a, b) {
                var c = a.href;
                a.addEventListener("click", Utils.preventDefault, !1);
                a.addEventListener(b || Events.UP, function () {
                    window.location.href = c
                }, !1);
                a.href = "javascript:void(0)"
            },
            preventDefault: function (a) {
                a.preventDefault()
            }
        }
    }();


var MathUtils = function () {
    function a(a, e) {
        var d = a - e;
        d > b ? e += c : d < -b && (e -= c);
        return e - a
    }
    var b = Math.PI,
        c = 2 * Math.PI;
    return {
        DEG_TO_RAD: b / 180,
        clamp: function (a, b, c) {
            return a > c ? c : a < b ? b : a
        },
        wrap: function (a, b, c) {
            if (b == c) return a;
            if (b > c) {
                var k = b;
                b = c;
                c = k
            }
            for (; a < b;) a += c - b;
            for (; a > c;) a -= c - b;
            return a
        },
        map: function (a, b, c, k, g) {
            return k + (a - b) / (c - b) * (g - k)
        },
        randRange: function (a, b) {
            return a + Math.random() * (b - a)
        },
        distance: function (a, b, c, k) {
            return Math.sqrt((a - c) * (a - c) + (b - k) * (b - k))
        },
        angleDifference: a,
        wrapAngle: function (a) {
            for (; a >
                b;) a -= c;
            for (; a < -b;) a += c;
            return a
        },
        easeAngle: function (b, c, d) {
            return b + a(b, c) * d
        },
        interpolatePointOnLine: function (a, b, c, k, g) {
            return {
                x: c + (a - c) * g,
                y: k + (b - k) * g
            }
        }
    }
}(),
    Accelerometer = function () {
        function a(a) {
            e.acceleration = null !== a.acceleration;
            e.accelerationIncludingGravity = null !== a.accelerationIncludingGravity;
            e.rotationRate = null !== a.rotationRate
        }

        function b(a) {
            if (e.rotationRate) {
                var b = a.rotationRate;
                switch (window.orientation) {
                case 90:
                    d.rotationRateX = b.beta;
                    d.rotationRateY = b.alpha;
                    d.rotationRateZ = b.gamma;
                    break;
                case -90:
                    d.rotationRateX = -b.beta;
                    d.rotationRateY = b.alpha;
                    d.rotationRateZ = b.gamma;
                    break;
                default:
                    d.rotationRateX = -b.alpha, d.rotationRateY = b.beta, d.rotationRateZ = b.gamma
                }
            }
            if (e.acceleration) switch (b = a.acceleration, window.orientation) {
            case 90:
                d.accelerationX = -b.y;
                d.accelerationY = b.x;
                break;
            case -90:
                d.accelerationX = b.y;
                d.accelerationY = -b.x;
                break;
            default:
                d.accelerationX = b.x, d.accelerationY = b.y
            }
            if (e.accelerationIncludingGravity) {
                var c = a.accelerationIncludingGravity,
                    b = 0.1 * c.x,
                    c = 0.1 * c.y,
                    f = d.gravityX,
                    l =
                        d.gravityY;
                switch (window.orientation) {
                case -90:
                    d.gravityY = b;
                    d.gravityX = c;
                    break;
                case 90:
                    d.gravityY = -b;
                    d.gravityX = -c;
                    break;
                case 180:
                    d.gravityX = -b;
                    d.gravityY = c;
                    break;
                default:
                    d.gravityX = b, d.gravityY = -c
                }
                Sys.isAndroid && (d.gravityX *= -1, d.gravityY *= -1);
                h || (d.gravityY += 1, d.gravityX = 0);
                d.gravityAX = d.gravityX - f;
                d.gravityAY = d.gravityY - l
            }
            d.event = a
        }
        var c = void 0 !== window.DeviceMotionEvent,
            h = "ontouchstart" in window,
            e = {
                acceleration: !1,
                accelerationIncludingGravity: !1,
                rotationRate: !1
            }, d = {
                gravityX: 0,
                gravityY: 0,
                gravityAX: 0,
                gravityAY: 0,
                accelerationX: 0,
                accelerationY: 0,
                rotationRateX: 0,
                rotationRateY: 0,
                rotationRateZ: 0,
                event: null
            };
        c && window.addEventListener("devicemotion", a, !1);
        return {
            available: c,
            supports: e,
            data: d,
            start: function () {
                c && window.addEventListener("devicemotion", b, !1)
            },
            stop: function () {
                c && window.removeEventListener("devicemotion", b, !1)
            }
        }
    }();

function play(a) {
    return document.getElementById(a)
}
requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a, b) {
        window.setTimeout(a, 1E3 / 60)
    }
}();

function trace() {
    var a = play("output");
    a.style.visibility = "visible";
    a.style.zIndex = 9999999;
    a.innerHTML += Array.prototype.slice.call(arguments).join(" ") + "<br>"
}

function clearTraces() {
    play("output").innerHTML = ""
}

function EventDispatcher() {
    this.listeners = {}
}
EventDispatcher.prototype.on = function (a, b) {
    this.listeners[a] || (this.listeners[a] = []);
    this.listeners[a].push(b)
};
EventDispatcher.prototype.off = function (a, b) {
    for (var c = this.listeners[a].length; c--;) this.listeners[a][c] == b && this.listeners[a].splice(c, 1)
};
EventDispatcher.prototype.fire = function (a, b) {
    if (this.listeners[a]) {
        b = b || {};
        b.type = a;
        for (var c = this.listeners[a], h = 0, e = c.length; h < e; h++) c[h].apply(null, [b])
    }
};
var SPZ = SPZ || {};
SPZ.RBand = function () {
    this.max = this.min = this.contPos = this.v = this.p = 0;
    this.isBouncy = this.isMoving = !1;
    this.vObj = {
        pos: 0,
        v: 0,
        isMoving: !1
    }
};
var pr = SPZ.RBand.prototype;
pr.set = function (a) {
    this.p = a;
    this.v = 0
};
pr.setBounds = function (a, b) {
    this.min = a;
    this.max = b
};
pr.update = function (a, b, c) {
    if (a) {
        this.v = b - this.p;
        this.p = b;
        if (this.contPos < this.min || this.contPos > this.max) this.v *= 0.5;
        this.contPos += this.v;
        this.isMoving = !0
    } else this.isMoving = 0.1 < Math.abs(this.v), this.v *= 0.97, a = this.contPos + this.v, b = this.isBouncy ? a : this.contPos, a < this.min ? (c = this.velo(b, this.min, this.v), a = c.pos, this.v = c.v, this.isMoving = c.isMoving) : a > this.max ? (c = this.velo(b, this.max, this.v), a = c.pos, this.v = c.v, this.isMoving = c.isMoving) : void 0 !== c && (c = this.velo(b, c, this.v), a = c.pos, this.v = c.v, this.isMoving =
        c.isMoving), this.contPos = a;
    return this.contPos
};
pr.velo = function (a, b, c) {
    this.vObj.isMoving = 0.5 < Math.abs(b - a) || 0.5 < Math.abs(c);
    this.vObj.isMoving ? (c = 0.74 * (c + 0.04 * (b - a)), a += c, this.vObj.pos = a, this.vObj.v = c) : (this.vObj.v = 0, this.vObj.pos = b);
    return this.vObj
};
SPZ.ScrollPane = function () {
    this.isRunning = !1;
    this.holder = this.content = null;
    this.minY = this.minX = this.contentY = this.contentX = 0;
    this.maxY = this.maxX = 1;
    this.numPages = 0;
    this.bounds = {};
    this.selectedPageIndex = 0;
    this.onPageChanged = null;
    this.slideCompleteTimeout = -1;
    this.onPageChangedMotionComplete = null;
    this.isPagedY = this.isPagedX = this.doScrollY = this.doScrollX = this.hasPageChanged = !1;
    this.rBandY = this.rBandX = null;
    this.startDel = Utils.delegate(this, this.onTouchStart);
    this.endDel = Utils.delegate(this, this.onTouchEnd);
    this.moveDel = Utils.delegate(this, this.onTouchMove);
    this.updateDel = Utils.delegate(this, this.update);
    this.time = this.dragY = this.dragX = 0;
    this.timeThresh = 60;
    this.isDraggingPos = !1;
    this.touchStartPoint = {
        x: -1,
        y: -1
    };
    this.vLocked = this.hLocked = this.isMoving = !1;
    this.dragScaleV = this.dragPrevScale = this.dragScale = this.gestureStartDist = this.moveThresh = 0;
    this.isGesturing = !1;
    this.dragAngleV = this.dragPrevAngle = this.dragAngle = 0;
    this.touches = null;
    this.isActive = this.isTouched = !1
};
pr = SPZ.ScrollPane.prototype;
pr.init = function (a, b, c, h) {
    this.handle = a;
    b && (this.rBandX = new SPZ.RBand);
    c && (this.rBandY = new SPZ.RBand);
    this.doScrollX = b;
    this.doScrollY = c;
    this.content = a;
    this.holder = a.parentNode;
    if (h)
        for (var e in h) this[e] = h[e];
    this.isPagedX && (this.numPages = a.children.length);
    this.activate(!0);
    this.resize();
    Sys.isAndroid && (this.timeThresh = 100)
};
pr.activate = function (a) {
    this.handle[a ? "addEventListener" : "removeEventListener"](Sys.supports.touch ? "touchstart" : "mousedown", this.startDel, !1);
    this.isActive = a;
    this.isDraggingPos && this.dragEnd(this.dragX, this.dragY, {})
};
pr.remove = function () {
    this.pause();
    this.activate(!1);
    this.listenForMoveAndEnd(!1);
    Utils.resetTransition(this.content);
    this.content = this.holder = this.onPageChanged = null
};
pr.slideTo = function (a, b, c, h) {
    void 0 == c && (c = 350);
    Utils.resetTransition(this.content);
    Utils.transform2(this.content, -a, -b);
    Utils.transition(this.content, "transform", c + "ms " + (h || ""));
    var e = this;
    setTimeout(function () {
        e.pause()
    }, 0);
    clearTimeout(this.slideCompleteTimeout);
    this.slideCompleteTimeout = setTimeout(function () {
        Utils.resetTransition(e.content)
    }, c + 1);
    this.doScrollX && (this.rBandX.contPos = this.contentX = -a);
    this.doScrollY && (this.rBandY.contPos = this.contentY = -b)
};
pr.toPageIndex = function (a, b, c) {
    this.slideTo(this.bounds.width * a, this.contentY, b, c);
    this.pageChanged(a)
};
pr.play = function () {
    !this.isRunning && this.isActive && (this.isRunning = !0, this.update())
};
pr.pause = function () {
    this.isRunning = !1
};
pr.listenForMoveAndEnd = function (a) {
    a = a ? "addEventListener" : "removeEventListener";
    document[a](Sys.supports.touch ? "touchmove" : "mousemove", this.moveDel, !1);
    document[a](Sys.supports.touch ? "touchend" : "mouseup", this.endDel, !1)
};
pr.resize = function (a) {
    var b = this.contentX / (this.maxX - this.minX),
        c = this.contentY / (this.maxY - this.minY);
    a || (a = {
        x: 0,
        y: 0,
        width: this.holder.offsetWidth,
        height: this.holder.offsetHeight
    });
    this.bounds = a;
    if (this.isPagedX) {
        this.content.style.width = this.numPages * a.width + "px";
        for (var h = this.numPages; h--;) this.content.children[h].style.width = a.width + "px"
    }
    this.minX = a.width - this.content.offsetWidth;
    this.minY = a.height - this.content.offsetHeight;
    this.isPagedX && (this.minX = a.width - this.numPages * this.bounds.width);
    this.maxX =
        a.x;
    this.maxY = a.y;
    this.doScrollX && (this.maxX <= this.minX && (this.minX = this.maxX = 0), this.rBandX.setBounds(this.minX, this.maxX), this.contentX = this.rBandX.contPos = (this.maxX - this.minX) * b, this.rBandX.v = 0);
    this.doScrollY && (this.maxY <= this.minY && (this.minY = this.maxY = 0), this.rBandY.setBounds(this.minY, this.maxY), this.contentY = this.rBandY.contPos = (this.maxY - this.minY) * c, this.rBandY.v = 0);
    Utils.transform2(this.content, this.contentX, this.contentY)
};
pr.update = function () {
    if (this.isRunning) {
        requestAnimFrame(this.updateDel);
        this.isMoving && this.move();
        var a = this.rBandY && this.rBandY.isMoving;
        if (!(this.rBandX && this.rBandX.isMoving || a) && (this.pause(), this.hasPageChanged && this.onPageChangedMotionComplete)) this.onPageChangedMotionComplete({
            target: this,
            index: this.selectedPageIndex
        })
    }
};
pr.move = function () {
    this.doScrollX && (this.contentX = this.rBandX.update(this.isDraggingPos, this.dragX, this.targetX));
    this.doScrollY && (this.contentY = this.rBandY.update(this.isDraggingPos, this.dragY, this.targetY));
    Utils.transform2(this.content, this.contentX, this.contentY)
};
pr.setSnap = function (a, b, c, h, e) {
    a += 0.5 * c;
    var d = 0.65 * c;
    b = MathUtils.clamp(45 * b, -d, d);
    b = -Math.floor((a + b) / c);
    b = MathUtils.clamp(b, 0, this.numPages - 1);
    this.pageChanged(b);
    return MathUtils.clamp(-b * c, h, e)
};
pr.pageChanged = function (a) {
    if (a != this.selectedPageIndex) {
        if (this.onPageChanged) this.onPageChanged({
            target: this,
            index: a,
            oldIndex: this.selectedPageIndex
        });
        this.selectedPageIndex = a;
        this.hasPageChanged = !0
    }
};
pr.findDir = function () {
    if (0 == this.moveThresh) this.pause(), this.isMoving = !0, this.move();
    else {
        var a = this.dragX - this.touchStartPoint.x,
            b = this.dragY - this.touchStartPoint.y;
        if (Math.abs(a) > this.moveThresh || Math.abs(b) > this.moveThresh) a = Math.abs(Math.atan2(b, a)), this.hLocked = a < 0.25 * Math.PI || a > 0.75 * Math.PI, this.vLocked = !this.hLocked, this.hLocked && this.doScrollX || this.vLocked && this.doScrollY ? (this.pause(), this.isMoving = !0, this.move()) : (this.dragEnd(this.dragX, this.dragY), this.doScrollX && (a = this.setSnap(this.contentX,
            this.rBandX.v, this.bounds.width, this.minX, this.maxX), this.slideTo(-a, 0, 300, "0,0,0,1")))
    }
};
pr.dragStart = function (a, b, c) {
    this.hasPageChanged = !1;
    Utils.resetTransition(this.content);
    this.isDraggingPos = !0;
    this.dragX = a;
    this.dragY = b;
    this.doScrollX && this.rBandX.set(this.dragX);
    this.doScrollY && this.rBandY.set(this.dragY);
    this.time = this.getTimeStamp(c);
    this.touchStartPoint.x = this.dragX;
    this.touchStartPoint.y = this.dragY;
    this.isMoving = !1;
    this.pause()
};
pr.dragChange = function (a, b, c) {
    this.dragX = a;
    this.dragY = b;
    this.time = this.getTimeStamp(c);
    this.isMoving ? this.move() : this.findDir()
};
pr.dragEnd = function (a, b, c) {
    this.isDraggingPos = !1;
    this.listenForMoveAndEnd(!1);
    this.getTimeStamp(c) - this.time > this.timeThresh && (this.doScrollX && this.rBandX.set(this.dragX), this.doScrollY && this.rBandY.set(this.dragY));
    this.isPagedX && (this.targetX = this.setSnap(this.contentX, this.rBandX.v, this.bounds.width, this.minX, this.maxX));
    this.isPagedY && (this.targetY = this.setSnap(this.contentY, this.rBandY.v, this.bounds.height, this.minY, this.maxY));
    this.play()
};
pr.getTimeStamp = function (a) {
    return a && void 0 != a.timeStamp && 0 < a.timeStamp ? a.timeStamp : (new Date).getTime()
};
pr.gestureStart = function (a, b) {
    this.isGesturing = !0;
    this.dragScale = this.dragPrevScale = a;
    this.dragAngle = this.dragPrevAngle = b;
    this.dragAngleV = 0;
    this.isDraggingAngle = !0
};
pr.gestureChange = function (a, b) {
    this.dragScale = a;
    this.dragAngle = b
};
pr.gestureEnd = function () {
    this.isGesturing = !1
};
pr.onTouchStart = function (a) {
    this.isTouched = !0;
    "mousedown" == a.type && (a = this.mouseToTouchEvent(a));
    if (1 == a.touches.length) this.dragStart(a.touches[0].pageX, a.touches[0].pageY, a);
    else if (2 <= a.touches.length) {
        var b = a.touches[0].pageX,
            c = a.touches[0].pageY,
            h = a.touches[1].pageX,
            e = a.touches[1].pageY,
            d = MathUtils.interpolatePointOnLine(b, c, h, e, 0.5);
        this.dragStart(d.x, d.y, a);
        this.gestureStartDist = MathUtils.distance(b, c, h, e);
        this.gestureStart(1, Math.atan2(c - e, b - h))
    }
    this.touches = a.touches;
    this.listenForMoveAndEnd(!0)
};
pr.onTouchMove = function (a) {
    if ("mousemove" == a.type) {
        if (!this.isTouched) return;
        a = this.mouseToTouchEvent(a)
    }
    if (1 == a.touches.length) this.dragChange(a.touches[0].pageX, a.touches[0].pageY, a);
    else if (2 <= a.touches.length) {
        var b = a.touches[0].pageX,
            c = a.touches[0].pageY,
            h = a.touches[1].pageX,
            e = a.touches[1].pageY,
            d = MathUtils.interpolatePointOnLine(b, c, h, e, 0.5);
        this.dragChange(d.x, d.y, a);
        this.gestureChange(MathUtils.distance(b, c, h, e) / this.gestureStartDist, Math.atan2(c - e, b - h))
    }
    this.touches = a.touches;
    a.preventDefault()
};
pr.onTouchEnd = function (a) {
    this.touches = a.touches;
    if ("mouseup" == a.type) this.isTouched = !1, this.dragEnd(a.pageX, a.pageY, a);
    else if (0 == a.touches.length) {
        var b, c;
        !Sys.supports.multiTouch && a.changedTouches && 1 == a.changedTouches.length ? (b = a.changedTouches[0].pageX, c = a.changedTouches[0].pageY) : (b = this.dragX, c = this.dragY);
        this.dragEnd(b, c, a);
        this.gestureEnd()
    } else if (1 == a.touches.length) this.dragStart(a.touches[0].pageX, a.touches[0].pageY, a), this.gestureEnd();
    else this.onTouchStart(a)
};
pr.mouseToTouchEvent = function (a) {
    a.touches = [{
        pageX: a.pageX,
        pageY: a.pageY
    }];
    return a
};
delete pr;

function PageLoader(a, b) {
    this.targetEl = a;
    this.onComplete = b;
    this.pageEl = null;
    this.isLoading = !1;
    var c = this;
    this.xhr = new XMLHttpRequest;
    this.xhr.onreadystatechange = function (a) {
        4 == this.readyState && (0 == this.status || 200 == this.status ? c.onXHRLoaded(a) : c.onXHRError(a))
    }
}
var pp = PageLoader.prototype;
pp.load = function (a) {
    this.isLoading && stop();
    this.xhr.open("GET", a, !0);
    this.xhr.send();
    this.isLoading = !0;
    Microsite.trackPage(a)
};
pp.stop = function () {
    this.xhr.abort();
    var a = this.targetEl.getElementsByTagName("img"),
        b;
    for (b in a) a[b].onload = a[b].onerror = null
};
pp.onXHRLoaded = function (a) {
    this.isLoading = !1;
    this.getPageElements(this.xhr.responseText);
    this.loadImages()
};
pp.onXHRError = function (a) {
    window.alert("There was an error loading the page. Please try again later.");
    location.reload()
};
pp.getPageElements = function (a) {
    this.targetEl.innerHTML = this.getFromHTMLText("body", a);
    this.pageEl = this.targetEl.getElementsByClassName("page")[0];
    this.pageEl.parentNode.removeChild(this.pageEl);
    this.targetEl.innerHTML = "";
    this.targetEl.appendChild(this.pageEl)
};
pp.loadImages = function () {
    var a = this.targetEl.getElementsByTagName("img");
    if (a.length) {
        var b = 0,
            c = this,
            h;
        for (h in a) a[h].onload = a[h].onerror = function (e) {
            ++b == a.length && c.setup()
        }
    } else this.setup()
};
pp.setup = function () {
    this.isLoading = !1;
    this.targetEl.innerHTML += "<style>" + this.getFromHTMLText("style", this.xhr.responseText) + "</style>";
    for (var a = this.targetEl.getElementsByTagName("script"), b = 0; b < a.length; b++) eval(a[b].text);
    a = window["Page" + this.capitalize(this.pageEl.id)];
    this.onComplete.apply(null, [a, this.pageEl])
};
pp.getFromHTMLText = function (a, b) {
    var c = b.indexOf("<" + a),
        c = b.indexOf(">", c),
        h = b.lastIndexOf("</" + a + ">");
    return b.slice(c + 1, h)
};
pp.capitalize = function (a) {
    return a.charAt(0).toUpperCase() + a.substr(1)
};
delete pp;
var ICSOrientationFix = function () {
    function a() {
        window.removeEventListener("load", a, !1);
        h[c()].width = window.innerWidth;
        window.addEventListener("resize", b, !1)
    }

    function b() {
        var a = c(),
            b = h[a].width; - 1 == b ? h[a].width = window.innerWidth : b != window.innerWidth && setTimeout(function () {
                location.href = Microsite.getPageURL()
            }, 0)
    }

    function c() {
        return window.innerWidth < window.innerHeight ? "portrait" : "landscape"
    }
    var h = {
        portrait: {
            width: -1
        },
        landscape: {
            width: -1
        }
    };
    Sys.isAndroid && 4 <= Sys.androidVersion && window.addEventListener("load",
        a, !1)
}();