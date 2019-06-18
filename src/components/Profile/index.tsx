import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import Grid from 'react-css-grid'
import { Pane, Avatar, Heading, Icon , Tablist, SidebarTab} from 'evergreen-ui'

class Profile extends Component<any, any> {
    componentDidMount() {
        // Fetch Patroller Information;
    }

    render() {
        const {
            patroller: { first_name, last_name, profile_pic },
        } = this.props
        return (
            <Pane clearfix
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justify-content="center"
            >
                <Pane 
                    elevation = {1}
                    height = {400}
                    backgroundColor = "white"
                    marginRight={20}
                    float="left" 
                    justifyItems="center"
                    
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                    justify-content="center"
                >
                        <Avatar src={profile_pic} name={first_name} alignItems="center" width={50} height={50} />
                        <Heading>Welcome, {first_name} {last_name}</Heading>
                        <Tablist>
                            <SidebarTab isSelected> <Icon icon="person" />  Profile</SidebarTab>
                            <SidebarTab> <Icon icon="calendar" />  Schedule</SidebarTab>
                            <SidebarTab> <Icon icon="feed" />  News</SidebarTab>
                        </Tablist>
                </Pane>
                        <Pane
                            elevation={1}
                            background="white"
                            flex="1"
                            padding={16}
                        >
                            Content Panel   
                    </Pane>           
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
