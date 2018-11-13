import * as rx from "rxjs";
import * as rxop from "rxjs/operators";
class FizzBuzzEvent {
    constructor(public n: number, public handled: boolean) { }
}
class SlightlyBetterObservableFizzBuzz {
    static async run() {
        const numbers: rx.ConnectableObservable<FizzBuzzEvent> = <rx.ConnectableObservable<FizzBuzzEvent>>
            rx.interval(1000).pipe(
                rxop.map(n => {
                    return new FizzBuzzEvent(n, false);
                }),
                rxop.publish());
        function buildCase(mod: number, text: string) {
            return numbers.pipe(
                rxop.filter(evt => !evt.handled && evt.n % mod == 0),
                rxop.tap(evt => evt.handled = true),
                rxop.map(evt => text));
        }
        rx.merge(
            buildCase(15, "FizzBuzz"),
            buildCase(5, "Buzz"),
            buildCase(3, "Fizz"),
            numbers.pipe(
                rxop.filter(evt => !evt.handled),
                rxop.tap(evt => evt.handled = true),
                rxop.map(evt => evt.n.toString())
            ))
            .subscribe(str => console.log(str));
        numbers.connect();
    }
}