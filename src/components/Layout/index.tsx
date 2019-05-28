import React, { Component, Props } from 'react'
import { Store } from 'redux'
import { connect } from 'react-redux'
import { Pane } from 'evergreen-ui'

import Header from '../Header/index'

class Layout extends Component<any, any> {
    render() {
        const { Router } = this.props
        return (
            <Pane 
                height={1000}
                padding={150}
            >
                {/* <Header /> */}
                <Router />
            </Pane>
        )
    }
}

const mapStateToProps = (state: Store, props: Props<any>) => {
    return {
        main: state,
    }
}

export default connect(mapStateToProps)(Layout)
