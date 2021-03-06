import {
    ReplaySubject, interval
} from "rxjs";
import { multicast , refCount, take, tap } from "rxjs/internal/operators";
import { observerA, observerB, log } from "./observers";

/**
 * Multicast with a subjectFactory
 */


function subjectFactory() {
    return new ReplaySubject();
}

const shared = interval(1000).take(5)
    .pipe(
        tap(x => log('source ' + x)),
        // Factory will give new instance of Subject and start new stream
        multicast(subjectFactory),
        refCount()
    );
// subject: --0--1--2--3--4|
//                          A
// subject 2:               --0--1--2--3--4|

let subA = shared.subscribe(observerA); // start stream execution (aka connect())

let subB;
setTimeout(() => {
    subB = shared.subscribe(observerB); // 1 -> 2 subscriptions
}, 3000);

setTimeout(() => {
    subA.unsubscribe(); // 2 -> 1
    log('unsubscribed A');
}, 5000);

setTimeout(() => {
    subB.unsubscribe(); // 1 -> 0; Connect unsubscribed;
    log('unsubscribed B');

}, 7000);

setTimeout(() => {
    subA = shared.subscribe(observerA); // 0 -> 1; New subscription;
    log('subscribed A');

},9000);