import { AnyAction } from 'redux'
import { PatrollersGetResponse } from 'patroller-api-client'

const INITIAL_STATE = {
    profiles: [] as PatrollersGetResponse[],
}

export default function(
    state: { profiles: any[]; [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'INIT_PATROLLERS':
            return {
                ...state,
                profiles: value,
            }
        case 'NEW_PATROLLER':
            return {
                ...state,
                profiles: [...state.profiles, value],
            }
        default:
            return state
    }
}
