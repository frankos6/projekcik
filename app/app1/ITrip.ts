import Item from "@/app/app1/Item";

export default interface ITrip {
    location: string,
    startDate: {seconds:number,nanoseconds:number},
    endDate: {seconds:number,nanoseconds:number},
    visitors: string[],
    items?: Item[]
}