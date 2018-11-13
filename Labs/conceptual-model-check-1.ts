//Classify the following functions as either 
//First-Order,
//Higher-Order,
//Ambiguous

function a(l:number,m:number){
    return l+m;
}
function b(l,m:number):number{
    return l(m);
}
function c(l,m:number){
    return l+m;
}
function d(l:()=>void,m:number):()=>number{
    return ()=>{
        l();
        return m;
    }
}
function e():void{
    console.log("Hello");
}
function f(l:number):number{
    return d(e,5)();
}
function g(r:(number)=>boolean,n:number):void{
    if(r(n)) return;
    console.log("Got ",n);
    g(r,n-1);
}

