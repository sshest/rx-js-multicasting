import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { observerA, observerB } from './observers';

/**
 * Observale execution may have only one Observer
 * -^-a-b-c-d|
 * ----^b-c-d|
 */

const observable = interval(1000).pipe(take(5));

const bridge = new Subject();

bridge.subscribe(observerA);

observable.subscribe(bridge); // create an execution

setTimeout(() => {
    bridge.subscribe(observerB);
}, 3000);