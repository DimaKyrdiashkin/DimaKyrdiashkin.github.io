let widthWindow= window.innerWidth*.9;

!(function  canvasUser(e) {
    var t = {};
    function i(s) {
        if (t[s]) return t[s].exports;
        var a = (t[s] = { i: s, l: !1, exports: {} });
        return e[s].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
    }
    (i.m = e),
        (i.c = t),
        (i.d = function (e, t, s) {
            i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
        }),
        (i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (i.t = function (e, t) {
            if ((1 & t && (e = i(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var s = Object.create(null);
            if ((i.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var a in e)
                    i.d(
                        s,
                        a,
                        function (t) {
                            return e[t];
                        }.bind(null, a)
                    );
            return s;
        }),
        (i.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                        return e.default;
                    }
                    : function () {
                        return e;
                    };
            return i.d(t, "a", t), t;
        }),
        (i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (i.p = ""),
        i((i.s = 1));
})([
    function (e) {
        e.exports = [
            {
                columns: [
                    [
                        "x",
                        15225408e5,15251328e5,15278112e5,15304032e5,15330816e5,15357600e5,15383520e5,15410304e5,
                        15436224e5,15463008e5,15489792e5,15513984e5,15540768e5,15566688e5,15593472e5,15619392e5,15646176e5,
                        15672960e5,15698880e5,15725664e5,15751584e5,15778368e5,15805152e5,15830208e5,15856992e5,15882912e5
                    ],
                    [
                        "USDT",
                        10.89,29.22,5.69,2.31,6.76,7,7.13,3.78,3.41,
                        3.65,
                        3.01,
                        3.9,
                        10.89,
                        29.22,
                        5.69,
                        2.31,
                        6.76,
                        7,
                        7.13,
                        3.78,
                        3.41,
                        5.17,
                        6.13,
                        6.75,
                        4.47,
                        7.81,
                    ],
                    [
                        "BTC",
                        6.58,
                        8.37,
                        4.65,
                        2.67,
                        5.35,
                        5.15,
                        5.73,
                        3.74,
                        3,
                        2.86,
                        1.99,
                        2.36,
                        6.58,
                        8.37,
                        4.65,
                        2.67,
                        5.35,
                        5.15,
                        5.73,
                        3.74,
                        3,
                        5.25,
                        2.6,
                        4.85,
                        3.51,
                        3.3,
                    ],
                    [
                        "ETC",
                        15.21,
                        29.22,
                        5.69,
                        2.31,
                        6.76,
                        7,
                        7.13,
                        3.78,
                        3.41,
                        5.17,
                        4.2,
                        4.3,
                        7.69,
                        11.44,
                        4.48,
                        2.56,
                        6.2,
                        9.05,
                        6.48,
                        5.48,
                        2.75,
                        7.25,
                        4.27,
                        4.1,
                        5.19,
                        2.96,
                    ],
                ],
                types: { USDT: "line", BTC: "line",ETC: "line", x: "x" },
                names: { USDT: "USDT", BTC: "BTC",ETC: "ETC" },
                colors: { USDT: "#3DC23F", BTC: "#F34C44", ETC: "#F34Ccc" },
            }
        ];
    },
    function (e, t, i) {
        e.exports = i(3);
    },
    function (e, t, i) {},
    function (e, t, i) {
        "use strict";
        i.r(t);
        var s = i(0);
        function a(e) {
            const t = [];
            let i = [];
            return (
                e.columns.forEach((s) => {
                    if ("x" === s[0]) {
                        s.shift(),
                        (i = s.concat()) ;
                    }
                    else {
                        const i = s.shift();
                        t.push({ data: [...s], color: e.colors[i], name: e.names[i], type: e.types[i] });
                    }
                }),
                    { labels: i, datasets: t }
            );
        }
        function h(e) {
            const t = (function (e) {
                return e.reduce((e, t) => e.concat(t.data), []);
            })(e);
            return [Math.floor(Math.min.apply(null, t)), Math.ceil(Math.max.apply(null, t))];
        }
        function o({ pos: e, viewH: t, viewW: i, length: s, delta: a }) {
            return [i / ((e.right - e.left) / 100) / (s - 2), a / t];// del canvass [i / ((e.right - e.left) / 100) / (s - 2), a / t]
        }
        function n({ data: e, yMin: t, viewH: i, xRatio: s, yRatio: a, margin: h }) {
            return e.map((e, o) => {
                const n = Math.floor(i - (e - t) / a);
                return [Math.floor(o * s), n + h];
            });
        }
        const r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        function d(e, t) {

            const i = new Date(e);

            return t ? `${i.getFullYear()}, ${r[i.getMonth()]} ${i.getDate()}` : `${r[i.getMonth()]} ${i.getDate()}`;
        }
        function c(e, t = {}) {
            Object.keys(t).forEach((i) => {
                e.style[i] = t[i];
            });
        }
        function p() {}
        function u(e, t, i, s, a) {
            return !!t && Math.abs(e - (t.x + Math.abs(i))) < s / a / 2;
        }
        function m(e) {
            return (e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (e, t, i, s) => t + t + i + i + s + s)), /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        }
        class y {
            constructor(e, t, i) {
                (this.c = e), (this.tooltip = t), (this.theme = i);
            }
            setTheme(e) {
                this.theme = e;
            }
            line({ coords: e, color: t, opacity: i, mouse: s, dpiW: a, translateX: h, withCircles: o, visibleItemsCount: n }) {
                if (
                    (this.c.beginPath(),
                        this.c.save(),
                        this.c.translate(h, 0),
                        this.c.moveTo(e[0][0], e[0][1]),
                        (this.c.lineWidth = this.theme.lineWidth),
                        (this.c.strokeStyle = (function (e, t = 1) {
                            const i = m(e);
                            return `rgba(${parseInt(i[1], 16)}, ${parseInt(i[2], 16)}, ${parseInt(i[3], 16)}, ${t})`;
                        })(t, i)),
                        e.forEach(([e, t]) => this.c.lineTo(e, t)),
                        this.c.stroke(),
                        this.c.closePath(),
                        o)
                )
                    for (let i = 0; i < e.length; i++)
                        if (u(e[i][0], s, h, a, n)) {
                            this.circle(e[i], t);
                            break;
                        }
                this.c.restore();
            }
            circle([e, t], i) {
                this.c.beginPath(), (this.c.strokeStyle = i), (this.c.fillStyle = this.theme.gridBackground), this.c.arc(e, t, this.theme.circleRadius, 0, 2 * Math.PI), this.c.fill(), this.c.stroke(), this.c.closePath();
            }
            setContextStyles() {
                (this.c.fillStyle = this.theme.gridTextColor), (this.c.font = this.theme.font), (this.c.strokeStyle = this.theme.gridLineColor), (this.c.lineWidth = this.theme.gridLineWidth);
            }
            yAxis({ dpiW: e, viewH: t, yMax: i, yMin: s, margin: a, delta: h, rowsCount: o = 5 }) {
                this.setContextStyles();
                const n = Math.round(t / o),
                    r = (i - s) / o;
                this.c.save(), this.c.beginPath();
                for (let t = 1; t <= o; t++) {
                    const s = n * t,
                        o = Math.round(i - r * t);
                    this.c.fillText(o.toString(), 0, s - 10 + a + h), this.c.moveTo(0, s + a), this.c.lineTo(e, s + a);
                }
                this.c.stroke(), this.c.restore(), this.c.closePath();
            }
            getColorSetter(e) {
                const t = m(e);
                return (e) => `rgba(${parseInt(t[1], 16)}, ${parseInt(t[2], 16)}, ${parseInt(t[3], 16)}, ${e})`;
            }
            xAxis({ data: e, datasets: t, visibleItemsLength: i, dpiW: s, dpiH: a, xRatio: h, mouse: o, margin: n, translateX: r }) {
                this.setContextStyles(), (this.c.strokeStyle = this.theme.gridActiveLineColor), this.c.beginPath(), this.c.save(), this.c.translate(r, 0), this.c.moveTo(0, n);

                const l = Math.round(s / 7),
                    c = Math.floor(e.labels.length / 6),
                    p = [0, c, 2 * c, 3 * c, 4 * c - 1, 5 * c - 2, 6 * c - 3];

                let m = 0,
                    y = 0,
                    g = 0;
                const f = {},
                    v = this.getColorSetter(this.theme.gridTextColor);
                for (let c = 0; c < e.labels.length; c++) {
                    const w = Math.floor(c * h),
                        x = d(e.labels[c]);
                    if (p.includes(c)) {
                        if (f[g]) {
                            const e = m - y,
                                t = Math.floor(e / l),
                                i = Math.abs(t - e / l);
                            if (1 === t) {
                                const e = Math.floor(f[g].length / 2),
                                    t = f[g][e];
                                this.c.save(), (this.c.fillStyle = v(i)), this.c.fillText(t.text, t.x, a - 10), this.c.restore();
                            }
                            if (t >= 2) {
                                const e = Math.floor(f[g].length / 3) - 1;
                                for (let s = 1; s <= 3; s++) {
                                    this.c.save();
                                    const h = f[g][e * s];
                                    2 !== t || (1 !== s && 3 !== s) || (this.c.fillStyle = v(i)), h.x + l < m ? this.c.fillText(h.text, h.x, a - 10) : Math.abs(h.x + l - m) < l / 2 && this.c.fillText(h.text, h.x, a - 10), this.c.restore();
                                }
                            }
                        }
                        this.c.fillText(x, w, a - 10);
                        const e = p.findIndex((e) => e === c);
                        (y = w + l), (m = Math.floor(p[e + 1] * h)), g++;
                    } else f[g] || (f[g] = []), f[g].push({ x: w, text: x });
                    u(w, o, r, s, i) &&
                    (this.c.save(), this.c.moveTo(w, n), this.c.lineTo(w, a - n), this.c.restore(), this.tooltip.show(o.tooltip, { title: d(e.labels[c], !0), items: t.map((e) => ({ name: e.name, color: e.color, value: e.data[c] })) }));
                }
                this.c.restore(), this.c.stroke(), this.c.closePath();
            }
        }
        class g {
            constructor(e) {
                (this.$el = e.el),
                    (this.c = this.$el.getContext("2d")),
                    (this.w = e.width),
                    (this.h = e.height),
                    (this.tooltip = e.tooltip),
                    (this.data = e.data || {}),
                    (this.trigger = e.onUpdate || p),
                    (this.animationSpeed = e.animationSpeed || 15),
                    c(this.$el, { width: `${this.w}px`, height: `${this.h}px` }),
                    (this.dpiW = 2 * this.w),
                    (this.dpiH = 2 * this.h),
                    (this.viewW = this.dpiW),
                    (this.viewH = this.dpiH),
                    (this.$el.width = this.dpiW),
                    (this.$el.height = this.dpiH),
                    (this.draw = new y(this.c, this.tooltip, e.theme)),
                    (this.mouse = null),
                    this.prepare(),
                    this.init(),
                    (this.raf = requestAnimationFrame(this.render));
            }
            prepare() {
                this.render = this.render.bind(this);
            }
            init() {}
            setup() {
                const [e, t] = h(this.data.datasets),
                    [i, s] = o({ pos: { left: 0, right: 100 }, viewH: this.viewH, viewW: this.viewW, length: this.data.labels.length, delta: t - e });
                (this.yMin = e), (this.yMax = t), (this.xRatio = i), (this.yRatio = s);
            }
            update(e) {}
            updateTheme(e) {}
            render() {
                this.clear(), this.setup();
                const { yMin: e, viewH: t, xRatio: i, yRatio: s, mouse: a, dpiW: h } = this;
                this.data.datasets.forEach(({ data: o, color: r }) => {
                    const l = n({ yMin: e, viewH: t, xRatio: i, yRatio: s, data: o, margin: 0 });
                    this.draw.line({ coords: l, color: r, mouse: a, dpiW: h, opacity: 1 });
                });
            }
            clear() {
                this.c.clearRect(0, 0, this.dpiW, this.dpiH);
            }
            destroy() {
                this.clear(), cancelAnimationFrame(this.raf);
            }
        }
        class f extends g {
            constructor(e) {
                super(e);
            }
            prepare() {
                super.prepare(),
                    (this.lines = {}),
                    (this.margin = 40),
                    (this.viewH = this.dpiH - 2 * this.margin),
                    (this.activeLabels = this.data.datasets.map((e) => e.name)),
                    this.data.datasets.forEach((e) => {
                        this.lines[e.name] = { opacity: 1, step: 0 };
                    }),
                    (this.pos = {}),
                    (this.max = null),
                    (this.dy = null),
                    (this.proxy = new Proxy(this, {
                        set: (...e) => {
                            const t = Reflect.set(...e);
                            return (this.raf = requestAnimationFrame(this.render)), t;
                        },
                    })),
                    (this.render = this.render.bind(this)),
                    (this.mouseMoveHandler = this.mouseMoveHandler.bind(this)),
                    (this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this));
            }
            init() {
                this.$el.addEventListener("mousemove", this.mouseMoveHandler, !0), this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
            }
            get datasets() {
                const { length: e } = this.data.labels,
                    t = Math.round((e * this.pos.left) / 100),
                    i = Math.round((e * this.pos.right) / 100),
                    s = this.data.datasets.filter((e) => this.activeLabels.includes(e.name)).map((e) => ({ ...e, data: e.data.slice(t, i) }));
                return { length: s[0].data.length, value: s };
            }
            get translateX() {
                return -1 * Math.round((this.data.labels.length * this.xRatio * this.pos.left) / 100);
            }
            get delta() {
                return Math.round(this.max - this.yMax);
            }
            updatePosition(e) {
                this.proxy.pos = e;
            }
            update({ type: e, name: t, labels: i }) {
                "removed" === e ? (this.lines[t] = { opacity: 1, step: -1 / this.animationSpeed }) : "added" === e && (this.lines[t] = { opacity: 0, step: 1 / this.animationSpeed }), (this.proxy.activeLabels = i);
            }
            setup() {
                const [e, t] = h(this.datasets.value);
                this.updateMaxAndDelta(t, e);
                const [i, s] = o({ pos: this.pos, viewH: this.viewH, viewW: this.viewW, length: this.data.labels.length, delta: this.max - e });
                (this.yMin = e), (this.yMax = t), (this.xRatio = i), (this.yRatio = s);
            }
            updateMaxAndDelta(e, t) {
                this.max || (this.max = e),
                this.dy ||
                this.max === e ||
                (this.dy = (function ({ max: e, min: t, oldMax: i, speed: s }) {
                    const a = e - i;
                    return Math.abs(a) > (e - t) / s ? a / s : a;
                })({ max: e, min: t, oldMax: this.max, speed: this.animationSpeed })),
                    this.dy > 0 ? ((this.max += this.dy), this.max > e && ((this.max = e), (this.dy = null))) : this.dy < 0 && ((this.max += this.dy), this.max < e && ((this.max = e), (this.dy = null)));
            }
            shouldAnimate() {
                const e = Object.keys(this.lines)
                    .map((e) => this.lines[e].step)
                    .every((e) => 0 === e);
                return this.dy || !e || this.delta;
            }
            updateTheme(e) {
                this.draw.setTheme(e), (this.raf = requestAnimationFrame(this.render));
            }
            render() {
                this.clear(),
                    this.setup(),
                this.shouldAnimate() && (this.raf = requestAnimationFrame(this.render)),
                    this.draw.yAxis({ dpiW: this.dpiW, viewH: this.viewH, delta: this.delta, yMax: this.yMax, yMin: this.yMin, margin: this.margin, rowsCount: 5 }),
                    this.draw.xAxis({
                        data: this.data,
                        visibleItemsLength: this.datasets.length,
                        datasets: this.data.datasets.filter((e) => this.activeLabels.includes(e.name)),
                        dpiW: this.dpiW,
                        dpiH: this.dpiH,
                        xRatio: this.xRatio,
                        mouse: this.mouse,
                        margin: this.margin,
                        translateX: this.translateX,
                    }),
                    this.data.datasets.forEach(({ data: e, color: t, name: i }) => {
                        if (this.shouldSkipLine(i)) return;
                        const s = n({ yMin: this.yMin, viewH: this.viewH, xRatio: this.xRatio, yRatio: this.yRatio, margin: this.margin, data: e });
                        this.updateOpacityFor(i),
                            this.draw.line({ coords: s, color: t, translateX: this.translateX, mouse: this.mouse, dpiW: this.dpiW, opacity: this.lines[i].opacity, visibleItemsCount: this.datasets.length, withCircles: !0 });
                    });
            }
            shouldSkipLine(e) {
                return this.lines[e].opacity <= 0 && 0 === this.lines[e].step;
            }
            updateOpacityFor(e) {
                0 !== this.lines[e].step && ((this.lines[e].opacity += this.lines[e].step), (this.lines[e].opacity >= 1 || this.lines[e].opacity <= 0) && (this.lines[e].step = 0));
            }
            mouseLeaveHandler() {
                (this.proxy.mouse = null), this.tooltip.hide();
            }
            mouseMoveHandler({ clientX: e, clientY: t }) {
                const { left: i, top: s } = this.$el.getBoundingClientRect();
                this.proxy.mouse = { x: 2 * (e - i), tooltip: { top: t - s, left: e - i } };
            }
            destroy() {
                super.destroy(), this.$el.removeEventListener("mousemove", this.mouseMoveHandler), this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
            }
        }
        class v extends g {
            constructor(e) {
                super({ ...e, el: e.el.querySelector("canvas") });
            }
            prepare() {
                super.prepare(), (this.$wrap = this.$el.parentElement), (this.mouseDownHandler = this.mouseDownHandler.bind(this)), (this.mouseUpHandler = this.mouseUpHandler.bind(this));
            }
            init() {
                (this.$left = this.$wrap.querySelector("[data-el=left]")),
                    (this.$window = this.$wrap.querySelector("[data-el=window]")),
                    (this.$right = this.$wrap.querySelector("[data-el=right]")),
                    this.$wrap.addEventListener("mousedown", this.mouseDownHandler),
                    document.addEventListener("mouseup", this.mouseUpHandler);
                const e = 0.3 * this.w;
                this.setPosition(0, this.w - e);
            }
            updateTheme(e) {
                c(this.$left, { background: e.sliderBackground }),
                    c(this.$right, { background: e.sliderBackground }),
                    c(this.$right.querySelector("[data-el=arrow]"), { background: "#8C46FF",borderRadius: "4px"});
                    c(this.$left.querySelector("[data-el=arrow]"), { background: "#8C46FF" ,borderRadius: "4px"});
            }
            update(e) {
                (this.data = e), this.render();
            }
            mouseDownHandler(e) {
                const { type: t } = e.target.dataset,
                    i = { left: parseInt(this.$window.style.left), right: parseInt(this.$window.style.right), width: parseInt(this.$window.style.width) };
                if ("window" === t) {
                    const t = e.pageX;
                    document.onmousemove = (e) => {
                        const s = t - e.pageX;
                        if (0 === s) return;
                        const a = i.left - s,
                            h = this.w - a - i.width;
                        this.setPosition(a, h), this.trigger();
                    };
                } else if ("left" === t || "right" === t) {
                    const s = i.width,
                        a = e.pageX;
                    document.onmousemove = (e) => {
                        const h = a - e.pageX;
                        if (0 !== h) {
                            if ("left" === t) {
                                const e = this.w - (s + h) - i.right,
                                    t = this.w - (s + h) - e;
                                this.setPosition(e, t);
                            } else {
                                const e = this.w - (s - h) - i.left;
                                this.setPosition(i.left, e);
                            }
                            this.trigger();
                        }
                    };
                }
            }
            setPosition(e, t) {
                const i = this.w - t - e,
                    s = 0.05 * this.w;
                if (i < s) this.$window.style.width = `${s}px`;
                else {
                    if (e < 0) return (this.$window.style.left = "0px"), void (this.$left.style.width = "0px");
                    if (t < 0) return (this.$window.style.right = "0px"), void (this.$right.style.width = "0px");
                    (this.$window.style.width = `${i}px`), (this.$window.style.left = `${e}px`), (this.$window.style.right = `${t}px`), (this.$left.style.width = `${e}px`), (this.$right.style.width = `${t}px`);
                }
            }
            get position() {
                const e = parseInt(this.$left.style.width),
                    t = this.w - parseInt(this.$right.style.width);
                return [(100 * e) / this.w, (100 * t) / this.w];
            }
            mouseUpHandler() {
                document.onmousemove = null;
            }
            destroy() {
                super.destroy(), this.$wrap.removeEventListener("mousedown", this.mouseDownHandler), document.removeEventListener("mouseup", this.mouseUpHandler), (this.$wrap.innerHTML = "");
            }
        }
        class w {
            constructor(e, t) {
                (this.$el = e), (this.theme = t);
            }
            updateTheme(e) {
                c(this.$el, { background: e.tooltipBackground, borderColor: e.tooltipBorder, boxShadow: e.tooltipShadow, color: e.tooltipColor });
            }
            show({ top: e, left: t }, i) {
                if (!Object.keys(i).length) return;
                this.$el.innerHTML = "";
                const { height: s, width: a } = this.$el.getBoundingClientRect();
                c(this.$el, { display: "block", top: `${e - s}px`, left: `${t + 5}px` }),
                    this.$el.insertAdjacentHTML(
                        "afterbegin",
                        `\n      <div class="tooltip-title">${i.title}</div>\n      <ul class="tooltip-list">\n        ${i.items
                            .map((e) => `<li class="tooltip-list-item" style="background-color: ${e.color}">\n            <div class="value" >${e.value}</div>\n            <div class="name">${e.name}</div>\n          </li>`)
                            .join(" ")}\n      </ul>\n    `
                    );
            }
            hide() {
                this.$el.style.display = "none";
            }
        }
        class x {
            constructor(e) {
                (this.name = e.name), (this.color = e.color);
            }
            toHtml() {
                return `\n      <div class="tg-chart-checkbox">\n        <input \n          type="checkbox" \n          value="${this.name}" \n          checked\n        />\n        <label>\n          <span\n            style="border-color: ${this.color}"\n          ></span>\n          ${this.name}\n        </label>\n      </div>\n    `;
            }
        }
        var b = {
            day: {
                font: "normal 20px Helvetica,sans-serif",
                lineWidth: 4,
                gridLineWidth: 2,
                gridTextColor: "#96a2aa",
                gridBackground: "#fff",
                gridLineColor: "#f2f4f5",
                gridActiveLineColor: "#dfe6eb",
                circleRadius: 12,
                sliderBackground: "#f5f9fb",
                sliderArrow: "#ddeaf3",
                checkboxBorder: "#e6ecf0",
                checkboxColor: "#000",
                tooltipBackground: "#fff",
                tooltipBorder: "#dfe6eb",
                tooltipShadow: "1px 1px 1px rgba(0, 0, 0, .05)",
                tooltipColor: "#000",
            },
            night: {
                font: "normal 20px Helvetica,sans-serif",
                lineWidth: 4,
                gridLineWidth: 2,
                gridBackground: "#242f3e",
                gridTextColor: "#546778",
                gridLineColor: "#293544",
                gridActiveLineColor: "#3b4a5a",
                circleRadius: 12,
                sliderBackground: "#1f2a38",
                sliderArrow: "#40566b",
                checkboxBorder: "#344658",
                checkboxColor: "#fff",
                tooltipBackground: "#253241",
                tooltipBorder: "#253241",
                tooltipShadow: "1px 1px 1px rgba(0, 0, 0, .5)",
                tooltipColor: "#fff",
            },
        };
        const $ =
            '<div data-el="labels" style="align-self: flex-end"></div>\n  </div>\n  <div class="tg-chart">\n    <div data-el="tooltip" class="tg-chart-tooltip"></div>\n    <canvas data-el="detail"></canvas>\n    <div class="tg-chart-slider" data-el="slider">\n      <canvas></canvas>\n      <div data-el="left" class="tg-chart-slider__left">\n        <div class="tg-chart-slider__arrow--left" data-el="arrow" data-type="left"></div>\n      </div>\n      \n      <div data-el="window" data-type="window" class="tg-chart-slider__window"></div>\n      \n      <div data-el="right" class="tg-chart-slider__right">\n        <div class="tg-chart-slider__arrow--right" data-el="arrow" data-type="right"></div>\n      </div>\n    </div>\n    ';
        class M {
            constructor(e) {
                (this.$el = e.el),
                    (this.data = e.data),
                    (this.theme = e.theme || b.day),
                    (this.w = e.width || 500),
                    (this.h = e.height || 300),
                    (this.animationSpeed = e.animationSpeed || 15),
                    this.$el.insertAdjacentHTML("afterbegin", $),
                    this.prepare(),
                    this.init();
            }
            prepare() {
                (this.labelClickHandler = this.labelClickHandler.bind(this)),
                    (this.updateChart = this.updateChart.bind(this)),
                    (this.activeLabels = this.data.datasets.map((e) => e.name)),
                    (this.tooltip = new w(this.$el.querySelector("[data-el=tooltip]"), this.theme)),
                    (this.prevState = {}),
                    (this.$detail = this.$el.querySelector("[data-el=detail]")),
                    (this.$slider = this.$el.querySelector("[data-el=slider]")),
                    (this.$labels = this.$el.querySelector("[data-el=labels]"));
            }
            init() {
                document.body.classList.add("tg-chart-preload"),
                    this.$labels.addEventListener("click", this.labelClickHandler),
                    (this.slider = new v({ el: this.$slider, width: this.w, data: this.data, onUpdate: this.updateChart, theme: this.theme, height: 40 })),
                    (this.chart = new f({ el: this.$detail, width: this.w, height: this.h, tooltip: this.tooltip, data: this.data, animationSpeed: this.animationSpeed, theme: this.theme })),
                    this.updateTheme(),
                    this.updateChart(),
                    this.renderLabels(),
                    setTimeout(() => {
                        document.body.classList.remove("tg-chart-preload");
                    }, 500);
            }
            setTheme(e) {
                (this.theme = e), this.updateTheme();
            }
            updateTheme() {
                this.slider.updateTheme(this.theme),
                    this.tooltip.updateTheme(this.theme),
                    this.chart.updateTheme(this.theme),
                    this.$labels.querySelectorAll(".tg-chart-checkbox").forEach((e) => {
                        c(e, { color: this.theme.checkboxColor, borderColor: this.theme.checkboxBorder });
                    });
            }
            renderLabels() {
                const e = this.data.datasets.map((e) => new x(e).toHtml()).join(" ");
                this.$labels.insertAdjacentHTML("afterbegin", e);
            }
            updateChart() {
                if (this.shouldChartUpdate()) {
                    const [e, t] = this.slider.position;
                    (this.prevState = { left: e, right: t, labelsLength: this.activeLabels.length }), this.chart.updatePosition({ left: e, right: t });
                }
            }
            labelClickHandler({ target: e }) {
                if ("input" !== e.tagName.toLowerCase()) return;
                let t = "";
                e.checked ? ((t = "added"), this.activeLabels.push(e.value)) : this.activeLabels.length > 1 ? ((t = "removed"), (this.activeLabels = this.activeLabels.filter((t) => t !== e.value))) : (e.checked = !e.checked),
                this.shouldChartUpdate() && ((this.prevState.labelsLength = this.activeLabels.length), this.slider.update(this.getData()), this.chart.update({ type: t, name: e.value, labels: this.activeLabels }));
            }
            shouldChartUpdate() {
                const [e, t] = this.slider.position;
                return this.prevState.left !== e || this.prevState.right !== t || this.prevState.labelsLength !== this.activeLabels.length;
            }
            getData() {
                return { datasets: this.data.datasets.filter((e) => this.activeLabels.includes(e.name)), labels: this.data.labels.concat() };
            }
            destroy() {
                this.$labels.removeEventListener("click", this.labelClickHandler), this.chart.destroy(), this.slider.destroy(), document.body.classList.remove("tg-chart-preload"), (this.$el.innerHTML = "");
            }
        }
        i(2);
        let L = [
            new M({ el: document.getElementById("chart1"), width: widthWindow, height: 200, data: a(s[0]), theme: b.day, animationSpeed: 20 }),
        ];
        // document.querySelector("#theme-switch").addEventListener("click", (e) => {
        //     e.preventDefault();
        //     const t = e.target.dataset.theme;
        //     document.body.classList.toggle("tg-night"),
        //         (e.target.textContent = "night" === t ? "Switch to Day Mode" : "Switch to Night Mode"),
        //         e.target.setAttribute("data-theme", "night" === t ? "day" : "night");
        //         L.forEach((e) => e.setTheme(b[t]));
        // });
    },
]);
