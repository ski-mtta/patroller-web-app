import { AnyAction } from 'redux'
import { Locations, SchedulePatroller, Attendee } from "../interfaces";

// Set initial date for schedule to be 14 days from now.
const startDate = new Date();
const endDate = new Date();
const days = 14;

// Define forms as independent values so they can be used to reset the form

export const SCHEDULE_PATROL_FORM = {
    startDate: {
        name: "Patrol Date",
        value: new Date(startDate.setDate(startDate.getDate() + days)),
        isInvalid: false, // ={false}
        required: true, // ={true}
        display: true,
        validationMessage: "", // ={""}
        type: "date", // ={"string"}
        placeholder: "", // ={title(item)}
    },
    endDate: {
        name: "endDate",
        value: new Date(endDate.setDate(endDate.getDate() + days + 1)),
        isInvalid: false, // ={false}
        required: true, // ={true}
        display: false,
        validationMessage: "", // ={""}
        type: "date", // ={"string"}
        placeholder: "", // ={title(item)}
    },
    location: {
        name: "Patrol Location",
        value: Locations.Office,
        isInvalid: false, // ={false}
        required: true, // ={true}
        display: true,
        options: Object.values(Locations),
        validationMessage: "", // ={""}
        type: "select", // ={"string"}
        placeholder: "", // ={title(item)}
    },
    day: {
        name: "Day Patrol",
        value: true,
        isInvalid: false, // ={false}
        required: true, // ={true}
        display: true,
        validationMessage: "", // ={""}
        type: "checkbox", // ={"string"}
        placeholder: "", // ={title(item)}
    },
    overnight: {
        name: "Overnight Patrol",
        value: false,
        isInvalid: false, // ={false}
        required: true, // ={true}
        display: true,
        validationMessage: "", // ={""}
        type: "checkbox", // ={"string"}
        placeholder: "", // ={title(item)}
    },
}

const ATTENDEE_FORM = {
    // sp_number: {
    //     name: "Ski Patrol Number",
    //     value: 0,
    //     isInvalid: false, // ={false}
    //     required: true, // ={true}
    //     display: true,
    //     validationMessage: "", // ={""}
    //     type: "text_input", // ={"string"}
    //     placeholder: "", // ={title(item)}
    // },
    // displayName: {
    //     name: "Patroller Name",
    //     value: true,
    //     isInvalid: false, // ={false}
    //     required: true, // ={true}
    //     display: true,
    //     validationMessage: "", // ={""}
    //     type: "text_input", // ={"string"}
    //     placeholder: "", // ={title(item)}
    // },
    comment: {
        name: "RSVP Comment",
        value: "",
        isInvalid: false, // ={false}
        required: false, // ={true}
        display: true,
        validationMessage: "", // ={""}
        type: "text_input", // ={"string"}
        placeholder: "optional comment", // ={title(item)}
    },
    // email: {
    //     name: "Email",
    //     value: "",
    //     isInvalid: false, // ={false}
    //     required: true, // ={true}
    //     display: true,
    //     validationMessage: "", // ={""}
    //     type: "text_input", // ={"string"}
    //     placeholder: "", // ={title(item)}
    // },
    additionalGuests: {
        name: "Additional Guests",
        value: 0,
        isInvalid: false, // ={false}
        required: false, // ={true}
        display: true,
        validationMessage: "", // ={""}
        type: "number", // ={"string"}
        placeholder: "", // ={title(item)}
    }
}

const INITIAL_STATE = {
    schedule_patrol: SCHEDULE_PATROL_FORM,
    patrol_attendee: ATTENDEE_FORM
}

export default function (
    state: any = INITIAL_STATE,
    { type, id, value }: AnyAction,
) {
    switch (type) {
        case 'SCHEDULE_PATROL':
            return {
                ...state,
                schedule_patrol: {
                    ...state.schedule_patrol,
                    [id]: {
                        ...state.schedule_patrol[id],
                        value: value,
                    },
                }
            }
        case 'SCHEDULE_PATROL_ATTENDEE':
            return {
                ...state,
                patrol_attendee: {
                    ...state.patrol_attendee,
                    [id]: {
                        ...state.patrol_attendee[id],
                        value: value,
                    },
                }
            }
        case 'RESET_SCHEDULE_PATROL':
            return {
                ...state,
                schedule_patrol: SCHEDULE_PATROL_FORM
            }
        default:
            return state
    }
}


