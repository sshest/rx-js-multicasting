import 'colors';

export const observerA = {
    next: v => console.log('[A] Next:'.cyan, v),
    error: err => console.log('[A] Error'.cyan, err),
    complete: () => console.log(('[A] Done'.cyan))
};

export const observerB = {
    next: v => console.log('[B] Next:'.blue, v),
    error: err => console.log('[B] Error'.blue, err),
    complete: () => console.log(('[B] Done'.blue))
};

export function log(...args) {
    console.log(...args);
}

console.clear();