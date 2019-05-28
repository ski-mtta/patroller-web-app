import { AnyAction } from 'redux'
import { statement } from '@babel/template'

const INITIAL_STATE = {
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'PATROLLER_PHYSICAL_ADDRESS_ACTION':
            return {
                ...state,
                [id]: value,
            }
        default:
            return state
    }
}
