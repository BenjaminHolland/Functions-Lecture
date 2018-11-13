import * as rx from "rxjs";
import * as rxop from "rxjs/operators";
class FizzBuzzEvent {
    constructor(public n: number, public handled: boolean) { }
}
class ObservableFizzBuzzExample {
    static async run() {
        const numbers: rx.ConnectableObservable<FizzBuzzEvent> = <rx.ConnectableObservable<FizzBuzzEvent>>
            rx.interval(1000).pipe(
                rxop.map(n => {
                    return new FizzBuzzEvent(n, false);
                }),
                rxop.publish());

        const fizzbuzz: rx.Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 15 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "FizzBuzz")
        )
        const fizz: rx.Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 3 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "Fizz")
        )
        const buzz: rx.Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 5 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "Buzz")

        );
        const base: rx.Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => evt.n.toString())
        );

        const final = rx.merge(fizzbuzz, fizz, buzz, base);
        final.subscribe(str => console.log(str));
        numbers.connect();

    }
}