import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Pane, FormField, TextInput, Button } from 'evergreen-ui'
import { title } from "change-case";

class PhysicalAddress extends Component<any, any> {
    renderPhysicalAddressInputs() {
        const {
            dispatch,
            physical_address,
        } = this.props

        return Object.keys(physical_address).map((item, i) => {
            return (
                <TextInput
                    key={i}
                    marginTop={5}
                    width={390}
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
                    height={40}
                />
            )
        })
    }

    render() {
        const {
            dispatch,
        } = this.props
        return (
            <Pane>
                <FormField
                    label={<h4>Physical Address</h4>}
                    padding={5}
                >
                    {this.renderPhysicalAddressInputs()}
                </FormField>
            </Pane>
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
