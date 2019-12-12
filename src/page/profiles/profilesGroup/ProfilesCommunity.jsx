import React, { Component } from 'react';
import { Modal, List, Button, WhiteSpace, ImagePicker, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import './style/profilesCommunity.scss';

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

class ProfilesCommunity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            multiple: false,
            type: undefined
        }
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
    onClose = (e) => {
        this.labelFocusInst.focus();
        this.props.handleCommunity(e);
        if (this.state.type == "add") {
            const { getFieldValue } = this.props.form;
            let idol_flock_num = getFieldValue("idolFlockNum");
            let { star_id } = this.props.idolLimitData;
            let user_id = this.props.userIdData;
            let file = this.state.files;
            var form = new FormData();
            form.append("idol_flock_image", file[0]["file"]);
            form.append("star_id", star_id);
            form.append("user_id", user_id);
            form.append("idol_flock_num", idol_flock_num);
            this.props.dispatch({ type: "saveIdolFlock", playload: { forms: form } })
        }
    }

    onChange = (files, type, index) => {
        this.setState({
            files,
            type
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <form>
                <div className='profilesCommunity-body'>
                    <Modal
                        popup
                        visible={this.props.communityModal}
                        onClose={this.onClose}
                        animationType="slide-up"
                        className='profilesCommunity-modal'
                    >
                        <List renderHeader="爱豆社群" className="popup-list">
                            {getFieldDecorator('idolFlockNum')(<InputItem placeholder="请输入社群号" ref={el => this.labelFocusInst = el}>
                                <div onClick={() => this.labelFocusInst.focus()}>
                                    社群号：
                                </div>
                            </InputItem>)}
                            <div className='profilesCommunity-footer'>
                                <div className='profilesCommunity-items profilesCommunity-ewm'>社群二维码：</div>
                                <div className='profilesCommunity-items profilesCommunity-imgs'>
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onChange}
                                        selectable={this.state.files.length < 1}
                                        multiple={this.state.multiple}
                                        className='profilesCommunity-imagePicker'
                                    />
                                    {/* <input type="file" id="file" name="file" accept="image/*" /> */}
                                </div>
                            </div>
                            <List.Item>
                                <Button type="primary" onClick={this.onClose}>确认</Button>
                            </List.Item>
                        </List>
                    </Modal>
                </div>
            </form>
        );
    }
}

export default createForm()(ProfilesCommunity);