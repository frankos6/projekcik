// @flow
'use client';
import * as React from 'react';
import {notFound, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getWeather, Weather} from "@/lib/openweather";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

type Props = {

};
const Page = (props: Props) => {
    const searchParams = useSearchParams();
    const lon = searchParams.get('lon');
    const lat = searchParams.get('lat');
    const [data,setData] = useState<Weather>();
    if (!lon || !lat) notFound();

    useEffect(()=>{
        getWeather(+lon,+lat)
            .then(data=>setData(data))
    },[])

    return (
        <div>
            {data?.weather[0].main} <br/>
            {data?.main.temp} C <br />
            {data?.wind.speed} km/h
            <ArrowUpward style={{transform: `rotate(${data?.wind.deg??0}deg)`}} />
        </div>
    );
};
export default Page;