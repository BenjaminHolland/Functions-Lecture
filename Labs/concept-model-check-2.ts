//Classify the following by describing each item, using
//Either Named or Anonymous
//Either Lambda or Non-Lambda (If we've been over that)
//Either First-Order or Higher-Order


//Example
//Named, First-Order, Non-Lambda
function hello(message:string):void{
    console.log(message);
}

//A
((s:string)=>{
    console.log(s);
})("hello");

//B
function B(s:string){
    return ()=>console.log(s);
}

//C
let C=()=>{}

//D
let D=()=>{
    return ()=>{
        return ()=>{
            return C;
        }
    }
}


//E
let E=((g:()=>number):(number)=>number=>{
    return x=>{
        return g()*x;
    };
})(()=>3);