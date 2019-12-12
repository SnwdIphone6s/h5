import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import './style/homeJpg.scss';

class HomeJpg extends Component {
    constructor(props) {
        super(props);
    }
    supportFansLimit() {
        let starFansListData = this.props.starFansListData;
        console.log(this.props)
        let starListStr = undefined;
        let starListArray = [];
        if (starFansListData && starFansListData["data"]) {
            for (let i = 0; i < starFansListData["data"].length; i++) {
                if (i < 3) {
                    if (typeof starFansListData["data"][i]["fans_name"] != "undefined") {
                        starListArray.push(starFansListData["data"][i]["fans_name"]);
                    } else {
                        starListArray.push(starFansListData["data"][i]["phone"]);
                    }
                }
            }
            starListStr = starListArray.join(",")
        }
        return starListStr;
    }
        handleClick=(rowId)=> {
        this.props.dispatch({ type: "saveStarVote", data: this.props.starListData })
    }
    loadJpgLimit() {
        let starJpgLimit = this.props.starJpgLimit;
        let starJpgArrayHtml = [];
        console.log(starJpgLimit)
        if (starJpgLimit) {
            for (let i = 0; i < starJpgLimit.length; i++) {
                let hUrl = basePathUrl + starJpgLimit[i]["image"]
                let name = starJpgLimit[i].star_name
                let starNum = starJpgLimit[i].total_vote
                let todayNum = starJpgLimit[i].today_vote
                let id = starJpgLimit[i].star_id
                starJpgArrayHtml.push(
                    <div key={i} className = 'list'>
                      <div style={{background:'url'+'('+hUrl+')'+ '50% 50% no-repeat',backgroundSize:'cover' }}>
                      
                    </div>
                    <div>
                      <div>{name}</div>
                      <div>巨星值：{starNum}</div>
                      <div>今日人气：{todayNum}</div>
                     </div> 
                    <Button onClick={this.handleClick(id)} className='homeRow-btn' type="ghost" inline size="small" >投票</Button>
                    </div>
                    
                )
            }
        }
        return starJpgArrayHtml
    }

    render() {
        let starNo1 = this.props.starNo1 ? this.props.starNo1 : "";
        return (
            <div className='homeJpg-body'>
                <div className='homeJpg-list'>
                    {this.loadJpgLimit()}
                    {this.supportFansLimit()}
                </div>
{/*                <div className="homeJpg-title">
                    <div className='homeJpg-zhjx'>
                        最火巨星：{starNo1["star_name"]}
                    </div>
                    <div className='homeJpg-jxz'>
                        巨星值：{starNo1["total_vote"]}
                    </div>
                    <div className='homeJpg-dlyyfx'>
                        鼎立应援粉丝：{this.supportFansLimit()}
                    </div>
                </div>*/}
            </div>
        );
    }
}

export default HomeJpg;