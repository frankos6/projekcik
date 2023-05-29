// @flow
'use client';
import * as React from 'react';
//@ts-ignore
import {fullList} from "list-of-stocks";
import {useEffect} from "react";
import Stack from "@mui/material/Stack";
import {Favorite} from "@/app/app4/Favorite";

export const Favorites = () => {
    const [favorites, setFavorites] = React.useState<string[]>([]);
    useEffect(()=>
            setFavorites(JSON.parse(localStorage.getItem("stockfav") || "[]"))
        ,[])
    window.addEventListener('mousemove',()=>setFavorites(JSON.parse(localStorage.getItem("stockfav") || "[]")))
    return (
        <div>
            <Stack justifyContent='center' spacing={0}>
                {favorites.map((v,i)=>(
                    <Favorite key={i} name={v}/>
                ))}
            </Stack>
        </div>
    );
};