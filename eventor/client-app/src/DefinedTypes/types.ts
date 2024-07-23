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
    login: boolean;
    token: string|null ;
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

export interface IAuth extends IUser{
    
  }
  export interface IloginPayload {
    Email: string;
    Password: string;
    UserType: string;
  }
  
  export interface IRegisterPayload {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    UserTypeCodes: string[];
  }
  export type IErrors<T> = {
    [Key in keyof T]: string[];
  };
  
  export interface IResponse<T> {
    data: T;
    message?: string;
    errors?: IErrors<T>;
    success?: boolean;
  }
  
  export interface ISession {
    token?: string;
    message?: string;
  }

  export interface IModalSlice {
    modalState: boolean;
    modalType: string;
  }
  export interface FormValues {
    venue: string,
    eventName: string;
    description: string;
    startDate: string;
    endDate: string;
    eventType:string;
    startTime: string;
    endTime: string;
  }
  
  export interface FormErrors {
    venue?: string,
    eventName?: string;
    description?: string;
    startDate?: string;
    eventType?:string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
  
  }