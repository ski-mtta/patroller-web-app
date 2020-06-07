import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import {
    Pane,
    Avatar,
    SideSheet,
    Heading,
    Paragraph,
    Text,
    Button,
    Card,
    Textarea,
    TextInput,
    FormField,
} from 'evergreen-ui'

import Api from '../../actions'

class DutyDates extends Component<any, any> {
    componentDidMount() {
        const { dispatch, activePatroller } = this.props
        dispatch(Api.getPatrollerSchedule(activePatroller.sp_number));
        console.log('Active Patroller', activePatroller);
    }

    onComponentUpdate() {
        return true
    }

    render() {
        const { activePatroller } = this.props
        return (
            <Pane>
                <h1>Duty Dates</h1>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        api: state.api,
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(DutyDates)
