import { ReplaySubject } from 'rxjs';

import { log, observerA, observerB } from './observers';

/**
 * --a--b--c--d|
 * -^a--b--c--d-
 * -------------^-a,b,c,d>
 */

const subject = new ReplaySubject(10); // Replays last values by buffer size

subject.subscribe(observerA);
log('observerA subscribed');

setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subject.next(3), 400);
setTimeout(() => subject.next(3), 500);
setTimeout(() => subject.complete(), 600);

setTimeout(() => {
    subject.subscribe(observerB);
    log('observerB subscribed');

}, 400);
