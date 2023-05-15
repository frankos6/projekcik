// @flow
'use client';
import * as React from 'react';
import ITask from "@/app/app2/ITask";
import {Task} from "@/app/app2/Task";
import NewModal from "@/app/app2/(modal)/new";
import {Button} from "react-bootstrap";
import {useState} from "react";

type Props = {
    tasks: {id:string,task:ITask}[]
};
const Tasks = (props: Props) => {
    const [show, setShow] = useState(false);
    const onClick = () => {
        setShow(true);
    }
    return (
        <div>
            <h3>Tasks</h3>
            <Button variant="primary" onClick={onClick}>Add a task</Button>
            {/*@ts-ignore*/}
            {props.tasks.map((e,i)=><Task key={i} id={e.id} task={e.task} />)}
            <NewModal setShow={setShow} show={show} />
        </div>
    );
};

export default Tasks;