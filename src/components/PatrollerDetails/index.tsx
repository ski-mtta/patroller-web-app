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

import SendMessage from '../SendMessage/index';
import DutyDates from '../DutyDates/index';

enum Actions {
    SendMessage,
    DutyDates,
    TrailReports,
}

class PatrollerDetails extends Component<any, any> {
    state = {
        activeAction: Actions.SendMessage,
    }

    renderAction() {
        const { activeAction } = this.state
        const { details } = this.props.patroller

        switch (activeAction) {
            case Actions.SendMessage:
                return (<SendMessage activePatroller={details} />)
            case Actions.DutyDates:
                return (<DutyDates activePatroller={details} />)
            case Actions.TrailReports:
                return <Card>Trail Reports</Card>
            default:
                return null
        }
    }

    renderDetails(details: any) {
        const {
            key,
            sp_number,
            first_name,
            last_name,
            primary_phone,
            secondary_phone,
            email,
        } = details;
        return (
            <Pane>
                <Pane
                    zIndex={1}
                    flexShrink={0}
                >
                    <Pane padding={16} borderBottom="muted">
                        <Avatar
                            name={`${first_name} ${last_name}`}
                            size={96}
                            marginBottom={5}
                        />
                        <Heading size={600}>
                            {first_name} {last_name}
                        </Heading>
                        <Paragraph size={400} color="muted">
                            Ski Patrol #{sp_number}
                        </Paragraph>
                        <h4>Personal Information</h4>
                        <Paragraph>
                            <strong>Primary Phone</strong> {primary_phone}
                        </Paragraph>
                        <Paragraph>
                            <strong>Secondary Phone</strong> {secondary_phone}
                        </Paragraph>
                        <Paragraph>
                            <strong>Email</strong> <a href={`mailto:${email}`}>{email}</a>
                        </Paragraph>
                        <br />
                        <>
                            <Button
                                marginRight={16}
                                appearance={'minimal'}
                                intent="none"
                                onClick={() => {
                                    this.setState({
                                        activeAction: Actions.SendMessage,
                                    })
                                }}
                            >
                                Send Message
                            </Button>
                            <Button
                                marginRight={16}
                                appearance={'minimal'}
                                intent="warning"
                                onClick={() => {
                                    this.setState({
                                        activeAction: Actions.DutyDates,
                                    })
                                }}
                            >
                                Duty Dates
                            </Button>
                            <Button
                                marginRight={16}
                                appearance={'minimal'}
                                intent="danger"
                                onClick={() => {
                                    this.setState({
                                        activeAction: Actions.TrailReports,
                                    })
                                }}
                            >
                                Trail Reports
                            </Button>
                        </>
                    </Pane>
                </Pane>
                <Pane
                    flex="1"
                    overflowY="scroll"
                    padding={16}
                >
                    {this.renderAction()}
                </Pane>
            </Pane>
        )
    }

    onComponentUpdate() {
        return true
    }

    render() {
        const { activePatroller } = this.props;
        return <Pane clearfix>{this.renderDetails(activePatroller)}</Pane>
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        api: state.api,
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(PatrollerDetails)
