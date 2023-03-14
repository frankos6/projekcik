'use client';
// @flow
import * as React from 'react';
import ITrip from "@/app/app1/ITrip";
import {useRouter} from "next/navigation";
import Link from "next/link";

type Props = {
    trip: ITrip
};
const Trip = (props: Props) => {
    const router = useRouter();
    return (<>
        <div className='container-fluid d-flex justify-content-evenly w-100'>
            <button className='btn btn-secondary col-3' onClick={()=>router.back()}>Go back</button>
            <Link href={'/app1/'} className='btn btn-primary col-3'>Edit trip</Link>
            <button className='btn btn-danger col-3'>Delete trip</button>
        </div>
    </>);
};

export default Trip;