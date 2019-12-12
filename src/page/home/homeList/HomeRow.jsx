// @ts-nocheck
import React, { Component } from 'react';

import { Button, WhiteSpace, WingBlank,Modal, List, Icon } from 'antd-mobile';

import './style/homeRow.scss';

class HomeRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal1: false,
        }
    }

    voteLimitJpg(canvas, imgSrc) {
        if (canvas && canvas != null) {
            let img = new Image();
            //这里直接修改图片的路径
            img.src = imgSrc;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                //获取图片宽高的最小值
                let min = Math.min(img.width, img.height);
                let r = min / 2;
                ctx.fillStyle = ctx.createPattern(img, 'no-repeat');
                ctx.clearRect(0, 0, img.width, img.height);
                ctx.arc(img.width / 2, img.height / 2, r, 0, Math.PI * 2);
                ctx.fill();
            };
        }

    }
    handleClick(rowId) {
        console.log(rowId)
        console.log(this.props)
        this.props.dispatch({ type: "saveStarVote", data: this.props.starListData })
    }
    showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
    onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

    render() {
        let starListData = this.props.starListData ? this.props.starListData : "";
        const star = <canvas className="homeRow-bar homeRow-canvas" ref={ref => this.voteLimitJpg(ref, `${basePathUrl+starListData["image"]}`)} />
        return (
            <div className="homeRow-body">
                <div className='homeRow-rowID' key={this.props.rowID}>
                    <div className='homeRow-items'>
                        <canvas className="homeRow-bar homeRow-canvas" ref={ref => this.voteLimitJpg(ref, `${basePathUrl+starListData["image"]}`)} />
                        <div className='homeRow-bar homeRow-title'>
                            <div className="homeRow-starName">
                                <span className='homeRow-v'>V</span>
                                <span className='name_star'>{starListData["star_name"]}</span>
                                <span>巨星值：{starListData["total_vote"]}</span>  
                                 
                            </div>
                            <div className="homeRow-voteMaxValue">
                               
                            </div>
                            <div className="homeRow-footer">
                                <div className='homeRow-todayVote'>
                                    今日已获得人气：{starListData["today_vote"]}
                                </div>
                                <div className='homeRow-btnVote'>
                                    <Button onClick={this.handleClick.bind(this, this.props.rowID)} className='homeRow-btn' type="ghost" inline size="small" style={{ marginRight: '4px' }}>投票</Button>
                                </div>
                            </div>
                            <div className='fans'>
                              <span>粉丝寄语：</span>
                              <span>{starListData["idol_message"]}</span>
                               <WingBlank>
                                    <Button onClick={this.showModal('modal1')} className='association' type="warning" inline size="small" >加入社群</Button>
                                    <WhiteSpace />
                                    <Modal
                                      visible={this.state.modal1}
                                      className='modal'
                                      transparent
                                      maskClosable={false}
                                      onClose={this.onClose('modal1')}
                                      title={star}
                                      footer={[{ text: '投票', onPress: () => { this.handleClick.bind(this, this.props.rowID); this.onClose('modal1')(); } }]}
                                      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                     
                                    >
                                      <div style={{ height: 100, overflow: 'scroll' }}>
                                        <div>
                                            <span className='name_star'>{starListData["star_name"]}</span>
                                <span>巨星值：{starListData["total_vote"]}</span>  
                                        </div>
                                          <div>
                                           今日已获得人气：{starListData["today_vote"]}
                                           <span>粉丝寄语：</span>
                              <span>{starListData["idol_message"]}</span>
                                        </div>
                                      </div>
                                    </Modal>
                                    </WingBlank>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeRow;