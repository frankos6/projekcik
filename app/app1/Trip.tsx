'use client';
// @flow
import * as React from 'react';
import ITrip from "@/app/app1/ITrip";
import {useRouter} from "next/navigation";
import './style.css'

type Props = {
    id: string,
    trip: ITrip
};
export default function Trip(props: Props) {
    const router = useRouter();
    const onClick = () => {
        router.push(`/app1/${props.id}`)
    }
    return (
        <div className='card p-1 col-5 col-xs-6 trip ps-2 pe-2 m-3' onClick={onClick} >
            <h5 className='card-title'>{props.trip.location}</h5>
            <h6 className='card-subtitle text-muted'>
                {(new Date(props.trip.startDate.seconds*1000)).toLocaleDateString('pl-PL')}-{(new Date(props.trip.endDate.seconds*1000)).toLocaleDateString('pl-PL')}
            </h6>
            <p className='card-text'>
                {props.trip.visitors.length} visitors<br/>
                {props.trip.items?.length ?? 0} items
            </p>
        </div>
    );
};