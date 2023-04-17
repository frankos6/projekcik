import {Timestamp} from "@firebase/firestore";

export default interface ITask {
    desc:string,
    startDate: Timestamp,
    endDate?: Timestamp,
    completed: boolean
}