import { AnyAction } from 'redux'

const INITIAL_STATE = {
    access_token: '',
    authenticated: false,
}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'AUTH_ACTION':
            return {
                [id]: value,
            }
        default:
            return state
    }
}
