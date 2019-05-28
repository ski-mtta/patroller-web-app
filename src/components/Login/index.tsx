import React, { Component, Props } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Pane, FormField, TextInput, Button } from 'evergreen-ui'

class Login extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            redirect: false,
        }
    }

    render() {
        const {
            dispatch,
            patroller: { sp_number, password },
        } = this.props
        return this.state.redirect ? (
            <Redirect push to={'/join'} />
        ) : (
            <Pane alignContent={'center'} elevation={4} width={420}>
                <FormField
                    label={<h2>MTTA Ski Patrol Login</h2>}
                    padding={10}
                    width={400}
                >
                    <TextInput
                        width={400}
                        marginTop={5}
                        name="sp_number"
                        type={'number'}
                        min={0}
                        placeholder={'Ski Patrol Number'}
                        defaultValue={undefined}
                        value={sp_number}
                        onChange={(e: any) => {
                            dispatch({
                                type: 'PATROLLER_ACTION',
                                id: 'sp_number',
                                value: e.target.value,
                            })
                        }}
                        height={40}
                    />
                    <br />
                    <TextInput
                        width={400}
                        marginTop={5}
                        name="password"
                        type={'password'}
                        placeholder={'Password'}
                        value={password}
                        onChange={(e: any) => {
                            dispatch({
                                type: 'PATROLLER_ACTION',
                                id: 'password',
                                value: e.target.value,
                            })
                        }}
                        height={40}
                    />
                    <Button
                        height={42}
                        width={400}
                        marginTop={5}
                        appearance={'primary'}
                        intent={'danger'}
                        justifyContent={'center'}
                    >
                        Login
                    </Button>
                    <br />
                    <Button
                        height={36}
                        width={400}
                        marginTop={5}
                        justifyContent={'center'}
                        disabled={false}
                        onClick={() => this.setState({ redirect: true })}
                    >
                        Join Ski Patrol
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

export default connect(mapStateToProps)(Login)
