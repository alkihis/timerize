enum TimerFormat {
    millisecond = "ms", second = "s", minute = "m", hour = "h", day = "d"
}

export default class Timer {
    protected _format: TimerFormat | undefined;
    protected at_pause: number;
    protected timeout_id: number;

    protected static _default_format = TimerFormat.millisecond;

    constructor(protected time = Date.now(), format?: TimerFormat) {
        this.format = format;
    }

    get elapsed() {
        return this.numberFormat(this.getRealTime());
    }

    get elapsedSincePause() {
        return this.numberFormat(this.since_pause);
    }

    protected numberFormat(time: number) {
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

    protected getRealTime() {
        if (this.paused) {
            // Calcul du temps sans le temps depuis la pause
            return (Date.now() - this.time) - this.since_pause;
        }
        else {
            return Date.now() - this.time;
        }
    }

    protected get since_pause() {
        return Date.now() - this.at_pause;
    }

    get paused() {
        return typeof this.at_pause !== "undefined";
    }

    set format(v: string) {
        if (!v) {
            this._format = undefined;
        }
        else if (Object.values(TimerFormat).includes(v)) {
            this._format = v as TimerFormat;
        }
        else {
            throw new TypeError("Format does not exists");
        }
    }

    static set default_format(v: string) {
        if (Object.values(TimerFormat).includes(v)) {
            Timer.default_format = v as TimerFormat;
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

    pause(ms?: number) {
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