// @flow
import * as React from 'react';
import {collection,getDocs} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITrip from "@/app/app1/ITrip";
import Trip from "@/app/app1/Trip";

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
            <button className='btn btn-primary'>Add a trip</button>
            <div className='m-3 container'>
                {trips.map(({id,trip})=>{
                    return <Trip key={id} id={id} trip={trip} />
                })}
            </div>
        </>
    );
};