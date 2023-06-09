// @flow
'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {useRouter} from "next/navigation";

type Props = {

};
const Search = (props: Props) => {
    const router = useRouter();
    const [search, setSearch] = React.useState('');
    const handleClick = () => {
        if (search === "") return;
        router.push(`/app3/weather?q=${search}`);
        router.refresh();
    }
    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            <TextField variant="outlined" label="Search for a city" value={search} onChange={(e)=>setSearch(e.target.value.trimStart())} fullWidth/>
            <Button variant="contained" onClick={handleClick} endIcon={<SearchIcon />}>Search</Button>
        </Stack>
    );
};

export default Search;