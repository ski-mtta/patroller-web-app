import { AnyAction } from 'redux'

const INITIAL_STATE = {}

export default function (
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'SCHEDULE_UPDATE':
            return {
                ...state,
                [id]: value,
            }
        default:
            return state
    }
}
