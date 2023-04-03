'use client';

import ITrip from "@/app/app1/ITrip";
import Link from "next/link";
import React, { useState } from "react";
import {doc, Timestamp, updateDoc} from "@firebase/firestore";
import {useRouter} from "next/navigation";
import {database} from "@/app/firebaseConfig";

type Props = {
    trip: ITrip,
    id: string
};
function Form(props: Props) {
    const router = useRouter();
    const editDocument = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        updateDoc(doc(database,"trips",props.id), {
            location,
            startDate: Timestamp.fromDate(startDate),
            endDate: Timestamp.fromDate(endDate),
            visitors
        }).then(()=>{
            router.push(`/app1/${props.id}`);
            router.refresh();
        })
    }
    const visitorsModified = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.split(',');
        v.map((s,i)=>v[i]=s.trim());
        setVisitors(v);
    }
    const locationModified = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }
    const startDateModified = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(new Date(e.target.value))
    }
    const endDateModified = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(new Date(e.target.value))
    }
    const [location, setLocation] = useState(props.trip.location);
    const [startDate, setStartDate] = useState<Date>(new Date(props.trip.startDate.seconds*1000));
    const [endDate, setEndDate] = useState<Date>(new Date(props.trip.endDate.seconds*1000));
    const [visitors, setVisitors] = useState<string[]>(props.trip.visitors);
    const [isUploading, setIsUploading] = useState(false);
    return (
        <div className='container-fluid d-flex flex-column'>
            <Link href={`/app1/${props.id}`} className='btn btn-primary col-2 col-xl-1'>Go back</Link>
            <form className='m-4' onSubmit={editDocument}>
                <p className='h1'>Edit trip</p>
                <div className='mb-3'>
                    <label htmlFor='location' className='form-label'>Trip location</label>
                    <input value={location} type='text' className='form-control' id='location' placeholder='Słupsk' onChange={locationModified} required />
                </div>
                <label className='form-label'>Start and end date</label>
                <div className='mb-3 input-group'>
                    <input type='date' className='form-control' id='startDate' onChange={startDateModified} required value={startDate.toISOString().substring(0,10)} />
                    <input type='date' className='form-control' id='endDate' onChange={endDateModified} required value={endDate.toISOString().substring(0,10)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='visitors' className='form-label'>Visitors</label>
                    <input value={visitors.join(', ')} type='text' className='form-control' id='visitors' placeholder='John Doe, Jan Kowalski' onChange={visitorsModified} required />
                    <div className='form-text'>
                        Separate visitors with commas (,)
                    </div>
                </div>
                <button className='btn btn-primary form-control col-4' disabled={isUploading}>
                    {isUploading?<div className='spinner-border' style={{height:".9rem",width:".9rem",borderWidth:".2rem"}}></div>:<></>} Edit trip
                </button>
            </form>
        </div>
    );
}

export default Form;