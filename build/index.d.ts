declare enum TimerFormat {
    millisecond = "ms",
    second = "s",
    minute = "m",
    hour = "h",
    day = "d"
}
export default class Timer {
    protected time: number;
    protected _format: TimerFormat;
    protected at_pause: number;
    constructor(time?: number, format?: TimerFormat);
    readonly elapsed: number;
    protected getRealTime(): number;
    protected readonly since_pause: number;
    readonly paused: boolean;
    format: string;
    reset(): void;
    pause(): void;
    start(): void;
}
export {};
