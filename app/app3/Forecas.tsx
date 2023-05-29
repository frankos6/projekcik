// @flow
'use client';
import * as React from 'react';
import {Forecast} from "@/lib/openweather";
import {Box} from "@mui/material";
import Stack from "@mui/material/Stack";
import Image from "next/image";

type Props = {
    forecast: Forecast
    useF: boolean
};
export const Forecas = ({forecast}: Props) => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" borderRadius="1rem" border="solid" height={70} alignItems='center' padding={0.5} paddingBottom={0.1}>
                <h4>{new Date(forecast.dt*1000).toLocaleDateString()}</h4>
                <Stack direction="row" alignItems='center'>
                    <Image alt={forecast.weather[0].description ?? 'weather icon'} src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon ?? '02d'}@2x.png`} height={48} width={48} style={{marginTop: '-5px'}} />
                    <h4>{forecast.main.temp.toFixed()||0} °C</h4>
                </Stack>
            </Stack>
        </Box>
    );
};