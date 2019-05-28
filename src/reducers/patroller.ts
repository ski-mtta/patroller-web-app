import { AnyAction } from 'redux'

const INITIAL_STATE = {
    sp_number: undefined,
    first_name: '',
    last_name: '',
    password: '',
    patroller_id: '',
    physical_address: {
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
    },
    email: '',
    phone_number: '',
}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'PATROLLER_ACTION':
            return {
                [id]: value,
            }
        default:
            return state
    }
}
