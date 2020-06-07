import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'
import {
    Pane,
    Avatar,
    Button,
    SidebarTab,
    Tablist,
    Paragraph,
} from 'evergreen-ui'
import Api from '../../actions'

import Messages from '../Messages/index'
import Profile from '../Profile/index'
import Calendar from '../Calendar/index'
import Patrollers from '../Patrollers/index'
import Schedule from '../Schedule/index'
import Map from '../Map/index'
import OnPatrol from '../OnPatrol/index'

import { Views, Routes } from '../../reducers/views'
const views = Object.values(Views)

const getDisplaySidenav = () => {
    const MIN_SCREEN_WIDTH = 710
    return window.screen.width > MIN_SCREEN_WIDTH ? undefined : 'none'
}

class Patroller extends Component<any, any> {
    constructor(ops: any) {
        super(ops)
        this.state = {
            showSideNav: getDisplaySidenav(),
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ showSideNav: getDisplaySidenav() })
        })
    }

    renderTab(tab: String) {
        switch (tab) {
            case Views.Messages:
                return <Messages />
            case Views.Profile:
                return <Profile />
            case Views.Calendar:
                return <Calendar />
            case Views.Patrollers:
                return <Patrollers />
            case Views.Schedule:
                return <Schedule />
            case Views.Map:
                return <Map />
            case Views.OnPatrol:
                return <OnPatrol />
            default:
                return <Patrollers />
        }
    }

    render() {
        const {
            dispatch,
            views: { activeView, activeRoute },
            patroller: { first_name, last_name, profile_pic },
        } = this.props
        const { showSideNav } = this.state

        if (activeRoute == Routes.Logout) {
            return <Redirect push to={'/login'} />
        } else {
            return (
                <Pane display={'flex'} height={120} margin={16}>
                    <Tablist flexBasis={240} display={showSideNav}>
                        {views.map(tab => (
                            <SidebarTab
                                key={tab}
                                id={tab}
                                appearance={'primary'}
                                intent={'danger'}
                                onSelect={() => {
                                    dispatch({
                                        type: 'VIEW_ACTION',
                                        id: 'activeView',
                                        value: tab,
                                    })
                                    if (tab == Views.Logout) {
                                        dispatch(Api.logout())
                                    }
                                }}
                                isSelected={tab === activeView}
                                aria-controls={`panel-${tab}`}
                            >
                                {tab}
                            </SidebarTab>
                        ))}
                    </Tablist>
                    <Pane flex="1">
                        {views.map(tab => (
                            <Box
                                key={tab}
                                id={`panel-${tab}`}
                                role="tabpanel"
                                aria-labelledby={tab}
                                aria-hidden={tab !== activeView}
                                display={tab === activeView ? 'block' : 'none'}
                            >
                                {this.renderTab(tab)}
                            </Box>
                        ))}
                    </Pane>
                </Pane>
            )
        }
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        patroller: state.patroller,
        views: state.views,
    }
}

export default connect(mapStateToProps)(Patroller)
