// @flow
'use client';
import * as React from 'react';
import {notFound, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {findCity, Geo, getWeather, Weather} from "@/lib/openweather";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

type Props = {

};
const Page = (props: Props) => {
    const router = useRouter();
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [data,setData] = useState<Weather>();
    const [city,setCity] = useState<Geo>();
    const [isLoading, setLoading] = useState(false);
    if (!q) notFound();

    useEffect(()=>{
        setLoading(true);
        findCity(q??"")
            .then(d=> {
                setCity(d[0]);
                return getWeather(d[0].lon, d[0].lat)
            })
            .then(d=>setData(d))
            .then(()=>setLoading(false))
    },[])

    if (isLoading) return <div className='container-fluid w-100 d-flex flex-column align-items-center justify-content-center h-100'>
        <div className='spinner-border mt-5' style={{height: '6rem', width: '6rem', borderWidth: '.4rem'}} role='status'>
        </div>
        <p className='h2 mt-4'>Loading...</p>
    </div>

    return (
        <div>
            <h2>{city?.name}, {city?.state ? `${city.state},` : ''} {city?.country ? regionNames.of(city.country) : ""}</h2>
            {data?.weather[0].main} <br/>
            {data?.main.temp} C <br />
            {data?.wind.speed} km/h
            <ArrowUpward style={{transform: `rotate(${data?.wind.deg??0}deg)`}} />
        </div>
    );
};
export default Page;