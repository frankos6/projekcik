// @flow
import * as React from 'react';
import ITrip from "@/app/app1/ITrip";

type Props = {
    trip: ITrip
};
export default function Trip(props: Props) {
    return (
        <div className='card'>
            <h5 className='card-title'>{props.trip.location}</h5>
            <h6 className='card-subtitle text-muted'>
                {props.trip.startDate.toLocaleDateString()}-{props.trip.endDate.toLocaleDateString()}
            </h6>
            <p className='card-text'>
                {props.trip.visitors.length} visitors
                {props.trip.items?.length ?? 0} items
            </p>
        </div>
    );
};