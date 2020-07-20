// Copyright 2019 Denis Olshin

// Detecting browsers
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || (typeof safari !== 'undefined' && safari.pushNotification)) || navigator.userAgent.indexOf('Safari') != -1;
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

var dp = window.devicePixelRatio;
// TODO: maybe decrease dp on weaker devices (chart will be blurry, but more performant)
/*if (dp > 1) {
  dp = Math.max(1, dp * 0.85);
}*/

var WEEKDAYS = ['Вск', 'Mon', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'];
var WEEKDAYS_FULL = ['Воскресенье', 'Monday', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAY = 24 * 60 * 60 * 1000;

var TZ = 0;// -1 * 60 * 60 * 1000;

var hasTouchSupport = 'ontouchstart' in document.documentElement;

var transform = (function(){
    var testEl = document.createElement('div');
    if (testEl.style.transform == null) {
        var vendors = ['Webkit', 'Moz', 'ms'];
        for (var vendor in vendors) {
            if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                return vendors[vendor] + 'Transform';
            }
        }
    }
    return 'transform';
})();

function formatDate(date, format) {
    var i, result = [];
    date = new Date(date - TZ);
    for (i = 0; i < format.length; i++) {
        switch (format[i]) {
            case 'YYYY':  result.push(date.getUTCFullYear()); break;
            case 'MMM':   result.push(MONTHS[date.getUTCMonth()]); break;
            case 'MMMM':  result.push(MONTHS_FULL[date.getUTCMonth()]); break;
            case 'ddd':   result.push(WEEKDAYS[date.getUTCDay()]); break;
            case 'dddd':  result.push(WEEKDAYS_FULL[date.getUTCDay()]); break;
            case 'D':     result.push(date.getUTCDate()); break;
            case 'HH':    result.push(date.getUTCHours() < 10 ? '0' : '', date.getUTCHours()); break;
            case 'mm':    result.push(date.getUTCMinutes() < 10 ? '0' : '', date.getUTCMinutes()); break;
            default:      result.push(format[i]);
            break;
        }
    }
    return result.join('');
}

function formatNumber(n, shorten) {
    if (shorten) {
        if (n >= 1000000) {
            // Allow 1 decimal digit max
            return Math.floor(n / 100000) / 10 + 'M';
        }
        if (n >= 1000) {
            return Math.floor(n / 100) / 10 + 'K';
        }
        if (n > 0.1) {
            return Math.floor(n * 10) / 10;
        }
    }
    return n === undefined ? '' : n.toLocaleString();
}


function numberOrder(n) {
    if (Math.abs(n) < 1e-5) {
        return 0.00001;
    }
    return Math.pow(10, Math.floor(Math.log(Math.abs(n)) * Math.LOG10E));
}

function transformData(data) {
    var xs, series = [], type;
    for (k in data.types) {
        for (j = 0; j < data.columns.length; j++) {
            if (data.columns[j][0] == k) {
                pts = data.columns[j].slice(1);
            }
        }

        if (data.types[k] == 'x') {
            xs = pts;
        } else
        if (['line', 'bar', 'area'].indexOf(data.types[k]) > -1) {
            series.push({
                isActive: true,
                pts: pts,
                name: data.names[k],
                type: data.types[k],
                color: data.colors[k],
            });

            type = data.types[k];
        } else {
            throw new Error('Unsupported series type: "' + data.types[k] + '"');
        }
    }

    return {
        xs: xs, series: series, type: type
    }
}

function ease(t) {
    var sq = t * t;
    //return sq * (-sq * t + 5 * sq - 9 * t + 6);
    return sq * (-4 * sq * t + 14 * sq - 18 * t + 9);
}

// Same as ease(t), but w/o slow start
function easeOut(t) {
    var sq = t * t;
    return sq * (-1.75 * sq * t + 5 * sq - 4.5 * t) + 2.25 * t;
}

function linear(t) {
    return t;
}

function overshoot(t) {
    var sq = t * t;
    return (-0.45 * sq * sq - 0.3 * sq * t + 0.1 * sq + 1.65) * t;
    //return (0.5 * sq * sq + sq * t - 7 * sq + 6 * t + 0.5) * t;
}

function angleDist(a0, a1) {
    var max = Math.PI * 2, da = (a1 - a0) % max;
    return 2 * da % max - da;
}

function angleLerp(a0, a1, t) {
    return a0 + angleDist(a0, a1) * t;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y,   x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x,   y+h, r);
    ctx.arcTo(x,   y+h, x,   y,   r);
    ctx.arcTo(x,   y,   x+w, y,   r);
}

// Utility functions
function createEl(parent, name, tag) {
    var el;
    el = document.createElement(tag || 'div');
    el.className = 'a-chart__' + name;
    parent.appendChild(el);
    return el;
}

function getElementData(el, name) {
    if ('dataset' in el) {
        if (name in el.dataset) {
            return el.dataset[name];
        } else {
            return null;
        }
    }

    if (el.hasAttribute('data-' + name)) {
        return el.getAttribute('data-' + name);
    } else {
        return null;
    }
}

function setElementData(el, name, value) {
    if ('dataset' in el) {
        el.dataset[name] = value;
    } else {
        el.setAttribute('data-' + name, value);
    }
}

function createDraggableBehavior(chart, el, handler, endHandler, attachToWrapper, hover) {
    var startX, startT, oldMinX, oldMaxX, drag;
    function onDragStart(e) {
        if (!attachToWrapper || e.target === el) {
            var touch = e.touches ? e.touches[0] : e;
            startX = touch.pageX;
            startT = (new Date()).getTime();
            oldMinX = chart.getTarget('minX');
            oldMaxX = chart.getTarget('maxX');
            drag = hover && (e.type == 'mousedown');

            document.body.addEventListener(e.touches ? 'touchmove' : 'mousemove', onDrag, false);
            document.body.addEventListener(e.touches ? 'touchend' : 'mouseup', onDragEnd, false);
            onDrag(e);

            if (attachToWrapper) {
                e.preventDefault && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                return false;
            }
        }
    }

    function onDrag(e) {
        var touch = e.touches ? e.touches[0] : e;
        handler(e, touch.pageX - startX, {
            minX: oldMinX,
            maxX: oldMaxX,
        }, drag);
    }

    function onDragEnd(e) {
        var touch = e.changedTouches ? e.changedTouches[0] : e;
        endHandler && endHandler(e, drag, touch.pageX - startX, (new Date()).getTime() - startT);
        if (drag) {
            drag = false;
        } else
        if (hasTouchSupport) {
            document.body.removeEventListener('touchmove', onDrag, false);
            document.body.removeEventListener('touchend', onDragEnd, false);
        } else {
            document.body.removeEventListener('mousemove', onDrag, false);
            document.body.removeEventListener('mouseup', onDragEnd, false);
        }
    }

    if (attachToWrapper) {
        if (hasTouchSupport) {
            chart.wrapperEl.addEventListener('touchstart', onDragStart, false);
        } else {
            chart.wrapperEl.addEventListener('mousedown', onDragStart, false);
        }
    } else {
        if (hasTouchSupport) {
            el.addEventListener('touchstart', onDragStart, false);
        } else {
            el.addEventListener('mousedown', onDragStart, false);
            if (hover) {
                el.addEventListener('mouseenter', onDragStart, false);
                el.addEventListener('mouseleave', onDragEnd, false);
            }
        }
    }
}

function AChart(wrapperId, data, options) {
    // Constants
    options = options || {};

    this.DEBUG_INFO = options.debugInfo;
    this.DEBUG_ANIMATIONS = options.debugAnimations;
    this.SLOW_TRANSITIONS = options.slowTransitions;
    this.FORCE_SLOW_DEVICE = options.forceSlowDevice;

    this.MIN_WINDOW_SIZE = options.minWindowWidth || 200; // px
    this.MIN_DAY_SIZE = options.minDayWidth || 200; // px
    this.SIDE_PADDING = options.sidePadding || 18; // px
    this.ANIMATION_DURATION = 300; // ms, only relates to canvas animations
    this.ZOOM_DURATION = this.SLOW_TRANSITIONS ? 5000 : 500;
    this.FROM_ZERO = !!options.fromZero;
    this.title = options.title;
    this.theme = options.theme;

    // Build base DOM structure
    this.wrapperEl = document.getElementById(wrapperId);
    this.wrapperEl.classList.add('a-chart');
    this.headerEl = createEl(this.wrapperEl, 'header');
    this.titleEl = createEl(this.headerEl, 'title');
    this.titleEl.innerText = this.title;

    this.zoomOutEl = createEl(this.headerEl, 'zoom-out');
    this.zoomOutEl.innerText = 'Zoom Out';
    this.zoomOutEl.addEventListener('click', this.zoom.bind(this, false));

    this.currentDateEl = createEl(this.headerEl, 'date is-current');
    this.currentDateEl.addEventListener('transitionend', function() {
        this.currentDateEl.classList.remove('is-updating');
        this.currentDateEl.innerHTML = this.nextDate;
    }.bind(this));
    this.nextDateEl = createEl(this.headerEl, 'date is-next');

    this.viewEl = createEl(this.wrapperEl, 'view');

    if (typeof data === 'string') {
        this.loadDay = function(dt, cb) {
            var date, m, d;
            clearTimeout(this.debounceTimeout);
            if (this.preloading.state === 'done') {
                if (this.preloading.date === dt) {
                    cb && cb.call(this, this.preloading.data);
                    return
                }
            } else
            if (this.preloading.state === 'loading') {
                if (this.preloading.date === dt) {
                    cb && (this.preloading.cb = cb);
                    return
                } else {
                    this.preloading.xhr.abort();
                }
            }
            date = new Date(dt);
            m = date.getMonth() + 1;
            d = date.getDate();

            this.preloading.state = 'loading';
            this.preloading.date = dt;
            this.preloading.cb = cb;
            this.preloading.xhr = this.load(data + '/' +
                date.getFullYear() + '-' +
                (m < 10 ? '0' : '') + m + '/' +
                (d < 10 ? '0' : '') + d + '.json', function(data) {
                if (this.preloading.date === dt) {
                    this.preloading.state = 'done';
                    this.preloading.data = data;
                    this.preloading.cb && this.preloading.cb.call(this, data);
                }
            }.bind(this));
        }
        this.load(data + '/overview.json', this.init.bind(this));
    } else {
        this.init(data);
    }
}

