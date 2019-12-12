import React, { Component } from 'react';

import ProfilesPie from './ProfilesPie.jsx';
import ProfilesCategory from './ProfilesCategory.jsx';

import './style/profilesEcharts.scss';

class ProfilesEcharts extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        this.props.dispatch({ type: "getPersionStarGraph" });
        
    }
    render() {
        return (
            <div className='profilesEcharts-body'>
                <div className='profilesEcharts-pie'>
                    <ProfilesPie
                        dispatch={this.props.dispatch}
                        personStarGraphData={this.props.personStarGraphData}
                        userIdData={this.props.userIdData}
                        userInfoData={this.props.userInfoData}
                        loginUserData={this.props.loginUserData}
                        autoUsername={this.props.autoUsername}
                    />
                </div>
                <div className='profilesEcharts-category'>
                    <ProfilesCategory
                        dispatch={this.props.dispatch}
                        starNo1={this.props.starNo1}
                        personCateGoryData={this.props.personCateGoryData}
                        personStarGraphData={this.props.personStarGraphData}
                        starListData={this.props.starListData}
                    />
                </div>
            </div>
        );
    }
}

export default ProfilesEcharts;