// @flow
import * as React from 'react';
import {doc,getDoc} from "@firebase/firestore";
import {database} from "@/app/firebaseConfig";
import ITrip from "@/app/app1/ITrip";
import {notFound} from "next/navigation";
import Form from "@/app/app1/[id]/edit/form";

type Props = {
    params: {id:string}
};
const Page = async (props: Props) => {
    const docRef = doc(database,"trips",props.params.id);
    const docSnap = await getDoc(docRef);
    let trip: ITrip;
    if (docSnap.exists()){
        trip = docSnap.data() as ITrip;
    } else {
        notFound();
    }
    return <Form trip={trip}></Form>
    
};

export default Page;