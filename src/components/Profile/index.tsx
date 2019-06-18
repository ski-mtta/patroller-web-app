import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import Grid from 'react-css-grid'
import { Pane, Avatar, Heading, Tab, Icon } from 'evergreen-ui'

class Profile extends Component<any, any> {
    componentDidMount() {
        // Fetch Patroller Information;
    }

    render() {
        const {
            patroller: { first_name, last_name, profile_pic },
        } = this.props
        return (
            <Pane clearfix>
                <Grid 
                    width={200}
                    gap={30}
                >
                    <div>
                        <Pane 
                            elevation = {1}
                            alignItems = "center"
                            width = {180}
                            height = {400}
                            backgroundColor = "white"
                            flexDirection = "column"
                        >
                            <Avatar src={profile_pic} name={first_name}/>
                            <Heading>Welcome, {first_name} {last_name}</Heading>
                            <Tab isSelected> <Icon icon="person" />  Profile</Tab>
                            <Tab> <Icon icon="calendar" />  Schedule</Tab>
                            <Tab> <Icon icon="feed" />  News</Tab>
                        </Pane>
                    </div>
                    <div>
                        <Pane
                            elevation = {1}
                            backgroundColor = "white"
                            width = {200}
                            height = {400}
                            flexDirection = "column"
                        >
                          Content Panel              
                        </Pane>
                    </div>
                </Grid>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(Profile)
