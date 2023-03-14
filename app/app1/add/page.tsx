'use client';
// @flow
import * as React from 'react';
import {useState} from "react";
import ITrip from "@/app/app1/ITrip";
import {addDoc, collection, Timestamp} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import Link from "next/link";
import {useRouter} from "next/navigation";

type Props = {

};
const Page = (props: Props) => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [visitors, setVisitors] = useState<string[]>([]);
    const [items, setItems] = useState<ITrip[]>([]);
    const [itemCount, setItemCount] = useState(0);
    const router = useRouter();
    const addDocument = () => {
        const docRef = addDoc(collection(database,"trips"), {
            location,
            startDate: Timestamp.fromDate(startDate),
            endDate: Timestamp.fromDate(endDate),
            visitors,
            items
        }).then(()=>{
            router.push('/app1');
            router.refresh();
        })
    }
    const visitorsModified = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.split(',');
        setVisitors(v);
    }
    return (
        <div className='container-fluid d-flex flex-column'>
            <Link href='/app1' className='btn btn-primary col-2 col-xl-1'>Go back</Link>
            <form className='m-4'>
                <p className='h1'>Add a trip</p>
                <div className='mb-3'>
                    <label htmlFor='location' className='form-label'>Trip location</label>
                    <input type='text' className='form-control' id='location' placeholder='Słupsk' />
                </div>
                <label className='form-label'>Start and end date</label>
                <div className='mb-3 input-group'>
                    <input type='date' className='form-control' id='startDate' />
                    <input type='date' className='form-control' id='endDate' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='visitors' className='form-label'>Visitors</label>
                    <input type='text' className='form-control' id='visitors' placeholder='John Doe, Jan Kowalski' onChange={visitorsModified} />
                    <div className='form-text'>
                        Separate visitors with commas (,)
                    </div>
                </div>
                <div className='mb-3'>
                    <p className='h3'>Items</p>
                    {[...Array(itemCount)].map((e,i)=>(<div key={i} className='mb-3 d-flex flex-row justify-content-between'>
                        <div className='col-6 pe-1'>
                            <label className='form-label'>Name</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='col-6 ps-1'>
                            <label className='form-label'>Assignee</label>
                            <select className='form-select'>
                                <option value=''>Unassigned</option>
                                {visitors.map((e,i)=><option key={i}>{e}</option>)}
                            </select>
                        </div>
                    </div>))}
                    <button type='button' className='btn btn-primary' onClick={()=>{setItemCount(itemCount+1)}}>Add an item</button>
                </div>
            </form>
        </div>
    );
};

export default Page;