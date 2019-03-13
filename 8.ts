import {
    Subject, interval
} from "rxjs";
import { share, tap } from "rxjs/internal/operators";
import { observerA, observerB, log } from "./observers";
(
/**
 * publish - combines multicast with different Subjects
 */

// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
// publishBehavior = multicast + BehaviorSubject
// publishLast = multicast + AsyncSubject

/**
 * share - combines publish with refCount
 */
// share = publish + refCount
// shareReplay = publishReplay + refCount

const shared = interval(1000)
    .pipe(
        tap(x => log('source ' + x)),
        // Subscribes on outer stream and produces inner stream through subject
        share()
    );


let subA = shared.subscribe(observerA); // start stream execution (aka connect())

let subB;
setTimeout(() => {
    subB = shared.subscribe(observerB); // 1 -> 2 subscriptions
}, 3000);

setTimeout(() => {
    subA.unsubscribe(); // 2 -> 1
    log('unsubscribed A');
}, 6000);

setTimeout(() => {
    subB.unsubscribe(); // 1 -> 0; Connect unsubscribed;
    log('unsubscribed B');

}, 9000);

