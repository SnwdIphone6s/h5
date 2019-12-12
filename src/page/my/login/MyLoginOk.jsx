import React, { Component } from 'react';
import { Result, Icon, WhiteSpace, Button, ActivityIndicator, WingBlank } from 'antd-mobile';

import './style/myLoginOk.scss';

class MyLoginOk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }

    showToast = () => {
        this.setState({ animating: !this.state.animating });
        this.closeTimer = setTimeout(() => {
            this.setState({ animating: !this.state.animating });
        }, 1000);
        this.props.dispatch({ type: "USER_INFO_DATA", userInfoData: undefined });  // 注销登陆状态
        this.props.dispatch({ type: "LOGIN_SUCCESS_USERINFO_DATA", loginUserData: undefined });  // 注销登陆状态
    }

    render() {
        return (
            <div className='myLoginOk-body'>
                <div className='myLoginOk-items myLoginOk-result'>
                    <Result
                        img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                        title={<div><div>登录成功</div><div style={{ fontSize: '13px', marginTop: 15, color: 'blue' }}>{this.props.loginUserData["phone"]}</div></div>}
                        message="所提交内容已成功完成验证！"
                    />
                </div>
                <div className='myLoginOk-items myLoginOk-btn'>
                    <Button onClick={this.showToast} size="small">注销</Button>
                    <div className="toast-example">
                        <ActivityIndicator
                            toast
                            text="正在注销..."
                            animating={this.state.animating}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MyLoginOk;