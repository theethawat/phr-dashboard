import React, { Component } from "react"
import OverallStat from "./OverallStat"
import GlucoseStat from "./GlucoseStat"
import PressureStat from "./PressureStat"
import Spo2Stat from "./Spo2Stat"
import PulseStat from "./PulseStat"
class Frontpage extends Component<any, any>{
    render() {
        return (<div className="container">
            <h3 className="kanit subtitle is-3"> Dashboard </h3><hr />
            <OverallStat />
            <br />
            <h4 className="subtitle is-4">Datatype Specific Statistic</h4>
            <div className="columns">
                <div className="column">
                    <PressureStat />
                </div>
                <div className="column">
                    <GlucoseStat />
                    <br />
                    <Spo2Stat />
                </div>
                <div className="column">
                    <PulseStat />
                </div>
            </div>
            <p> <b>หมายเหตุ</b> ผลการวิเคราะห์นี้ ใช้เกณฑ์โดยคร่าว ๆ เท่านั้น </p>
        </div>)
    }
}
export default Frontpage