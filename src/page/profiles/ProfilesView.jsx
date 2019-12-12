import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfilesTitle from './profilesTitle/ProfilesTitle.jsx';
import ProfilesEcharts from './profilesEcharts/ProfilesEcharts.jsx';
import ProfilesGroup from './profilesGroup/ProfilesGroup.jsx';

import './style/profilesView.scss';

class ProfilesView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
//     <div className="profilesView-title">
//     <ProfilesTitle />
// </div>
    render() {
        return (
            <div className='profilesView-body'>

                <div className="profilesView-echarts">
                    <ProfilesEcharts
                        dispatch={this.props.dispatch}
                        personStarGraphData={this.props.personStarGraphData}
                        personCateGoryData={this.props.personCateGoryData}
                        starNo1={this.props.starNo1}
                        userIdData={this.props.userIdData}
                        userInfoData={this.props.userInfoData}
                        loginUserData={this.props.loginUserData}
                        starListData={this.props.starListData}
                        autoUsername={this.props.autoUsername}
                    />
                </div>
                <div className={this.props.idolLimitData ? "profilesView-group" : ""}>
                    <ProfilesGroup
                        dispatch={this.props.dispatch}
                        userIdData={this.props.userIdData}
                        idolLimitData={this.props.idolLimitData}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTab: state.main_R.selectedTab,
        personStarGraphData: state.profile_R.personStarGraphData,
        personCateGoryData: state.profile_R.personCateGoryData,
        starNo1: state.home_R.starNo1,
        idolLimitData: state.profile_R.idolLimitData,
        userIdData: state.profile_R.userIdData,
        userInfoData: state.main_R.userInfoData,
        loginUserData: state.main_R.loginUserData,
        starListData: state.home_R.starListData,
        autoUsername: state.profile_R.autoUsername
    }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesView);
