import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabBar } from 'antd-mobile';

import HomeView from './home/HomeView.jsx';
import NoticeView from './notice/NoticeView.jsx';
import ProfilesView from './profiles/ProfilesView.jsx';
import MyView from './my/MyView.jsx';

import './main.scss';
import { Toast } from 'antd-mobile';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch({ type: "getStarList" });
        if (!this.props.loginUserData) {
            this.props.dispatch({ type: "getUserInfo", playload: { phone: undefined, ver_code: undefined } });
        } else {
            let { phone, ver_code } = this.props.loginUserData;
            this.props.dispatch({ type: "getUserInfo", playload: { phone, ver_code } });
        }
        
    }

    handlePress(tabKey) {
        if (tabKey == "profiles") {
            if (!this.props.userInfoData) {
                Toast.info("账户未登陆，请重新在[我的]登录！", 2);
                return
            }
            this.props.dispatch({ type: "getPersionStarGraph" });
            let starListData = this.props.starListData;
            let star_id = starListData && starListData.length > 0 ? starListData[0]["star_id"] : undefined;
            this.props.dispatch({ type: "getPersonCateGory", star_id });
        } else if (tabKey == "notice") {
            if (!this.props.userInfoData) {
                Toast.info("账户未登陆，请重新在[我的]登录！", 2);
                return
            }
            this.props.dispatch({ type: "getUserMessage" });
        } else if (tabKey == "home") {
            this.props.dispatch({ type: "getStarList" });
        }
        this.props.dispatch({ type: "TABS_SELECTED", payload: { selectedTab: tabKey } });
    }

    render() {
        return (
            <div className='myView-body'>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={false}
                    >
                        <TabBar.Item selected={this.props.selectedTab == "home" ? true : false} title="首页" key="home" onPress={this.handlePress.bind(this, "home")} >
                            {this.props.selectedTab == "home" ? <HomeView /> : ""}
                        </TabBar.Item>
                        {/* <TabBar.Item selected={this.props.selectedTab == "profiles" ? true : false} title="分析" key="profiles" onPress={this.handlePress.bind(this, "profiles")} >
                            {this.props.selectedTab == "profiles" ? <ProfilesView /> : ""}
                        </TabBar.Item> */}
                        <TabBar.Item selected={this.props.selectedTab == "notice" ? true : false} title="消息" key="notice" onPress={this.handlePress.bind(this, "notice")} >
                            {this.props.selectedTab == "notice" ? <NoticeView /> : ""}
                        </TabBar.Item>
                        <TabBar.Item selected={this.props.selectedTab == "my" ? true : false} title="我的" key="my" onPress={this.handlePress.bind(this, "my")} >
                            {this.props.selectedTab == "my" ? <MyView /> : ""}
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedTab: state.main_R.selectedTab,
        userInfoData: state.main_R.userInfoData,
        loginUserData: state.main_R.loginUserData,
        starListData: state.home_R.starListData
    }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
