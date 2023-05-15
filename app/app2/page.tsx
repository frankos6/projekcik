// @flow
import * as React from 'react';
import {collection,getDocs} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITask from "@/app/app2/ITask";
import './style.css';
import Tasks from "@/app/app2/Tasks";

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
        <Tasks tasks={tasks} />
    );
};

export default Page;