AChart.prototype.init = function(data) {
    var i, j, k, pts, label, icon, min, max, initialTime = Date.now();

    this.Y_SCALED = !!data.y_scaled;
    this.PERCENTAGE = !!data.percentage;
    this.STACKED = !!data.stacked;

    this.animations = {};

    // Convert input data to more usable format
    data = transformData(data);
    this.series = data.series;
    this.xs = data.xs;
    this.type = data.type;
    this.wrapperEl.classList.add('is-' + this.type);

    this.preloading = {
        state: 'idle',
        date: null,
        data: null,
        cb: null,
        xhr: null,
    };

    if (this.Y_SCALED) {
        this.updateRightScale();
    }

    // Event handlers
    this.onLegendLabelPress = function(index, e) {
        var series = this.zseries || this.series, i, all;
        this.selectionIndex = null;
        this.selectionSeriesIndex = null;
        if (series[index].clickProcessing) {
            return;
        }
        series[index].clickProcessing = true;
        series[index].clickDismissed = false;
        this.longpressTouch = e.touches && e.touches[0] || e;
        this.longpressTimeout = setTimeout(function() {
            all = true;
            for (i = 0; i < series.length; i++) {
                if (series[i].isActive != (i === index)) {
                    series[i].isActive = (i === index);
                    all = false;
                }
            }
            if (all) {
                for (i = 0; i < series.length; i++) {
                    series[i].isActive = true;
                }
            }
            series[index].clickDismissed = true;
            series[index].clickProcessing = false;
            this.updateLayout();
        }.bind(this), 500);

    }
    this.onLegendLabelMove = function(index, e) {
        var series = this.zseries || this.series,
            initialTouch = this.longpressTouch,
            currentTouch = e.touches && e.touches[0] || e;
        if (!initialTouch || !currentTouch) {
            return;
        }
        if ((initialTouch.pageX - currentTouch.pageX) * (initialTouch.pageX - currentTouch.pageX) +
            (initialTouch.pageY - currentTouch.pageY) * (initialTouch.pageY - currentTouch.pageY) > 3 * 3) {
            clearTimeout(this.longpressTimeout);
            series[index].clickDismissed = true;
            series[index].clickProcessing = false;
        }
    }
    this.onLegendLabelToggle = function(index, e) {
        var series = this.zseries || this.series;
        if (series[index].clickDismissed) {
            return;
        }
        series[index].clickProcessing = false;
        clearTimeout(this.longpressTimeout);
        series[index].isActive = !series[index].isActive;
        this.updateLayout();
    }

    this.tick = function() {
        var k, t, i, anim, animating, completed = [], drop = [], result, renderCancelled;
        for (k in this.animations) {
            anim = this.animations[k];
            if (!anim.active) {
                continue;
            }
            if (this.DEBUG_ANIMATIONS) {
                // Each animation is executed in 10 ticks, with no attachment to time
                t = anim.time > 0 ? 0.1 : -anim.time;
                anim.time = -(t + 0.1);
            } else {
                t = (Date.now() - anim.time) / anim.duration;
            }
            if (t >= 1) {
                this[k] = anim.target;
                completed.push(k);
            } else {
                animating = true;
                t = anim.easing(t);
                if (Array.isArray(anim.target)) {
                    for (i = 0; i < anim.target.length; i++) {
                        this[k][i] = anim.source[i] * (1 - t) + anim.target[i] * t;
                    }
                } else {
                    this[k] = anim.source * (1 - t) + anim.target * t;
                }
            }
        }


        for (i = 0; i < completed.length; i++) {
            if (this.animations[completed[i]].cb) {
                result = this.animations[completed[i]].cb();
                if (result === 'drop') {
                    drop.push(completed[i]);
                } else
                if (result === false) {
                    renderCancelled = true;
                }
            }
        }

        if (!renderCancelled) {
            this.render(this.renderView, this.renderOverview, !animating);
        }
        delete this.renderView;
        delete this.renderOverview;
        for (i = 0; i < completed.length; i++) {
            this.animations[completed[i]].active = false;
        }
        for (i = 0; i < drop.length; i++) {
            delete this.animations[drop[i]];
            delete this[drop[i]];
        }

        this.animationFrames++;
        if (animating) {
            this.animationRequestId = requestAnimationFrame(this.tick);
        } else {
            if (this.DEBUG_INFO) {
                notifyFPS(this.title, (new Date()).getTime() - this.animationStartedAt, this.animationFrames * 1000 / ((new Date()).getTime() - this.animationStartedAt));
            }
            delete this.animationRequestId;
        }
    }.bind(this);

    if (this.type !== 'line') {
        this.FROM_ZERO = true;
    }
    this.set('gminX', this.xs[0]);
    this.set('gmaxX', this.xs[this.xs.length - 1]);
    this.set('minX', this.gmaxX - 90 * DAY);
    this.set('maxX', this.gmaxX);
    this.selectionIndex = null;
    this.selectionSeriesIndex = null;
    this.dt = (this.gmaxX - this.gminX) / (this.xs.length - 1); // avg interval (should be constant, actually)

    this._x = new Array(this.xs.length); // buffers
    this._y0 = new Array(this.xs.length);
    this._y1 = new Array(this.xs.length);
    this._p = new Array(this.xs.length); // for percentage scaling
    for (i = 0; i < this.xs.length; i++) {
        this._p[i] = 1;
    }

    this.set('zooming', 0);

    createDraggableBehavior(this, this.viewEl, function(e, delta, old, drag) {
        var i, touch, x, y, r2, xs = this.zxs || this.xs, dt = this.zdt || this.dt, alpha, rect, sector, oldIndex;
        if ((this.zooming > 0 || this.zoomed) && this.zooming < 1) {
            return;
        }

        touch = e.touches ? e.touches[0] : e;
        if (this.PERCENTAGE && this.zooming > 0) {
            rect = this.viewEl.getBoundingClientRect();
            x = (touch.pageX - rect.left - window.pageXOffset) - this.fW * 0.5;
            y = (touch.pageY - rect.top - window.pageYOffset - 30) - (this.H - 30) * 0.5;
            r2 = x * x + y * y;
            alpha = Math.atan2(y, x) + 2.4;
            if (alpha < 0) {
                alpha += 2 * Math.PI;
            }

            this.selectionSeriesIndex = null;

            for (i = 0; i < this.series.length; i++) {
                sector = this.series[i].sector;
                if (sector && sector.a0 < alpha && sector.a1 > alpha && r2 <= (sector.r + 8) * (sector.r + 8)) {
                    this.selectionSeriesIndex = i;
                    break;
                }
            }

            this.updateLayout(true);
            return;
        }

        if (drag && this.zooming == 0) {
            delta = -delta / this.scaleX();
            delta = Math.max(delta, this.gminX - old.minX);
            delta = Math.min(delta, this.gmaxX - old.maxX);
            this.minX = old.minX + delta;
            this.maxX = old.maxX + delta;
            //this.selectionIndex = null;
            for (i = 0; i < this.selectionBubbleEls.length; i++) {
                this.selectionBubbleEls[i].classList.add('is-animated');
            }
            this.updateLayout(true);
            return;
        }

        x = this.minX + (touch.pageX - this.viewEl.getBoundingClientRect().left - window.pageXOffset - this.SIDE_PADDING) / this.scaleX();
        if (this.type === 'bar') {
            x -= dt / 2;
        }
        oldIndex = this.selectionIndex;
        this.selectionIndex = 0;
        for (i = 1; i < xs.length; i++) {
            if (xs[i] < this.minX - dt / 2 || xs[i] > this.maxX + dt / 2) {
                continue;
            }
            if (Math.abs(xs[i] - x) < Math.abs(xs[this.selectionIndex] - x)) {
                this.selectionIndex = i;
            }
        }
        if (this.selectionIndex === oldIndex) {
            return;
        }

        if (this.zooming == 0 && !this.PERCENTAGE) {
            this.preloadDay(xs[this.selectionIndex]);
        }

        for (i = 0; i < this.selectionBubbleEls.length; i++) {
            this.selectionBubbleEls[i].classList.remove('is-animated');
        }
        this.updateSelection(true);
    }.bind(this), function(e, drag, delta, t) {
        for (var i = 0; i < this.selectionBubbleEls.length; i++) {
            this.selectionBubbleEls[i].classList.toggle('is-animated', !drag);
        }
        if (t < 400 && Math.abs(delta) < 10 && drag && this.zooming == 0 && !hasTouchSupport) {
            // this.zoom(true);
        } else
        if (!e.touches && !drag) {
            this.selectionIndex = null;
            this.updateSelection(true);
        }
    }.bind(this), false, true);
    document.body.addEventListener('touchstart', function(e) {
        if (this.selectionIndex === null && this.selectionSeriesIndex === null) {
            return;
        }
        var el = e.target;
        while (el !== document.body) {
            if (el === this.wrapperEl) {
                return;
            }
            el = el.parentNode;
        }

        this.selectionIndex = null;
        this.selectionSeriesIndex = null;
        this.updateLayout(this.type === 'bar');
    }.bind(this), true);

    this.viewCanvas = createEl(this.viewEl, 'view-canvas', 'canvas');
    this.viewCanvas.style[transform] = 'scale(' + (1 / dp) + ')';
    this.viewCtx = this.viewCanvas.getContext('2d');

    this.viewMaskLeftEl = createEl(this.viewEl, 'view-mask is-left');
    this.viewMaskRightEl = createEl(this.viewEl, 'view-mask is-right');

    this.yLines = [];
    this.topOverlayEl = createEl(this.viewEl, 'top-overlay');

    this.selectionLineEl = createEl(this.viewEl, 'selection-line');
    this.selectionBubbleEls = [];
    this.updateSelectionBubbles();
    this.selectionBoxEl = createEl(this.viewEl, 'selection-box');
    // this.selectionBoxEl.addEventListener(hasTouchSupport ? 'touchstart' : 'mousedown', function(e) {
    //     this.zoom(true);
    //     e.stopPropagation();
    // }.bind(this), true);
    /*
    this.selectionBoxEl.addEventListener('mousemove', function(e) {
      if (!this.zoomed) {
        // This is to allow catching selection box with mouse
        e.stopPropagation();
      }
    }.bind(this), false);
    */

    this.selectionBoxHeaderEl = createEl(this.selectionBoxEl, 'selection-box-header');
    this.selectionBoxTitleEl = createEl(this.selectionBoxHeaderEl, 'selection-box-title');
    this.selectionBoxArrowEl = createEl(this.selectionBoxHeaderEl, 'selection-box-arrow');

    this.selectionBoxRows = [];
    this.updateSelectionBoxRows();

    this.xAxisEl = createEl(this.wrapperEl, 'x-axis');
    this.xLabels = [];

    this.overviewEl = createEl(this.wrapperEl, 'overview');
    this.overviewCanvas = createEl(this.overviewEl, 'overview-canvas', 'canvas');
    this.overviewCanvas.style[transform] = 'scale(' + (1 / dp) + ')';
    this.overviewCtx = this.overviewCanvas.getContext('2d');

    this.overviewMaskLeftEl = createEl(this.overviewEl, 'overview-mask is-left');
    this.overviewMaskRightEl = createEl(this.overviewEl, 'overview-mask is-right');
    this.overviewWindowEl = createEl(this.overviewEl, 'overview-window');
    createDraggableBehavior(this, this.overviewWindowEl, function(e, delta, old) {
        if (this.zooming > 0 && this.zooming < 1) {
            return;
        }
        delta = delta / this.gscaleX();
        delta = Math.max(delta, this.gminX - old.minX);
        delta = Math.min(delta, this.gmaxX - old.maxX);
        if (this.zooming > 0) {
            delta = Math.round(delta / DAY) * DAY;
        }
        if (this.zooming > 0) {
            this.animate('minX', old.minX + delta);
            this.animate('maxX', old.maxX + delta);
        } else {
            this.minX = old.minX + delta;
            this.maxX = old.maxX + delta;
        }
        this.selectionIndex = null;
        this.updateLayout(true);
    }.bind(this), false, true);
    this.overviewHandleLeftEl = createEl(this.overviewWindowEl, 'overview-handle is-left');
    createDraggableBehavior(this, this.overviewHandleLeftEl, function(e, delta, old) {
        if (this.zooming > 0 && this.zooming < 1) {
            return;
        }
        delta = delta / this.gscaleX();
        if (this.zooming > 0) {
            delta = Math.round(delta / DAY) * DAY;
        }
        if (this.zooming > 0) {
            this.animate('minX', Math.min(Math.max(this.gminX, old.minX + delta), this.getTarget('maxX') - DAY));
        } else {
            this.minX = Math.max(this.gminX, old.minX + delta);
            this.minX = Math.min(this.minX, this.maxX - this.MIN_WINDOW_SIZE / this.gscaleX());
        }

        this.selectionIndex = null;
        this.updateLayout(true);
    }.bind(this), false, true);
    this.overviewHandleRightEl = createEl(this.overviewWindowEl, 'overview-handle is-right');
    createDraggableBehavior(this, this.overviewHandleRightEl, function(e, delta, old) {
        if (this.zooming > 0 && this.zooming < 1) {
            return;
        }
        delta = delta / this.gscaleX();
        if (this.zooming > 0) {
            delta = Math.round(delta / DAY) * DAY;
        }
        if (this.zooming > 0) {
            this.animate('maxX', Math.min(Math.max(this.getTarget('minX') + DAY, old.maxX + delta), this.gmaxX));
        } else {
            this.maxX = Math.max(this.minX + this.MIN_WINDOW_SIZE / this.gscaleX(), old.maxX + delta);
            this.maxX = Math.min(this.maxX, this.gmaxX);
        }

        this.selectionIndex = null;
        this.updateLayout(true);
    }.bind(this), false, true);
    createDraggableBehavior(this, this.overviewCanvas, function(e, delta) {
        if (this.zooming > 0 && this.zooming < 1) {
            return;
        }
        var touch = e.touches ? e.touches[0] : e,
            sz = Math.max(Math.abs(delta), this.MIN_WINDOW_SIZE) / this.gscaleX(),
            x0 = touch.pageX - this.overviewEl.getBoundingClientRect().left - window.pageXOffset, x1, x2,
            mid = this.gminX + (x0 - delta / 2) / this.gscaleX();
        mid = Math.max(this.gminX + this.MIN_WINDOW_SIZE / this.gscaleX() / 2, mid);
        mid = Math.min(this.gmaxX - this.MIN_WINDOW_SIZE / this.gscaleX() / 2, mid);
        if (this.zooming > 0) {
            if (delta > 0) {
                x1 = this.gminX + (x0 - delta) / this.gscaleX();
                x2 = this.gminX + x0 / this.gscaleX();
            } else {
                x1 = this.gminX + x0 / this.gscaleX();
                x2 = this.gminX + (x0 - delta) / this.gscaleX();
            }
            x1 = Math.max(this.gminX, x1);
            x2 = Math.min(x2, this.gmaxX);
            x1 = Math.floor((x1 - TZ) / DAY) * DAY + TZ;
            x2 = Math.ceil((x2 - TZ) / DAY) * DAY + TZ;
            this.animate('minX', x1);
            this.animate('maxX', x2);
        } else {
            this.minX = Math.max(this.gminX, mid - sz / 2);
            this.maxX = Math.min(mid + sz / 2, this.gmaxX);
        }
        this.selectionIndex = null;
        this.updateLayout(true);
    }.bind(this));
    this.overviewWindowEl.addEventListener('dblclick', function(e) {
        if (this.zooming > 0 && this.zooming < 1 || hasTouchSupport) {
            return;
        }
        if (Math.abs(this.minX - this.gminX) < 1e-7 && Math.abs(this.maxX - this.gmaxX) < 1e-7) {
            var mid = this.gminX + (e.pageX - this.overviewEl.getBoundingClientRect().left - window.pageXOffset) / this.gscaleX();
            mid = Math.max(this.gminX + this.MIN_WINDOW_SIZE / this.gscaleX() / 2, mid);
            mid = Math.min(this.gmaxX - this.MIN_WINDOW_SIZE / this.gscaleX() / 2, mid);
            if (this.zooming > 0) {
                mid = Math.floor((mid - TZ) / DAY) * DAY + TZ;
                this.animate('minX', mid);
                this.animate('maxX', mid + DAY);
            } else {
                this.minX = mid - this.MIN_WINDOW_SIZE / this.gscaleX() / 2;
                this.maxX = mid + this.MIN_WINDOW_SIZE / this.gscaleX() / 2;
            }
        } else {
            this.minX = this.gminX;
            this.maxX = this.gmaxX;
        }
        this.selectionIndex = null;
        this.updateLayout(true);
    }.bind(this), false);
    this.overviewEl.addEventListener('wheel', function(e) {
        if (!e.ctrlKey) {
            // To allow scrolling
            return;
        }
        if (this.zooming > 0 && this.zooming < 1) {
            return;
        }

        if (this.zooming > 0) {
            if (e.deltaY < 0) {
                this.animate('minX', Math.max(this.getTarget('minX') - DAY, this.gminX));
                this.animate('maxX', Math.min(this.getTarget('maxX') + DAY, this.gmaxX));
            } else
            if (this.getTarget('maxX') - this.getTarget('minX') > DAY) {
                if (this.getTarget('maxX') - this.getTarget('minX') > 2 * DAY) {
                    this.animate('minX', Math.max(this.getTarget('minX') + DAY, this.gminX));
                }
                this.animate('maxX', Math.min(this.getTarget('maxX') - DAY, this.gmaxX));
            }
            e.preventDefault();
            this.updateLayout(true);
            return;
        }

        var pos = 0.5, mid = (this.minX + this.maxX) / 2,
            x = this.gminX + (e.pageX - this.overviewEl.getBoundingClientRect().left - window.pageXOffset) / this.gscaleX(),
            sz = this.maxX - this.minX;
        if (x >= this.minX && x <= this.maxX) {
            pos = (x - this.gminX) / (this.gmaxX - this.gminX);
            mid = x;
        }
        sz = Math.max(sz - e.deltaY / this.gscaleX(), this.MIN_WINDOW_SIZE / this.gscaleX());
        if (mid - sz * (1 - pos) <= this.gminX) {
            this.minX = this.gminX;
            this.maxX = Math.min(this.minX + sz, this.gmaxX);
        } else
        if (mid + sz * pos >= this.gmaxX) {
            this.maxX = this.gmaxX;
            this.minX = Math.max(this.maxX - sz, this.gminX);
        } else {
            this.minX = mid - sz * (1 - pos);
            this.maxX = mid + sz * pos;
        }
        e.preventDefault();
        this.updateLayout(true);
    }.bind(this), false);
    this.overviewEl.addEventListener('mousemove', function() {
        if (this.zooming > 0 && this.selectionSeriesIndex !== null) {
            this.selectionSeriesIndex = null;
            this.updateLayout(true);
        }
    }.bind(this), false);

    this.legendEl = createEl(this.wrapperEl, 'legend');
    this.legendLabelEls = [];
    this.updateLegend();

    this.noDataEl = createEl(this.viewEl, 'no-data');
    this.noDataEl.innerText = 'No data';

    this.updateLayout(true, true);

    setTimeout(function() {
        this.wrapperEl.classList.add('is-animated');
    }.bind(this), 0);

    window.addEventListener('resize', this.updateLayout.bind(this, true, true), true);

    if (Date.now() - initialTime > 36 || this.FORCE_SLOW_DEVICE) {
        // 30ms per tick will give ~33 fps, which is too low
        // We can perform certain level of render quality degradation to provide better performance
        this.SLOW_DEVICE = true;
        this.viewEl.removeChild(this.topOverlayEl);
        this.selectionBoxEl.style.boxShadow = 'none';
        document.body.classList.add('is-slow');

        if (this.DEBUG_INFO) {
            console.warn('Slow device detected');
        }
    }
    //window.initTimes.push(this.title + ': ' + (Date.now() - initialTime) + 'ms');
    //document.getElementById('debug').innerText = initTimes.join(', ');

    this.initialized = true;
}

