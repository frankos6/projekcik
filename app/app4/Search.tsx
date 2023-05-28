// @flow
'use client';
import * as React from 'react';
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
//@ts-ignore
import {NASDAQ} from "list-of-stocks";
import {useRouter} from "next/navigation";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";

export const Search = () => {
    const router = useRouter();
    const [search, setSearch] = React.useState<string|null>('');
    const handleClick = () => {
        if (search === "" || search === null) return;
        router.push(`/app4/${search}`);
    }
    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            <Autocomplete freeSolo value={search} onChange={(e,v)=>setSearch(v)} options={NASDAQ} fullWidth renderInput={(params) => <TextField {...params} label="Symbol" />}/>
            <Button variant="contained" onClick={handleClick} endIcon={<SearchIcon />}>Search</Button>
        </Stack>
    );
};