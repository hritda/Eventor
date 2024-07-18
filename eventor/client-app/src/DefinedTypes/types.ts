export interface IUser {
    userTypes: any[];
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    uid: string;
    madeBy: null;
    madeOn: Date;
    changeBy: null;
    changeOn: Date;
}

export interface IAuthState {
    currUser: IUser | null;
    login: boolean
}
export interface IEvent {
    venue: string;
    uid: string;
    description: string;
    startDate: string;
    eventName: string;
    endDate: string;
    startTime: string;
    endTime: string;
    eventType: string;
}