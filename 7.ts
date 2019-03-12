import {
    Subject, interval
} from "rxjs/index";
import { multicast , take } from "rxjs/internal/operators";
import { observerA, observerB } from "./observers";

/**
 * RefCount: automatically start and stop execution by counting subscriptions
 */

const shared = interval(1000)
    .pipe(
        tap(() => log('source ' + x)),
        // Subscribes on outer stream and produces inner stream through subject
        multicast(new Subject()),
        refCount()
    );


const subA = shared.subscribe(observerA); // start stream execution (aka connect())

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
