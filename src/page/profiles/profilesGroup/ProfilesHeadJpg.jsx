import React, { Component } from 'react';
import { Modal, List, Button, WhiteSpace, ImagePicker, InputItem } from 'antd-mobile';

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

import './style/profilesHeadJpg.scss';

class ProfilesHeadJpg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            multiple: false,
            type: undefined
        }
    }

    onClose = (e) => {
        this.props.handleHeadJpg(e);
        if (this.state.type == "add") {
            let { star_id } = this.props.idolLimitData;
            let user_id = this.props.userIdData;
            let file = this.state.files;
            var form = new FormData();
            form.append("idol_image", file[0]["file"]);
            form.append("star_id", star_id);
            form.append("user_id", user_id);
            this.props.dispatch({ type: "saveIdolImage", playload: { forms: form } })
        }
    }

    onChange = (files, type, index) => {
        this.setState({
            files,
            type
        });
    }

    render() {
        return (
            <form>
                <div className='profilesHeadJpg-body'>
                    <Modal
                        popup
                        visible={this.props.headJpgModal}
                        onClose={this.onClose}
                        animationType="slide-up"
                        className='profilesHeadJpg-modal'
                    >
                        <List renderHeader="爱豆头像" className="popup-list">
                            <div className='profilesHeadJpg-footer'>
                                <div className='profilesHeadJpg-items profilesHeadJpg-ewm'>图片：</div>
                                <div className='profilesHeadJpg-items profilesHeadJpg-imgs'>
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onChange}
                                        selectable={this.state.files.length < 1}
                                        multiple={this.state.multiple}
                                        className='profilesHeadJpg-imagePicker'
                                    />
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

export default ProfilesHeadJpg;