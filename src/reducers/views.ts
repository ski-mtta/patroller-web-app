import { AnyAction } from 'redux'

export enum Routes {
    Join = 'join',
    Login = 'login',
    Logout = 'logout',
    Patroller = 'patroller',
}

export enum Views {
    Calendar = 'Calendar',
    Messages = 'Messages',
    Schedule = 'Schedule',
    Timesheets = 'Timesheets',
    Patrollers = 'Patrollers',
    Training = 'Training',
    // Administrative Functions
    // ApproveDuty = "Approve Duty",
    Map = 'Map',
    Profile = 'Profile',
    Logout = 'Logout',
}

const INITIAL_STATE = {
    activeRoute: Routes.Login,
    activeView: Views.Profile,
}

export default function (
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'VIEW_ACTION':
            return {
                [id]: value,
            }
        default:
            return state
    }
}
