// @ts-nocheck

import React, { Component } from 'react';
import { Modal, List, Button, PickerView, WhiteSpace, Checkbox } from 'antd-mobile';

import './style/noticeSelect.scss';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class NoticeSelect extends Component {
    constructor(props) {
        super(props);
    }

    onClose = (e) => {
        if (!this.props.readed) { // 已读不走接口
            this.props.dispatch({ type: "updateMessageById", playload: { message_id: this.props.messageId } });
        }
        this.props.onHandleBar(e);
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className='noticeSelect-body'>
                <Modal
                    popup
                    visible={this.props.selectModal}
                    onClose={this.onClose}
                    animationType="slide-up"
                >
                    <List renderHeader={this.props.title} className="popup-list">
                        <List.Item>
                            {this.props.content}
                        </List.Item>
                        <List.Item>
                            <Button type="primary" onClick={this.onClose}>确认</Button>
                        </List.Item>
                    </List>
                </Modal>
            </div>
        );
    }
}

export default NoticeSelect;