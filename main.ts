import { EventEmitter } from "events";
import { Observable } from "rxjs";
import * as rx from "rxjs";
import * as rxop from "rxjs/operators";

//Slide 1: Summary of Intention
//  Include Keywords
//Provide In GitHub

//Provide Visualization of the Event Loop
//Explain that not every detail will be explained
//Proivde resources

//Add Activities
//Add Questions

//Break Up This Code Into Single Slide Chunks

//Savvy people will bring up lambdas
interface SomeInput { }
interface AndProducesSomeOutput { }
interface Data { }
interface AndReturnData { }
type AFunction = () => number;
type AndReturnAFunction = () => void;
class GeneralFunctionDescriptions {
    aFunction(takes: SomeInput): AndProducesSomeOutput {
        console.log(`I got some input! Look: `,takes);
        return { message: "I'm the output." };
    }
    mostFunctionsYouHaveSeen(take: Data): AndReturnData {
        console.log(`I got some input! Look: `,take);
        return { message: "I'm the output." };
    }
    butSomeFunctions(take: AFunction): AndReturnData {
        return { message: `Your function produced...${JSON.stringify(take())}`, }
    }
    otherFunctions(take: Data): AndReturnAFunction {
        return () => { 
            console.log(`Wow, I was created inside a function. Here's your data: `,take) };
    }
    stillOthersBoth(take: AFunction): AndReturnAFunction {
        return () => {
            console.log("Running the function you gave me...");
            console.log("The result was: ",take());
            console.log("I finished! Yay!");
        }
    }
    static run() {
        const _: GeneralFunctionDescriptions = new GeneralFunctionDescriptions();
        console.log(_.aFunction({ message: "HELLO YES I AM THE DATA" }));
        console.log(_.mostFunctionsYouHaveSeen({ message: "HELLO YES I AM STILL THE DATA" }));
        console.log(_.butSomeFunctions(() => 1432));
        _.otherFunctions({ message: "PLEASE STOP I HAVE WORK TO DO" })();
        _.stillOthersBoth(() => {
            console.log("Hello!");
            return 4;
        })();
    }
}
class TriviallySimplePromiseExample {
    static async run() {
        const iPromiseYouAThreeInASecond: Promise<number> = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 1000);
        });
        await iPromiseYouAThreeInASecond.then(n => console.log(`See, I told you I'd give you a ${n}.`));
    }
}
class TriviallySimpleAsyncExample {
    static sleepAsync(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static async run() {
        const iPromiseYouAThreeInASecond: () => Promise<number> = async () => {
            await this.sleepAsync(1000);
            return 3;
        }
        const thePromiseIMadeYou = iPromiseYouAThreeInASecond();
        const theThreeIPromisedYou = await thePromiseIMadeYou;
        console.log(`Here's that three you wanted a second ago. ${theThreeIPromisedYou}`);
    }
}
class RawEventLoopExample {
    static run(): Promise<{}> {

        const signal: EventEmitter = new EventEmitter();

        signal.once("signaled", () => {
            console.log("Signed detected...");
        });

        signal.on("signaled", () => {
            console.log("listener 1: signal recieved");
        });

        signal.on("signaled", () => {
            console.log("listener 2: signal recieved");
        });

        const handle: NodeJS.Timeout = setInterval(() => {
            signal.emit("signaled");
        }, 1000);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Stopping");
                clearInterval(handle);
                resolve();
            }, 3000);
        });
    }
}
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
class ObservableFizzBuzzExample {
    static async run() {
        const numbers: rx.ConnectableObservable<FizzBuzzEvent> = <rx.ConnectableObservable<FizzBuzzEvent>>
            rx.interval(1000).pipe(
                rxop.map(n => {
                    return new FizzBuzzEvent(n, false);
                }),
                rxop.publish());

        const fizzbuzz: Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 15 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "FizzBuzz")
        )
        const fizz: Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 3 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "Fizz")
        )
        const buzz: Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.filter(evt => evt.n % 5 == 0),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => "Buzz")

        );
        const base: Observable<string> = numbers.pipe(
            rxop.filter(evt => !evt.handled),
            rxop.tap(evt => evt.handled = true),
            rxop.map(evt => evt.n.toString())
        );

        const final = rx.merge(fizzbuzz, fizz, buzz, base);
        final.subscribe(str => console.log(str));
        numbers.connect();

    }
}
class ObservableExample {
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
            connection.unsubscribe();
            stop.complete();
        });

        await stop.toPromise();


    }
}

class Program {
    static async main() {
        await RawEventLoopExample.run();
        await ObservableExample.run();
    }
}

// process.on("beforeExit", () => {
//     console.log("Stopped");
// });

//Program.main().then(() => console.log("Completed Both"));
//SlightlyBetterObservableFizzBuzz.run();
//GeneralFunctionDescriptions.run();

let DoesSomeOperation= function (){
    console.log("Done");
}
function TimeFunction(func:()=>void){
    return ()=>{
    console.time("F");
    func();
    console.timeEnd();
    }
}
DoesSomeOperation=TimeFunction(DoesSomeOperation);
DoesSomeOperation();