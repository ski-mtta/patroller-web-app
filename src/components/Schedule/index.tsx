import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Pane } from 'evergreen-ui'

import FormBuilder from '../FormBuilder/index';
import Api from '../../actions/index';

class Schedule extends Component<any, any> {
    state = {
        redirect: false,
    }

    schedulePatrol() {
        const {
            dispatch,
            patroller,
            forms: { schedule_patrol, patrol_attendee },
            views: { activeRoute },
        } = this.props

        const { first_name, last_name, sp_number, email } = patroller
        // const startDate = new Date(schedule_patrol.startDate.value);
        const request = {
            sp_number,
            attendee: {
                displayName: `${first_name} ${last_name}`,
                email
            }
        } as any;

        Object.keys(schedule_patrol).map((item) => {
            request[item] = schedule_patrol[item].value
        })

        Object.keys(patrol_attendee).map((item) => {
            request['attendee'][item] = patrol_attendee[item].value
        })


        dispatch(Api.schedulePatrol(request));
    }

    render() {
        const {
            dispatch,
            patroller,
            forms: { schedule_patrol, patrol_attendee },
            views: { activeRoute },
        } = this.props

        return (
            <Pane>
                <FormBuilder
                    forms={[schedule_patrol, patrol_attendee]}
                    form_action_types={['SCHEDULE_PATROL', 'SCHEDULE_PATROL_ATTENDEE']}
                    form_labels={['Schedule Patrol Duty']}
                    button_labels={[{
                        title: 'SCHEDULE PATROL',
                        onClick: this.schedulePatrol.bind(this)
                    }]}
                />
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        forms: state.forms,
        views: state.views,
        patroller: state.patroller
    }
}

export default connect(mapStateToProps)(Schedule)
