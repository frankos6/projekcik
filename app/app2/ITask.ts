export default interface ITask {
    desc:string,
    startDate: { seconds: number, nanoseconds: number },
    endDate?: { seconds: number, nanoseconds: number },
    completed: boolean
}