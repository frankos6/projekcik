'use client';
// @flow
import * as React from 'react';
import ITask from "@/app/app2/ITask";
import {useRouter} from "next/navigation";

type Props = {
    id: string,
    task: ITask
};
export const Task = (props: Props) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/app2/${props.id}`)
    }
    return (
        <div className="card task m-1" onClick={onClick}>
            <h5 className="card-title">{props.task.desc}</h5>
            <div className="card-subtitle text-muted">{new Date(props.task.startDate.seconds*1000).toLocaleDateString("pl-PL")}{!props.task.endDate ? "" : `-${new Date(props.task.endDate.seconds * 1000).toLocaleDateString("pl-PL")}`}</div>
        </div>
    );
};