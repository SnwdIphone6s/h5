import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeTile from './HomeTitle/HomeTile.jsx';
import HomeJpg from './homeJpg/HomeJpg.jsx';
import HomeList from './homeList/HomeList.jsx';

import './style/homeView.scss';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='homeView-body'>
                <div className="homeView-item homeView-title">
                    <HomeTile
                        dispatch={this.props.dispatch}
                    />
                </div>
                <div className="homeView-item homeView-jpg">
                    <HomeJpg
                        dispatch={this.props.dispatch}
                        starFansListData={this.props.starFansListData}
                        starJpgLimit={this.props.starJpgLimit}
                        starNo1={this.props.starNo1}
                    />
                </div>
                <div className="homeView-item homeView-list">
                    <HomeList
                        dispatch={this.props.dispatch}
                        starListData={this.props.starListData}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        starListData: state.home_R.starListData,
        starJpgLimit: state.home_R.starJpgLimit,
        starFansListData: state.home_R.starFansListData,
        starNo1: state.home_R.starNo1,
        selectedTab: state.main_R.selectedTab,
    }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);