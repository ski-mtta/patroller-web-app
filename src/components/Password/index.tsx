import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { TextInputField } from 'evergreen-ui'
import { title } from 'change-case'

class Password extends Component<any, any> {
    renderPasswords() {
        const { dispatch, patroller } = this.props

        return Object.keys(patroller)
            .filter(item => {
                if (item === 'password' || item === 'retype_password') {
                    return true
                } else {
                    return false
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
                        required
                        validationMessage={(() => {
                            if (
                                item == 'retype_password' &&
                                patroller[item].length > 0 &&
                                patroller[item] != patroller['password']
                            ) {
                                return 'Please ensure your password is correctly entered.'
                            }
                        })()}
                        type={'password'}
                        placeholder={title(item)}
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
        return <div>{this.renderPasswords()}</div>
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        main: state.main,
        patroller: state.patroller,
    }
}

export default connect(mapStateToProps)(Password)
