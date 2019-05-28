# timerize

> A timy timer package to time things !

## Installation
```bash
npm i timerize
```

## Usage
```ts
// If you use Node / CommonJS / not a ES2015 module compiler
const Timer = require('timerize').default;

// If you use TypeScript / a ES2015 module-compatible navigator/compiler
import Timer from 'timerize';


const timer = new Timer;

console.log(timer.elapsed); // 12 for exemple

// Change the format of number output
timer.format = "s";

console.log(timer.elapsed); // 1.123 for exemple

// Change the default format for every new Timer instances and instance with unchanged format
Timer.default_format = "s";

timer.pause();

// do things

timer.start();

// ...
```

**Important note**:

The timer does not consume *any* resource when it is "running". 
Calculations are made when you get the elapsed time.

You can leave him without call `pause()` and waiting for it became garbage-collected.

## Reference
### @@constructor

You can provide two optional arguments: time (starting time, default `Date.now()`) and format (default `Timer.default_format`).
Timer *automatically* starts after instanciation, you do not need to call `.start()` !

```ts
const timer = new Timer(Date.now(), "s");
```

### elapsed

Get elapsed time according to desired format
```ts
const elapsed_time = timer.elapsed;
```

### format

Change the elapsed time format output.

Accepted formats are `ms`, `s`, `m`, `h` and `d`, for milliseconds, seconds, minutes, hours and days.

```ts
timer.format = "m";
```

You can also change defaut format for new instances (and instances that does not have a specified format) with `Timer.default_format`
```ts
Timer.default_format = "s";
```

### pause()

Pause the timer.
You can optionnaly specify a number of milliseconds of how much time the timer should restart automatically.

If the timer is already paused, it will have **no** action.

```ts
timer.pause(ms?);
```

### start()

Start the timer after a pause.

If the timer was not paused, it will be reset.

```ts
timer.start();
```

### paused

Check if the timer is paused.

```ts
if (timer.paused) {
    // do sth
}
```
