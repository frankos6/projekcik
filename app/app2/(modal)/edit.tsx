// @flow
'use client';
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FormEvent, useRef} from "react";
import {doc, Timestamp, updateDoc} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import {useRouter} from "next/navigation";
import ITask from "@/app/app2/ITask";

type Props = {
    show:boolean,
    setShow:Function,
    id:string,
    task:ITask
};
export const EditModal = (props: Props) => {
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateDoc(doc(database,"tasks",props.id), {
            desc: descRef.current.value,
            startDate: Timestamp.fromDate(new Date(startRef.current.value)),
            endDate: endRef.current.value !== "" ? Timestamp.fromDate(new Date(endRef.current.value)) : null
        }).then(()=>{
            router.refresh();
            props.setShow(false);
        })
    }
    const descRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const startRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const endRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Form.Group>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type='text' placeholder='Throw out the trash' ref={descRef} required defaultValue={props.task.desc}/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Start and end date</Form.Label>
                        <InputGroup>
                            <Form.Control type='date' ref={startRef} required defaultValue={new Date(props.task.startDate.seconds*1000).toISOString().substring(0, 10)}/>
                            <Form.Control type='date' ref={endRef} defaultValue={props.task.endDate ? new Date(props.task.endDate.seconds*1000).toISOString().substring(0, 10) : ""}/>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.setShow(false)}>Cancel</Button>
                <Button variant='primary' onClick={()=>formRef.current.requestSubmit()}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};