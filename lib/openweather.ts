export interface Geo {
    name: string,
    lat: number,
    lon: number,
    country: string,
    state?: string,
    local_names?: object
}

export interface Weather {
    weather: {
        id:number,
        main:string,
        description:string,
        icon:string
    }[],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    rain?: {
        "1h": number,
        "3h": number,
    },
    snow?: {
        "1h": number,
        "3h": number
    }
}
export interface City {
    name: string,
    lon: number,
    lat: number
}

export async function findCity(query:string) {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
    if (res.ok) {
        let body: Geo[] = await res.json();
        body = body.filter((value, index, array)=> // filter out duplicates
            index === array.findIndex(x=>x.lon === value.lon && x.lat === value.lat)
        )
        return body;
    } else {
        let body: { cod?:string,message?:string } = await res.json();
        throw new Error(body.message??"An error occurred.");
    }
}

export async function getWeather(lon:number,lat:number) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
    if (res.ok) {
        return await res.json() as Weather;
    } else {
        let body: { cod?:string,message?:string } = await res.json();
        throw new Error(body.message??"An error occurred.");
    }
}

export function addFavorite(name:string, lon: number, lat: number){
    const favorites = getFavorites();
    if (favorites.findIndex((x => x.lon === lon && x.lat === lat)) !== -1) return; //don't add the same city twice
    favorites.push({name,lon,lat} as City)
    localStorage.setItem("weatherfav",JSON.stringify(favorites))
}

export function getFavorites(): City[] {
    return JSON.parse(localStorage.getItem("weatherfav")||"[]") as City[];
}

export function removeFavorite(name: string, lon: number, lat: number) {
    const favorites = getFavorites();
    let index = favorites.findIndex((x => x.lon === lon && x.lat === lat))
    console.log(index)
    if (index > -1) favorites.splice(index,1);localStorage.setItem("weatherfav",JSON.stringify(favorites))
}