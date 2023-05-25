// @flow
'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Search from "@/app/app3/Search";
import Favorites from "@/app/app3/Favorites";
import Button from "@mui/material/Button";
import {addFavorite} from "@/lib/openweather";

type Props = {
    children: React.ReactNode
};
const Layout = ({children}: Props) => {
    return (
        <Grid container spacing={2} height={"100%"} >
            <Grid lg={3} md={4} >
                Favorites
                <Button onClick={()=>{addFavorite("lol",12,23)}}>XDD</Button>
                <Favorites />
            </Grid>
            <Grid container lg={9} md={8}>
                <Grid xs={12}>
                    <Search />
                </Grid>
                <Grid xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Layout;