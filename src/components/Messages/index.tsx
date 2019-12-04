import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import {
    Pane,
    Table,
    SideSheet,
    Paragraph,
    Button,
    Position,
    Heading,
    Tablist,
    Tab,
    Card,
    Textarea,
} from 'evergreen-ui'

import { ReceivedMessage, MessageTag } from '../../interfaces/messages'

class Messages extends Component<any, any> {
    state = {
        isShown: false,
        activeMsg: {} as ReceivedMessage,
        selectedIndex: 0,
        reply: false,
    }

    componentDidMount() {
        // Fetch Patroller Information;
    }

    parseIntent(tags: String[], read: boolean): String {
        if (read) {
            return 'none'
        }

        if (
            tags.indexOf(MessageTag.EMERGENCY) ||
            tags.indexOf(MessageTag.URGENT)
        ) {
            return 'danger'
        }

        if (
            tags.indexOf(MessageTag.DUTY) ||
            tags.indexOf(MessageTag.TRAINING) ||
            tags.indexOf(MessageTag.REMINDER) ||
            tags.indexOf(MessageTag.HELP_WANTED)
        ) {
            return 'warning'
        }

        return 'success'
    }

    renderReceivedMessage() {
        const { reply } = this.state
        let { title, from, body, tags, received_at } = this.state.activeMsg

        tags = tags || []
        return (
            <React.Fragment>
                <SideSheet
                    isShown={this.state.isShown}
                    onCloseComplete={() => this.setState({ isShown: false })}
                    containerProps={{
                        display: 'flex',
                        flex: '1',
                        flexDirection: 'column',
                    }}
                >
                    <Pane
                        zIndex={1}
                        flexShrink={0}
                        elevation={0}
                        backgroundColor="white"
                    >
                        <Pane padding={16} borderBottom="muted">
                            <Heading size={600}>{title}</Heading>
                            <Paragraph size={400} color="muted">
                                From {from} at{' '}
                                {new Date(received_at).toLocaleString()}
                            </Paragraph>
                        </Pane>
                    </Pane>
                    <Pane display="flex" padding={8}>
                        <Tablist>
                            {tags.map((tab, index) => (
                                <Tab
                                    key={tab}
                                    isSelected={
                                        this.state.selectedIndex === index
                                    }
                                    onSelect={() =>
                                        this.setState({ selectedIndex: index })
                                    }
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tablist>
                    </Pane>
                    <Pane
                        flex="1"
                        overflowY="scroll"
                        background="tint1"
                        padding={16}
                    >
                        <Card
                            backgroundColor="white"
                            elevation={0}
                            height={240}
                            marginTop={5}
                            display="flex"
                            alignItems="top"
                            justifyContent="left"
                            padding={15}
                        >
                            <Heading>{body}</Heading>
                        </Card>
                        {reply ? (
                            <Card
                                backgroundColor="white"
                                elevation={0}
                                marginTop={5}
                                height={240}
                                display="flex"
                                alignItems="top"
                                justifyContent="left"
                                padding={15}
                            >
                                <Textarea
                                    name="message-response"
                                    placeholder="Respond to message"
                                />
                            </Card>
                        ) : null}
                        <Button
                            height={40}
                            width={'100%'}
                            justifyContent="center"
                            marginTop={5}
                            iconBefore="edit"
                            intent={'none'}
                            onClick={() => {
                                this.setState({
                                    reply: true,
                                })
                            }}
                        >
                            Reply
                        </Button>
                    </Pane>
                </SideSheet>
            </React.Fragment>
        )
    }

    renderReceivedMessages() {
        const {
            dispatch,
            messages: { received },
        } = this.props
        return (
            <Box width={['100%', '100%', '100%']} marginLeft={1}>
                <Table>
                    <Table.Head>
                        <Table.SearchHeaderCell />
                        <Table.TextHeaderCell>Title</Table.TextHeaderCell>
                        <Table.TextHeaderCell>From</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Tags</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={300}>
                        {Object.values(received)
                            .sort((a, b) => {
                                return (
                                    (a as ReceivedMessage).received_at -
                                    (b as ReceivedMessage).received_at
                                )
                            })
                            .map(msg => {
                                const {
                                    title,
                                    from,
                                    tags,
                                    received_at,
                                    body,
                                    read,
                                } = msg as ReceivedMessage
                                return (
                                    <Table.Row
                                        key={received_at}
                                        isSelectable
                                        onSelect={() => {
                                            console.log('msg', msg)
                                            dispatch({
                                                type: 'RECEIVED_MESSAGE',
                                                id: received_at,
                                                value: {
                                                    ...msg,
                                                    read: true,
                                                },
                                            })
                                            this.setState({
                                                isShown: true,
                                                activeMsg: msg,
                                            })
                                        }}
                                        intent={this.parseIntent(tags, read)}
                                    >
                                        <Table.TextCell />
                                        <Table.TextCell>{title}</Table.TextCell>
                                        <Table.TextCell>{from}</Table.TextCell>
                                        <Table.TextCell>
                                            {tags[0]}
                                        </Table.TextCell>
                                    </Table.Row>
                                )
                            })}
                    </Table.Body>
                </Table>
                {this.renderReceivedMessage()}
            </Box>
        )
    }
    render() {
        return (
            <Pane>
                <Flex flexWrap={'wrap'}>{this.renderReceivedMessages()}</Flex>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        messages: state.messages,
    }
}

export default connect(mapStateToProps)(Messages)
