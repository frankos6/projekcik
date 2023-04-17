import {addDoc, collection, doc, getDoc, updateDoc} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITask from "@/app/app2/ITask";

export async function getTask(id:string): Promise<ITask | null> {
    const docSnap = await getDoc(doc(database, "trips",id));
    if (docSnap.exists()){
        return docSnap.data() as ITask
    } else return null;
}

export async function editTask(id:string, task:ITask) {
    await updateDoc(doc(database,"trips",id), {
        desc: task.desc,
        startDate: task.startDate,
        endDate: task.endDate??null,
        completed: task.completed
    })
}

export async function addTask(task:ITask) {
    await addDoc(collection(database,"trips"),task)
}