import React, { Component, Props } from 'react'
import { Store } from 'redux'
import { connect } from 'react-redux'
import { Pane, Tablist, Tab } from 'evergreen-ui'

class Header extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            tabs: ['Login', 'Join Ski Patrol'],
            activeTab: 0,
        }
    }
    render() {
        const { Router } = this.props
        const { tabs, activeTab } = this.state
        return (
            <Pane padding={10} display={'flex'} justifyContent={'space-evenly'}>
                <h3>MTTA</h3>
                <div />
                <Pane>
                    <Tablist marginBottom={16}>
                        {tabs.map((tab: string, index: number) => (
                            <Tab
                                appearance={'primary'}
                                intent={'danger'}
                                key={tab}
                                id={tab}
                                onSelect={() => {
                                    // Navigate to location;
                                    this.setState({
                                        activeTab: index,
                                    })
                                }}
                                isSelected={index === activeTab}
                                aria-controls={`panel-${tab}`}
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tablist>
                </Pane>
            </Pane>
        )
    }
}

const mapStateToProps = (state: Store, props: Props<any>) => {
    return {
        main: state,
    }
}

export default connect(mapStateToProps)(Header)
