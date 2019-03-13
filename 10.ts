import {
    ReplaySubject, interval
} from "rxjs";
import { delay, map, merge, multicast , refCount, take, tap } from "rxjs/internal/operators";
import { observerA, observerB, log } from "./observers";

/**
 * Multicast with a subjectFactory + selector function
 */


function subjectFactory() {
    return new ReplaySubject();
}

const result = interval(1000)
    .pipe(
        take(5),
        tap(x => log('source ' + x)),
        map(x => Math.random()),
        // selector gives possibility to transform main stream
        // it returns Observable - no need to connect()
        multicast(subjectFactory, function selector(shared) {
            const delayedShared = shared.pipe(
                delay(500),
                map(v => 'delayed ' + v)
            );
            const merged = merge(shared, delayedShared);
            
            return merged;
}),
        refCount()
    );

let sub = result.subscribe(observerA);