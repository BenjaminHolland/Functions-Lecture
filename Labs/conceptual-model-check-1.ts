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
function e():void{}

