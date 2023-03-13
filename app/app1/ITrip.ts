import Item from "@/app/app1/Item";

export default interface ITrip {
    location: string,
    startDate: Date,
    endDate: Date,
    visitors: string[],
    items?: Item[]
}