import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Pane, FormField, TextInputField, Button } from 'evergreen-ui'
import { number } from 'prop-types'
import { title } from 'change-case'

import Password from '../Password'

class Join extends Component<any, any> {
    state = {
        redirect: false,
    }

    renderPatrollerDetails() {
        const { dispatch, patroller } = this.props

        return Object.keys(patroller)
            .filter(item => {
                if (
                    item === 'patroller_id' ||
                    item === 'password' ||
                    item === 'retype_password' ||
                    item === 'profile_pic'
                ) {
                    return false
                } else {
                    return true
                }
            })
            .map((item, i) => {
                return (
                    <TextInputField
                        key={i}
                        width={280}
                        margin={5}
                        label={title(item)}
                        name={item}
                        isInvalid={(() => {
                            if (
                                item == 'retype_password' &&
                                patroller[item].length > 0
                            ) {
                                return patroller[item] != patroller['password']
                            } else {
                                return false
                            }
                        })()}
                        required={(() => {
                            if (item === 'sp_number') {
                                return false
                            } else {
                                return true
                            }
                        })()}
                        validationMessage={(() => {
                            if (
                                item == 'retype_password' &&
                                patroller[item].length > 0 &&
                                patroller[item] != patroller['password']
                            ) {
                                return 'Please ensure your password is correctly entered.'
                            }
                        })()}
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
                    />
                )
            })
    }

    render() {
        const { dispatch, patroller, client } = this.props
        return this.state.redirect ? (
            <Redirect push to="/profile" />
        ) : (
            <Pane display={'flex'} justifyContent={'center'}>
                <Pane elevation={4} width={320}>
                    <FormField
                        label={
                            <h2 style={{ paddingLeft: 10 }}>
                                Join MTTA Ski Patrol
                            </h2>
                        }
                        width={300}
                        padding={5}
                    >
                        {this.renderPatrollerDetails()}
                        <hr />
                        <Password />
                        <hr />
                        <Button
                            height={42}
                            width={280}
                            margin={5}
                            appearance={'primary'}
                            intent={'danger'}
                            justifyContent={'center'}
                            onClick={() => {
                                console.log('patroller', patroller)
                                // dispatch(client.createPatroller(patroller));
                                this.setState({
                                    redirect: true,
                                })
                            }}
                        >
                            Join
                        </Button>
                    </FormField>
                </Pane>
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        patroller: state.patroller,
        client: state.api.client,
    }
}

export default connect(mapStateToProps)(Join)
