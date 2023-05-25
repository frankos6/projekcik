// @flow
'use client';
import * as React from 'react';
import {City} from "@/lib/openweather";
import Stack from "@mui/material/Stack";

type Props = {

};
const Favorites = (props: Props) => {
    const favorites: City[] = JSON.parse(localStorage.getItem("weatherfav")||"[]");
    return (
        <Stack justifyContent={'center'}>
            {favorites.map((v,i)=>(
                <div key={i}>{v.name}</div>
            ))}
        </Stack>
    );
};

export default Favorites;