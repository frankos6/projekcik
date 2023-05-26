// @flow
'use client';
import * as React from 'react';
import {City} from "@/lib/openweather";
import Stack from "@mui/material/Stack";
import {Favorite} from "@/app/app3/Favorite";

type Props = {

};
const Favorites = (props: Props) => {
    const favorites: City[] = JSON.parse(localStorage.getItem("weatherfav")||"[]");
    return (
        <Stack justifyContent='center' spacing={1.5}>
            {favorites.map((v,i)=>(
                <Favorite key={i} city={v}/>
            ))}
        </Stack>
    );
};

export default Favorites;