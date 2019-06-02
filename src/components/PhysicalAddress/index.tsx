import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Pane, FormField, TextInputField, Button } from 'evergreen-ui'
import { title } from 'change-case'

class PhysicalAddress extends Component<any, any> {
    renderPhysicalAddressInputs() {
        const { dispatch, physical_address } = this.props

        return Object.keys(physical_address).map((item, i) => {
            return (
                <TextInputField
                    key={i}
                    width={280}
                    margin={5}
                    label={title(item)}
                    required
                    name={item}
                    type={item}
                    placeholder={title(item)}
                    value={physical_address[item]}
                    onChange={(e: any) => {
                        dispatch({
                            type: 'PATROLLER_PHYSICAL_ADDRESS_ACTION',
                            id: item,
                            value: e.target.value,
                        })
                    }}
                />
            )
        })
    }

    render() {
        const { dispatch } = this.props
        return (
            <div>
                <hr />
                {this.renderPhysicalAddressInputs()}
            </div>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        physical_address: state.physical_address,
    }
}

export default connect(mapStateToProps)(PhysicalAddress)
