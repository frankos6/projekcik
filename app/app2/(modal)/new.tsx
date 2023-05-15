'use client';
// @flow
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {FormEvent, useRef} from "react";
import {addDoc, collection, Timestamp} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import {useRouter} from "next/navigation";

type Props = {
    show:boolean,
    setShow:Function
};
const NewModal = (props: Props) => {
    const router = useRouter();
    const handleClose = () => props.setShow(false);
    const handleSave = () => {formRef.current.requestSubmit()}
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const docRef = addDoc(collection(database,"tasks"),{
            desc: descRef.current.value,
            startDate: Timestamp.fromDate(new Date(startRef.current.value)),
            endDate: endRef.current.value !== "" ? Timestamp.fromDate(new Date(endRef.current.value)) : null,
            completed: false
        }).then(()=>{
            router.refresh();
            handleClose();
        })
    }
    const descRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const startRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const endRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Form.Group>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type='text' placeholder='Throw out the trash' ref={descRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start and end date</Form.Label>
                        <Form.Control type='date' ref={startRef} required/>
                        <Form.Control type='date' ref={endRef} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant='primary' onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewModal;