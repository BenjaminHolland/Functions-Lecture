
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