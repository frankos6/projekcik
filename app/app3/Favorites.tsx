// @flow
'use client';
import * as React from 'react';
import {City} from "@/lib/openweather";
import Stack from "@mui/material/Stack";
import {Favorite} from "@/app/app3/Favorite";
import {useEffect, useState} from "react";

const Favorites = () => {
    const [favorites, setFavorites] = useState<City[]>([]);
    useEffect(()=>
            setFavorites(JSON.parse(localStorage.getItem("weatherfav") || "[]"))
    ,[])
    window.addEventListener('mousemove',()=>setFavorites(JSON.parse(localStorage.getItem("weatherfav") || "[]")))
    return (
        <Stack justifyContent='center' spacing={1.5}>
            {favorites.map((v,i)=>(
                <Favorite key={i} city={v}/>
            ))}
        </Stack>
    );
};

export default Favorites;