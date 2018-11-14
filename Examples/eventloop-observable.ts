import * as rx from "rxjs";
import * as rxop from "rxjs/operators";
class ObservableEventLoopExample {
    static async run() {


        const signalObservable: rx.ConnectableObservable<{}> = rxop.publish()(rx.timer(0, 1000));
        const timeoutObservable: rx.Observable<{}> = rx.timer(3000);
        const stop: rx.Subject<{}> = new rx.Subject();

        signalObservable.pipe(
            rxop.take(1)
        ).subscribe(() => {
            console.log("Signal detected...");
        });

        signalObservable.subscribe(() => {
            console.log("Listener 3: signal recieved.");
        });

        signalObservable.subscribe(() => {
            console.log("Listener 4: signal recieved.");
        });

        const connection = signalObservable.connect();

        timeoutObservable.subscribe(() => { }, ex => { }, () => {
            console.log("Stopping production of events...");
            connection.unsubscribe();
            console.log("Signalling waiting promise...");
            stop.complete();
        });

        console.log("Waiting for the timeout to trigger...");
        await stop.toPromise();
        console.log("Timeout triggered.");


    }
}
export {ObservableEventLoopExample as Program}