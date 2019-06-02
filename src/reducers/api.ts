import { AnyAction } from 'redux'
import Api from "../actions";

const INITIAL_STATE = {
    client: new Api({})
}

export default function(
    state: { [x: number]: any } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    return state
}
