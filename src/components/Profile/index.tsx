import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import Grid from 'react-css-grid'
import { Pane } from 'evergreen-ui'

class Profile extends Component<any, any> {
    componentDidMount() {
        // Fetch Patroller Information;
    }

    render() {
        const {
            patroller: { first_name, last_name, profile_pic },
        } = this.props
        return (
            <Pane justifyContent={'left'}>
                <Grid width={200}>
                    <div
                        style={{
                            width: 180,
                            padding: 5,
                        }}
                    >
                        <img src={profile_pic} />
                    </div>
                    <div>
                        <h1>
                            {first_name} {last_name}
                        </h1>
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
