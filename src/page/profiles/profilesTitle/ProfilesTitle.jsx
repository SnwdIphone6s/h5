import React, { Component } from 'react';

import './style/profilesTitle.scss';

class ProfilesTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='profilesTitle-body'>
                <div className='profilesTitle-font'>~~~❤个人智能小帮手❤~~~</div>
            </div>
        );
    }
}

export default ProfilesTitle;