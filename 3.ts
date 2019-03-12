import { BehaviorSubject } from 'rxjs';

import { log, observerA, observerB } from './observers';

/**
 * -a----b--c--d--->
 * --^a--b--c--d-->
 * -------------^-d-->
 */

const subject = new BehaviorSubject(0); // Remembers last value even after being completed
log('observerA subscribed');

subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);


setTimeout(() => {
    subject.subscribe(observerB);
}, 300);
