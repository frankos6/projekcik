'use client';
// @flow
import * as React from 'react';
import ITrip from "@/app/app1/ITrip";
import Item from "@/app/app1/Item";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {doc, deleteDoc, updateDoc, arrayUnion, arrayRemove} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import {useState} from "react";

type Props = {
    trip: ITrip,
    id: string
};
const Trip = (props: Props) => {
    const router = useRouter();
    const [itemName, setItemName] = useState("");
    const [itemAssignee, setItemAssignee] = useState("");
    const [addingItem, setAddingItem] = useState(false);
    const deleteTrip = () => {
        deleteDoc(doc(database,"trips",props.id)).then(()=>{
            router.push('/app1');
            router.refresh();
        });
    }
    const addItem = () => {
        const newItem: Item = {name: itemName,assignee: itemAssignee}
        setAddingItem(false);
        updateDoc(doc(database,"trips",props.id), {
            items: arrayUnion(newItem)
        }).then(()=>{
            router.refresh();
            setItemName("");
            setItemAssignee("");
        })
    }
    const deleteItem = (name:string, assignee?: string) => {
        const deletedItem: Item = {name,assignee}
        updateDoc(doc(database,"trips",props.id), {
            items: arrayRemove(deletedItem)
        }).then(()=>router.refresh());
    }
    return (<>
        <div className='container-fluid d-flex justify-content-evenly w-100'>
            <Link className='btn btn-secondary col-3' href='/app1'>Go back</Link>
            <Link href={`/app1/${props.id}/edit`} className='btn btn-primary col-3'>Edit trip</Link>
            <button onClick={deleteTrip} className='btn btn-danger col-3'>Delete trip</button>
        </div>
        <div className='container d-flex flex-column text-center'>
            <div className='d-flex flex-row align-items-baseline justify-content-center'>
                <h1>{props.trip.location}</h1>
                <h4 style={{color:'gray', marginLeft:"1rem"}}>
                    {(new Date(props.trip.startDate.seconds*1000)).toLocaleDateString('pl-PL')}-{(new Date(props.trip.endDate.seconds*1000)).toLocaleDateString('pl-PL')}
                </h4>
            </div>
            <h2 style={{textAlign:'left'}}>Visitors</h2>
            <ul className='list-group col-3'>
                {props.trip.visitors.map((e,i)=><li key={i} className='list-group-item'>{e}</li>)}
            </ul>
            <h2 style={{textAlign:'left'}}>Items</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Assignee</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {props.trip.items?.map((e,i)=>{
                    return (<tr key={i}>
                        <th scope='row'>{i}</th>
                        <th>{e.name}</th>
                        <th>{e.assignee == "" || !e.assignee ? "Unassigned":e.name}</th>
                        <th><button className='btn btn-danger' onClick={()=>deleteItem(e.name,e.assignee)}>Delete</button></th>
                    </tr>)
                })}
                </tbody>
            </table>
            <button className='btn btn-primary col-4 mb-2 mt-4' onClick={()=>setAddingItem(!addingItem)}>Add an item</button>
            <form className={`container d-flex flex-row ${!addingItem?"visually-hidden":""}`} onSubmit={addItem}>
                <div className='row input-group'>
                    <input type='text' className='form-control' onChange={(e)=>setItemName(e.target.value)} placeholder="Name" required />
                    <select className='form-select' onChange={(e)=>setItemAssignee(e.target.value)}>
                        <option value=''>Unassigned</option>
                        {props.trip.visitors.map((e,i)=><option key={i}>{e}</option>)}
                    </select>
                    <button className='btn btn-primary col-2'>Add</button>
                </div>
            </form>
        </div>
    </>);
};

export default Trip;