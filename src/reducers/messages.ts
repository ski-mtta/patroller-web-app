import { AnyAction } from 'redux'

import { MessageTag } from '../interfaces/messages'

const CURRENT_DATE = new Date().getTime()
const LATER_DATE = new Date('1/1/2030').getTime()

const INITIAL_STATE = {
    received: {
        [CURRENT_DATE]: {
            title: 'Initial Message',
            received_at: CURRENT_DATE,
            body: `Some really crafty\n\nMessages!`,
            tags: [MessageTag.URGENT],
            reminder: true,
            read: false,
            from: 'Ryan Tate',
            patroller: 48,
        },
        [LATER_DATE]: {
            title: 'Second Message',
            received_at: LATER_DATE,
            body: `Some really crafty\n\nMessages!`,
            tags: [MessageTag.TRAINING],
            reminder: true,
            read: false,
            from: 'Ryan Tate',
            patroller: 48,
        },
    },
    drafts: {},
    sent: {},
    new: {
        title: 'New Message Title',
        created_at: CURRENT_DATE,
        body: '',
        tags: [],
        reminder: true,
        sent: false,
        recipients: [
            // patroller numbers
        ],
        last_saved: CURRENT_DATE,
    },
}

export default function(
    state: {
        [x: number]: any
        received: {
            [x: number]: any
        }
        drafts: {
            [x: number]: any
        }
        sent: {
            [x: number]: any
        }
        new: {
            [x: number]: any
        }
    } = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'RECEIVED_MESSAGE':
            return {
                ...state,
                received: {
                    ...state.received,
                    [id]: value,
                },
            }
        case 'DRAFT_MESSAGE':
            return {
                ...state,
                draft: {
                    [id]: value,
                },
            }
        case 'DRAFT_MESSAGE':
            return {
                ...state,
                received: {
                    [id]: value,
                },
            }
        default:
            return state
    }
}
