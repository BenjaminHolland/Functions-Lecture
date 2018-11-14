type ImDeclaredWithAName=number;
class NamedUnnamedExample{
    static ImNamed(because:ImDeclaredWithAName){
        console.log("This function was declared with a name");
    }
    static run(){
        type AmUnnamed=number;
        type ImAFunctionExpression=string;
        type AssignedAName=number;
        ((i:AmUnnamed)=>{
            console.log("I will never be seen again!");
            console.log("Here's the thing you gave me",i);
        })(5);
        let ImAlsoNamed=(because:ImAFunctionExpression):AssignedAName=>{
            return 2;
        }
        ImAlsoNamed("I Can Be Referred to later by name.");


    }
}
export {NamedUnnamedExample as Program}