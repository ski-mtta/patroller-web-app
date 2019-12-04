export * from "./messages";

export enum Locations {
    HighHut = "High Hut",
    CopperCreek = "Copper Creek",
    Yurt = "The Yurt",
    SnowBowl = "Snow Bowl",
    AlpinaShed = "Alpina Shed",
    FireHall = "Fire Hall",
    Office = "Office",
    Whittakers = "Whittakers",
}

export enum PatrolType {
    Overnight = "Overnight",
    Day = "Day"
}

export enum MaxOvernights {
    CopperCreek = 4,
    SnowBowl = 3,
    HighHut = 3,
    Yurt = 2,
    Office = 2,
}

export interface SearchEventOptions {
    q?: string,
    timeMin?: string, // new Date().toISOString()
    timeMax?: string, // new Date().toISOString()
    singleEvents?: boolean,
    orderBy?: string
}
export interface Attendee {
    displayName: string,
    comment: string,
    email: string,
    additionalGuests?: number,
}

export interface SchedulePatroller {
    startDate: Date,
    endDate: Date,
    location: Locations | string,
    sp_number: number,
    day: boolean,
    overnight: boolean,
    attendee: Attendee
};