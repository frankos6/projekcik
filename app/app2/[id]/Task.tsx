// @flow
'use client';
import * as React from 'react';
import ITask from "@/app/app2/ITask";
import Link from "next/link";
import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import {EditModal} from "@/app/app2/(modal)/edit";
import CompleteModal from "@/app/app2/(modal)/complete";

type Props = {
    task: ITask,
    id: string
};
const Task = (props: Props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    return (
        <>
            <Link href='/app2' className='btn btn-primary'>Go back</Link>
            <Button onClick={()=>setShowEdit(true)} variant='secondary'>Edit</Button>
            <Button onClick={()=>setShowComplete(true)} variant='danger' disabled={props.task.completed}>Mark as completed</Button>
            <Card>
                <Card.Header>{props.task.desc}</Card.Header>
                <Card.Body>{new Date(props.task.startDate.seconds*1000).toLocaleDateString("pl-PL")}{props.task.endDate ? "-"+new Date(props.task.endDate.seconds*1000).toLocaleDateString("pl-PL") : ""}</Card.Body>
                <Card.Footer>{props.task.completed?"Completed":"In progress"}</Card.Footer>
            </Card>
            <EditModal show={showEdit} setShow={setShowEdit} id={props.id} task={props.task}/>
            <CompleteModal show={showComplete} setShow={setShowComplete} id={props.id} />
        </>
    );
};

export default Task;