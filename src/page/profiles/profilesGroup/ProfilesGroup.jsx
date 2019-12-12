import React, { Component } from 'react';
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

import ProfilesCommunity from './ProfilesCommunity.jsx';
import ProfilesHeadJpg from './ProfilesHeadJpg.jsx';

import './style/profilesGroup.scss';
const prompt = Modal.prompt;

class ProfilesGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            communityModal: false,
            headJpgModal: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: "getIdolLimit" });
    }

    loadjy = () => {
        return (prompt(null, '请输入爱豆寄语', [
            { text: '取消' },
            { text: '提交', onPress: this.handlePress },
        ], 'default', null, ['爱豆寄语不能超过20个字']));
    }

    handlePress = value => {
        if (String(value).length > 20) {
            return Toast.fail("输入爱豆寄语超过了20个字，请重新输入");
        }
        let { star_id } = this.props.idolLimitData;
        let user_id = this.props.userIdData;
        this.props.dispatch({ type: "saveIdolMessage", playload: { user_id, star_id, idol_message: value } })
    }

    handleCommunity = (e) => {
        this.setState({
            communityModal: !this.state.communityModal
        })
    }

    handleHeadJpg = (e) => {
        this.setState({
            headJpgModal: !this.state.headJpgModal
        })
    }

    render() {
        return (
            <div className='profilesGroup-body'>
                <div style={{ touchAction: 'none' }} className='profilesGroup-item profilesGroup-jy'>
                    <Button onClick={this.loadjy} style={{ touchAction: 'none' }} type="ghost" size="small" className="am-button-borderfix" >
                        爱豆寄语
                    </Button>
                </div>
                <div className='profilesGroup-item profilesGroup-sq'>
                    <Button onClick={this.handleCommunity} type="ghost" size="small" className="am-button-borderfix" >
                        爱豆社群
                    </Button>
                    <ProfilesCommunity
                        dispatch={this.props.dispatch}
                        communityModal={this.state.communityModal}
                        handleCommunity={this.handleCommunity}
                        idolLimitData={this.props.idolLimitData}
                        userIdData={this.props.userIdData}
                    />
                </div>
                <div className='profilesGroup-item profilesGroup-tx'>
                    <Button onClick={this.handleHeadJpg} type="ghost" size="small" className="am-button-borderfix" >
                        爱豆头像
                    </Button>
                    <ProfilesHeadJpg
                        dispatch={this.props.dispatch}
                        headJpgModal={this.state.headJpgModal}
                        handleHeadJpg={this.handleHeadJpg}
                        idolLimitData={this.props.idolLimitData}
                        userIdData={this.props.userIdData}
                    />
                </div>
            </div>
        );
    }
}

export default ProfilesGroup;