import { EventEmitter } from "events";
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