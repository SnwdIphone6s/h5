import React, { Component } from 'react';

import './style/noticeTitle.scss';

class NoticeTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='noticeTitle-body'>
                <div className='noticeTitle-font'>通知消息</div>
            </div>
        );
    }
}

export default NoticeTitle;