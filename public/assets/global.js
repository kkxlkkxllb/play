var Config = {
    colors: "#e91b00 #fd6000 #ff9500 #ffd200 #c4d000 #0ea5b4 #0052DA #7d4acc".split(" "),
    strings: {
        navOpen: "menu",
        navClose: "close"
    }
}, isTouch = "ontouchstart" in window,
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
        function a(a,
            c) {
            if (a != n && a != l || c) f && b(), Preloader.show(), n = a, f = !0, p.animOut && p.animOut(), s.style.opacity = 0, Utils.transition(s, "opacity", "200ms ease-in-out"), B = setTimeout(function () {
                s.style.visibility = "hidden";
                Utils.resetTransition(s);
                g.open("GET", a, !0);
                g.send();
                Main.hideLocationBar()
            }, 201), d(a), q.fire(Events.NAVIGATE, {
                url: a
            })
        }

        function b() {
            clearTimeout(B);
            g.abort();
            // Preloader.hide();
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
            // Preloader.hide();
            setTimeout(function () {
                Sys.isAndroid && 4 <= Sys.androidVersion &&
                    Main.resize();
                s.style.visibility = "visible";
                s.style.opacity = 1;
                void 0 != p.animIn ? p.animIn() : (Utils.transition(s, "opacity", "400ms ease-in-out"), y.style.visibility = "visible");
                t.onAnimIn()
            }, 125)
        }

        function d(a) {
            Tracker.trackPage(a)
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
            navigate: a,
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
            trackPage: d,
            trackEvent: function (a,
                b) {
                Tracker.trackEvent(a, b)
            },
            callbacks: t
        }
    }(),
    Preloader = function () {
        function a() {
            var a = Sys.isMobile ? window.innerWidth : Main.stage.width,
                b = Sys.isMobile ? window.innerHeight : Main.stage.height;
            d = Math.round(0.5 * a + f);
            k = Math.round(0.5 * b + l);
            "none" != m.style.display && (m.style.width = a + 120 + "px", m.style.height = b + 280 + "px")
        }

        function b(a) {
            f = a.offsetX || 0;
            l = a.offsetY || 0;
            if (a.colors) {
                for (var b = c; b--;) h[b].el.style.backgroundColor = a.colors[b % a.colors.length];
                m.style.backgroundColor = a.bg || "#FFFFFF"
            }
        }
        var c = 8,
            h = [],
            e, d, k, g, q =
                0,
            f, l, n, r, m;
        return {
            init: function () {
                g = 0.75 > Sys.deviceScaleFactor ? 0.75 : Sys.deviceScaleFactor;
                e = document.createElement("div");
                e.style.position = "absolute";
                e.style.left = "0px";
                e.style.top = "0px";
                e.style.visibility = "hidden";
                Utils.setTransformOrigin(e, "0% 0%");
                for (var a = 0, b = 2 * Math.PI / c, d = c; d--;) {
                    var k = {
                        x: -3 + 13 * Math.cos(a),
                        y: -3 + 13 * Math.sin(a),
                        angle: a
                    }, f = document.createElement("div");
                    f.style.position = "absolute";
                    f.style.width = "6px";
                    f.style.height = "6px";
                    f.style.backgroundColor = Config.colors[d % Config.colors.length];
                    f.style[Utils.vendorPrefix + "border-radius"] = f.style["border-radius"] = "4px";
                    Utils.transform2(f, k.x, k.y);
                    e.appendChild(f);
                    k.el = f;
                    h[d] = k;
                    a += b
                }
                m = document.createElement("div");
                m.style.position = "absolute";
                m.style.left = "-5px";
                m.style.top = "-5px";
                m.style.zIndex = 99989;
                m.style.display = "none";
                m.style.backgroundColor = "#FFFFFF";
                play("main").appendChild(m);
                play("main").appendChild(e)
            },
            show: function (c, h, f) {
                h = h || 750;
                b(f || {
                    offsetX: 0,
                    offsetY: 0,
                    colors: Config.colors,
                    bg: "#FFFFFF"
                });
                c ? (m.style.display = "block", e.style.zIndex =
                    99990) : 1003 != e.style.zIndex && (e.style.zIndex = 1003);
                window.addEventListener("resize", a, !1);
                Microsite.dispatcher.on(Events.SIMULATOR_ROTATE, a);
                a();
                e.style.visibility = "visible";
                e.style.opacity = 0;
                n = setTimeout(function () {
                    e.style.opacity = 1;
                    Utils.transition(e, "opacity", h + "ms ease-in-out")
                }, 0);
                var l = g;
                r = setInterval(function () {
                    q += 0.15;
                    l = l < g ? l + 0.2 : g;
                    Utils.transform2(e, d, k, l, q)
                }, 1E3 / 60)
            },
            hide: function () {
                window.removeEventListener("resize", a, !1);
                Microsite.dispatcher.off(Events.SIMULATOR_ROTATE, a);
                // "block" == m.style.display &&
                //     (m.style.display = "none");
                clearTimeout(n);
                e.style.opacity = 0;
                Utils.transition(e, "opacity", "250ms ease-in-out");
                n = setTimeout(function () {
                    clearInterval(r);
                    e.style.visibility = "hidden"
                }, 251)
            },
            resize: a
        }
    }(),
    Main = function () {
        function a() {
            document.removeEventListener("DOMContentLoaded", a, !1);
            q();
            document.body.style.visibility = "visible";
            Sys.isMobile || (Sys.deviceScaleFactor = 1, m = s.isSimulatorActive = !0, Simulator.init());
            Sys.isMobile && play("awards-container") && (play("awards-container").style.display = "none");
            Preloader.init();
            Preloader.show(!0)
        }

        function b() {
            window.removeEventListener("load", b, !1);
            f = p.el = play("main");
            r = play("page-holder");
            n = play("nav");
            n.style.opacity = 0;
            if (Sys.isMobile) {
                var a = document.createElement("div");
                a.style.position = "relative";
                a.style.width = "1px";
                a.style.height = "20%";
                document.body.appendChild(a)
            }
            h();
            g();
            // Menu.init();
            Microsite.dispatcher.on(Events.MENU_OPEN, e);
            Microsite.dispatcher.on(Events.MENU_CLOSE, e);
            Microsite.init();
            if (!Sys.isMobile) Microsite.dispatcher.on(Events.SIMULATOR_ROTATE, d);
            // Tracker.init();
            // a = document.querySelector("div.menu-info-inner ul").children;
            // Tracker.addTrackEvent(a[0], "menu", "mail");
            // Tracker.addTrackEvent(a[1], "menu", "phone");
            // Tracker.addTrackEvent(a[2], "menu", "twitter");
            // Tracker.addTrackEvent(a[3], "menu", "map");
            // Tracker.addTrackEvent(play("nav-stripe-2"), "menu", "about-us");
            // Tracker.addTrackEvent(play("nav-stripe-1"), "menu", "contact");
            window.addEventListener("resize", d, !1);
            document.body.addEventListener("orientationchange", d, !1);
            d(null);
            Sys.isAndroid && (document.body.style["overflow-x"] = "hidden", document.body.style["overflow-y"] = "visible");
            Sys.isIPhone ?
                setTimeout(c, 250) : c()
        }

        function c() {
            document.body.style.visibility = "visible";
            m && Simulator.animIn();
            setTimeout(function () {
                l.style.opacity = 1;
                Utils.transition(play("logo"), "opacity", "0.65s ease-in-out")
            }, 0);
            setTimeout(function () {
                n.style.opacity = 1;
                Utils.transition(play("nav"), "opacity", "0.65s ease-in-out")
            }, 250);
            setTimeout(Microsite.animIn, 400)
        }

        function h() {
            l = play("logo");
            l.style.opacity = 0;
            if (l.parentNode.href) {
                Sys.isMobile || f.appendChild(l.parentNode.parentNode);
                var a = l.parentNode.href;
                l.parentNode.href = "javascript:void(0)";
                l.parentNode.addEventListener(Sys.supports.touch ? "touchstart" : "click", function () {
                    Utils.resetTransition(l);
                    l.style.opacity = 0.25;
                    setTimeout(function () {
                        l.style.opacity = 1;
                        Utils.transition(l, "all", "375ms ease-in-out")
                    }, 0);
                    Microsite.navigate(a)
                }, !1);
                Sys.supports.touch && Utils.addClass(l.parentNode, "no-hover")
            }
        }

        function e(a) {
            Microsite.getPage()[a.type == Events.MENU_OPEN ? "pause" : "play"]()
        }

        function d(a) {
            q();
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
            // Menu.resize()
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

        function q() {
            Sys.isAndroid || (0 < document.body.scrollLeft ||
                1 != document.body.scrollTop) && window.scrollTo(0, 1)
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
            },
            hideLocationBar: q
        }
    }(),
    Tracker = function () {
        var a = {}, b;
        a.init = function () {
            b = window._gaq || []
        };
        a.trackPage = function (a) {
            b.push(["_trackPageview", a])
        };
        a.trackEvent = function () {
            b.push(["_trackEvent"].concat(Array.prototype.slice.call(arguments)))
        };
        a.addTrackEvent = function (a, b, e, d) {
            try {
                a.addEventListener(Events.DOWN, Utils.delegate(this, Tracker.trackEvent, b, e, d), !1)
            } catch (k) {
                console.log("Error Tracker.addTrackEvent " + [a, b, e, d])
            }
        };
        return a
    }(),
    Menu = function () {
        var a, b, c, h, e, d, k, g, q, f, l = "",
            n, r = [],
            m = window.location.href,
            p, s, y = !1,
            x = function (a) {
                for (var b = r.length; b--;)
                    if (-1 != a.indexOf(r[b].url)) return b;
                return -1
            }, B = function (a) {
                n ? A() : z()
            }, t = function (a) {
                m != a.url && void 0 != a.url && (m = a.url, v(x(m)), n && A())
            }, u = function (a) {
                a.preventDefault();
                if ("click" == a.type && Sys.supports.touch) a.target.blur();
                else if (m == a.currentTarget._href) Microsite.dispatcher.fire(Events.MENU_TAP_ACTIVE), A();
                else {
                    m = a.currentTarget._href;
                    a = x(m);
                    if (!Sys.isAndroid) {
                        var b =
                            r[a].linkEl;
                        Utils.resetTransition(b);
                        b.style.opacity = 0.2;
                        setTimeout(function () {
                            b.style.opacity = 1;
                            Utils.transition(b, "opacity", "400ms ease-in-out")
                        }, 0)
                    }
                    v(a);
                    setTimeout(function () {
                        Microsite.navigate(m)
                    }, Sys.isIPad ? 600 : 900);
                    setTimeout(function () {
                        A(!0)
                    }, 450)
                }
            }, v = function (a) {
                p = a;
                l = -1 != p ? r[p].label : Config.strings.navOpen;
                D(l);
                C();
                Utils.transition(f, "all", "430ms cubic-bezier(0,0,0.005,1)", !0);
                w()
            }, w = function () {
                var a = play("logo");
                if (0 == p || 0.7 > Sys.deviceScaleFactor && 1 == p) {
                    var b = f.offsetHeight + 1;
                    1 == p && (b *= 0.85);
                    Utils.translate(a, "0px", b + "px");
                    Utils.transition(a, "transform", "300ms cubic-bezier(0,0,0,1)");
                    y = !0
                } else y && (Utils.translate(a, "0px", "0px"), Utils.transition(a, "transform", "350ms ease-in-out"), y = !1)
            }, z = function () {
                n || (Main.hideLocationBar(), F(), d.style.visibility = "visible", setTimeout(function () {
                    d.style.opacity = 1;
                    Utils.transition(d, "opacity", "0.5s ease-in-out")
                }, 0), Utils.transitionName ? (Utils.translate(e, "0px", "-1px"), Utils.transition(e, "transform", "0.65s cubic-bezier(0.25,0,0,1)")) : (E.y = b, E.trans(e,
                    0, -1)), Utils.resetTransition(k), k.style.opacity = 0, k.style.visibility = "visible", Utils.translate(k, "0px", Math.round(a - 0.11 * Main.stage.height) + "px"), setTimeout(function () {
                    k.style.opacity = 1;
                    Utils.translate(k, "0px", a + "px");
                    Utils.transition(k, "all", "0.65s cubic-bezier(0.25,0,0,1)")
                }, 0), n = !0, D(Config.strings.navClose), C(), Microsite.dispatcher.fire(Events.MENU_OPEN), k.addEventListener(Sys.supports.touch ? "touchstart" : "mousedown", G, !1))
            }, A = function (c) {
                if (n) {
                    d.style.opacity = 0;
                    Utils.transition(d, "opacity", "450ms ease-in-out");
                    setTimeout(function () {
                        d.style.visibility = "hidden"
                    }, 501);
                    if (Utils.transitionName) {
                        var g = c ? 650 : 500;
                        c = c ? "0.6,0,0,1" : "0.5,0,0,1";
                        Utils.translate(e, "0px", b + "px");
                        Utils.transition(e, "transform", g + "ms cubic-bezier(" + c + ")")
                    } else E.y = -1, E.trans(e, 0, b);
                    k.style.opacity = 0;
                    Utils.translate(k, "0px", a - 25 + "px");
                    Utils.transition(k, "all", "200ms ease-in-out");
                    setTimeout(function () {
                        k.style.visibility = "hidden"
                    }, 300);
                    D(l);
                    C();
                    n = !1;
                    Microsite.dispatcher.fire(Events.MENU_CLOSE);
                    k.removeEventListener(Sys.supports.touch ? "touchstart" :
                        "mousedown", G, !1)
                }
            }, G = function (a) {
                a.target == a.currentTarget && A()
            }, D = function (a) {
                a != g.innerHTML && (g.innerHTML = a)
            }, C = function () {
                var a, b, c, d, e; - 1 == p ? (a = r[0].stripeEl.offsetWidth, b = Math.round(0.5 * (Main.stage.width - a)), d = "rgb(224, 224, 224)", c = h, e = s) : (c = r[p].stripeEl, a = Math.max(g.offsetWidth + 20, c.offsetWidth), b = c.offsetLeft, b + a > Main.stage.width && (b = c.offsetLeft + c.offsetWidth - a), d = r[p].bgColor, c = "#FFFFFF", e = "0px 0px #FFFFFF");
                var k = getComputedStyle(f);
                k.color != c && (f.style.color = c);
                k.backgroundColor != d &&
                    (f.style.backgroundColor = d);
                f.style.width = a + "px";
                f.style.textShadow = e;
                Sys.isIPad || !Sys.isMobile ? setTimeout(function () {
                    H(a)
                }, 0) : H(a);
                Utils.translate(f, b + "px", "0px")
            }, H = function (a) {
                var b = f.offsetHeight,
                    c = 1.3 * a,
                    g = 1.8 * b;
                q.style.width = c + "px";
                q.style.height = g + "px";
                Utils.translate(q, Math.round(0.5 * (a - c)) + "px", Math.round(0.5 * (b - g)) + "px")
            }, F = function () {
                d.style.width = Main.stage.width + 10 + "px";
                d.style.height = Main.stage.height + c + "px";
                Utils.translate(d, "-1px", "-1px")
            }, E = {
                el: null,
                x: 0,
                y: 0,
                iv: -1,
                run: function (a, b) {
                    0.4 >
                        Math.abs(a - this.x) && 0.4 > Math.abs(b - this.y) ? (this.x = a, this.y = b, clearInterval(this.iv)) : (this.x += 0.2 * (a - this.x), this.y += 0.2 * (b - this.y));
                    Utils.translate(this.el, this.x + "px", this.y + "px")
                },
                trans: function (a, b, c) {
                    this.el = a;
                    var g = this;
                    this.iv = setInterval(function () {
                        g.run(b, c)
                    }, 16)
                }
            };
        return {
            init: function () {
                d = play("menu-bg");
                c = Sys.isAndroid ? 70 : 10;
                k = play("menu-info");
                k.style.top = "0px";
                e = play("nav");
                e.style.top = "0px";
                Sys.isAndroid && /Firefox/.test(navigator.userAgent);
                for (var a = 0, b = e.children.length; a < b; a++) {
                    var m = e.children[a];
                    if (-1 != m.id.indexOf("nav-stripe")) {
                        var n = m.getElementsByTagName("a")[0],
                            A = n.href; - 1 == A.indexOf("#") && (m.addEventListener("touchstart", u, !1), m.addEventListener("click", u, !1), m._href = A, n.href = "javascript:void(0)", Sys.supports.touch && Utils.addClass(n, "no-hover"), r.push({
                                url: A,
                                label: n.textContent,
                                bgColor: getComputedStyle(m).backgroundColor,
                                stripeEl: m,
                                linkEl: n
                            }))
                    }
                }
                p = x(Microsite.getPageURL());
                l = -1 != p ? r[p].label : Config.strings.navOpen;
                f = play("menu-open-btn");
                f.addEventListener(Sys.supports.touch ? "touchstart" :
                    "click", B, !1);
                a = getComputedStyle(f);
                s = a.textShadow;
                h = a.color;
                if (5 <= Sys.iOSVersion || 4 <= Sys.androidVersion || !Sys.isMobile) f.style[Utils.vendorPrefix + "box-shadow"] = 0.7 < Sys.deviceScaleFactor ? "0px 4px 4px 1px rgba(0, 0, 0, 0.1)" : "0px 2px 2px 1px rgba(0, 0, 0, 0.1)";
                g = document.createElement("span");
                D(l);
                f.innerHTML = "";
                f.appendChild(g);
                q = document.createElement("div");
                q.id = "openBTN-hitArea";
                q.style.position = "absolute";
                q.style.left = "0px";
                q.style.top = "0px";
                f.appendChild(q);
                setTimeout(function () {
                    var a = f.offsetWidth;
                    f.parentNode.parentNode.appendChild(f);
                    f.style.width = a + "px";
                    f.style.left = "0px";
                    C()
                }, 0);
                Microsite.dispatcher.on(Events.NAVIGATE, t);
                w()
            },
            open: z,
            close: A,
            resize: function () {
                a = Math.round(0.5 * Main.stage.height);
                b = -a + 0.01 * Main.stage.height;
                e.style.height = a + "px";
                Utils.resetTransition(k);
                k.style.height = a + "px";
                Utils.translate(k, "0px", a + "px");
                Utils.resetTransition(e);
                Utils.translate(e, "0px", (n ? -1 : b) + "px");
                Utils.resetTransition(f);
                C();
                n && F();
                if (Sys.isAndroid) {
                    var c = Main.stage.width / r.length,
                        g = r[r.length - 1].stripeEl;
                    g.style.position = "absolute";
                    g.style.left = Main.stage.width - c - 1 + "px";
                    g.style.top = "0px";
                    g.style.width = c + 3 + "px"
                }
            },
            isOpen: function () {
                return n
            },
            moveTo: function (a, c, g) {
                void 0 != a && (void 0 == c && (c = n ? -1 : b), Utils.translate(e, a + "px", c + "px"), g && Utils.transition(e, "transform", g))
            },
            setSelected: v
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

function ClickProxy(a, b, c) {
    this.el = a;
    this.callback = b;
    this.scope = c;
    this.thresh = 4;
    this.dY = this.dX = this.startY = this.startX = 0;
    this.hasMoved = !1;
    this.onMoveDel = Utils.delegate(this, this.onMove);
    this.delOnDown = Utils.delegate(this, this.onDown);
    this.delOnUp = Utils.delegate(this, this.onUp);
    Sys.supports.touch ? (this.el.addEventListener("touchstart", this.delOnDown, !1), this.el.addEventListener("touchend", this.delOnUp, !1), this.el.addEventListener("click", this.preventDefault, !1)) : (this.el.addEventListener("mousedown",
        this.delOnDown, !1), this.el.addEventListener("click", this.delOnUp, !1))
}
ClickProxy.prototype.onDown = function (a) {
    a = this.getEv(a);
    this.startX = a.pageX;
    this.startY = a.pageY;
    this.dY = this.dX = 0;
    this.hasMoved = !1;
    this.el.addEventListener(Sys.supports.touch ? "touchmove" : "mousemove", this.onMoveDel, !1)
};
ClickProxy.prototype.onUp = function (a) {
    this.el.removeEventListener(Sys.supports.touch ? "touchmove" : "mousemove", this.onMoveDel, !1);
    this.hasMoved || this.callback.apply(this.scope, [a]);
    a.preventDefault()
};
ClickProxy.prototype.onMove = function (a) {
    a = this.getEv(a);
    this.dX = a.pageX - this.startX;
    this.dY = a.pageY - this.startY;
    if (Math.abs(this.dX) > this.thresh || Math.abs(this.dY) > this.thresh) this.hasMoved = !0, this.el.removeEventListener(Sys.supports.touch ? "touchmove" : "mousemove", this.onMoveDel, !1)
};
ClickProxy.prototype.remove = function () {
    Sys.supports.touch ? (this.el.removeEventListener("touchstart", this.delOnDown, !1), this.el.removeEventListener("touchend", this.delOnUp, !1), this.el.removeEventListener("click", this.preventDefault, !1)) : (this.el.removeEventListener("mousedown", this.delOnDown, !1), this.el.removeEventListener("click", this.delOnUp, !1));
    this.el.removeEventListener(Sys.supports.touch ? "touchmove" : "mousemove", this.onMoveDel, !1);
    this.scope = this.callback = null
};
ClickProxy.prototype.preventDefault = function (a) {
    a.preventDefault()
};
ClickProxy.prototype.getEv = function (a) {
    return Sys.supports.touch ? a.touches[0] : a
};
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
                (B = play("awards-container")) && AwardsOverlay.init();
                Sys.isOnline || (q = -100);
                u = play("device");
                v = play("device-reflection");
                w = play("main");
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
                z = play("toggle-orientation-btn");
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
                if (!p) var d = 0.5 * (g - k) * m,
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
    AwardsOverlay = function () {
        function a(b) {
            g.removeEventListener("click", a, !1);
            g.style.opacity = 0;
            Utils.transition(g, "opacity", "280ms ease-in-out");
            setTimeout(function () {
                g.style.visibility = "hidden"
            }, 285);
            f.addEventListener("mouseover", c, !1);
            f.addEventListener("mouseout", h, !1);
            "click" == b.type && f.play();
            h()
        }

        function b(b) {
            g.addEventListener("click", a, !1);
            g.style.visibility = "visible";
            g.style.opacity =
                1;
            Utils.transition(g, "opacity", "280ms ease-in-out");
            f.removeEventListener("mouseover", c, !1);
            f.removeEventListener("mouseout", h, !1);
            h()
        }

        function c() {
            f.setAttribute("controls")
        }

        function h() {
            f.removeAttribute("controls")
        }

        function e() {
            q.removeEventListener("click", e, !1);
            f.pause();
            f.src = "";
            d()
        }

        function d() {
            k.style.opacity = 0;
            Utils.transition(k, "opacity", "370ms ease-in-out");
            setTimeout(function () {
                k.style.display = "none"
            }, 375)
        }
        var k, g, q, f, l;
        return {
            init: function () {
                k = play("awards-container");
                Utils.transform2(k,
                    0, 0);
                g = play("awards-play-btn");
                g.addEventListener("click", a, !1);
                q = play("awards-close-btn");
                q.addEventListener("click", e, !1);
                f = k.getElementsByTagName("video")[0];
                f.removeAttribute("controls");
                f.addEventListener("play", a, !1);
                f.addEventListener("pause", b, !1);
                f.addEventListener("ended", function () {
                    f.setAttribute("poster", l)
                }, !1);
                f.addEventListener("click", function (b) {
                    b.offsetY < f.height - 35 && (f.paused ? a(b) : f.pause())
                }, !1);
                l = f.getAttribute("poster");
                Sys.isChrome && (f.style.display = "none", setTimeout(function () {
                    f.style.display =
                        "block"
                }, 0))
            },
            close: e
        }
    }(),
    NTLightbox = function () {
        function a() {
            l.pause();
            Utils.translate(f, 0, 0);
            f.style.opacity = 0.1;
            setTimeout(function () {
                f.style.opacity = 1;
                Utils.transition(f, "opacity", "250ms ease-in-out")
            }, 0);
            h()
        }

        function b(b) {
            b = b ? "addEventListener" : "removeEventListener";
            window[b]("resize", n, !1);
            window[b]("orientationchange", n, !1);
            if (f) f[b](Sys.supports.touch ? "touchstart" : "click", a, !1)
        }

        function c() {
            n();
            b(!0);
            g.style.opacity = 0;
            g.style.display = "block";
            Utils.translate(g, "0px", "0px");
            setTimeout(function () {
                g.style.opacity =
                    1;
                Utils.transition(g, "opacity", "400ms ease-out")
            }, 0);
            Utils.transform(q, Sys.supports.translate3d ? "translateZ(0) scale(0.015)" : "scale(0.015)");
            setTimeout(function () {
                Utils.transform(q, Sys.supports.translate3d ? "translateZ(0) scale(1)" : "scale(1)");
                Utils.transition(q, "transform", "550ms cubic-bezier(0.2, 0.900, 0.000, 1.000)")
            }, 0);
            Microsite.dispatcher.fire(Events.NTLB_ANIM_IN)
        }

        function h() {
            b(!1);
            g.style.opacity = 0;
            Utils.transition(g, "opacity", "350ms ease-in-out");
            setTimeout(function () {
                    g.style.display = "none"
                },
                351);
            Utils.transform(q, "scale(0.9)");
            Utils.transition(q, "transform", "350ms cubic-bezier(0.990, 0.000, 0.000, 0.995)");
            Microsite.dispatcher.fire(Events.NTLB_ANIM_OUT)
        }

        function e() {
            g.style.width = window.innerWidth + "px";
            g.style.height = window.innerHeight + 2 + "px"
        }

        function d() {
            var a = window.innerHeight;
            l.style.width = window.innerWidth + "px";
            l.style.height = a + "px";
            l.style.left = "0px";
            l.style.top = -a - 10 + "px"
        }

        function k(b) {
            b.target == b.currentTarget && a()
        }
        var g, q, f, l, n, r;
        return {
            init: function () {
                if (l = play("ntlb-video")) l.style.display =
                    "block", (r = Sys.isIOS && 0.75 > Sys.deviceScaleFactor) ? (l.style.position = "absolute", l.style.zIndex = 0, n = d, n(), b(!0)) : (g = play("ntlb-container"), g.addEventListener(Sys.supports.touch ? "touchend" : "click", k, !1), q = g.getElementsByClassName("video-holder")[0], f = play("ntlb-close-btn"), f.style.cursor = "pointer", document.body.appendChild(g), n = e)
            },
            show: function (a) {
                r || c();
                l.play();
                setTimeout(function () {
                    var a = l.currentSrc.substring(l.currentSrc.lastIndexOf("/") + 1, l.currentSrc.lastIndexOf("."));
                    Microsite.trackEvent("showVideo",
                        a)
                }, 400)
            },
            hide: a,
            remove: function () {
                r || document.body.removeChild(g);
                b(!1);
                r || g.removeEventListener(Sys.supports.touch ? "touchend" : "click", k, !1)
            }
        }
    }(),
    NTLightboxTrigger = function () {
        function a(a) {
            Utils.transform2(c, 0, 0, 0.95);
            Utils.transition(c, "transform", "50ms ease-in-out");
            setTimeout(function () {
                Utils.transform2(c, 0, 0, 1);
                Utils.transition(c, "transform", "200ms ease-in-out")
            }, 51)
        }
        var b = {}, c, h, e, d, k;
        b.init = function (b, q, f) {
            (h = Sys.supports.hdVideo) ? (NTLightbox.init(), c = b, c.addEventListener("click", Utils.preventDefault, !1), c.addEventListener(Events.DOWN, a, !1), e = new ClickProxy(c, NTLightbox.show, NTLightbox), q && (d = q, Microsite.dispatcher.on(Events.NTLB_ANIM_IN, d)), f && (k = f, Microsite.dispatcher.on(Events.NTLB_ANIM_OUT, k))) : b && play("ntlb-video") && (play("ntlb-video").style.display = "none")
        };
        b.remove = function () {
            h && (c.removeEventListener(Events.DOWN, a, !1), c = null, d && Microsite.dispatcher.off(Events.NTLB_ANIM_IN, d), k && Microsite.dispatcher.off(Events.NTLB_ANIM_OUT, k), e.remove(), NTLightbox.remove())
        };
        return b
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