AChart.prototype.scaleX = function(target) {
    var dt = this.zdt || this.dt;
    if (target) {
        return this.W / (this.getTarget('maxX') - this.getTarget('minX') + (this.type == 'bar' ? dt : 0));
    }
    return this.W / (this.maxX - this.minX + (this.type == 'bar' ? dt : 0));
}

AChart.prototype.gscaleX = function(target) {
    var dt = this.zdt || this.dt;
    if (target) {
        return this.W / (this.getTarget('gmaxX') - this.getTarget('gminX') + (this.type == 'bar' ? dt : 0));
    }
    return this.W / (this.gmaxX - this.gminX + (this.type == 'bar' ? dt : 0));
}

AChart.prototype.updateLayout = function(renderView, renderOverview, zoomTransition) {
    var fW = this.viewEl.offsetWidth,
        W = fW - this.SIDE_PADDING * 2,
        H = this.viewEl.offsetHeight,
        oH = this.overviewEl.offsetHeight - 4,
        minX = this.getTarget('minX'), maxX = this.getTarget('maxX'),
        gminX = this.getTarget('gminX'), gmaxX = this.getTarget('gmaxX'),
        minY = Infinity, gminY = Infinity, maxY = -Infinity, gmaxY = -Infinity,
        _xs = this.zxs || this.xs, _series = this.zseries || this.series,
        firstX = null, noData = true, i, j, x, y, k, l, pair,
        order, scaleX, gscaleX, scaleY, gscaleY, series,
        add, line, updateLine, updateLabel,
        stepX, stepY, day, label, highest, windowL, windowR, total,
        minDate, maxDate, date,
        dt = this.zdt || this.dt, pool, fromPool;

    if (W != this.W || H != this.H) {
        this.viewCanvas.width = fW * dp;
        this.viewCanvas.height = (H + 35) * dp;
    }

    if (W != this.W || oH != this.oH) {
        this.overviewCanvas.width = W * dp;
        this.overviewCanvas.height = oH * dp;
    }

    this.W = W;
    this.fW = fW;
    this.H = H;
    this.oH = oH;
    scaleX = this.scaleX(true);
    gscaleX = this.gscaleX(true);

    if (!this.zoomed && this.zooming > 0) {
        minX = this.unzoomed.minX;
        maxX = this.unzoomed.maxX;
        _xs = this.xs;
        _series = this.series;
    }

    for (j = 0; j < _xs.length; j++) {
        this._y0[j] = 0;
    }
    if (this.PERCENTAGE) {
        for (j = 0; j < _xs.length; j++) {
            total = 0;
            for (i = 0; i < _series.length; i++) {
                if (_series[i].isActive) {
                    total += _series[i].pts[j];
                }
            }
            this._p[j] = total > 1e-9 ? 100 / total : 0;
        }
        this.animate('percentage-scale', this._p);
    }
    for (i = 0; i < _series.length; i++) {
        series = _series[i];
        series.sum = 0;
        series.n = 0;
        if (series.isActive) {
            k = this.Y_SCALED && i == 1 ? this.rightScale : 1;
            l = this.Y_SCALED && i == 1 ? this.rightOffs : 0;
            for (j = 0; j < _xs.length; j++) {
                y = (this._y0[j] + series.pts[j]) * k - l;
                if (minX <= _xs[j] && _xs[j] <= maxX) {
                    noData = false;
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    series.sum += series.pts[j];
                    series.n++;
                    if (firstX === null) {
                        firstX = _xs[j];
                    }
                }
                gminY = Math.min(gminY, y);
                gmaxY = Math.max(gmaxY, y);
                if (this.STACKED) {
                    this._y0[j] += series.pts[j];
                }
            }
        }
        if (this.PERCENTAGE && this.zooming > 0) {
            this.animate('series' + i + '-average', series.n ? series.sum / series.n : 0);
        } else {
            this.set('series' + i + '-average', series.n ? series.sum / series.n : 0);
        }
    }

    this.noData = noData;
    this.noDataEl.style.display = noData ? 'block' : 'none';

    if (this.PERCENTAGE) {
        gmaxY = maxY = 100;
    } else {
        order = numberOrder(maxY) / 2;
        minY = Math.floor(minY / order) * order;
        maxY = Math.ceil(maxY / order) * order;
    }
    if (this.FROM_ZERO || this.PERCENTAGE) {
        gminY = minY = 0;
    }

    if (!this.zoomed && this.zooming > 0) {
        //minX = this.unzoomed.minX;
        //maxX = this.unzoomed.maxX;
        minY = this.unzoomed.minY;
        maxY = this.unzoomed.maxY;
        gminY = this.unzoomed.gminY;
        gmaxY = this.unzoomed.gmaxY;
        rightScale = this.unzoomed.rightScale;
        rightOffs = this.unzoomed.rightOffs;
    }

    stepY = (maxY - minY) / 5;
    scaleY = (H - 30) / (maxY - minY);
    gscaleY = (oH - 4) / (gmaxY - gminY);

    // Update horizontal grid lines & labels
    add = {};
    pool = [];
    if (!noData && !(this.PERCENTAGE && this.zoomed)) {
        for (i = 0; i <= 5; i++) {
            add[minY + stepY * i] = true;
        }
    }

    for (i = 0; i < this.yLines.length; i++) {
        line = this.yLines[i];
        if (add[line.y]) {
            this.animate('grid-y' + line.y + '-opacity', 1);
            delete add[line.y];
        } else {
            this.animate('grid-y' + line.y + '-opacity', 0, false, function(y) {
                for (var i = 0; i < this.yLines.length; i++) {
                    if (this.yLines[i].y == y) {
                        this.yLines.splice(i, 1);
                        return 'drop';
                    }
                }
            }.bind(this, line.y));
        }
    }

    for (y in add) {
        line = {
            y: parseFloat(y),
            labelLeft: formatNumber(y, true),
            labelRight: null,
        };
        if (this.Y_SCALED) {
            line.labelRight = formatNumber((parseFloat(y) + this.rightOffs) / this.rightScale, true);
        }
        this.yLines.push(line);
        this.set('grid-y' + line.y + '-opacity', 0);
        this.animate('grid-y' + line.y + '-opacity', 1);
    }

    // Update horizontal axis labels
    if (this.zoomed) {
        for (i = 0; i < 7; i++) {
            stepX = 1000 * 60 * 60 * [1, 2, 3, 4, 6, 12, 24][i]; // we want marks to be day-aligned
            if (stepX * scaleX >= this.MIN_DAY_SIZE) {
                break;
            }
        }
    } else {
        stepX = DAY;
        while (stepX * scaleX < this.MIN_DAY_SIZE) {
            stepX *= 2;
        }
    }
    day = Math.floor(firstX / stepX) * stepX + TZ;
    if (stepX == DAY && this.zoomed) {
        day += DAY / 2;
    }

    add = {};
    pool = [];
    if (!noData && !(this.PERCENTAGE && this.zoomed)) {
        while ((day - minX - stepX) * scaleX < W && day <= gmaxX + 1000 * 60 * 60) {
            if (day >= gminX) {
                add[day] = stepX < DAY ? 'h' : 'd';
            }
            day += stepX;
        }
    }

    for (i = 0; i < this.xLabels.length; i++) {
        label = this.xLabels[i];
        if (add[label.x]) {
            label.fmt = add[label.x];
            label.label = formatDate(label.x, add[label.x] == 'h' ? ['HH', ':', 'mm'] : ['D', ' ', 'MMM']);
            this.animate('grid-x' + label.x + '-opacity', 1, (this.zooming > 0 && this.zooming < 1) ? this.ZOOM_DURATION : false);
            delete add[label.x];
        } else {
            this.animate('grid-x' + label.x + '-opacity', 0, (this.zooming > 0 && this.zooming < 1) ? this.ZOOM_DURATION : false, function(x) {
                for (var i = 0; i < this.xLabels.length; i++) {
                    if (this.xLabels[i].x == x) {
                        this.xLabels.splice(i, 1);
                        return 'drop';
                    }
                }
            }.bind(this, label.x));
        }
    }

    for (x in add) {
        label = {
            x: parseFloat(x),
            fmt: add[x],
            label: formatDate(parseFloat(x), add[x] == 'h' ? ['HH', ':', 'mm'] : ['D', ' ', 'MMM']),
        };
        this.xLabels.push(label);

        if (this.initialized) {
            this.set('grid-x' + label.x + '-opacity', 0);
            this.animate('grid-x' + label.x + '-opacity', 1, (this.zooming > 0 && this.zooming < 1) ? this.ZOOM_DURATION : false);
        } else {
            this.set('grid-x' + label.x + '-opacity', 1);
        }
    }

    // Update date
    minDate = formatDate(minX, ['D', '&nbsp;', W < 300 ? 'MMM' : 'MMMM', '&nbsp;', 'YYYY']);
    maxDate = formatDate(maxX - (this.zoomed ? 1000 : 0), ['D', '&nbsp;', W < 300 ? 'MMM' : 'MMMM', '&nbsp;', 'YYYY']);
    this.singleDay = (minDate === maxDate);
    if (this.singleDay) {
        date = formatDate(minX, [W < 340 ? 'ddd' : 'dddd']) + ', ' + minDate;
    } else {
        date = minDate + '&nbsp;– ' + maxDate;
    }

    if (this.zoomed || this.zooming > 0) {
        if (this.nextDate !== date) {
            this.currentDateEl.innerHTML = this.nextDate;
            this.nextDateEl.innerHTML = this.nextDate = date;
            this.currentDateEl.classList.add('is-updating');
        }
    } else {
        this.currentDateEl.innerHTML = this.nextDate = date;
    }

    this.updateSelection(false);

    // Update overview window
    windowL = (minX - gminX) / (gmaxX - gminX);
    windowR = (maxX - gminX) / (gmaxX - gminX);
    setTimeout(function() {
        this.overviewWindowEl.style.left = (W * windowL) + 'px';
        this.overviewWindowEl.style.right = (1 - windowR) * W + 'px';
        this.overviewMaskLeftEl.style.width = (W * windowL + 12) + 'px';
        this.overviewMaskRightEl.style.width = ((1 - windowR) * W + 12) + 'px';
    }.bind(this), 0);

    // Update legend labels
    for (i = 0; i < _series.length; i++) {
        this.legendLabelEls[i].item.classList.toggle('is-active', _series[i].isActive);
    }

    this.scaleY = scaleY;
    this.gscaleY = gscaleY;

    if (!this.zoomed && this.zooming > 0) {
        //minX = this.unzoomed.minX;
        //maxX = this.unzoomed.maxX;
        minY = this.unzoomed.minY;
        maxY = this.unzoomed.maxY;
        gminY = this.unzoomed.gminY;
        gmaxY = this.unzoomed.gmaxY;
        //this.rightScale = this.zoomedv.rightScale;
        //this.rightOffs = this.zoomedv.rightOffs;
    }

    // Ensure animatable properties are animated
    if (!noData) {
        if (zoomTransition) {
            this.set('minY', minY);
            this.set('gminY', gminY);
            this.set('maxY', maxY);
            this.set('gmaxY', gmaxY);
        } else {
            this.animate('minY', minY);
            this.animate('gminY', gminY);
            this.animate('maxY', maxY);
            this.animate('gmaxY', gmaxY);
        }
    }

    // Postpone animation frame if there's any animations
    if (!this.animationRequestId) {
        //this.animationRequestId = requestAnimationFrame(this.tick);
        this.render(renderView, renderOverview);
    } else {
        this.renderView = this.renderView || renderView;
        this.renderOverview = this.renderOverview || renderOverview;
    }
}

