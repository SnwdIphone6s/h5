// @ts-nocheck
import React, { Component } from 'react';
import echarts from 'echarts';
import { Button, Modal } from 'antd-mobile';
import { Toast} from 'antd-mobile';
import './style/profilesPie.scss';
const prompt = Modal.prompt;

class ProfilesPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fansType: ["唯粉", "泛粉"]
        }
    }

    componentDidUpdate() {
        // this.props.dispatch({ type: "getIdolLimit" });
        let personStarGraphData = this.props.personStarGraphData;
        console.log(personStarGraphData)
        let options = []
        if(personStarGraphData&&personStarGraphData.star_list){
               let echarts  = personStarGraphData.star_list
            options  = echarts.forEach(v=>{
            v.value = v.total_vote
            v.name = v.star_name
            return v
        })
        }
     
        let myChart = echarts.init(this.canvasPie);
        let optionData = [];
        
        if (personStarGraphData && personStarGraphData["star_list"] && personStarGraphData["star_list"].length > 0) {
            let starListData = personStarGraphData["star_list"];
            for (let i = 0; i < starListData.length; i++) {
                optionData.push({ value: starListData[i]["total_vote"], name: starListData[i]["star_name"] });
            }
        }
        console.log(optionData)
        myChart.setOption({
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name:'投票',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:optionData
        }
    ]
        });
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    calculationStarVote() {
        let personStarGraphData = this.props.personStarGraphData;
        let voteFansType = this.state.fansType[1];
        let voteFansNum = [];
        let sumVote = 0;
        if (personStarGraphData && personStarGraphData["star_list"] && personStarGraphData["star_list"].length > 0) {
            let starVote = personStarGraphData["star_list"];
            for (let i = 0; i < starVote.length; i++) {
                if (parseInt(starVote[i]["percent"]) > 0.8) {
                    voteFansType = this.state.fansType[0];
                }
                let percent = starVote[i]["percent"] ? starVote[i]["percent"] : 0;
                let starName = starVote[i]["star_name"];
                let calculationPercent = (parseFloat(percent) * 100) + "%"
                calculationPercent = String(calculationPercent).replace(/^(.*\..{2}).*$/, "$1");
                voteFansNum.push(
                    <span key={i}>
                        <span style={{ fontWeight: 700, color: "red" }}>{calculationPercent}</span>
                        投给了
                        <span style={{ fontWeight: 700, color: "red" }}>{starName}</span>
                        ，您是<span style={{ fontWeight: 700, color: "red" }}>{starName}</span>最铁的<span style={{ fontWeight: 700, color: "red" }}>{voteFansType}</span>;
                    </span>
                );
                sumVote += parseInt(starVote[i]["total_vote"]);
            }
        }
        return { voteFansType, sumVote, voteFansNum }
    }

    handlePress = value => {
        if (String(value).length > 8) {
            return Toast.fail("输入爱豆寄语超过了8个字，请重新输入");
        }
        let user_id = this.props.userIdData;
        this.props.dispatch({ type: "updateUserByUserName", playload: { user_id, name: value, userinfo: this.props.loginUserData } })
    }

    loadjy = () => {
        return (prompt(null, '自定义名称', [
            { text: '取消' },
            { text: '提交', onPress: this.handlePress },
        ], 'default', null, ['名称不能超过8个字']));
    }

    render() {
        let personStarGraphData = this.props.personStarGraphData ? this.props.personStarGraphData : "";
console.log(this.props)
        let data = this.calculationStarVote();
        return (
            <div className='profilesPie-body'>
                <div className='profilesPie-pie' style={{ width: 230, height: 260, marginTop: -30 }} ref={ref => (this.canvasPie = ref)}></div>
                <div className='profilesPie-title'>
                    <div className='profilesPie-item profilesPie-fansName'>
                    <div>用户: {this.props.autoUsername ? this.props.autoUsername : personStarGraphData["phone"]}</div>
                    <div><span onClick={this.loadjy} type="ghost" size="small" >
                            编辑
                        </span></div>
                        
                        
                    </div>
         
                    <div className='profilesPie-item profilesPie-voteName'>

                        {data["voteFansType"]} -- {(personStarGraphData["star_list"] && personStarGraphData["star_list"].length > 0) ? personStarGraphData["star_list"][0]["star_name"] : "暂无"}
                    </div>
                    <div className='profilesPie-item profilesPie-fansDescribe'>
                        <span>
                            您累计为爱豆投下了<span>{data["sumVote"]}</span>票，
                           {data["voteFansNum"]}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilesPie;