export class FnUtil {
  public static wrap<T extends Array<any>, U>(fn: (...args: T) => U) {
    return (...args: T): U => fn(...args);
  }
}

export function debouncer<T>(time: number, callback: (arg: T) => void): (arg: T) => void {
  let timeout: any = null;
  return (arg: T) => {
    if (timeout != null)
      window.clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback(arg);
      timeout = null;
    }, time)
  }
}

/**
 * Throttle callback so that calls cannot happen more frequently than time(ms).
 */
export function throttler<T>(time: number, callback: (arg: T) => void): (arg: T) => void {
  let timeout: any = null;
  let lastCall: number = 0;
  return (arg: T) => {
    // We've recently called the function. No need to call again.
    if (timeout != null)
      return;

    const now = Date.now();
    const msSinceLastCall = now - lastCall;
    if (msSinceLastCall > time) {
      // We've lapsed the time ms value completely, so we just need to call function.
      lastCall = now;
      callback(arg);
    }
    else {
      // We've called the method recently. Register a callback so it gets called again after timeout.
      const timeToWait = time - msSinceLastCall;
      timeout = setTimeout(
        () => {
          timeout = null;
          lastCall = Date.now();
          callback(arg);
        }, timeToWait);
    }
  }
}