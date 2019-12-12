// @ts-nocheck

import React, { Component } from 'react';
import { Modal, List, Button, PickerView, WhiteSpace, Checkbox, Picker } from 'antd-mobile';

import './style/profilesSelect.scss';

class ProfilesSelect extends Component {
    constructor(props) {
        super(props);
    }

    handelOk = key => {
        this.props.dispatch({ type: "getPersonCateGory", starId: key[0] });
        this.props.showModal(undefined, false);

    }

    handelDismiss = key => {
        this.props.showModal(key, false);
    }

    initSelectHtml() {
        let starListData = this.props.starListData;
        let selectHtml = [];
        if (starListData && starListData.length > 0) {
            for (const item in starListData) {
                selectHtml.push({
                    label: starListData[item]["star_name"],
                    value: starListData[item]["star_id"]
                })
            }
        }
        return selectHtml;
    }

    render() {

        let _data = this.initSelectHtml();
        _data = _data.length > 0 ? [_data] : undefined;

        return (
            <div className='profilesSelect-body'>
                <List className="popup-list">
                    <Picker
                        visible={this.props.selectEd}
                        title="请选择明星列表"
                        data={_data}
                        cols={1}
                        cascade={false}
                        onOk={this.handelOk}
                        onChange={this.handelDismiss}
                        onDismiss={this.handelDismiss}
                    />
                </List>
            </div>
        );
    }
}

export default ProfilesSelect;