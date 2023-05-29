// @flow
'use client';
import * as React from 'react';
import {City, Forecast, getForecast} from "@/lib/openweather";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {Forecas} from "@/app/app3/Forecas";

type Props = {
    city: City,
    useF: boolean
};
export const Forecasts = ({city, useF}: Props) => {
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    useEffect(()=>{
        getForecast(city.lon,city.lat)
            .then(d=>setForecasts(d))
    },[])
    return (
        <Stack spacing={2}>
            {forecasts.map((e,i)=><Forecas key={i} forecast={e} useF={useF}/>)}
        </Stack>
    );
};