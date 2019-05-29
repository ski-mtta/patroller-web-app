import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Pane, FormField, TextInput, Button } from 'evergreen-ui'
import { number } from 'prop-types'
import { title } from 'change-case'

import PhysicalAddress from '../PhysicalAddress'

class Join extends Component<any, any> {
    renderPatrollerDetails() {
        const { dispatch, patroller } = this.props

        return Object.keys(patroller)
            .filter(item => {
                if (
                    // item === 'sp_number' ||
                    // item === 'password' ||
                    item === 'patroller_id'
                ) {
                    return false
                } else {
                    return true
                }
            })
            .map((item, i) => {
                return (
                    <TextInput
                        key={i}
                        width={400}
                        marginTop={5}
                        name={item}
                        isInvalid={(() => {
                            if (
                                item === 'retype_password' &&
                                patroller[item].length > 0
                            ) {
                                console.log(patroller[item], patroller['password']);
                                return item != patroller['password']
                            } else {
                                return false
                            }
                        })()}
                        // required
                        // validationmessage={'Please ensure your password is correctly entered.'}
                        type={(() => {
                            if (item === 'sp_number') {
                                return 'number'
                            } else if (
                                item === 'password' ||
                                item === 'retype_password'
                            ) {
                                return 'password'
                            } else {
                                return 'string'
                            }
                        })()}
                        placeholder={
                            item === 'sp_number'
                                ? 'Ski Patrol Number (If Issued)'
                                : title(item)
                        }
                        value={patroller[item]}
                        onChange={(e: any) => {
                            dispatch({
                                type: 'PATROLLER_ACTION',
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
            patroller: { password },
        } = this.props
        return (
            <Pane elevation={4} width={420}>
                <FormField
                    label={<h2>Join MTTA Ski Patrol</h2>}
                    padding={10}
                    width={400}
                >
                    {this.renderPatrollerDetails()}
                    <PhysicalAddress />
                    <Button
                        height={42}
                        width={400}
                        marginTop={5}
                        appearance={'primary'}
                        intent={'danger'}
                        justifyContent={'center'}
                    >
                        Join
                    </Button>
                </FormField>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(Join)
