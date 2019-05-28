declare enum TimerFormat {
    millisecond = "ms",
    second = "s",
    minute = "m",
    hour = "h",
    day = "d"
}
export default class Timer {
    protected time: number;
    protected _format: TimerFormat | undefined;
    protected at_pause: number;
    protected timeout_id: number;
    protected static _default_format: TimerFormat;
    /**
     * Create a new instance of Timerize.
     * Constructing the object will start the timer automatically.
     *
     * @param time Time where the timer should start. **DON'T** change it unless you know what you're doing!
     * @param format An accepted time format (ms, s, m, h or d).
     */
    constructor(time?: number, format?: TimerFormat);
    /**
     * The elapsed time since the start of the timer.
     */
    readonly elapsed: number;
    /**
     * The elapsed time since the call to `pause()`.
     *
     * If the timer is started, could return `NaN` or `undefined`.
     */
    readonly elapsedSincePause: number;
    protected numberFormat(time: number): number;
    protected getRealTime(): number;
    protected readonly since_pause: number;
    /**
     * Check if the timer is paused.
     */
    readonly paused: boolean;
    /**
     * Change the format of the timer.
     *
     * Can be ms, s, m, h or d.
     */
    /**
    * Current time output format.
    */
    format: string;
    /**
     * Change the default format applied to new instances and instances that don't have explicitly changed format.
     *
     * See format()
     */
    /**
    * Current default format.
    */
    static default_format: string;
    /**
     * Reset the timer to now().
     */
    reset(now?: number): void;
    /**
     * Pause the current timer.
     * @param ms (optional): Automatically restart the timer after `ms` milliseconds.
     */
    pause(ms?: number): void;
    /**
     * Start the timer after a pause.
     *
     * You **don't** need to call `start()` just after instanciation.
     */
    start(): void;
    readonly [Symbol.toStringTag]: string;
}
export {};
