// @flow
'use client';
import * as React from 'react';
import {useEffect, useState} from "react";
import {findCity, Geo} from "@/lib/openweather";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
};
const Page = (props: Props) => {
    const router = useRouter();
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [data,setData] = useState<Geo[]>([]);
    const [isLoading, setLoading] = useState(false);
    if (!q) return <h2>Invalid query</h2>;

    useEffect(()=>{
        setLoading(true)
        findCity(q)
            .then(d=> {
                setData(d);
                setLoading(false);
            })
    },[])

    if (isLoading) return <div className='container-fluid w-100 d-flex flex-column align-items-center justify-content-center h-100'>
        <div className='spinner-border mt-5' style={{height: '6rem', width: '6rem', borderWidth: '.4rem'}} role='status'>
        </div>
        <p className='h2 mt-4'>Loading...</p>
    </div>

    return (
        <div>
            {data.map((e,i)=>(
                <div onClick={()=>router.push(`/app3/weather?lon=${e.lon}&lat=${e.lat}`)} key={i}>{e.name}, {regionNames.of(e.country)}</div>
            ))}
        </div>
    );
};


export default Page;