AChart.prototype.updateSelection = function(render) {
    var left, percent, highest, k, l, i, y, html, W = this.W, H = this.H,
        minX = this.getTarget('minX'), maxX = this.getTarget('maxX'),
        minY = this.getTarget('minY'), maxY = this.getTarget('maxY'),
        _xs = this.zxs || this.xs, _series = this.zoomed && this.zseries ? this.zseries : this.series,
        scaleX = this.scaleX(true), scaleY = this.scaleY, sum = 0,
        dt = this.zoomed ? this.zdt || this.dt : this.dt;

    for (i = 0; i < _series.length; i++) {
        if (this.STACKED) {
            this.animate('series' + i + '-scale', _series[i].isActive ? 1 : 0);
            this.set('series' + i + '-opacity', 1);
            this.set('series' + i + '-sopacity', 1); // Probably sopacity is not needed now
        } else {
            this.set('series' + i + '-scale', 1);
            if (_series[i].isActive) {
                this.animate('series' + i + '-opacity', 1);
            } else {
                this.animate('series' + i + '-opacity', 0);
            }
            this.animate('series' + i + '-sopacity', _series[i].isActive ? 1 : 0);
        }
        if (this.PERCENTAGE && this.zooming > 0) {
            this.animate('series' + i + '-sector', this.selectionSeriesIndex === i ? 1 : 0);
        } else {
            this.set('series' + i + '-sector', 0);
        }
    }

    // Update selection
    if ((this.selectionIndex === null && this.selectionSeriesIndex === null) || this.noData) {
        this.selectionLineEl.style.display = 'none';
        for (i = 0; i < this.selectionBubbleEls.length; i++) {
            this.selectionBubbleEls[i].style.display = 'none';
        }
        this.selectionBoxEl.style.display = 'none';
        this.viewMaskLeftEl.style.opacity = 0;
        this.viewMaskRightEl.style.opacity = 0;
    } else {
        left = (_xs[this.selectionIndex] - minX) * scaleX + this.SIDE_PADDING;
        percent = (_xs[this.selectionIndex] - minX) / (maxX - minX);
        highest = H;
        if (this.type === 'bar') {
            this.selectionLineEl.style.display = 'none';
            this.viewMaskLeftEl.style.opacity = 1;
            this.viewMaskLeftEl.style[transform] = 'translateX(' + (left - this.fW) + 'px)';
            this.viewMaskRightEl.style.opacity = 1;
            this.viewMaskRightEl.style[transform] = 'translateX(' + (left + dt * scaleX) + 'px)';
        } else {
            this.viewMaskLeftEl.style.opacity = 0;
            this.viewMaskRightEl.style.opacity = 0;
            if (this.PERCENTAGE && this.zooming > 0) {
                this.selectionLineEl.style.display = 'none';
            } else {
                this.selectionLineEl.style.display = 'block';
                this.selectionLineEl.style[transform] = 'translateX(' + left + 'px)';
            }
        }

        if (!(this.PERCENTAGE && this.zooming > 0)) {
            for (i = 0; i < this.selectionBubbleEls.length; i++) {
                if (i >= _series.length) {
                    this.selectionBubbleEls[i].style.display = 'none';
                    continue;
                }

                if (this.Y_SCALED && i == 1) {
                    k = this.rightScale;
                    l = this.rightOffs;
                } else {
                    k = 1;
                    l = 0;
                }
                y = (_series[i].pts[this.selectionIndex] * k - l - minY) * scaleY * this._p[this.selectionIndex];

                if (this.type === 'line') {
                    this.selectionBubbleEls[i].style.display = 'block';
                    this.selectionBubbleEls[i].style.opacity = _series[i].isActive ? 1 : 0;
                    this.selectionBubbleEls[i].style.borderColor = _series[i].color;
                    this.selectionBubbleEls[i].style.left = left + 'px';
                    this.selectionBubbleEls[i].style.bottom = y + 'px';
                } else {
                    this.selectionBubbleEls[i].style.display = 'none';
                }

                if (_series[i].isActive) {
                    highest = Math.min(highest, H - y - 15);
                }
            }
        }

        if (!this.PERCENTAGE || this.zooming == 0) {
            this.selectionBoxHeaderEl.style.display = 'flex';
            this.selectionBoxTitleEl.innerHTML = formatDate(_xs[this.selectionIndex], this.zoomed ?
                (this.singleDay ? ['HH', ':', 'mm'] : ['D', '&nbsp;', 'MMMM', ', ', 'HH', ':', 'mm']) :
                ['ddd', ', ', 'D', '&nbsp;', 'MMM', '&nbsp;', 'YYYY']
            );
            this.selectionBoxArrowEl.style.display = this.zoomed ? 'none' : 'block';
        } else {
            this.selectionBoxHeaderEl.style.display = 'none';
        }

        var activeCount = 0;
        for (i = 0; i < _series.length; i++) {
            if (_series[i].isActive) {
                sum += _series[i].pts[this.selectionIndex];
                activeCount++;
            }
        }

        for (i = 0; i < _series.length + (this.STACKED && activeCount > 1 ? 1 : 0); i++) {
            if (this.PERCENTAGE && this.zooming > 0 && i !== this.selectionSeriesIndex) {
                this.selectionBoxRows[i].el.style.display = 'none';
                continue;
            }
            if (i == _series.length || _series[i].isActive) {
                this.selectionBoxRows[i].el.style.display = 'flex';
                if (this.PERCENTAGE && this.zooming == 0) {
                    this.selectionBoxRows[i].percentEl.style.display = 'block';
                    this.selectionBoxRows[i].percentEl.innerText = i == _series.length ? '' :
                        (Math.round(_series[i].pts[this.selectionIndex] * 100 / sum) + '%');
                } else {
                    this.selectionBoxRows[i].percentEl.style.display = 'none';
                }
                this.selectionBoxRows[i].labelEl.innerText = i == _series.length ? 'All' : _series[i].name;
                this.selectionBoxRows[i].valueEl.style.color = i == _series.length ? 'inherit' : _series[i].color;
                this.selectionBoxRows[i].valueEl.innerText = formatNumber(i == _series.length ? sum :
                    (this.PERCENTAGE && this.zooming > 0 ?
                        Math.round(_series[i].sum / _series[i].n) :
                        _series[i].pts[this.selectionIndex]));
                this.selectionBoxRows[i].valueEl.innerText +="%"
            } else {
                this.selectionBoxRows[i].el.style.display = 'none';
            }
        }
        for (i = _series.length + (this.STACKED && activeCount > 1 ? 1 : 0); i < this.selectionBoxRows.length; i++) {
            this.selectionBoxRows[i].el.style.display = 'none';
        }

        this.selectionBoxEl.style.display = 'flex';
        if (this.PERCENTAGE && this.zooming > 0) {
            this.selectionBoxEl.className = 'a-chart__selection-box is-center';
        } else {
            if (!this.STACKED && highest > this.selectionBoxEl.offsetHeight && (left > 100 && left < W - 100)) {
                this.selectionBoxEl.className = 'a-chart__selection-box is-center';
                this.selectionBoxEl.style[transform] = 'translate(' + (left + (this.type === 'bar' ? dt * scaleX : 0) * 0.5) + 'px,0px)';
            } else
            if (left < this.fW / 2) {
                this.selectionBoxEl.className = 'a-chart__selection-box is-right';
                this.selectionBoxEl.style[transform] = 'translate(' + (left + (this.type === 'bar' ? dt * scaleX : 0)) + 'px,0px)';
            } else {
                this.selectionBoxEl.className = 'a-chart__selection-box is-left';
                this.selectionBoxEl.style[transform] = 'translate(' + left + 'px,0px)';
            }
        }
    }

    /*if (this.type === 'bar') {
      if (!this.animationRequestId) {
        this.render(true);
      } else {
        this.renderView = true;
      }
    }*/
}

