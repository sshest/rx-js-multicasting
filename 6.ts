import {
    ReplaySubject, ConnectableObservable, interval
} from "rxjs/index";
import { multicast , take } from "rxjs/internal/operators";
import { observerA, observerB } from "./observers";

/**
 * Connection operator: multicast and connect
 */

const connectableObservable = interval(1000)
.pipe(
    take(6),
    // Subscribes on outer stream and produces inner stream through subject
    multicast(new ReplaySubject(100))
) as ConnectableObservable<number>;


connectableObservable.connect();
connectableObservable.subscribe(observerA);

setTimeout(function () {
    connectableObservable.subscribe(observerB);
}, 4500);