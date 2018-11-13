//Classify the following by describing each item, using
//Either Named or Anonymous
//Either Lambda or Non-Lambda (If we've been over that)
//Either First-Order or Higher-Order

//NOTE: Some answers depend on how they're used. You will need to
//read all the questions before answering.

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
let E=B;

//F
let F=((g:()=>number):(number)=>number=>{
    return x=>{
        return g()*x;
    };
})(()=>3);