// @flow
'use client';
import * as React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import {useEffect} from "react";
import alpha from 'alphavantage';
import Button from "@mui/material/Button";
import {getFavorites, removeFavorite, addFavorite} from "@/lib/stockfav";
import {useRouter} from "next/navigation";

const APIKEY = 'IKM79Y7G3DJIK4BQ';
const MINUTES = '15';

type Props = {
    params: {name: string}
};
type Data = [number,number,number,number,number];
type Volume = [number,number];
const Page = ({params}: Props) => {
    const router = useRouter();
    const API = alpha({key: APIKEY})
    const [data, setData] = React.useState<Data[]>([]);
    const [volume, setVolume] = React.useState<Volume[]>([]);

    useEffect(()=>{
        API.data.intraday(params.name,'compact','json','15min')
            .then(result=>{
                console.log(result);
                let resultKeys = Object.keys(result[`Time Series (${MINUTES}min)`]);
                let stockData: Data[] = [];
                let volumeData: Volume[] = [];
                resultKeys.forEach(key=>{
                    let date = new Date(key);
                    let resultData: Data = [
                        date.getTime(),
                        parseFloat(result[`Time Series (${MINUTES}min)`][key]['1. open']),
                        parseFloat(result[`Time Series (${MINUTES}min)`][key]['2. high']),
                        parseFloat(result[`Time Series (${MINUTES}min)`][key]['3. low']),
                        parseFloat(result[`Time Series (${MINUTES}min)`][key]['4. close'])
                    ];
                    let vData: Volume = [
                        date.getTime(),
                        parseInt(result[`Time Series (${MINUTES}min)`][key]['5. volume'])
                    ];


                    stockData.push(resultData)
                    volumeData.push(vData);
                })
                setData(stockData.reverse());
                setVolume(volumeData.reverse());
            })
    },[])

    return (
        <div>
            {getFavorites().includes(params.name)
                ? <Button onClick={()=>{removeFavorite(params.name);router.refresh();}}>Remove {params.name} from favorites</Button>
                : <Button onClick={()=>{addFavorite(params.name);router.refresh()}}>Add {params.name} to favorites</Button>}

            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={{
                    chart: {
                        height: 700
                    },

                    title: {
                        text: params.name
                    },

                    plotOptions: {
                        series: {
                            showInLegend: true,
                            accessibility: {
                                exposeAsGroupOnly: true
                            }
                        }
                    },

                    rangeSelector: {
                        selected: 2
                    },

                    legend: {
                        enabled: true
                    },

                    yAxis: [{
                        height: '80%'
                    }, {
                        top: '80%',
                        height: '20%'
                    }],

                    series: [{
                        type: 'candlestick',
                        id: params.name,
                        name: params.name,
                        data: data
                    }, {
                        type: 'column',
                        id: 'volume',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1
                    }]
                }}
            />
        </div>
    );
};

export default Page;