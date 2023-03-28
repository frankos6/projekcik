// @flow
import * as React from 'react';
import {collection,getDocs} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITrip from "@/app/app1/ITrip";
import Trip from "@/app/app1/Trip";
import Link from "next/link";

type Props = {

};

export default async function Page(props: Props) {
    const querySnapshot = await getDocs(collection(database, "trips"));
    let trips: { id:string,trip:ITrip }[] = [];
    querySnapshot.forEach((doc)=>{
        let obj = {
            id: doc.id,
            trip: doc.data() as ITrip
        }
        trips.push(obj);
    })
    return (
        <>
            <h3>Trips</h3>
            <Link href='/app1/add' className='btn btn-primary'>Add a trip</Link>
            <div className='m-3 container-fluid flex-col justify-content-evenly w-100'>
                <div className='row'>
                    {trips.map(({id,trip})=>{
                        return <Trip key={id} id={id} trip={trip} />
                    })}
                </div>
            </div>
        </>
    );
};

export const revalidate = 60; //revalidate cache time