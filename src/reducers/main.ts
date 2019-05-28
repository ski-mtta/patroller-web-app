import { AnyAction } from 'redux'

const INITIAL_STATE = {}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'MAIN_ACTION':
            return {
                [id]: value,
            }
        default:
            return state
    }
}
