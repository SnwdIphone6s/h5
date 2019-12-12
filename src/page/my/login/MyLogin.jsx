import React, { Component } from 'react';
import { List, InputItem, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import './style/myLogin.scss';

class MyLogin extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 校验手机
     * @param {} phone 
     */
    checkPhone(phone) {
        if (!phone) {
            Toast.fail("手机号码不能为空，请填写", 2)
            return;
        }
        phone = phone.replace(/\s+/g, "");
        let regex = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if (!regex.test(phone)) {
            Toast.fail("手机号码有误，请重新填写", 2)
            return;
        }
        return phone;
    }

    /**
     * 校验验证码
     * @param {*} code 
     */
    checkCode(code) {
        if (!code) {
            Toast.fail("请输入验证码", 2);
            return;
        }
        if (code.length > 6) {
            Toast.fail("请输入正确的验证码", 2)
            return
        }
        return code
    }

    handleOk() {
        this.autoFocusInst.focus();
        let { getFieldValue } = this.props.form;
        let phone = getFieldValue("phone");
        phone = this.checkPhone(phone);
        this.props.dispatch({ type: "sendVerifyCode", playload: { phone } })
    }

    handleSubmit() {
        this.autoFocusInst.focus();
        let { getFieldValue } = this.props.form;
        let phone = getFieldValue("phone"); // 手机号码
        let code = getFieldValue("code"); // 验证码
        phone = this.checkPhone(phone);
        code = this.checkCode(code);
        this.props.dispatch({ type: "getUserInfo", playload: { phone, ver_code: code } });
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='myLogin-body'>
                <div className='myLogin-list'>
                    {/* <div className='myLogin-items myLogin-title'>
                        登录
                    </div> */}
                    <div className='myLogin-items myLogin-phone'>
                        <List>
                            <InputItem
                                {...getFieldProps('phone')}
                                clear
                                placeholder="请输入手机号码"
                                ref={el => this.autoFocusInst = el}
                                type="phone"
                            >手机号码</InputItem>
                        </List>
                    </div>
                    <div className='myLogin-items myLogin-code'>
                        <div className='myLogin-code-items myLogin-code-r'>
                            <List>
                                <InputItem
                                    {...getFieldProps('code')}
                                    clear
                                    placeholder="请输入验证码"
                                    ref={el => this.autoFocusInst = el}
                                    type="number"
                                    maxLength={6}
                                >验证码</InputItem>
                            </List>
                        </div>
                        <div className='myLogin-code-items myLogin-code-l'>
                            <Button size='small' onClick={this.handleOk.bind(this)}>获取验证码</Button>
                        </div>
                    </div>
                    <div className='myLogin-items myLogin-btn'>
                        <Button onClick={this.handleSubmit.bind(this)} type="primary">登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default createForm()(MyLogin);