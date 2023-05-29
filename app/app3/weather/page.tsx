// @flow
'use client';
import * as React from 'react';
import {notFound, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {addFavorite, findCity, Geo, getFavorites, getWeather, removeFavorite, Weather} from "@/lib/openweather";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import './style.css';
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import {Forecasts} from "@/app/app3/Forecasts";
import Image from "next/image";

const Page = () => {
    const router = useRouter();
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [data,setData] = useState<Weather>();
    const [city,setCity] = useState<Geo>();
    const [isLoading,setLoading] = useState(false);
    const [isFavorite,setFavorite] = useState(false);

    const addFav = () => {addFavorite(city?.name!,city?.lon!,city?.lat!);setFavorite(true)}
    const removeFav = () => {removeFavorite(city?.name!,city?.lon!,city?.lat!);setFavorite(false)}
    if (!q) notFound();

    useEffect(()=>{
        setLoading(true);
        findCity(q??"")
            .then(d=> {
                if (d.length === 0) {router.push('/app3/error');return;}
                setCity(d[0]);
                return getWeather(d[0].lon, d[0].lat)
            })
            .then(d=>setData(d))
            .then(()=>{setLoading(false);setFavorite(getFavorites().findIndex((x => x.lon === city?.lon && x.lat === city?.lat)) > -1)})
    },[])

    if (isLoading) return <div className='container-fluid w-100 d-flex flex-column align-items-center justify-content-center h-100'>
        <div className='spinner-border mt-5' style={{height: '6rem', width: '6rem', borderWidth: '.4rem'}} role='status'>
        </div>
        <p className='h2 mt-4'>Loading...</p>
    </div>

    return (
        <div>
            <h2>{city?.name}, {city?.state ? `${city.state},` : ''} {city?.country ? regionNames.of(city.country) : ""}
                {isFavorite ? <Star onClick={removeFav} className={'star'} fontSize='large' /> : <StarBorder onClick={addFav} className={'star'} fontSize='large' />}</h2>
            <Grid container>
                <Grid item xs={9}>
                    <Stack alignItems='center'>
                        <Image alt={data?.weather[0].description ?? 'weather icon'} src={`https://openweathermap.org/img/wn/${data?.weather[0].icon ?? '02d'}@4x.png`} height={250} width={250} />
                        <h3>{data?.weather[0].main}</h3>
                        <h2>{data?.main.temp.toFixed()} °C</h2>
                        <Stack direction='row'>
                            <h3>{data?.wind.speed} km/h</h3>
                            <ArrowUpward style={{transform: `rotate(${data?.wind.deg??0}deg)`}} fontSize='large' />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Forecasts city={city??{name:'temp',lon:0,lat:0}} />
                </Grid>
            </Grid>
        </div>
    );
};
export default Page;