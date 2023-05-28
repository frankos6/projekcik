// @flow
'use client';
import * as React from 'react';
import {Box} from "@mui/material";
import Stack from "@mui/material/Stack";
import {useRouter} from "next/navigation";
import './style.css';

type Props = {
    name: string
};
export const Favorite = ({name}: Props) => {
    const router = useRouter();

    return (
        <Box onClick={()=>router.push(`/app4/${name}`)} className='fav'>
            <Stack direction="row" justifyContent="space-between" height="3rem" alignItems='center' padding='0.5rem' paddingLeft={0}>
                <h4>{name}</h4>
            </Stack>
        </Box>
    );
};