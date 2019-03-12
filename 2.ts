import { Subject } from 'rxjs';

import { observerA, observerB } from './observers';

/**
 * Observale execution may have only one Observer
 * -^-abc---d-->
 * -------^-d-->
 */

const event = new Subject();

event.subscribe(observerA);

setTimeout(() => {
    event.subscribe(observerB);
}, 300);

event.next(1);
event.next(2);
event.next(3);

setTimeout(() => {
    event.next(10);
}, 1000);