'use client';
// @flow
import * as React from 'react';
import {useState} from "react";
import {addDoc, collection, Timestamp} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Item from "@/app/app1/Item";

type Props = {

};
const Page = (props: Props) => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [visitors, setVisitors] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isUploading ,setIsUploading] = useState(false);
    const blankItems: Item[] = [];
    const router = useRouter();
    const addDocument = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        const docRef = addDoc(collection(database,"trips"), {
            location,
            startDate: Timestamp.fromDate(startDate),
            endDate: Timestamp.fromDate(endDate),
            visitors,
            items: blankItems
        }).then(()=>{
            router.push('/app1');
            router.refresh();
        }).catch((reason)=>{
            setError(reason.message);
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
    return (
        <div className='container-fluid d-flex flex-column'>
            <Link href='/app1' className='btn btn-primary col-2 col-xl-1'>Go back</Link>
            <form className='m-4' onSubmit={addDocument}>
                <p className='h1'>Add a trip</p>
                <div className='mb-3'>
                    <label htmlFor='location' className='form-label'>Trip location</label>
                    <input type='text' className='form-control' id='location' placeholder='Słupsk' onChange={locationModified} required />
                </div>
                <label className='form-label'>Start and end date</label>
                <div className='mb-3 input-group'>
                    <input type='date' className='form-control' id='startDate' onChange={startDateModified} required />
                    <input type='date' className='form-control' id='endDate' onChange={endDateModified} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='visitors' className='form-label'>Visitors</label>
                    <input type='text' className='form-control' id='visitors' placeholder='John Doe, Jan Kowalski' onChange={visitorsModified} required />
                    <div className='form-text'>
                        Separate visitors with commas (,)
                    </div>
                </div>
                <label className='form-label mb-4'>You can add items later on</label>
                <label className={`col-12 alert alert-danger ${error == '' ? 'visually-hidden' : ''}`} role='alert'>{error}</label>
                <button className='btn btn-primary form-control col-4' disabled={isUploading}>
                    {isUploading?<div className='spinner-border' style={{height:".9rem",width:".9rem",borderWidth:".2rem"}}></div>:<></>} Add trip
                </button>
            </form>
        </div>
    );
};

export default Page;