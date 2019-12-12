import React, { Component } from 'react';
import { ListView, PullToRefresh } from 'antd-mobile';

import HomeRow from './HomeRow.jsx';
import './style/homeList.scss';

const NUM_ROWS = 20;
let pageIndex = 0;
class HomeList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            refreshing: false,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    genData = (pIndex = 0) => {
        const dataBlob = {};
        for (let i = 0; i < NUM_ROWS; i++) {
            const ii = (pIndex * NUM_ROWS) + i;
            dataBlob[`${ii}`] = `row - ${ii}`;
        }
        return dataBlob;
    }

    componentDidMount() {
        setTimeout(() => {
            this.rData = this.genData(0);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...this.genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    separator = (sectionID, rowID) => (
        <div
            key={`${sectionID}-${rowID}`}
            style={{
                backgroundColor: '#F5F5F9',
                height: 1,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
            }}
        />
    )

    row = (rowData, sectionID, rowID) => {
        let starListData = this.props.starListData;
        let starListHtml = [];
        if (starListData) {
            if (parseInt(rowID) < starListData.length) {
                starListHtml.push(<HomeRow dispatch={this.props.dispatch} starListData={starListData[rowID]} key={rowID} rowID={rowID} />);
            }
        }
        return starListHtml;
    };

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoadingisLoading: false,
            });
        }, 600);
    };

    render() {
        return (
            <div className='homeList-body'>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // @ts-ignore
                    renderRow={this.row}
                    renderSeparator={this.separator}
                    className="am-list"
                    pageSize={1}
                    useBodyScroll
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    // onScroll={() => { console.log('scroll'); }}
                    // @ts-ignore
                    // pullToRefresh={<PullToRefresh
                    //     refreshing={this.state.refreshing}
                    //     onRefresh={this.onRefresh}
                    //     direction="up"
                    // />}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        );
    }
}

export default HomeList;