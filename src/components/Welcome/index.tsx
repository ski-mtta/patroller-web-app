import React, { Component, Props } from 'react'
import { Store } from 'redux'
import { connect } from 'react-redux'
import { Pane } from 'evergreen-ui'

import Login from '../Login';

class Welcome extends Component<any, any> {
    render() {
        const { Router } = this.props
        return (
            <Pane display={'flex'} justifyContent={'center'}>
                <Login />
            </Pane>
        )
    }
}

const mapStateToProps = (state: Store, props: Props<any>) => {
    return {
        main: state,
    }
}

export default connect(mapStateToProps)(Welcome)
