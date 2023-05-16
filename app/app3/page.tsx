// @flow
'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type Props = {

};
const Page = (props: Props) => {
    const [search, setSearch] = React.useState('');
    const handleClick = () => {

    }
    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            <TextField variant="outlined" label="Search for a city" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <Button variant="contained" onClick={handleClick} endIcon={<SearchIcon />}>Search</Button>
        </Stack>
    );
};

export default Page;