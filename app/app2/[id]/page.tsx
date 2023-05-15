// @flow
import * as React from 'react';
import {getTask} from "@/app/app2/functions";
import {notFound} from "next/navigation";
import Task from "@/app/app2/[id]/Task";

type Props = {
    params: {id: string}
};
const Page = async (props: Props) => {
    let task = await getTask(props.params.id);
    if (!task){
        notFound();
    }
    return (
        <Task id={props.params.id} task={task} />
    );
};

export default Page;