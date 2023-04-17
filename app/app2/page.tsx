// @flow
import * as React from 'react';
import {collection,getDocs} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITask from "@/app/app2/ITask";

type Props = {

};
const Page = async (props: Props) => {
    const query = await getDocs(collection(database, "tasks"));
    let tasks: {id:string,task:ITask}[] = [];
    query.forEach((doc)=>{
        let obj = {
            id: doc.id,
            task: doc.data() as ITask
        };
        tasks.push(obj);
    })

    return (
        <div>
            <h3>Tasks</h3>
            {/*@ts-ignore*/}
            {tasks.map((e,i)=><div key={i}>{e.task.desc}{e.task.startDate.toDate().toLocaleDateString()}{e.task.completed?"xd":"xddd"}</div>)}
        </div>
    );
};

export default Page;