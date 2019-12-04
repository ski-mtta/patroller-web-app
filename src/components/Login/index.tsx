import React, { Component, Props } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Pane, FormField, TextInput, Button } from 'evergreen-ui'

import Api from '../../actions'
import { Routes } from '../../reducers/views'

class Login extends Component<any, any> {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch({
            type: 'VIEW_ACTION',
            id: 'activeRoute',
            value: Routes.Login,
        })
    }

    render() {
        const {
            dispatch,
            patroller: { sp_number, password },
            views: { activeRoute },
            authentication: { authenticated },
        } = this.props

        if (authenticated) {
            return <Redirect push to={'/home'} />
        }

        switch (activeRoute) {
            case Routes.Join:
                return <Redirect push to={'/join'} />
            case Routes.Patroller:
                return <Redirect push to={'/home'} />
            default:
                return (
                    <Pane
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Pane elevation={4} width={320} marginTop={'10%'}>
                            <FormField
                                label={
                                    <h2 style={{ paddingLeft: 10 }}>
                                        MTTA Ski Patrol Login
                                    </h2>
                                }
                                width={300}
                                padding={5}
                            >
                                <TextInput
                                    width={280}
                                    margin={5}
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
                                    width={280}
                                    margin={5}
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
                                    width={280}
                                    margin={5}
                                    appearance={'primary'}
                                    intent={'danger'}
                                    justifyContent={'center'}
                                    onClick={() => {
                                        dispatch(
                                            Api.login({
                                                sp_number,
                                                password,
                                            } as any),
                                        )
                                    }}
                                >
                                    Login
                                </Button>
                                <br />
                                <Button
                                    height={36}
                                    width={280}
                                    margin={5}
                                    justifyContent={'center'}
                                    disabled={false}
                                    onClick={() =>
                                        dispatch({
                                            type: 'VIEW_ACTION',
                                            id: 'activeRoute',
                                            value: Routes.Join,
                                        })
                                    }
                                >
                                    Join Ski Patrol
                                </Button>
                            </FormField>
                        </Pane>
                    </Pane>
                )
        }
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        patroller: state.patroller,
        views: state.views,
        authentication: state.authentication,
    }
}

export default connect(mapStateToProps)(Login)
