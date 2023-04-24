// @flow
import * as React from 'react';
import {getTask} from "@/app/app2/functions";
import {notFound} from "next/navigation";
import Link from "next/link";

type Props = {
    params: {id: string}
};
const Page = async (props: Props) => {
    let task = await getTask(props.params.id);
    if (!task){
        notFound();
    }
    return (
        <>
            <Link href='/app2' className='btn btn-primary'>Go back</Link>
            <div className='card'>
                <div className='card-title'>{task.desc}</div>
                <div className='card-text'>{new Date(task.startDate.seconds*1000).toLocaleDateString()}{task.endDate ? "-"+new Date(task.endDate.seconds*1000).toLocaleDateString() : ""}</div>
                <div className='card-footer'>{task.completed?"Completed":"In progress"}</div>
            </div>
        </>
    );
};

export default Page;