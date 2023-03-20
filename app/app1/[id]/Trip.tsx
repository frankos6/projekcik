'use client';
// @flow
import * as React from 'react';
import ITrip from "@/app/app1/ITrip";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {doc,deleteDoc} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";

type Props = {
    trip: ITrip,
    id: string
};
const Trip = (props: Props) => {
    const router = useRouter();
    const deleteTrip = () => {
        deleteDoc(doc(database,"trips",props.id)).then(()=>{
            router.push('/app1');
            router.refresh();
        });
    }
    return (<>
        <div className='container-fluid d-flex justify-content-evenly w-100'>
            <button className='btn btn-secondary col-3' onClick={()=>router.back()}>Go back</button>
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
                {props.trip.visitors.map((e,i)=><li className='list-group-item'>{e}</li>)}
            </ul>
        </div>
    </>);
};

export default Trip;