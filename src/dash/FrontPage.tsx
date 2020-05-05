import React, { Component } from "react"
import OverallStat from "./OverallStat"
import GlucoseStat from "./GlucoseStat"
class Frontpage extends Component<any, any>{
    render() {
        return (<div className="container">
            <h3 className="kanit subtitle is-3"> Dashboard </h3><hr />
            <OverallStat />
            <br />
            <h4 className="subtitle is-4">Datatype Specific Statistic</h4>
            <div className="columns">
                <div className="column">
                    <GlucoseStat />
                </div>
                <div className="column">

                </div>
                <div className="column">

                </div>
            </div>
        </div>)
    }
}
export default Frontpage