AChart.prototype.updateRightScale = function() {
    var series = this.zseries || this.series, i, j, min, max, order;
    if (series.length != 2) {
        throw new Error('Y scaled graph must have exactly 2 series (left and right axis)');
    }

    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];
    for (i = 0; i < series.length; i++) {
        for (j = 0; j < series[i].pts.length; j++) {
            min[i] = Math.min(min[i], series[i].pts[j]);
            max[i] = Math.max(max[i], series[i].pts[j]);
        }
    }

    this.rightScale = (max[0] - min[0]) / (max[1] - min[1]);
    order = numberOrder(this.rightScale) * 2;
    this.rightScale = Math.ceil(this.rightScale / order) * order;

    order = numberOrder(max[0]) * 0.5;
    min[0] = Math.floor(min[0] / order) * order;

    order = numberOrder(max[1]) * 0.5;
    min[1] = Math.floor(min[1] / order) * order;

    this.rightOffs = min[1] * this.rightScale - min[0];
    order = numberOrder(this.rightOffs);
    //this.rightOffs = Math.round(this.rightOffs / order) * order;
}

AChart.prototype.updateSelectionBubbles = function() {
    var i, series = this.zseries || this.series;

    for (i = this.selectionBubbleEls.length; i < series.length; i++) {
        this.selectionBubbleEls.push(createEl(this.viewEl, 'selection-bubble is-series-' + i));
    }
}

AChart.prototype.updateSelectionBoxRows = function() {
    var i, series = this.zseries || this.series, row;

    for (i = this.selectionBoxRows.length; i < series.length + 1; i++) {
        row = {
            el: createEl(this.selectionBoxEl, 'selection-box-rows'),
        }
        row.percentEl = createEl(row.el, 'selection-box-percent');
        row.labelEl = createEl(row.el, 'selection-box-label');
        row.valueEl = createEl(row.el, 'selection-box-value');
        this.selectionBoxRows.push(row);
    }
}


AChart.prototype.updateLegend = function() {
    var i, item, label, icon, series = this.zseries || this.series;
    if (series.length > 1 || !this.legendLabelEls.length) { // FIXME: This is a hacky condition
        for (i = 0; i < series.length; i++) {
            if (i >= this.legendLabelEls.length) {
                item = createEl(this.legendEl, 'legend-item is-series-' + i);
                if (hasTouchSupport) {
                    item.addEventListener('touchstart', this.onLegendLabelPress.bind(this, i), true);
                    item.addEventListener('touchmove', this.onLegendLabelMove.bind(this, i), true);
                    item.addEventListener('touchend', this.onLegendLabelToggle.bind(this, i), true);
                } else {
                    item.addEventListener('mousedown', this.onLegendLabelPress.bind(this, i), true);
                    item.addEventListener('mousemove', this.onLegendLabelMove.bind(this, i), true);
                    item.addEventListener('mouseup', this.onLegendLabelToggle.bind(this, i), true);
                }
                item.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    return false;
                }, true);
                label = createEl(item, 'legend-label');
                icon = createEl(item, 'legend-checkmark');
                this.legendLabelEls.push({
                    item: item,
                    label: label,
                    icon: icon
                });
            } else {
                item = this.legendLabelEls[i].item;
                label = this.legendLabelEls[i].label;
                icon = this.legendLabelEls[i].icon;
            }
            item.classList.toggle('is-active', series[i].isActive);
            label.innerText = series[i].name;
            icon.style.color = series[i].color;
            item.style.color = series[i].color;
        }
        for (i = series.length; i < this.legendLabelEls.length; i++) {
            this.legendLabelEls[i].item.style.display = 'none';
        }
    }

    if (!this.initialized) {
        this.legendEl.classList.toggle('is-hidden', series.length < 2);
    } else {
        setTimeout(function() {
            this.legendEl.classList.toggle('is-hidden', (this.zoomed ? series : this.series).length < 2);
        }.bind(this), 0);
    }
}

// Get animatable property target value
AChart.prototype.getTarget = function(prop) {
    return this.animations[prop] && this.animations[prop].active ? this.animations[prop].target : this[prop];
}

AChart.prototype.getSource = function(prop) {
    return this.animations[prop] && this.animations[prop].active ? this.animations[prop].source : this[prop];
}

// Get animatable property current value
AChart.prototype.get = function(prop) {
    return this[prop];
}

// Set animatable property value instantly
AChart.prototype.set = function(prop, value) {
    this[prop] = value;
    this.animations[prop] = {
        target: value
    }
}

AChart.prototype.isAnyAnimating = function(props) {
    for (var i = 0; i < props.length; i++) {
        if (this.animations[props[i]] && this.animations[props[i]].active) {
            return true;
        }
    }
    return false;
}

// Start animating value toward value
AChart.prototype.animate = function(prop, value, duration, cb) {
    var anim = this.animations[prop];
    if (Array.isArray(value)) {
        value = value.slice(0);
    }
    if (!anim) {
        this[prop] = Array.isArray(value) ? value.slice(0) : value;
        this.animations[prop] = {
            target: value,
        }
        cb && cb();
        return;
    }
    if (!Array.isArray(value) && Math.abs(anim.target - value) < 1e-9) {
        anim.duration = duration || this.ANIMATION_DURATION;
        anim.cb = cb;
        return;
    }
    anim.active = true;
    anim.easing = (Date.now() - this.animations[prop].time < this.ANIMATION_DURATION) ? easeOut : ease;
    if (Array.isArray(value)) {
        anim.source = this[prop].slice(0);
    } else {
        anim.source = this[prop];
    }
    anim.target = value;
    anim.time = Date.now();
    anim.duration = duration || this.ANIMATION_DURATION;
    anim.cb = cb;

    if (!this.animationRequestId) {
        this.animationStartedAt = (new Date()).getTime();
        this.animationFrames = 0;
        this.animationRequestId = requestAnimationFrame(this.tick);
        if (this.DEBUG_INFO) {
            notifyFPSStart(this.title);
        }
    }
}

AChart.prototype.getVisibleIndices = function(xs, lminX, lmaxX) {
    var i, i0, i1, x, scaleX = this.scaleX(), l, r;
    if (this.__cache_minX === this.minX && this.__cache_scaleX === scaleX && this.__cache_xs === xs) {
        return this.__cache_indices;
    }
    l = 0, r = xs.length - 1;
    while (r > l) {
        i = (l + r) >> 1;
        x = (xs[i] - this.minX) * scaleX + this.SIDE_PADDING;
        if (x >= 0 && (!lminX || xs[i] > lminX)) {
            r = i;
        } else {
            l = i + 1;
        }
    }
    i0 = Math.max(0, r - 2);
    l = 0, r = xs.length - 1;
    while (r > l) {
        i = (l + r) >> 1;
        x = (xs[i] - this.minX) * scaleX + this.SIDE_PADDING;
        if (x <= this.fW && (!lmaxX || xs[i] < lmaxX)) {
            l = i + 1;
        } else {
            r = i;
        }
    }
    i1 = Math.min(xs.length - 1, r);
    this.__cache_xs = xs;
    this.__cache_minX = this.minX;
    this.__cache_scaleX = this.scaleX;
    this.__cache_indices = [i0, i1];
    return [i0, i1];
}

