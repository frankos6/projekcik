// @flow
'use client';
import * as React from 'react';
import {Box} from "@mui/material";
import {City, getWeather, Weather} from "@/lib/openweather";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import './weather/style.css';

type Props = {
    city: City
};
export const Favorite = ({city}: Props) => {
    const router = useRouter();
    const [weather, setWeather] = useState<Weather>();

    useEffect(()=>{
        getWeather(city.lon,city.lat)
            .then((d)=>setWeather(d))
    },[])

    return (
        <Box onClick={()=>router.push(`/app3/weather?q=${city.name}`)} className='fav'>
            <Stack direction="row" justifyContent="space-between" borderRadius="1rem" border="solid" height="4rem" alignItems='center' padding='1rem'>
                <h4>{city.name}</h4>
                <h4>{weather?.main.temp.toFixed()||0}C</h4>
            </Stack>
        </Box>
    );
};