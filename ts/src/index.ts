enum TimerFormat {
    millisecond = "ms", second = "s", minute = "m", hour = "h", day = "d"
}

export default class Timer {
    protected _format: TimerFormat | undefined;
    protected at_pause: number;
    protected timeout_id: number;

    protected static _default_format = TimerFormat.millisecond;

    /**
     * Create a new instance of Timerize.
     * Constructing the object will start the timer automatically.
     * 
     * @param time Time where the timer should start. **DON'T** change it unless you know what you're doing!
     * @param format An accepted time format (ms, s, m, h or d).
     */
    constructor(protected time = Date.now(), format?: TimerFormat) {
        this.format = format;
    }

    /**
     * The elapsed time since the start of the timer.
     */
    get elapsed() {
        return this.numberFormat(this.getRealTime());
    }

    /**
     * The elapsed time since the call to `pause()`.
     * 
     * If the timer is started, could return `NaN` or `undefined`.
     */
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

    /**
     * Check if the timer is paused.
     */
    get paused() {
        return typeof this.at_pause !== "undefined";
    }

    /**
     * Change the format of the timer.
     * 
     * Can be ms, s, m, h or d.
     */
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

    /**
     * Change the default format applied to new instances and instances that don't have explicitly changed format.
     * 
     * See format()
     */
    static set default_format(v: string) {
        if (Object.values(TimerFormat).includes(v)) {
            Timer.default_format = v as TimerFormat;
        }
        else {
            throw new TypeError("Format does not exists");
        }
    }

    /**
     * Current default format.
     */
    static get default_format() {
        return Timer._default_format;
    }

    /**
     * Current time output format.
     */
    get format() {
        return this._format;
    }

    /**
     * Reset the timer to now().
     */
    reset(now = Date.now()) {
        this.time = now;
        this.at_pause = undefined;
    }

    /**
     * Pause the current timer.
     * @param ms (optional): Automatically restart the timer after `ms` milliseconds.
     */
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

    /**
     * Start the timer after a pause.
     * 
     * You **don't** need to call `start()` just after instanciation.
     */
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