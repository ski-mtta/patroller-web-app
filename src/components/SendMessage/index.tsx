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

enum Actions {
    SendMessage,
    DutyDates,
    TrailReports,
}

class SendMessage extends Component<any, any> {
    state = {
        messageTitle: '',
        messageBody: '',
    }

    onComponentUpdate() {
        return true
    }

    render() {
        const { activePatroller } = this.props
        const { messageTitle, messageBody } = this.state
        return (
            <Pane>
                <FormField
                    label={`Send message to ${activePatroller.first_name}`}
                    padding={15}
                >
                    <TextInput
                        marginTop={2}
                        width={'100%'}
                        name="title"
                        value={messageTitle}
                        placeholder="Title"
                        onChange={(e: any) => {
                            this.setState({
                                messageTitle: e.target.value,
                            })
                        }}
                    />
                    <br />
                    <br />
                    <Textarea
                        width={'100%'}
                        name="body"
                        value={messageBody}
                        placeholder="Start typing your message here..."
                        onChange={(e: any) => {
                            this.setState({
                                messageBody: e.target.value,
                            })
                        }}
                    />
                    <br />
                    <br />
                    <Button
                        width={'100%'}
                        justifyContent={'center'}
                        appearance={'primary'}
                        intent={'none'}
                        onClick={() => {
                            alert(messageBody)
                        }}
                    >
                        Send Message
                    </Button>
                </FormField>
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

export default connect(mapStateToProps)(SendMessage)