AChart.prototype.render = function(renderView, renderOverview, isFinalAnimationTick) {
    var i, range, range1, index, x, y, k, l, first, last, clipping, series,
        rightScale = this.rightScale, rightOffs = this.rightOffs,
        minY = this.minY, maxY = this.maxY,
        gminY = this.gminY, gmaxY = this.gmaxY, series = this.zseries || this.series,
        opacity, sopacity, scale, pscale, props = [], propsView = [], line, label, pie, zopacity, phi = 0.4,
        isZoomIsomorphic = (this.zooming === 0 || this.unzoomed.type === this.ztype) &&
            this.zseries && this.series.length === this.zseries.length/* &&
      (this.type !== 'bar')*/; // until I figure out bars interpolation

    for (index = 0; index < series.length; index++) {
        props = props.concat([
            'series' + index + '-scale',
            'series' + index + '-opacity',
            'series' + index + '-sopacity',
            /*'series' + index + '-sector',*/
            'series' + index + '-average',
        ]);
    }
    for (i = 0; i < this.yLines.length; i++) {
        propsView.push('grid-y' + this.yLines[i].y + '-opacity');
    }
    for (i = 0; i < this.xLabels.length; i++) {
        propsView.push('grid-x' + this.xLabels[i].x + '-opacity');
    }

    renderView = renderView || this.isAnyAnimating(props.concat(['minX', 'maxX', 'minY', 'maxY', 'percentage-scale', 'zooming'])) ||
        this.isAnyAnimating(propsView);
    if (!renderOverview) {
        this.__t = (this.__t || 0) + 1;
        if (isFinalAnimationTick || !this.SLOW_DEVICE || this.__t % 2 == 1) {
            renderOverview = this.isAnyAnimating(props.concat(['gminX', 'gmaxX', 'gminY', 'gmaxY']));
        }
    }

    if (!renderView && !renderOverview) {
        return;
    }

    if (renderView) {
        this.viewCtx.clearRect(0, 0, this.fW * dp, (this.H + 35) * dp);

        if (this.PERCENTAGE && this.zooming > 0) {
            if (this.zooming < 1) {
                clipping = true;
                this.viewCtx.save();

                y = this.H - 30;
                x = (this.fW - y) * 0.5 * this.zooming;
                roundRect(this.viewCtx, x * dp, 30 * dp, (this.fW - x * 2) * dp, y * dp, y * 0.5 * this.zooming * dp);
                this.viewCtx.clip();
            }

            pie = this.preparePie();
            for (index = 0; index < this.series.length; index++) {
                this.series[index].sector = pie[index];
            }
        }
    }

    if (renderOverview) {
        this.overviewCtx.clearRect(0, 0, this.W * dp, this.oH * dp);

        // This induces lots of lags:
        //roundRect(this.overviewCtx, 0, 0, this.W * dp, this.oH * dp, 8 * dp);
        //this.overviewCtx.clip();
    }

    if (this.zooming > 0) {
        minY = this.unzoomed.minY;
        maxY = this.unzoomed.maxY;
        gminY = this.unzoomed.gminY;
        gmaxY = this.unzoomed.gmaxY;
        rightScale = this.unzoomed.rightScale;
        rightOffs = this.unzoomed.rightOffs;
    }
    if (this.zooming < 1 || (this.PERCENTAGE && renderOverview)) {
        if (this.zooming < 1 || !this.PERCENTAGE) {
            if (this.zooming > 0 && isZoomIsomorphic) {
                range = this.getVisibleIndices(this.xs, false, this.zminX);
                range1 = this.getVisibleIndices(this.xs, this.zmaxX);
            } else {
                range = this.getVisibleIndices(this.xs);
            }
        }

        if (this.zooming == 0) {
            this._range = range;
        }

        if (this.STACKED) {
            for (i = 0; i <= this.xs.length - 1; i++) {
                this._y0[i] = 0;
            }
        }
        for (index = 0; index < this.series.length; index++) {
            if (this.series[index].isActive) {
                first = index;
                break;
            }
        }
        for (index = 0; index < this.series.length; index++) {
            if (this.series[index].isActive) {
                last = index;
            }
        }
        for (index = 0; index < this.series.length; index++) {
            scale = this.get('series' + index + '-scale');
            opacity = this.get('series' + index + '-opacity');
            sopacity = this.get('series' + index + '-sopacity');
            if (this.PERCENTAGE) {
                pscale = this.get('percentage-scale');
            }

            if (this.Y_SCALED && index == 1) {
                k = rightScale;
                l = rightOffs;
            } else {
                k = 1;
                l = 0;
            }

            // precalc (x, y) pairs
            for (i = (renderOverview ? 0 : range[0]); i <= (renderOverview ? this.xs.length - 1 : range[1]); i++) {
                this._x[i] = this.xs[i];
                this._y1[i] = this._y0[i] + (this.series[index].pts[i] * k - l) * scale * (this.PERCENTAGE ? pscale[i] : 1);
                if (this.PERCENTAGE) {
                    this._y1[i] = Math.min(this._y1[i], 100); // due to animations, sum of values can temporarily exceed 100%
                }
            }

            if ((opacity >= 1e-9 || sopacity >= 1e-9) && scale >= 1e-9) {
                if (renderView && this.zooming < 1) {
                    if (this.PERCENTAGE && this.zooming > 0) {
                        line = this.prepareLine(this.series[index], this._range[0], this._range[1],
                            this.fW, this.H, this.dt, this.unzoomed.minX, this.unzoomed.maxX,
                            minY, maxY, this.SIDE_PADDING, 30, false, index == first, index == last);
                        this.interpolatePieLine(index == first, index == last, line.line, pie[index], this.zooming);
                        zopacity = 1;
                    } else {
                        line = this.prepareLine(this.series[index], range[0], range[1],
                            this.fW, this.H, this.dt, this.minX, this.maxX,
                            minY, maxY, this.SIDE_PADDING, 30, false, index == first, index == last);
                        zopacity = isZoomIsomorphic ? 1 : (1 - this.zooming);
                    }
                    this.renderLine(this.viewCtx, this.series[index], 2.2, opacity * zopacity, sopacity * zopacity, line, false);

                    if (range1) {
                        this.series[index]._line1 = this.prepareLine(this.series[index], Math.max(0, range[1] - 5), Math.min(range1[0] + 2, this.xs.length - 1),
                            this.fW, this.H, this.dt, this.minX, this.maxX,
                            minY, maxY, this.SIDE_PADDING, 30, false, index == first, index == last).line;
                        if (Math.min(range1[0] + 1, this.xs.length - 1) < range1[1] - 1) {
                            line = this.prepareLine(this.series[index], Math.min(range1[0] + 1, this.xs.length - 1), range1[1],
                                this.fW, this.H, this.dt, this.minX, this.maxX,
                                minY, maxY, this.SIDE_PADDING, 30, false, index == first, index == last);
                            this.renderLine(this.viewCtx, this.series[index], 2.2, opacity * zopacity, sopacity * zopacity, line, false);
                        }
                    }
                }

                if (renderOverview) {
                    line = this.prepareLine(this.series[index], 0, this.xs.length - 1,
                        this.W, this.oH, this.dt, this.gminX, this.gmaxX - (this.PERCENTAGE ? DAY : 0),
                        gminY, gmaxY, 0, this.PERCENTAGE ? 0 : 4, true, index == first, index == last);

                    zopacity = this.PERCENTAGE ? 1 : (1 - this.zooming);
                    this.renderLine(this.overviewCtx, this.series[index], 1.2, sopacity * zopacity, sopacity * zopacity, line, true);
                }
            }

            if (this.STACKED) {
                for (i = 0; i <= this.xs.length - 1; i++) {
                    this._y0[i] = this._y1[i];
                }
            }
        }
    }

    if (clipping) {
        this.viewCtx.restore();
    }

    if (this.PERCENTAGE && this.zooming > 0) {
        if (renderView) {
            /* else {
              this.viewCtx.fillStyle = this.theme === 'night' ? '#242f3e' : '#ffffff';
              y = this.H - 30;
              x = (this.fW - y) * 0.5 * this.zooming;
              roundRect(this.viewCtx, x * dp, 30 * dp, (this.fW - x * 2) * dp, y * dp, y * 0.5 * this.zooming * dp);
              this.viewCtx.rect(0, 0, this.fW * dp, (this.H + 35) * dp);
              this.viewCtx.fill('evenodd');
            }*/

            this.renderPie(this.viewCtx, pie);
        }
    } else
    if (this.zseries) {
        if (!this.zoomed) {
            minY = this.zoomedv.minY;
            maxY = this.zoomedv.maxY;
            gminY = this.zoomedv.gminY;
            gmaxY = this.zoomedv.gmaxY;
            rightScale = this.zoomedv.rightScale;
            rightOffs = this.zoomedv.rightOffs;
        } else {
            minY = this.minY;
            maxY = this.maxY;
            gminY = this.gminY;
            gmaxY = this.gmaxY;
            rightScale = this.rightScale;
            rightOffs = this.rightOffs;
        }
        range = this.getVisibleIndices(this.zxs);

        if (this.STACKED) {
            for (i = 0; i <= this.zxs.length - 1; i++) {
                this._y0[i] = 0;
            }
        }
        for (index = 0; index < this.zseries.length; index++) {
            if (this.zseries[index].isActive) {
                first = index;
                break;
            }
        }
        for (index = 0; index < this.zseries.length; index++) {
            if (this.zseries[index].isActive) {
                last = index;
            }
        }
        for (index = 0; index < this.zseries.length; index++) {
            scale = this.get('series' + index + '-scale');
            opacity = this.get('series' + index + '-opacity');
            sopacity = this.get('series' + index + '-sopacity');

            if (this.Y_SCALED && index == 1) {
                k = rightScale;
                l = rightOffs;
            } else {
                k = 1;
                l = 0;
            }

            for (i = (renderOverview ? 0 : range[0]); i <= (renderOverview ? this.zxs.length - 1 : range[1]); i++) {
                this._x[i] = this.zxs[i];
                this._y1[i] = this._y0[i] + (this.zseries[index].pts[i] * k - l) * scale;
            }

            if ((opacity >= 1e-9 || sopacity >= 1e-9) && scale >= 1e-9) {
                if (renderView) {
                    line = this.prepareLine(this.zseries[index], range[0], range[1],
                        this.fW, this.H, this.zdt, this.minX, this.maxX,
                        minY, maxY, this.SIDE_PADDING, 30, false, index == first, index == last);

                    if (isZoomIsomorphic && this.zooming < 1) {
                        if (this.zoomed) {
                            zopacity = Math.max(0, (this.zooming - 1) / phi + 1);
                        } else {
                            zopacity = this.zooming;
                        }
                        if (this.type === 'bar') {
                            this.interpolateBars(this.series[index]._line1, line.line, zopacity, index === first);
                        } else {
                            this.interpolateLines(this.series[index]._line1, line.line, zopacity);
                        }
                    }

                    zopacity = isZoomIsomorphic ? 1 : this.zooming;
                    this.renderLine(this.viewCtx, this.zseries[index], 2.2, opacity * zopacity, sopacity * zopacity, line, false);
                }

                if (renderOverview) {
                    line = this.prepareLine(this.zseries[index], 0, this.zxs.length - 1,
                        this.W, this.oH, this.zdt, this.gminX, this.gmaxX,
                        gminY, gmaxY, 0, 4, true, index == first, index == last);

                    /*if (isZoomIsomorphic && this.zooming < 1) {
                      this.interpolateLines(this.series[index]._lineO, line, this.zooming);
                    }*/

                    zopacity = this.zooming;//Math.max(0, (this.zooming - 1) / phi + 1);
                    this.renderLine(this.overviewCtx, this.zseries[index], 1.2, sopacity * zopacity, sopacity * zopacity, line, true);
                }
            }

            if (this.STACKED) {
                for (i = 0; i <= this.zxs.length - 1; i++) {
                    this._y0[i] = this._y1[i];
                }
            }
        }
    }

    /*if (this.zooming > 0) {
      minY = this.unzoomed.minY;
      maxY = this.unzoomed.maxY;
    } else {*/
    minY = this.minY;
    maxY = this.maxY;
    //}

    if (renderView) {
        this.viewCtx.font = (12 * dp) + 'px Roboto, -apple-system, BlinkMacSystemFont, "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, Verdana, sans-serif';

        this.viewCtx.textBaseline = 'bottom';

        for (i = 0; i < this.yLines.length; i++) {
            line = this.yLines[i];
            y = Math.round(this.H - (line.y - minY) * (this.H - 30) / (maxY - minY) - 0.5) + 0.5;
            if (y > this.H + 5) {
                continue;
            }
            opacity = this.get('grid-y' + line.y + '-opacity');

            this.viewCtx.globalAlpha = opacity * 0.1;
            this.viewCtx.lineWidth = dp;
            this.viewCtx.strokeStyle = (this.theme == 'night' ? '#FFFFFF' : '#182D3B');
            this.viewCtx.beginPath();
            this.viewCtx.moveTo(this.SIDE_PADDING * dp, y * dp);
            this.viewCtx.lineTo((this.fW - this.SIDE_PADDING) * dp, y * dp);
            this.viewCtx.stroke();

            this.viewCtx.globalAlpha = opacity * (this.Y_SCALED ? this.get('series0-opacity') : 0.45);
            this.viewCtx.fillStyle = this.Y_SCALED ? this.series[0].color : (this.theme == 'night' ? '#FFFFFF' : '#182D3B');
            this.viewCtx.textAlign = 'left';
            this.viewCtx.fillText(line.labelLeft, (this.SIDE_PADDING + 3) * dp, (y - 2) * dp);

            if (this.Y_SCALED) {
                this.viewCtx.globalAlpha = opacity * this.get('series1-opacity');
                this.viewCtx.fillStyle = this.series[1].color;
                this.viewCtx.textAlign = 'right';
                this.viewCtx.fillText(line.labelRight, (this.fW - this.SIDE_PADDING - 3) * dp, (y - 2) * dp);
            }
        }

        this.viewCtx.fillStyle = (this.theme == 'night' ? '#FFFFFF' : '#182D3B');
        this.viewCtx.textBaseline = 'top';
        this.viewCtx.textAlign = 'center';
        for (i = 0; i < this.xLabels.length; i++) {
            label = this.xLabels[i];

            x = (label.x - this.minX + (this.type === 'bar' ? (this.zdt || this.dt) * 0.5 : 0)) * this.scaleX() + this.SIDE_PADDING;
            opacity = this.get('grid-x' + label.x + '-opacity');
            if (this.zooming > 0 && this.zooming < 1) {
                opacity = (label.fmt === 'h') ? Math.max(0, opacity * 5 - 4) : 1;
            }

            this.viewCtx.globalAlpha = opacity * 0.45;
            this.viewCtx.fillText(label.label, x * dp, (this.H + 10) * dp);
        }
    }

    if (renderOverview) {
        this.overviewCtx.fillStyle = this.theme === 'night' ? '#242f3e' : '#ffffff';
        roundRect(this.overviewCtx, 0, 0, this.W * dp, this.oH * dp, 8 * dp);
        this.overviewCtx.rect(0, 0, this.W * dp, this.oH * dp);
        this.overviewCtx.fill('evenodd');
    }
}

