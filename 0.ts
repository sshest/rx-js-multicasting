import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { observerA, observerB } from './observers';

/**
 * Observale execution may have only one Observer
 * -^-a-b-c-d|
 * ----^-a-b-c-d|
 */

const observable = interval(1000).pipe(take(5));

observable.subscribe(observerA); // create an execution

setTimeout(() => {
    observable.subscribe(observerB);
}, 3000);