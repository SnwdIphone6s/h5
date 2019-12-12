import React, { Component } from 'react';

import './style/homeTitle.scss';

class HomeTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='homeTitle-body'>
                <div className='homeTitle-font'>潮流巨星人气榜</div>
            </div>
        );
    }
}

export default HomeTitle;