// @flow
'use client';
import * as React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, FormLabel} from "react-bootstrap";
import {useRouter} from "next/navigation";
import {doc, updateDoc} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";

type Props = {
    show:boolean,
    setShow:Function,
    id: string
};
const CompleteModal = (props: Props) => {
    const router = useRouter();
    const handleSubmit = () => {
        updateDoc(doc(database,"tasks",props.id),{
            completed: true
        }).then(()=>{
            router.refresh();
            props.setShow(false);
        })
    }
    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLabel>Are you sure you want to mark the task as completed?</FormLabel>
                <FormLabel>This action cannot be undone!</FormLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={()=>props.setShow(false)}>Cancel</Button>
                <Button variant='danger' onClick={handleSubmit}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompleteModal;