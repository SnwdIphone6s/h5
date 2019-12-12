// @ts-nocheck
import React, { Component } from 'react';
import echarts from 'echarts';
import { Button } from 'antd-mobile';

import ProfilesSelect from './ProfilesSelect.jsx';

import './style/profilesCategory.scss';

class ProfilesCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectEd: false,
            starSelect: undefined,
            trendType: ["非常强势", "很强势", "比较强势", "比较弱势", "很弱势", "非常弱势"],
            trendStar: ["最强超星", "强势巨星", "大众明星", "一般明星", "小明星", "最弱明星"]
        };
    }

    componentDidUpdate() {
        // 基于准备好的dom，初始化echarts实例
        let starNo1 = this.props.starNo1;
        let personCateGoryData = this.props.personCateGoryData;
        let _xAxisData = [];
        let _yAxisData = [0, 2, 4, 6, 8, 10];
        let seriesArray = [];
        if (starNo1 && personCateGoryData && personCateGoryData["all_vote"] && personCateGoryData["all_vote"].length > 0) {
            _xAxisData = this.initTime();
            seriesArray.push(this.seriesData(_xAxisData));
            let _y = this.initYAxisData();
            _yAxisData = _y && _y.length > 0 ? _y : _yAxisData;
        }
        let myChart = echarts.init(this.category);
        // 绘制图表
        myChart.setOption({
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: _xAxisData
            },
            yAxis: {
                data: _yAxisData,
                type: 'category'
            },
            series: seriesArray
        });

        myChart.on('legendselectchanged', function (params) {

        });

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    seriesData(xAxisData) {
        let personCateGoryData = this.props.personCateGoryData;
        if (personCateGoryData) {
            return this.seriesTime(xAxisData, personCateGoryData["all_vote"]);
        }
    }

    initYAxisData() {
        let voteTotal = 0;
        let yDataArray = [voteTotal];
        let personCateGoryData = this.props.personCateGoryData;
        if (personCateGoryData && personCateGoryData["all_vote"] && personCateGoryData["all_vote"].length > 0) {
            let _data = personCateGoryData["all_vote"];
            for (let i = 0; i < _data.length; i++) {
                voteTotal += parseInt(_data[i]["vote_num"]);
            }
            if (voteTotal != 0 && voteTotal != 1) {
                let _voteMiddle = parseInt(voteTotal / 2); // 总数一半
                yDataArray.push(_voteMiddle);
                if (_voteMiddle != 1 && _voteMiddle != 0) {
                    let _voteMiddleBegin = parseInt(_voteMiddle / 2); // 一半的一半
                    yDataArray.push(_voteMiddleBegin);
                    if (_voteMiddleBegin != 0) {
                        let _voteMiddleEnd = _voteMiddle + _voteMiddleBegin // 总数一半 + 一半的一半
                        yDataArray.push(_voteMiddleEnd);
                    }
                }
            } else if (voteTotal == 1) {
                yDataArray.push(voteTotal)
            } else {
                yDataArray.push(2, 4, 6, 8, 10)
            }
            return yDataArray;
        }
    }

    seriesTime(times, data) {
        let dateArray = [];
        let _xAxisName = undefined;
        if (times.length > 0) {
            for (let i = 0; i < times.length; i++) {
                let _vote_date = undefined;
                for (let j = 0; j < data.length; j++) {
                    let subStrData = (data[j]["vote_date"].substring(data[j]["vote_date"].indexOf("-") + 1, data[j]["vote_date"].length)).replace("-", "/");
                    if (times[i] == subStrData) {
                        _vote_date = data[j]["vote_num"];
                        _xAxisName = data[j]["star_name"];
                        break;
                    }
                }
                _vote_date ? dateArray.push(_vote_date) : dateArray.push(0);
            }
        }
        let xAxisObj = {};
        xAxisObj.name = _xAxisName;
        xAxisObj.type = "line";
        xAxisObj.stack = "总量";
        xAxisObj.data = dateArray;
        return xAxisObj
    }

    initTime() {
        let date = new Date();
        let xAxisData = [];
        let newXAxisData = [];
        //获取30天前得日期
        for (let i = 0; i < 7; i++) {
            let lastDate = new Date(date - 1000 * 60 * 60 * 24 * i);//最后30天可以更改，意义：是获取多少天前的时间
            let lastY = lastDate.getFullYear();
            let lastM = lastDate.getMonth() + 1;
            let lastD = lastDate.getDate();
            let LDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);//得到30天前的时间
            let subStrData = (LDate.substring(LDate.indexOf("-") + 1, LDate.length)).replace("-", "/");
            xAxisData.push(subStrData)
        }
        for (let j = 0; j < xAxisData.length; j++) {
            newXAxisData[xAxisData.length - 1 - j] = xAxisData[j]
        }
        return newXAxisData
    }

    showModal = (e, key) => {
        //e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            selectEd: !this.state.selectEd,
            starSelect: key
        });
    }

    initTitleFooterHtml() {
        let personCateGoryData = this.props.personCateGoryData;
        let starListData = this.props.starListData;
        let vateListTotal = 0;
        if (starListData && starListData.length > 0) {
            for (let j = 0; j < starListData.length; j++) {
                vateListTotal += parseInt(starListData[j]["total_vote"]);
            }
        }
        if (personCateGoryData && personCateGoryData["all_vote"] && personCateGoryData["all_vote"].length > 0) {
            let voteTotal = 0;
            let _data = personCateGoryData["all_vote"];
            for (let i = 0; i < _data.length; i++) {
                voteTotal += parseInt(_data[i]["vote_num"]);
            }
            let voteArray = this.calculationVote(vateListTotal, voteTotal);
            return (<div className='profilesCategory-vote'>{_data[0]["star_name"]}总共获得{voteTotal}星值，目前势头{voteArray[0]}，有望成为{voteArray[1]}</div>);
        }
    }

    calculationVote(value, total) {
        let _trendType = this.state.trendType[this.state.trendType.length];
        let _trendStar = this.state.trendStar[this.state.trendStar.length];
        let voteNumber = parseInt(total) / parseInt(value);
        if (voteNumber == 1) {
            _trendType = this.state.trendType[0];
            _trendStar = this.state.trendStar[0];
        } else if (voteNumber < 1 && voteNumber >= 0.8) {
            _trendType = this.state.trendType[1];
            _trendStar = this.state.trendStar[1];
        } else if (voteNumber < 0.8 && voteNumber >= 0.5) {
            _trendType = this.state.trendType[2];
            _trendStar = this.state.trendStar[2];
        } else if (voteNumber < 0.5 && voteNumber >= 0.4) {
            _trendType = this.state.trendType[3];
            _trendStar = this.state.trendStar[3];
        } else if (voteNumber < 0.4 && voteNumber >= 0.2) {
            _trendType = this.state.trendType[4];
            _trendStar = this.state.trendStar[4];
        } else {
            _trendType = this.state.trendType[5];
            _trendStar = this.state.trendStar[5];
        }
        return [_trendType, _trendStar]
    }

    render() {

        return (
            <div className='profilesCategory-body'>
                <div className='profilesCategory-checkbox'>
                    <div className='profilesCategory-btn' style={{ zIndex: 1002 }}>
                        <Button onClick={this.showModal} style={{ zIndex: 1003, fontSize: "10px" }}>
                            请选择明星
                        </Button>
                    </div>
                    <div className='profilesCategory-select'>
                        <ProfilesSelect
                            dispatch={this.props.dispatch}
                            selectEd={this.state.selectEd}
                            showModal={this.showModal}
                            personStarGraphData={this.props.personStarGraphData}
                            starListData={this.props.starListData}
                        />
                    </div>
                </div>
                <div className='profilesCategory-echarts' >
                    <div className='profilesCategory-media' ref={ref => this.category = ref} > </div>
                </div>
                <div className='profilesCategory-title'>
                    {this.initTitleFooterHtml()}
                </div>
            </div>
        );
    }
}

export default ProfilesCategory;