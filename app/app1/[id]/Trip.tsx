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
    </>);
};

export default Trip;