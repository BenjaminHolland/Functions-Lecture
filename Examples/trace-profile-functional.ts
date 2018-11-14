
//Tracing and profiling example
function trace(fn:(...args:any[])=>void,onEnter:string,onExit:string){
    return (...args)=>{
        console.log(onEnter);
        fn(...args);
        console.log(onExit);
    }
}
function profile(fn:(...args:any[])=>void,label:string){
    return (...args)=>{
        console.time(label);
        fn(...args);
        console.timeEnd(label);
    }
}
function target(a:number,b:number){
    let x=0;
    console.log(a,b);
    for(let i=0;i<a;i++){
        for(let j=0;j<b;j++){
            for(let k=0;k<i*j;k++){
                x+=1;
            }
        }
    }
    console.log("Computed ",x);
}
class InstrumentationExample{
    static run(){
        let instrumentedTarget:(a:number,b:number)=>void=trace(profile(target,"target"),"Starting Target","Ending Target");
        instrumentedTarget(3,6);
    }
}
export {InstrumentationExample as Program};