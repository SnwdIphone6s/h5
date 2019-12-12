// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NoticeBar, WhiteSpace, Badge, Tabs  } from 'antd-mobile';

import NoticeTitle from './noticeTitle/NoticeTitle.jsx';
import NoticeSelect from './noticeSelect/NoticeSelect.jsx';

import './style/noticeView.scss';

class NoticeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectModal: false,
            messageId: undefined,
            title: undefined,
            content: undefined,
            readed: false
        }
    }

    loadNoticeBarHtml() {
        let naticeListData = this.props.naticeListData;
        if (naticeListData && naticeListData != null && naticeListData.length > 0) {
          naticeListData= naticeListData.filter(function(v){
                 return v.type == 1
          })
          let list = naticeListData[0].list
            return list.map((v,k)=>{
            return (
              <div key={k} className='noticeView-one'>
              <div>{v.create_time}</div>
              <div>{v.content}</div>
            </div>
            )
          })
        }
      }
    tittle() {
        let naticeListData = this.props.naticeListData;
        if (naticeListData && naticeListData != null && naticeListData.length > 0) {
          naticeListData= naticeListData.filter(function(v){
                 return v.type == 2
          })
          let list = naticeListData[0].list
            return list.map((v,k)=>{
            return (
              <div key={k} className='noticeView-one'>
              <div>{v.create_time}</div>
              <div>{v.content}</div>
            </div>
            )
          })
        }
      }
      
    massage() {
        let naticeListData = this.props.naticeListData;
        if (naticeListData && naticeListData != null && naticeListData.length > 0) {
          naticeListData= naticeListData.filter(function(v){
                 return v.type == 3
          })
          let list = naticeListData[0].list
            return list.map((v,k)=>{
            return (
              <div key={k} className='noticeView-one'>
              <div>{v.create_time}</div>
              <div>{v.content}</div>
            </div>
            )
          })
        }
      }
    onHandleBar = (event, messageId, title, content, readed) => {
        event.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            selectModal: !this.state.selectModal,
            messageId,
            title,
            content,
            readed
        })
    }

    render() {
          const tabs = [
            { title: <Badge >系统消息</Badge> },
            { title: <Badge >系统提示</Badge> },
            { title: <Badge dot>粉丝团公告</Badge> },
          ]
        return (
            <div className='noticeView-body'>
                <div className="noticeView-title">
                    <NoticeTitle />
                </div>
                <div className='noticeView-table'>
                   <Tabs tabs={tabs}
                      initialPage={1}
                      onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <div>{this.loadNoticeBarHtml()}</div>
                    <div>{this.tittle()}</div>
                    <div>{this.massage()}</div>
                    
                    </Tabs>
                    <NoticeSelect
                        dispatch={this.props.dispatch}
                        selectModal={this.state.selectModal}
                        messageId={this.state.messageId}
                        title={this.state.title}
                        content={this.state.content}
                        readed={this.state.readed}
                        onHandleBar={this.onHandleBar}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        naticeListData: state.notice_R.naticeListData
    }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeView);
