import { queue } from "rxjs/internal/scheduler/queue";
import { timeInterval } from "rxjs/operators";
import {*} from "ts-priority-queue";
enum EventTypes{
    ChangeValue,
    ValueChanged,
    Print
}
interface Event{
    event:EventTypes;
    at:Date;
    data:string;
}
class NonFunctionalScheduler{
    constructor(private q:PriorityQueue=new Event[0]){

    }
    run():void{
        let data:string="default";
        while(this.q.length!=0){
            while(this.q[0].at.getTime()<Date.now());
            const next:Event=<Event>this.q.pop();
            
            switch(next.event){
                case EventTypes.Print:
                    console.log(data);
                    break;
                case EventTypes.ChangeValue:
                    data=next.data;
            }
        }
    }
}