AChart.prototype.preparePie = function() {
    var sectors = [], r = (this.H - 30) / 2, cx = this.fW / 2, cy = r + 30, total = 0, totalSc = 0, a0 = 0, a1 = 0, scale, avg;

    for (index = 0; index < this.series.length; index++) {
        scale = this.get('series' + index + '-scale');
        avg = this.get('series' + index + '-average');
        total += avg;
        totalSc += avg * scale;
    }

    for (index = 0; index < this.series.length; index++) {
        scale = this.get('series' + index + '-scale');
        avg = this.get('series' + index + '-average');
        a0 = a1;
        a1 = a0 + 2 * Math.PI * scale * avg / totalSc;
        sectors.push({
            cx: cx, cy: cy, r: r,
            a0: a0, a1: a1,
            active: this.series[index].isActive,
            percent: 100 * avg / total,
            color: this.series[index].color,
            value: avg,
        });
    }
    return sectors;
}

AChart.prototype.renderPie = function(ctx, pie) {
    var index, scale, offset, sector, t = this.zooming, rot0 = 2.4 * (1 - t), x, y, k, alpha, sz, v, d, opacity, empty, outlet;

    if (!pie.length) {
        return;
    }

    ctx.save();
    ctx.translate(pie[0].cx * dp, pie[0].cy * dp);
    ctx.rotate(rot0);
    ctx.translate(-pie[0].cx * dp, -pie[0].cy * dp);

    if (t == 1) {
        empty = true;
        for (index = 0; index < pie.length; index++) {
            if (pie[index].active) {
                empty = false;
            }
        }

        for (index = 0; index < pie.length; index++) {
            sector = pie[index];
            scale = this.get('series' + index + '-scale');
            offset = 8 + (1 - Math.cos(Math.abs(Math.PI - (sector.a1 - sector.a0)) * 0.5)) * 24;
            offset = this.get('series' + index + '-sector') * Math.min(20, offset);
            alpha = (sector.a0 + sector.a1) / 2 - 2.4;
            x = sector.cx + Math.cos(alpha) * offset;
            y = sector.cy + Math.sin(alpha) * offset;

            ctx.globalAlpha = empty ? scale : 1;
            ctx.fillStyle = sector.color;
            ctx.beginPath();
            ctx.moveTo(x * dp, y * dp);
            ctx.arc(x * dp, y * dp, sector.r * dp, sector.a0 - 2.4, sector.a1 - 2.4);
            ctx.fill();
        }
    }

    if (t >= 0.33) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        for (index = 0; index < pie.length; index++) {
            sector = pie[index];
            scale = this.get('series' + index + '-scale');
            offset = 8 + (1 - Math.cos(Math.abs(Math.PI - (sector.a1 - sector.a0)) * 0.5)) * 24;
            offset = this.get('series' + index + '-sector') * Math.min(20, offset);
            ctx.globalAlpha = Math.min(1, scale * (t - 0.33) / 0.66);

            alpha = (sector.a0 + sector.a1) / 2 - 2.4;
            k = Math.abs(Math.cos(alpha));
            sz = sector.r * 0.7 * (sector.a1 - sector.a0) * 0.2 * (1 - k * 0.04) + sector.r * 0.09 * k;
            outlet = false;
            if (sz > 30) {
                sz = 30;
            } else
            if (sz < 19) {
                sz = 19;

                if (this.series[index].isActive && this.getSource('series' + index + '-scale') > 0) {
                    outlet = true;
                }
            }
            v = Math.round(sector.percent);
            if (outlet) {
                d = sector.r + Math.max(26, offset + 16);
                if (offset < 8) {
                    ctx.strokeStyle = sector.color;
                    ctx.lineWidth = dp;
                    ctx.beginPath();
                    ctx.moveTo((sector.cx + Math.cos(alpha) * (sector.r + offset)) * dp, (sector.cy + Math.sin(alpha) * (sector.r + offset)) * dp);
                    ctx.lineTo((sector.cx + Math.cos(alpha) * (sector.r + 8)) * dp, (sector.cy + Math.sin(alpha) * (sector.r + 8)) * dp);
                    ctx.stroke();
                }
                ctx.fillStyle = sector.color;
            } else {
                d = v < 10 ? (sector.r * 0.65 + sz * 0.2) : (sector.r * 0.65);
                d += offset;
                ctx.fillStyle = '#FFFFFF';
            }
            x = sector.cx + Math.cos(alpha) * d;
            y = sector.cy + Math.sin(alpha) * d + sz * 0.6;
            ctx.fillText(v + '%', x * dp, y * dp);

            if (index === this.selectionSeriesIndex) {
                offset = offset > 0 ? 20 : 0;
                if (outlet) {
                    d = sector.r + Math.max(26, offset + 16);
                } else {
                    d = v < 10 ? (sector.r * 0.65 + sz * 0.2) : (sector.r * 0.65);
                    d += offset;
                }
                x = sector.cx + Math.cos(alpha) * d;
                y = sector.cy + Math.sin(alpha) * d + sz * 0.6;
                x += (outlet ? 0 : 70) * (x < this.fW / 2 ? -1 : 1);
                y -= sz + (outlet ? 50 : 60);
                x = Math.max(100, Math.min(this.fW - 100, x));
                this.selectionBoxEl.style[transform] = 'translate(' + x + 'px,' + y + 'px)';
            }
        }
    }

    ctx.restore();
}

AChart.prototype.prepareLine = function(series, i0, i1, W, H, dt, minX, maxX, minY, maxY, paddingX, paddingY, isOverview, isFirst, isLast) {
    var i, x, x0, y, h, p0, p1, p2, streak = 0,
        type = (this.PERCENTAGE && isOverview && this.zooming > 0) ? 'bar' : series.type,
        scaleX = (W - 2 * paddingX) / (maxX - minX + (type == 'bar' ? dt : 0)),
        scaleY = (H - paddingY) / (maxY - minY), line = [];


    // TODO: try skipping each second point on slow devices while in animation (and if points are close to each other)

    for (i = i0; i <= i1; i++) {
        x = (this._x[i] - minX) * scaleX + paddingX;
        if (i == i0) {
            x0 = x;
        }
        y = H - (this._y1[i] - minY) * scaleY;
        line.push([x, y]);
        if (type === 'bar') {
            x += dt * scaleX;
            line.push([x, y]);
        } else
        if (this.SLOW_DEVICE && isOverview && i > i0 + 1) {
            p0 = line[line.length - 3];
            p1 = line[line.length - 2];
            p2 = line[line.length - 1];
            if (streak < 4 && (p0[1] < p1[1] && p1[1] < p2[1]) || (p0[1] > p1[1] && p1[1] > p2[1])) {
                // Simplify line
                line.pop(); line.pop();
                line.push(p2);
                streak++;
            } else {
                streak = 0;
            }
        }
    }

    if (this.STACKED && !isFirst) {
        for (i = i1; i >= i0; i--) {
            x = (this._x[i] - minX) * scaleX + paddingX;
            y = H - (this._y0[i] - minY) * scaleY;
            if (type === 'bar') {
                x += dt * scaleX;
            }
            line.push([x, y]);
            if (type === 'bar') {
                x -= dt * scaleX;
                line.push([x, y]);
            } else
            if (this.SLOW_DEVICE && isOverview && i > i0 + 1) {
                p0 = line[line.length - 3];
                p1 = line[line.length - 2];
                p2 = line[line.length - 1];
                if (streak < 4 &&(p0[1] < p1[1] && p1[1] < p2[1]) || (p0[1] > p1[1] && p1[1] > p2[1])) {
                    line.pop(); line.pop();
                    line.push(p2);
                    streak++;
                } else {
                    streak = 0;
                }
            }
        }
    } else
    if (type === 'area' || type === 'bar') {
        line.push([x, H]);
        if (this.STACKED && isFirst) {
            // To help animating to pie
            line.push([(x0 + x * 3) / 4, H]);
            line.push([(x0 * 3 + x) / 4, H]);
        }
        line.push([x0, H]);
    }

    /*if (type === 'bar' && this.selectionIndex !== null && !isOverview) {
      x = (this._x[this.selectionIndex] - minX) * scaleX + paddingX;
      y = H - (this._y1[this.selectionIndex] - minY) * scaleY;
      if (this.STACKED) {
        h = (this._y1[this.selectionIndex] - this._y0[this.selectionIndex]) * scaleY;
      } else {
        h = H - y;
      }
      return {
        line: line,
        rect: [x, y, dt * scaleX, h],
      }
    }*/

    return {
        line: line
    }
}

