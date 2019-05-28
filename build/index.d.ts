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
    constructor(time?: number, format?: TimerFormat);
    readonly elapsed: number;
    readonly elapsedSincePause: number;
    protected numberFormat(time: number): number;
    protected getRealTime(): number;
    protected readonly since_pause: number;
    readonly paused: boolean;
    format: string;
    static default_format: string;
    reset(): void;
    pause(ms?: number): void;
    start(): void;
    readonly [Symbol.toStringTag]: string;
}
export {};
