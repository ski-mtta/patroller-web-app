import { AnyAction } from 'redux'
import { statement } from '@babel/template'

const INITIAL_STATE = {
    sp_number: 48,
    first_name: 'Ryan',
    last_name: 'Tate',
    city: 'Tacoma',
    email: 'ryan.michael.tate@gmail.com',
    phone_number: '206-519-2818',
    password: 'test',
    retype_password: 'test',
    patroller_id: '',
    profile_pic: 'https://avatars2.githubusercontent.com/u/2837196?s=460&v=4',
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