AChart.prototype.renderLine = function(ctx, series, width, opacity, sopacity, line, isOverview) {
    ctx.globalAlpha = opacity;
    ctx.lineWidth = width * dp;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = series.color;
    ctx.fillStyle = series.color;
    ctx.beginPath();

    for (var i = 0; i < line.line.length; i++) {
        if (i == 0) {
            ctx.moveTo(Math.round(line.line[i][0] * dp), Math.round(line.line[i][1] * dp));
        } else {
            ctx.lineTo(Math.round(line.line[i][0] * dp), Math.round(line.line[i][1] * dp));
        }
    }

    if (series.type === 'area' || series.type === 'bar') {
        ctx.fill();
    } else {
        ctx.stroke();
    }

    /*if (line.rect) {
      ctx.globalAlpha = sopacity - opacity;
      ctx.fillRect(Math.round(line.rect[0] * dp), Math.round(line.rect[1] * dp), Math.round(line.rect[2] * dp), Math.round(line.rect[3] * dp));
    }*/
}

AChart.prototype.interpolatePieLine = function(isFirst, isLast, line, sector, step) {
    var hl = isFirst ? line.length - 4 : Math.floor(line.length / 2),
        mid1 = Math.floor(hl / 2), mid2 = isFirst ? (hl + 1) : (hl + mid1),
        t = this.zooming, alpha0, alpha,
        d, i, i0, i1, j, k, x, y, rot, t1, border;

    if (isLast) {
        for (i = 0; i < hl; i++) {
            line[i][1] = sector.cy - this.W * 0.8;
        }
    } else {
        for (i = 0; i < hl; i++) {
            line[i][1] -= 30;
        }
    }

    rot = -2.4 * t;//overshoot(t);
    for (j = 0; j < 4; j++) {
        border = (j < 2 && isLast) || (j > 1 && isFirst);
        if (j == 0) {
            i0 = 0, i1 = mid1 + 1, alpha0 = sector.a1;
        } else
        if (j == 1) {
            i0 = mid1 + 1, i1 = hl, alpha0 = 0;
        } else
        if (j == 2) {
            i0 = hl, i1 = mid2 + 1, alpha0 = 0;
        } else {
            i0 = mid2 + 1, i1 = line.length, alpha0 = sector.a0;
        }
        for (i = i0; i < i1; i++) {
            x = line[i][0] - sector.cx, y = line[i][1] - sector.cy;
            alpha = Math.atan2(y, x);
            d = Math.sqrt(x * x + y * y);


            if (!border) {
                t1 = Math.abs(x) / (this.fW / 3);
                t1 = (1 - t1 * t1) * t;
                alpha = angleLerp(alpha, alpha0, t);
            } else {
                if (isFirst) { // It seems that there should be a case for isLast too...
                    k = line.length - i;
                    alpha = angleLerp(alpha, (sector.a0 * k + sector.a1 * (5 - k)) / 5, t);
                }
                d += this.W * 2 * t;
            }
            line[i][0] = sector.cx + Math.cos(alpha + rot) * d;
            line[i][1] = sector.cy + Math.sin(alpha + rot) * d;

            // Drag closest points to center
            if (!border) {
                line[i][0] = line[i][0] * (1 - t1) + sector.cx * t1;
                line[i][1] = line[i][1] * (1 - t1) + sector.cy * t1;
            }
        }
    }
}

AChart.prototype.interpolateBars = function(line0, line1, step, isFirst) {
    var i, j, i0, i1, pl, pr, p0, p1, k, y, r = 0, last = line0.length - 1;
    for (j = 0; j < 2; j++) {
        if (j == 0) { // Top half
            i0 = 0;
            i1 = isFirst ? (line1.length - 4) : (line1.length / 2);
            r = 0;
            last = isFirst ? (line0.length - 4) : (line0.length / 2);
        } else {
            i0 = isFirst ? (line1.length - 4) : (line1.length / 2);
            i1 = line1.length;
            r = isFirst ? (line0.length - 4) : (line0.length / 2);
            last = line0.length;
        }
        for (i = i0; i < i1; i += 2) {
            pl = line1[i], pr = line1[i + 1];
            while (r < last) {
                p0 = line0[r], p1 = line0[r + 1];
                if (Math.min(p0[0], p1[0]) < pl[0] && Math.max(p0[0], p1[0]) > pl[0]) {
                    pl[1] = pl[1] * step + p0[1] * (1 - step);
                    if (!(Math.min(p0[0], p1[0]) < pr[0] && Math.max(p0[0], p1[0]) > pr[0]) && r + 2 < line0.length) {
                        p0 = line0[r + 2];
                    }
                    pr[1] = pr[1] * step + p0[1] * (1 - step);
                    break;
                }
                r += 2;
            }
        }
    }
}

AChart.prototype.interpolateLines = function(line0, line1, step) {
    var i, p, p0, p1, k, y, r = 0, last = line0.length - 2;
    for (i = 0; i < line1.length; i++) {
        p = line1[i];
        while (r <= last) {
            p0 = line0[r], p1 = line0[r + 1];
            if (p1[0] > p[0]) {
                break;
            }
            r++;
        }
        if (r > last || p1[0] <= p0[0]) {
            return;
        }
        if (i == 0) {
            p[0] = p0[0];
            p[1] = p0[1];
        } else if (i == line1.length - 1) {
            p[0] = p1[0];
            p[1] = p1[1];
        } else {
            k = (p[0] - p0[0]) / (p1[0] - p0[0]);
            y = p0[1] * (1 - k) + p1[1] * k;
            p[1] = p[1] * step + y * (1 - step);
        }
    }
}

AChart.prototype.load = function(path, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', path, true);
    xhr.send(null);
    if (this.DEBUG_INFO) {
        console.log('loading path ', path);
    }
    return xhr;
}

AChart.prototype.preloadDay = function(dt) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(function() {
        this.loadDay(dt);
    }.bind(this), 250);
}

AChart.prototype.zoom = function(zoomIn) {
    var x, i;
    if (zoomIn && (this.selectionIndex === null || this.zoomed)) {
        return;
    }
    if (!zoomIn && !this.zoomed) {
        return;
    }
    this.wrapperEl.classList.toggle('is-zoomed', zoomIn);
    this.wrapperEl.classList.add('is-zooming');
    this.animate('zooming', zoomIn ? 1 : 0, this.ZOOM_DURATION, function() {
        this.wrapperEl.classList.remove('is-zooming');
        this.overviewEl.classList.remove('is-hiding');
        if (!zoomIn) {
            this.zxs = null;
            this.zseries = null;
            this.zdt = null;
            if (this.Y_SCALED) {
                this.rightScale = this.unzoomed.rightScale;
                this.rightOffs = this.unzoomed.rightOffs;
            }
            //this.updateLayout(true, true, true);
            //return false;
        }
    }.bind(this));
    this.zoomed = zoomIn;
    this.selectionSeriesIndex = null;
    if (zoomIn) {
        x = this.xs[this.selectionIndex];
        this.selectionIndex = null;
        this.unzoomed = {
            type: this.type,
            minX: this.minX, maxX: this.maxX,
            minY: this.minY, maxY: this.maxY,
            gminY: this.gminY, gmaxY: this.gmaxY,
            rightScale: this.rightScale,
            rightOffs: this.rightOffs,
        }
        if (this.type === 'bar' && this.series.length === 1) { // This is probably is bad way to check that
            this.staticRange = true;
            this.overviewEl.classList.add('is-hidden');
            this.zminX = x + TZ;
            this.zmaxX = x + DAY + TZ;
        } else {
            this.zminX = x - 3 * DAY + TZ;
            this.zmaxX = x + 4 * DAY + TZ;
        }
        if (this.PERCENTAGE) {
            this.zminX = Math.max(this.zminX, this.gminX);
            this.zmaxX = Math.min(this.zmaxX, this.gmaxX + DAY);
        }
        this.animate('gminX', this.zminX, this.ZOOM_DURATION);
        this.animate('gmaxX', this.zmaxX, this.ZOOM_DURATION);
        this.animate('minX', x + TZ, this.ZOOM_DURATION);
        this.animate('maxX', x + DAY + TZ, this.ZOOM_DURATION);


        if (!this.PERCENTAGE) {
            this.loadDay(x, function(data) {
                var i;
                data = transformData(data);
                this.wrapperEl.classList.remove('is-' + this.type);
                this.type = data.type;
                this.wrapperEl.classList.add('is-' + this.type);
                this.ztype = data.type;
                this.zxs = data.xs;
                this.zseries = data.series;
                if (this.zseries.length == this.series.length) {
                    for (i = 0; i < this.series.length; i++) {
                        this.zseries[i].isActive = this.series[i].isActive;
                    }
                }
                this.zdt = (this.getTarget('gmaxX') - this.getTarget('gminX')) / (this.zxs.length - 1);
                if (this.zxs[0] > this.zminX) {
                    this.zminX = Math.floor((this.zxs[0] - TZ) / DAY) * DAY + TZ;
                    this.animate('gminX', this.zminX, this.ZOOM_DURATION);
                }
                if (this.zxs[this.zxs.length - 1] < this.zmaxX) {
                    this.zmaxX = Math.ceil((this.zxs[this.zxs.length - 1] - TZ) / DAY) * DAY + TZ;
                    this.animate('gmaxX', this.zmaxX, this.ZOOM_DURATION);
                }
                if (this.Y_SCALED) {
                    this.updateRightScale();
                }
                this.updateSelectionBubbles();
                this.updateSelectionBoxRows();
                this.updateLegend();
                this.updateLayout(true, true, true);
            });
        } else {
            this.wrapperEl.classList.remove('is-' + this.type);
            this.wrapperEl.classList.add('is-pie');
        }
    } else {
        this.zoomedv = {
            type: this.type,
            minX: this.minX, maxX: this.maxX,
            minY: this.minY, maxY: this.maxY,
            gminY: this.gminY, gmaxY: this.gmaxY,
            rightScale: this.rightScale,
            rightOffs: this.rightOffs,
        }
        this.selectionIndex = null;
        if (this.staticRange) {
            this.staticRange = false;
            this.overviewEl.classList.remove('is-hidden');
            this.overviewEl.classList.add('is-hiding');
        }
        this.animate('gminX', this.xs[0], this.ZOOM_DURATION);
        this.animate('gmaxX', this.xs[this.xs.length - 1], this.ZOOM_DURATION);
        this.animate('minX', this.unzoomed.minX, this.ZOOM_DURATION);
        this.animate('maxX', this.unzoomed.maxX, this.ZOOM_DURATION);
        this.wrapperEl.classList.remove('is-pie');
        this.wrapperEl.classList.remove('is-' + this.type);
        this.type = this.unzoomed.type;
        this.wrapperEl.classList.add('is-' + this.type);
        if (this.zseries && this.zseries.length == this.series.length) {
            for (i = 0; i < this.series.length; i++) {
                this.series[i].isActive = this.zseries[i].isActive;
            }
        }
    }
    this.updateSelectionBubbles();
    this.updateSelectionBoxRows();
    this.updateLegend();
    this.updateLayout(true, true, !zoomIn);
}

AChart.prototype.setTheme = function(theme) {
    this.theme = theme;
    this.render(true, true);
}