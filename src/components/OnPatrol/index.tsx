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

class OnPatrol extends Component<any, any> {
    state = {}

    componentDidMount() {
        const { dispatch } = this.props
    }

    onComponentUpdate() {
        return true
    }

    render() {
        return (
            <Pane>
                <h1>On Patrol Details</h1>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        api: state.api,
        schedule: state.schedule,
    }
}

export default connect(mapStateToProps)(OnPatrol)
