import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Pane } from 'evergreen-ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const gCalendar = {
    border: 0,
    width: '100%',
    height: '100%',
    frameborder: 0,
    scrolling: 'no',
}

enum Views {
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day',
    AGENDA = 'agenda',
}

const ColoredDateCellWrapper = ({ children }: any) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: '#fff',
        },
    })

class Calendar extends Component<any, any> {
    render() {
        const { patrol_dates } = this.props.calendar
        return (
            <Pane background={'#fff'} padding={5} height={800}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=no-reply%40skimtta.services&ctz=America%2FVancouver"
                    style={gCalendar}
                />
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        calendar: state.calendar,
    }
}

export default connect(mapStateToProps)(Calendar)
