"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimerFormat;
(function (TimerFormat) {
    TimerFormat["millisecond"] = "ms";
    TimerFormat["second"] = "s";
    TimerFormat["minute"] = "m";
    TimerFormat["hour"] = "h";
    TimerFormat["day"] = "d";
})(TimerFormat || (TimerFormat = {}));
class Timer {
    constructor(time = Date.now(), format) {
        this.time = time;
        this.format = format;
    }
    get elapsed() {
        return this.numberFormat(this.getRealTime());
    }
    get elapsedSincePause() {
        return this.numberFormat(this.since_pause);
    }
    numberFormat(time) {
        switch (this._format ? this._format : Timer._default_format) {
            case TimerFormat.second:
                return time / 1000;
            case TimerFormat.minute:
                return (time / 1000) / 60;
            case TimerFormat.hour:
                return ((time / 1000) / 60) / 60;
            case TimerFormat.day:
                return (((time / 1000) / 60) / 60) / 24;
            default:
                return time;
        }
    }
    getRealTime() {
        if (this.paused) {
            // Calcul du temps sans le temps depuis la pause
            return (Date.now() - this.time) - this.since_pause;
        }
        else {
            return Date.now() - this.time;
        }
    }
    get since_pause() {
        return Date.now() - this.at_pause;
    }
    get paused() {
        return typeof this.at_pause !== "undefined";
    }
    set format(v) {
        if (!v) {
            this._format = undefined;
        }
        else if (Object.values(TimerFormat).includes(v)) {
            this._format = v;
        }
        else {
            throw new TypeError("Format does not exists");
        }
    }
    static set default_format(v) {
        if (Object.values(TimerFormat).includes(v)) {
            Timer.default_format = v;
        }
        else {
            throw new TypeError("Format does not exists");
        }
    }
    static get default_format() {
        return Timer._default_format;
    }
    get format() {
        return this._format;
    }
    reset() {
        this.time = Date.now();
        this.at_pause = undefined;
    }
    pause(ms) {
        if (!this.paused) {
            this.at_pause = Date.now();
            if (ms) {
                this.timeout_id = setTimeout(() => {
                    this.start();
                }, ms);
            }
        }
    }
    start() {
        if (this.paused) {
            this.time += this.since_pause;
            this.at_pause = undefined;
            if (this.timeout_id) {
                clearTimeout(this.timeout_id);
                this.timeout_id = undefined;
            }
        }
        else {
            this.reset();
        }
    }
    get [Symbol.toStringTag]() {
        return "Timerize";
    }
}
Timer._default_format = TimerFormat.millisecond;
exports.default = Timer;
