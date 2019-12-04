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

import PatrollerDetails from '../PatrollerDetails/index'
import SendMessage from '../SendMessage/index';

enum Actions {
    SendMessage,
    DutyDates,
    TrailReports,
}

class Patrollers extends Component<any, any> {
    state = {
        isShown: false,
        activeAction: Actions.SendMessage,
        activePatroller: {} as any
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(Api.getPatrollers())
    }

    renderDetails(profile: any) {
        const {
            sp_number,
        } = profile
        const { activePatroller } = this.state
        if (activePatroller.sp_number != sp_number) {
            return null
        } else {
            return (
                <React.Fragment>
                    <SideSheet
                        isShown={this.state.isShown}
                        onCloseComplete={() =>
                            this.setState({ isShown: false })
                        }
                        containerProps={{
                            display: 'flex',
                            flex: '1',
                            flexDirection: 'column',
                        }}
                    >
                        <PatrollerDetails activePatroller={activePatroller} />
                    </SideSheet>
                </React.Fragment>
            )
        }
    }

    renderPatrollerInformation(profile: any) {
        const { key, sp_number, first_name, last_name } = profile
        return (
            <Pane
                key={key}
                elevation={1}
                float="left"
                width={200}
                height={200}
                margin={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Avatar
                    name={`${first_name} ${last_name}`}
                    size={96}
                    marginBottom={5}
                />
                <Text>
                    {first_name} {last_name}
                </Text>
                <Text size={300}>Ski Patrol #{sp_number}</Text>
            </Pane>
        )
    }

    onComponentUpdate() {
        return true
    }

    renderPatrollers(profiles: any[]) {
        return profiles
            .sort((a, b) => {
                return (a as any).sp_number - (b as any).sp_number
            })
            .map((profile: any, i: number) => {
                return (
                    <Pane
                        key={i}
                        onClick={() => {
                            this.setState({
                                isShown: true,
                                activePatroller: profile,
                                sendMessage: false,
                                showDutyDates: false,
                                showFeedback: false,
                            })
                        }}
                    >
                        {this.renderPatrollerInformation(profile)}
                    </Pane>
                )
            })
    }

    render() {
        const {
            patrollers: { profiles },
        } = this.props
        const { isShown, activePatroller } = this.state

        if (!profiles.length) {
            return null
        } else {
            return (
                <Pane clearfix>
                    {this.renderPatrollers(profiles)}
                    {isShown ? this.renderDetails(activePatroller) : null}
                </Pane>
            )
        }
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        api: state.api,
        patrollers: state.patrollers,
    }
}

export default connect(mapStateToProps)(Patrollers)
