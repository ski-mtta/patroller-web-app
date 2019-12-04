import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'
import { Pane, Avatar, Button, Tab, Tablist, Paragraph } from 'evergreen-ui'

import PatrollerDetails from '../PatrollerDetails/index'

class Profile extends Component<any, any> {
    render() {
        const { details } = this.props.patroller;
        return (<PatrollerDetails activePatroller={details} />)
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(Profile)
