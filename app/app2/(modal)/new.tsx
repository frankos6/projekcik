'use client';
// @flow
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useRef} from "react";
import {addDoc, collection, Timestamp} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import {useRouter} from "next/navigation";

type Props = {
    show:boolean,
    setShow:Function
};
const newModal = (props: Props) => {
    const router = useRouter();
    const handleClose = () => props.setShow(false);
    const handleSubmit = () => {
        const docRef = addDoc(collection(database,"tasks"),{
            description: descRef.current.value,
            startDate: Timestamp.fromDate(new Date(startRef.current.value)),
            endDate: endRef.current.value !== "" ? Timestamp.fromDate(new Date(endRef.current.value)) : undefined,
            completed: false
        }).then(()=>{
            router.refresh();
            handleClose();
        })
    }
    const descRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const startRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const endRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type='text' placeholder='Throw out the trash' ref={descRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start and end date</Form.Label>
                        <Form.Control type='date' ref={startRef} />
                        <Form.Control type='date' ref={endRef} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant='primary' onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default newModal;