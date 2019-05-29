import { AnyAction } from 'redux'
import { statement } from '@babel/template'

const INITIAL_STATE = {
    sp_number: undefined,
    name: '',
    email: '',
    phone_number: '',
    password: '',
    retype_password: '',
    patroller_id: '',
}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'PATROLLER_ACTION':
            return {
                ...state,
                [id]: value,
            }
        default:
            return state
    }
}
