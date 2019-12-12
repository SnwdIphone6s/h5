import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyLogin from './login/MyLogin.jsx';
// import MyLoginOk from './login/MyLoginOk.jsx';
import ProfilesView from '../profiles/ProfilesView.jsx';

import './style/myView.scss';

class MyView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='myView-body'>
                <div className='myView-title' >
                    潮流巨星人气榜
                </div>
                <div className='myView-denglu'>
                    {this.props.loginUserData ?'投票统计':'登录'}
                </div>
                <div className='myView-index'>
                    {this.props.loginUserData ?
                        <ProfilesView
                            dispatch={this.props.dispatch}
                            loginUserData={this.props.loginUserData}
                        /> :
                        <MyLogin
                            dispatch={this.props.dispatch}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginUserData: state.main_R.loginUserData
    }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyView);
