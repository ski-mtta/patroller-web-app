import React, { Component, Props } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Pane, FormField, TextInputField, Button, Checkbox, Select } from 'evergreen-ui'
import DatePicker from "react-datepicker";
import { title } from 'change-case'
import { Routes } from '../../reducers/views'

import "react-datepicker/dist/react-datepicker.css";

class FormBuilder extends Component<any, any> {
    state = {
        redirect: false,
    }

    renderElementType(item: String, element: any, form_action_type: String) {
        const { dispatch } = this.props;
        const { type, name, required, validationMessage, placeholder, value, options } = element;
        switch (type) {
            case 'select':
                return (<Pane key={name} >
                    <label className="📦color_425A70 📦fnt-fam_b77syt 📦fnt-sze_14px 📦f-wght_500 📦ln-ht_20px 📦ltr-spc_-0-05px 📦dspl_block 📦mb_4px 📦box-szg_border-box">{name} <span title="This field is required.">*</span></label>
                    <Select value={value} onChange={(e: any) => {
                        dispatch({
                            type: form_action_type,
                            id: item,
                            value: e.target.value,
                        })
                    }}>
                        {options.map((opt: any, i: number) => {
                            return (<option key={i} value={opt}>{opt}</option>)
                        })}
                    </Select>
                </Pane>);
            case 'checkbox':
                return (
                    <Checkbox key={name}
                        checked={typeof value == 'boolean' ? value : false}
                        label={name}
                        onChange={(e: any) => {
                            dispatch({
                                type: form_action_type,
                                id: item,
                                value: !value,
                            })
                        }} />
                );
            case 'text_input':
                return (
                    <TextInputField
                        key={name}
                        width={280}
                        margin={5}
                        label={name}
                        name={name}
                        isInvalid={false}
                        required={required}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e: any) => {
                            dispatch({
                                type: form_action_type,
                                id: item,
                                value: e.target.value,
                            })
                        }}
                    />
                );
            case 'number':
                return (
                    <TextInputField
                        key={name}
                        width={280}
                        margin={5}
                        label={name}
                        name={name}
                        type={'number'}
                        min={0}
                        isInvalid={false}
                        required={required}
                        value={value}
                        onChange={(e: any) => {
                            dispatch({
                                type: form_action_type,
                                id: item,
                                value: e.target.value,
                            })
                        }}
                    />
                );
            case 'date':
                return (<Pane key={name}>
                    <span>
                        <label className="📦color_425A70 📦fnt-fam_b77syt 📦fnt-sze_14px 📦f-wght_500 📦ln-ht_20px 📦ltr-spc_-0-05px 📦dspl_block 📦mb_4px 📦box-szg_border-box">{name} <span title="This field is required.">*</span></label>
                        <DatePicker
                            selected={new Date(value)}
                            onChange={(e: any) => {
                                dispatch({
                                    type: form_action_type,
                                    id: item,
                                    value: e,
                                })
                            }}
                        />
                        <label className="📦color_425A70 📦fnt-fam_b77syt 📦fnt-sze_14px 📦f-wght_500 📦ln-ht_20px 📦ltr-spc_-0-05px 📦dspl_block 📦mb_4px 📦box-szg_border-box">
                            <small>{new Date(value).toDateString()}</small>
                        </label>
                    </span>
                </Pane >)
            default:
                return null;
        }
    }

    renderElements(form: any, form_action_type: any) {
        const { dispatch } = this.props

        return Object.keys(form).filter((item: any, i) => {
            return form[item].display
        }).map((item, i) => {
            return this.renderElementType(item, form[item], form_action_type)
        })
    }

    render() {
        const {
            dispatch,
            forms,
            form_action_types,
            form_labels,
            button_labels
        } = this.props

        return (
            <Pane
                clearfix
                padding={15}
                margin={5}
            >
                {forms.map((form: any, i: number) => {
                    return (
                        <Pane key={i}>
                            <h4 style={{ color: '#425a70' }}>{form_labels[i]}</h4>
                            {this.renderElements(form, form_action_types[i])}
                        </Pane>
                    )
                })}
                <hr />
                {button_labels.map((button: any, i: number) => {
                    return (<Button
                        key={i}
                        height={42}
                        margin={5}
                        appearance={'minimal'}
                        intent={'danger'}
                        justifyContent={'center'}
                        onClick={button.onClick}
                    >
                        {button.title}
                    </Button>)
                })}
            </Pane>
        )
    }
}

const mapStateToProps = (state: any, props: Props<any>) => {
    return {
        // main: state.main,
        // patroller: state.patroller,
        // forms: state.forms,
        // views: state.views,
    }
}

export default connect(mapStateToProps)(FormBuilder)
